const request = require("supertest");
const app = require("../../server");
describe("Integration Tests: Movie Titles Matching", () => {
  it("should verify that movies rendered in index.pug match the titles from the API", async () => {
    //--------Fetch movie data from the live API
    const apiResponse = await fetch("https://plankton-app-xhkom.ondigitalocean.app/api/movies");
    const apiData = await apiResponse.json();
    //--------Ensure the API responded with valid data
    expect(apiData.data).toBeDefined();
    expect(apiData.data.length).toBeGreaterThan(0);
    //--------Extract movie titles and IDs from the API response
    const apiMovies = apiData.data.map((movie) => ({
      id: movie.id,
      title: movie.attributes.title,
    }));
    //---------Send a request to the landing page
    const response = await request(app).get("/");
    expect(response.status).toBe(200);
    //---------Verify that each movie title from the API is present in the rendered HTML
    apiMovies.forEach((movie) => {
      const movieTitleInRenderedHTML = response.text.includes(movie.title);
      expect(movieTitleInRenderedHTML).toBe(true);
    });
    //----------Additional check: Ensure no extra movies are rendered
    const renderedTitles = apiMovies.filter((movie) =>
      response.text.includes(movie.title)
    );
    expect(renderedTitles.length).toBe(apiMovies.length);
  });
});
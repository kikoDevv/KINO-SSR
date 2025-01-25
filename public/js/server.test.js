const request = require("supertest");
const app = require("../../server"); 
const fetch = require("node-fetch");

describe("Integration Tests: Movie Pages", () => {
  it("should verify that movie pages display the correct titles", async () => {
    // Fetch live API data
    const apiResponse = await fetch("https://plankton-app-xhkom.ondigitalocean.app/api/movies");
    const apiData = await apiResponse.json();

    // Ensure the API responded with data
    expect(apiData.data).toBeDefined();
    expect(apiData.data.length).toBeGreaterThan(0);

    // Send a request to the landing page
    const response = await request(app).get("/");
    expect(response.status).toBe(200);

    // Verify that the titles of all movies from the API are rendered
    apiData.data.forEach((movie) => {
      expect(response.text).toContain(movie.attributes.title);
    });
  });
});
document.addEventListener('DOMContentLoaded', () => {
    const movieButtons = document.querySelectorAll('.movieBtn');

    movieButtons.forEach(button => {
      button.addEventListener('click', () => {
        const title = button.getAttribute('data-title');
        const image = button.getAttribute('data-image');
        const intro = button.getAttribute('data-intro');
        const publishedAt = button.getAttribute('data-publishedAt');
        window.location.href = `/movie-info?title=${encodeURIComponent(title)}&image=${encodeURIComponent(image)}&intro=${encodeURIComponent(intro)}&publishedAt=${encodeURIComponent(publishedAt)}`;
      });
    });

    const backBtn = document.getElementById('backBtn');
    if (backBtn) {
      backBtn.addEventListener('click', () => {
        window.location.href = '/';
      });
    }
  });


findTopThreeMovies();
async function findTopThreeMovies() {
	const releasedArray = [];
	const response = await fetch("../json/movies.json");
	const data = await response.json();
  const sortedMovies = data.sort((a, b) => b.rating - a.rating);
  const top = sortedMovies.slice(0, 3);
	generateTopThree(top);
	console.log(data);
}

//----function to generate top 3 movies from api----
function generateTopThree(movies) {
	const topThreeContainer = document.querySelector(".topThree");
	topThreeContainer.innerHTML = `
    <div class="containerLeft">
      <img class="imgLeft" src="${movies[0].image}" alt="Image not found" />
      <div class="infoCard">
        <div class="info">
          <h3 class="movieName">${movies[0].title}</h3>
          <p class="movieInfo">${movies[0].genre}</p>
        </div>
         <button class="movieBtn">Buy ticket <i class="fa-solid fa-money-bill-1-wave"></i></button>
      </div>
    </div>
    <div class="containerRight">
      <div class="movieCardTop">
        <img class="imgTop" src="${movies[1].image}" alt="Image not found" />
        <div class="infoCard">
          <div class="info">
            <h3 class="movieName">${movies[1].title}</h3>
            <p class="movieInfo">${movies[1].genre}</p>
          </div>
          <button class="movieBtn">Buy ticket <i class="fa-solid fa-money-bill-1-wave"></i></button>
        </div>
      </div>
      <div class="movieCardBottom">
        <img class="imgBottom" src="${movies[2].image}" alt="Image not found" />
        <div class="infoCard">
          <div class="info">
            <h3 class="movieName">${movies[2].title}</h3>
            <p class="movieInfo">${movies[2].genre}</p>
          </div>
          <button class="movieBtn">Buy ticket <i class="fa-solid fa-money-bill-1-wave"></i></button>
        </div>
      </div>
    </div>
  `;
}

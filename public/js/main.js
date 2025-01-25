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
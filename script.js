const form = document.querySelector("form");
const movieTitleInput = document.getElementById("movieTitle");
const movieInfoDiv = document.getElementById("movieInfo");

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  
  const apiKey = "30cedb87";
  const title = movieTitleInput.value;
  
  try {
    const movieData = await getMovieData(title, apiKey);
    updateMovieInfo(movieData);
  } catch (error) {
    showError(error.message);
  }
});

async function getMovieData(title, apiKey) {
  const response = await fetch(`https://www.omdbapi.com/?t=${title}&apikey=${apiKey}`);
  const data = await response.json();

  if (data.Response === "False") {
    throw new Error(data.Error);
  }

  return data;
}

function updateMovieInfo(movieData) {
  const movieTitle = document.createElement("h2");
  movieTitle.textContent = movieData.Title;

  const moviePoster = document.createElement("img");
  moviePoster.src = movieData.Poster;

  const movieYear = document.createElement("p");
  movieYear.textContent = `Year: ${movieData.Year}`;

  const movieRated = document.createElement("p");
  movieRated.textContent = `Rated: ${movieData.Rated}`;

  const moviePlot = document.createElement("p");
  moviePlot.textContent = `Plot: ${movieData.Plot}`;

  movieInfoDiv.innerHTML = "";
  movieInfoDiv.appendChild(movieTitle);
  movieInfoDiv.appendChild(moviePoster);
  movieInfoDiv.appendChild(movieYear);
  movieInfoDiv.appendChild(movieRated);
  movieInfoDiv.appendChild(moviePlot);
}

function showError(errorMessage) {
  movieInfoDiv.innerHTML = "";
  
  const errorParagraph = document.createElement("p");
  errorParagraph.textContent = errorMessage;
  
  movieInfoDiv.appendChild(errorParagraph);
}

<script setup lang="ts">
import AdminPageMoviesVue from "@/components/adminpage/AdminPageMovies.vue";
import AdminPageEvents from "@/components/adminpage/AdminPageEvents.vue";
import axios from "axios";
import { onMounted, ref } from "vue";
import AdminPageMovieTrailer from "@/components/adminpage/AdminPageMovieTrailer.vue";


// Trailer

interface ITrailer {
  _id: string;
  title: string;
  poster: string;
  link: string;
}

const savedTrailer = ref<any>(null);
const trailers = ref<ITrailer[]>([]);

async function getTrailer() {
  try {
  const response = await axios.get("http://localhost:3000/trailer");
  trailers.value = response.data;
  console.log(trailers.value);
  } catch (error) {
    console.error("Failed to retrieve posters:", error);
  }
}

async function saveMovieTrailerInfo(
  moviePoster: File,
  movieTitle: string,
  movieLink: string
) {
  console.log("poster:", moviePoster, "title:", movieTitle, "movieLink:", movieLink);

  const formData = new FormData();
  formData.append("poster", moviePoster);
  formData.append("title", movieTitle);
  formData.append("link", movieLink);

  console.log("formdata:", formData)

  try {
    const response = await axios.post(
      "http://localhost:3000/trailer/savetrailer",
      formData
    );
    console.log("Movie saved successfully!", response.data);

    const { poster, title, link } = response.data;

    console.log("response", response.data);

    savedTrailer.value = {
      poster: poster,
      title: title,
      link: link,
    };

    console.log("savedMovieTrailer.value", savedTrailer.value);
  } catch (error) {
    console.log("Failed to save movieTrailer:", error);
  }
}

async function deleteTrailer(trailer: ITrailer) {
  console.log("movie", trailer.poster);

  const movieName = trailer.poster;
  // eslint-disable-next-line no-underscore-dangle
  const movieId = trailer._id;

  try {
    const response = await axios.post(
      "http://localhost:3000/trailer/deletemovie",
      // eslint-disable-next-line object-shorthand
      { trailerId: movieId, movieName: movieName }
    );

    console.log("response", response.data);

    location.reload();
  } catch (error) {
    console.log("Failed to delete movie:", error);
  }
}


// Movies

interface IMovie {
  _id: string;
  title: string;
  poster: string;
  link: string;
}

const savedMovie = ref<any>(null);
const movies = ref<IMovie[]>([]);

async function getMovies() {
  try {
  const response = await axios.get("http://localhost:3000/movie");
  movies.value = response.data;
  console.log(movies.value);
  } catch (error) {
    console.error("Failed to retrieve posters:", error);
  }
}

async function saveMovieInfo(
  moviePoster: File,
  movieImage: File,
  movieTitle: string,
  movieLink: string
) {
  console.log("poster:", moviePoster, "movieImage:", movieImage, "title:", movieTitle, "movieLink:", movieLink);

  const formData = new FormData();
  formData.append("poster", moviePoster);
  formData.append("image", movieImage);
  formData.append("title", movieTitle);
  formData.append("link", movieLink);

  console.log("formdata:", formData)

  try {
    const response = await axios.post(
      "http://localhost:3000/movie/savemovie",
      formData
    );
    console.log("Movie saved successfully!", response.data);

    const { poster, title, link } = response.data;

    console.log("response", response.data);

    savedMovie.value = {
      poster: poster,
      title: title,
      link: link,
    };

    console.log("savedMovie.value", savedMovie.value);
  } catch (error) {
    console.log("Failed to save movie:", error);
  }
}

async function deleteMovie(movie: IMovie) {
  console.log("movie", movie.poster);

  const movieName = movie.poster;
  const movieId = movie._id;

  try {
    const response = await axios.post(
      "http://localhost:3000/movie/deletemovie",
      { movieId: movieId, movieName: movieName }
    );

    const { movie } = response.data;

    console.log("response", response.data);

    location.reload();
  } catch (error) {
    console.log("Failed to delete movie:", error);
  }
}


// events

interface IEvent {
  _id: string;
  title: string;
  poster: string;
  link: string;
}

const savedEvent = ref<any>(null);
const events = ref<IEvent[]>([]);

async function getEvents() {
  try {
  const response = await axios.get("http://localhost:3000/event");
  events.value = response.data;
  console.log(movies.value);
  } catch (error) {
    console.error("Failed to retrieve posters:", error);
  }
}

async function saveEventInfo(
  eventPoster: File,
  eventImage: File,
  eventTitle: string,
  eventLink: string
) {
  // console.log("poster:", moviePoster, "movieImage:", movieImage, "title:", movieTitle, "movieLink:", movieLink);

  const formData = new FormData();
  formData.append("poster", eventPoster);
  formData.append("image", eventImage);
  formData.append("title", eventTitle);
  formData.append("link", eventLink);

  // console.log("formdata:", formData)

  try {
    const response = await axios.post(
      "http://localhost:3000/event/saveevent",
      formData
    );
    // console.log("Movie saved successfully!", response.data);

    const { poster, title, link } = response.data;

    // console.log("response", response.data);

    savedEvent.value = {
      poster: poster,
      title: title,
      link: link,
    };

    // console.log("savedMovie.value", savedMovie.value);
  } catch (error) {
    // console.log("Failed to save movie:", error);
  }
}

async function deleteEvent(event: IEvent) {
  console.log("movie", event.poster);

  const movieName = event.poster;
  const movieId = event._id;

  try {
    const response = await axios.post(
      "http://localhost:3000/movie/deleteevent",
      { eventId: movieId, eventName: movieName }
    );


    console.log("response", response.data);

    location.reload();
  } catch (error) {
    console.log("Failed to delete event:", error);
  }
}


onMounted(async () => {
  getTrailer();
  getMovies();
  getEvents();
});
</script>

<template>
  <div>
    <div class="entertainment-parent-container">
        <h1>Välkommen</h1>
        <h4>Ladda upp filmer och event</h4>
        <div class="entertainment-container">
          <div class="small-container">
            <AdminPageMovieTrailer @movieTrailerInfo="saveMovieTrailerInfo"></AdminPageMovieTrailer>
            <AdminPageMoviesVue @movieInfo="saveMovieInfo"></AdminPageMoviesVue>
            <AdminPageEvents @eventInfo="saveEventInfo"></AdminPageEvents>
          </div>
        </div>
    </div>
    <div class="large-container">
      <div class="movies-container">
        <h1>Aktiva filmer</h1>
        <div class="medium-container">
          <div v-for="movie in movies" :key="movie._id" class="movies">
            <img
              :src="`http://localhost:3000/movie/image/${movie.poster}`"
              :alt="movie.title"
            />
            <h3>{{ movie.title }}</h3>
            <button @click="() => deleteMovie(movie)">Radera film</button>
          </div>
        </div>
      </div>

      <div class="events-container">
        <h1>Aktiva event</h1>
        <div class="medium-container">
          <div v-for="event in events" :key="event._id" class="movies">
            <img
              :src="`http://localhost:3000/movie/image/${event.poster}`"
              :alt="event.title"
            />
            <h3>{{ event.title }}</h3>
            <button @click="() => deleteEvent(event)">Radera film</button>
          </div>
        </div>
      </div>

      <div class="trailer-container">
        <h1>Aktiv trailer</h1>
        <div class="medium-container">
          <div v-for="trailer in trailers" :key="trailer._id" class="trailer">
            <img
              :src="`http://localhost:3000/trailer/image/${trailer.poster}`"
              :alt="trailer.title"
            />
            <h3>{{ trailer.title }}</h3>
            <button @click="() => deleteTrailer(trailer)">Radera film</button>
          </div>
        </div>
      </div>
      </div>
    </div>
</template>
<style scoped>
/* scroll-snap-type: y
  scroll-behavior: smooth */

  .entertainment-parent-container {
    background-color: #292929;
    padding: 20px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    color: #fff;
  }

  h1 {
    font-weight: 700;
    margin-bottom: 10px;
  }

  .entertainment-container {
    background-color: #292929;
    border-radius: 15px;
    box-shadow: rgba(0, 0, 0, 0.25) 0px 4px 8px;
    text-align: left;
    margin-top: 30px;
  }

  .small-container {
    padding: 20px;
    margin: auto;
    display: flex;
    gap: 70px;
    flex-direction: row;
  }

  .large-container {
    background-color: #292929;
    color: #fff;
    padding-top: 40px;
  }

  h1 {
    text-align: center;
  }

  .medium-container {
    display: flex;
    flex-direction: row;
    justify-content: center;
    margin: auto;
  }

  .movies {
    display: flex;
    flex-direction: column;
  }

  img {
    max-width: 100%;
    max-height: 300px;
    padding: 20px;
  }

  button {
    width: 100px;
    margin: 10px auto;
  }
</style>

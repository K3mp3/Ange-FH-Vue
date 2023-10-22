<!-- eslint-disable no-underscore-dangle -->
<!-- eslint-disable no-alert -->
<script setup lang="ts">
import AdminPageMoviesVue from "@/components/adminpage/AdminPageMovies.vue";
import AdminPageEvents from "@/components/adminpage/AdminPageEvents.vue";
import axios from "axios";
import { computed, onMounted, ref } from "vue";
import AdminPageTrailer from "@/components/adminpage/AdminPageTrailer.vue";
import { useShowNav } from "@/stores/showNav";
import { useSignInStore } from "@/stores/signIn";
import { useRouter } from 'vue-router';

interface ITrailer {
  _id: string;
  title: string;
  poster: string;
  link: string;
}

const savedTrailer = ref<any>(null);
const trailers = ref<ITrailer[]>([]);

const showNavStore = useShowNav();

async function getTrailer() {
  try {
  const response = await axios.get("http://localhost:3000/trailer");
  trailers.value = response.data;
  } catch (error) {
    alert(error);
  }
}

async function saveMovieTrailerInfo(
  moviePoster: File,
  movieTitle: string,
  movieLink: string
) {
  const formData = new FormData();
  formData.append("poster", moviePoster);
  formData.append("title", movieTitle);
  formData.append("link", movieLink);

  try {
    const response = await axios.post(
      "http://localhost:3000/trailer/savetrailer",
      formData
    );

    const { poster, title, link } = response.data;

    savedTrailer.value = {
      poster,
      title,
      link,
    };

    location.reload();
  } catch (error) {
    alert(error);
  }
}

async function deleteTrailer(trailer: ITrailer) {
  const movieName = trailer.poster;
  // eslint-disable-next-line no-underscore-dangle
  const movieId = trailer._id;

  try {
    const response = await axios.post(
      "http://localhost:3000/trailer/deletetrailer",
      // eslint-disable-next-line object-shorthand
      { trailerId: movieId, movieName: movieName }
    );

    location.reload();
  } catch (error) {
    alert(error);
  }
}


// Movies

interface IMovie {
  _id: string;
  title: string;
  description: string;
  poster: string;
  link: string;
}

const savedMovie = ref<any>(null);
const movies = ref<IMovie[]>([]);

async function getMovies() {
  try {
  const response = await axios.get("http://localhost:3000/movie");
  movies.value = response.data;
  } catch (error) {
    alert(error);
  }
}

async function saveMovieInfo(
  moviePoster: File,
  movieImage: File,
  movieTitle: string,
  movieDescription: string,
  movieLink: string
) {
  const formData = new FormData();
  formData.append("poster", moviePoster);
  formData.append("image", movieImage);
  formData.append("title", movieTitle);
  formData.append("description", movieDescription);
  formData.append("link", movieLink);

  console.log(formData);

  try {
    const response = await axios.post(
      "http://localhost:3000/movie/savemovie",
      formData
    );

    const { poster, title, description, link } = response.data;


    savedMovie.value = {
      poster,
      title,
      description,
      link,
    };

    location.reload();
  } catch (error) {
    alert(error);
  }
}

async function deleteMovie(movie: IMovie) {
  const movieName = movie.poster;
  const movieId = movie._id;

  try {
    const response = await axios.post(
      "http://localhost:3000/movie/deletemovie",
      { movieId: movieId, movieName: movieName }
    );

    location.reload();
  } catch (error) {
    alert(error);
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
  } catch (error) {
    alert(error);
  }
}

async function saveEventInfo(
  eventPoster: File,
  eventImage: File,
  eventTitle: string,
  eventLink: string
) {

  const formData = new FormData();
  formData.append("poster", eventPoster);
  formData.append("image", eventImage);
  formData.append("title", eventTitle);
  formData.append("link", eventLink);


  try {
    const response = await axios.post(
      "http://localhost:3000/event/saveevent",
      formData
    );

    const { poster, title, link } = response.data;


    savedEvent.value = {
      poster,
      title,
      link,
    };


    location.reload();
  } catch (error) {
    alert(error)
  }
}

async function deleteEvent(event: IEvent) {

  const movieName = event.poster;
  const movieId = event._id;

  try {
    const response = await axios.post(
      "http://localhost:3000/event/deleteevent",
      { eventId: movieId, eventName: movieName }
    );


    location.reload();
  } catch (error) {
    alert(error);
  }
}

const router = useRouter();


onMounted(async () => {
  const signedIn = computed(() => useSignInStore().signedIn)
  console.log("signedIn:", signedIn.value)

  if (!signedIn.value) {
    router.push({ name: 'home' });
  }

  getTrailer();
  getMovies();
  getEvents();

  showNavStore.hideNav(false);
});
</script>

<template>
  <div>
    <div class="entertainment-parent-container">
        <h1>Välkommen</h1>
        <h4>Ladda upp filmer och event</h4>
        <div class="entertainment-container">
          <div class="small-container">
            <AdminPageTrailer @movieTrailerInfo="saveMovieTrailerInfo"></AdminPageTrailer>
            <AdminPageMoviesVue @movieInfo="saveMovieInfo"></AdminPageMoviesVue>
            <AdminPageEvents @eventInfo="saveEventInfo"></AdminPageEvents>
          </div>
        </div>
    </div>
    <div class="large-container">
      <div class="trailer-container">
        <h1>Aktiv trailer</h1>
        <div class="medium-container">
          <div v-for="trailer in trailers" :key="trailer._id" class="trailer">
            <img
              :src="`http://localhost:3000/trailer/image/${trailer.poster}`"
              :alt="trailer.title"
            />
            <h3>{{ trailer.title }}</h3>
            <button type="button" @click="() => deleteTrailer(trailer)">Radera film</button>
          </div>
        </div>
      </div>

      <div class="movies-container">
        <h1>Aktiva filmer</h1>
        <div class="medium-container">
          <div v-for="movie in movies" :key="movie._id" class="movies">
            <img
              :src="`http://localhost:3000/movie/image/${movie.poster}`"
              :alt="movie.title"
            />
            <h3>{{ movie.title }}</h3>
            <button type="button" @click="() => deleteMovie(movie)">Radera film</button>
          </div>
        </div>
      </div>

      <div class="events-container">
        <h1>Aktiva event</h1>
        <div class="medium-container">
          <div v-for="event in events" :key="event._id" class="movies">
            <img
              :src="`http://localhost:3000/event/image/${event.poster}`"
              :alt="event.title"
            />
            <h3>{{ event.title }}</h3>
            <button type="button" @click="() => deleteEvent(event)">Radera film</button>
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

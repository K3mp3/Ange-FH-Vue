import { defineStore } from 'pinia'

export const useMovieStore = defineStore('movie', {
  state: () => ({
    film: null,
    showFullVideo: false,
  }),
})

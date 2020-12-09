<template>
  <h1>Random quotes !</h1>

  <p v-if="quoteLoadingFailed">Quote loading error: {{ quoteLoadingError }}</p>
  <p v-else-if="quoteLoadingIsPending">Loading...</p>
  <p v-else-if="quoteLoaded">{{ quote.content }} - {{ quote.author }}</p>
  <button @click="quoteLiked">👍</button>
  <button @click="quoteDisliked">👎</button>
</template>

<script>
import { LOADING, LOADED, ERROR } from './states';
import { fetchRandomQuote, likeQuote, dislikeQuote } from './api';

export default {
  name: 'App',
  data() {
    return {
      quote: {},
      quoteLoadingStatus: '',
      quoteLoadingError: '',
      // TODO: like / dislike loading status & error...
    }
  },
  computed: {
    quoteLoaded() {
      return this.quoteLoadingStatus === LOADED
    },
    quoteLoadingIsPending() {
      return this.quoteLoadingStatus === LOADING
    },
    quoteLoadingFailed() {
      return this.quoteLoadingStatus === ERROR
    }
    // TODO: like / dislike computed properties based on the status & error
  },
  methods: {
    getNextQuote() {
      this.quoteLoadingStatus = LOADING
      fetchRandomQuote().then((quote) => {
        this.quote = quote
        this.quoteLoadingStatus = LOADED
      }).catch((error) => {
        this.quoteLoadingError = error
        this.quoteLoadingStatus = ERROR
      })
    },
    quoteLiked() {
      likeQuote()
        .then(() => this.getNextQuote());
    },
    quoteDisliked() {
      dislikeQuote()
        .then(() => this.getNextQuote());
    }
  },
  created() {
    this.getNextQuote();
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>

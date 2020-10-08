<template>
  <p v-if="quoteLoadingFailed">Quote loading error: {{ quoteLoadingError }}</p>
  <p v-else-if="quoteLoadingIsPending">Loading...</p>
  <p v-else-if="quoteLoaded">{{ quote.content }} - {{ quote.author }}</p>
  <button @click="quoteLiked">👍</button>
  <button @click="quoteDisliked">👎</button>
</template>

<script>
import { likeQuote, dislikeQuote, useRandomQuoteApi } from "../api";

export default {
  name: "random-quote",
  setup() {
    // Quote loading feature
    const quoteLoadingFeature = useRandomQuoteApi()
    quoteLoadingFeature.call();

    return {
      quote: quoteLoadingFeature.data,
      quoteLoadingError: quoteLoadingFeature.dataLoadingError,
      quoteLoaded: quoteLoadingFeature.dataIsLoaded,
      quoteLoadingIsPending: quoteLoadingFeature.dataLoadingIsPending,
      quoteLoadingFailed: quoteLoadingFeature.dataLoadingFailed,
      getNextQuote: quoteLoadingFeature.call,
    }
  },
  data() {
    return {
      // TODO: like / dislike loading status & error...
    };
  },
  computed: {
    // TODO: like / dislike computed properties based on the status & error
  },
  methods: {
    quoteLiked() {
      likeQuote().then(() => this.getNextQuote());
    },
    quoteDisliked() {
      dislikeQuote().then(() => this.getNextQuote());
    },
  },
};
</script>

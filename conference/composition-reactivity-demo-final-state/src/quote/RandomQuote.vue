<template>
  <p v-if="quoteLoadingFailed">Quote loading error: {{ quoteLoadingError }}</p>
  <p v-else-if="quoteLoadingIsPending">Loading...</p>
  <p v-else-if="quoteLoaded">{{ quote.content }} - {{ quote.author }}</p>
  <button @click="quoteLiked" :disabled="quoteReviewLoadingIsPending">👍</button>
  <button @click="quoteDisliked" :disabled="quoteReviewLoadingIsPending">👎</button>
  <p v-if="quoteReviewError">Quote review error</p>
</template>

<script>
import { useRandomQuoteFeature, useQuoteReviewFeature } from "./quote";

export default {
  name: "random-quote",
  setup() {
    // Quote loading feature
    const quoteLoadingFeature = useRandomQuoteFeature()
    quoteLoadingFeature.getRandomQuote();
    const quote = quoteLoadingFeature.data

    // Quote review feature
    const quoteReviewFeature = useQuoteReviewFeature()

    const quoteLiked = () => {
      quoteReviewFeature
        .reviewQuote(quote.value)(true)
        .then(() => quoteLoadingFeature.getRandomQuote());
    }

    const quoteDisliked = () => quoteReviewFeature
      .reviewQuote(quote.value)(false)
      .then(() => quoteLoadingFeature.getRandomQuote());

    return {
      quote,
      quoteLoadingError: quoteLoadingFeature.dataLoadingError,
      quoteLoaded: quoteLoadingFeature.dataIsLoaded,
      quoteLoadingIsPending: quoteLoadingFeature.dataLoadingIsPending,
      quoteLoadingFailed: quoteLoadingFeature.dataLoadingFailed,
      getNextQuote: quoteLoadingFeature.getRandomQuote,

      quoteLiked,
      quoteDisliked,
      quoteReviewLoadingIsPending: quoteReviewFeature.dataLoadingIsPending,
      quoteReviewError: quoteReviewFeature.dataLoadingError
    }
  },
};
</script>

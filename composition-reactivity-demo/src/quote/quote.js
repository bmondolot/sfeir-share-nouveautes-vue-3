import { useApiCall } from '../api';

export const useRandomQuoteFeature = () => {
    const apiCall = useApiCall(process.env.VUE_APP_API_URL, {
        headers: new Headers({
            'Authorization': process.env.VUE_APP_API_AUTHORIZATION
        })
    })

    return {
        ...apiCall,
        getRandomQuote: apiCall.call
    }
}

export const useQuoteReviewFeature = () => {
    const reviewQuoteApi = useApiCall(process.env.VUE_APP_REVIEW_API_URL, {
        method: 'post',
        headers: new Headers({
            'Authorization': process.env.VUE_APP_REVIEW_API_URL,
            'Content-Type': 'application/json'
        })
    })

    const reviewQuote = (quoteToReview) => (quoteLiked) => reviewQuoteApi.call({
        body: JSON.stringify({
            quote: quoteToReview,
            liked: quoteLiked
        })
    });

    return {
        ...reviewQuoteApi,
        reviewQuote,
    }
}

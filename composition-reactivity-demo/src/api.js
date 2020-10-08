import { ref, computed } from 'vue';
import { LOADING, LOADED, ERROR } from "./states";

export const likeQuote = () => Promise.resolve('ok')

export const dislikeQuote = () => Promise.resolve('ok')

export const useApiCall = (url, options) => {
    const data = ref({})
    const dataLoadingStatus = ref('')
    const dataLoadingError = ref('')

    const dataIsLoaded = computed(() => dataLoadingStatus.value === LOADED);
    const dataLoadingIsPending = computed(() => dataLoadingStatus.value === LOADING);
    const dataLoadingFailed = computed(() => dataLoadingStatus.value === ERROR);

    const call = () => {
        dataLoadingStatus.value = LOADING
        return fetch(url, options)
            .then((response) => {
                if (!response.ok) {
                    throw new Error(response.message)
                }
                return response.json()
            })
            .then((fetchedData) => {
                data.value = fetchedData
                dataLoadingStatus.value = LOADED
            })
            .catch((error) => {
                dataLoadingStatus.value = ERROR
                dataLoadingError.value = error
            })
    }

    return {
        call,
        data,
        dataIsLoaded,
        dataLoadingIsPending,
        dataLoadingFailed,
        dataLoadingError,
    }
}

export const useRandomQuoteApi = () => useApiCall(process.env.VUE_APP_API_URL, {
    headers: new Headers({
        'Authorization': process.env.VUE_APP_API_AUTHORIZATION
    })
})

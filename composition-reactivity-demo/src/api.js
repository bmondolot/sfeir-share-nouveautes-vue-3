import { ref, computed } from 'vue';
import { LOADING, LOADED, ERROR } from "./states";

export const useApiCall = (url, defaultOptions) => {
    const data = ref({})
    const dataLoadingStatus = ref('')
    const dataLoadingError = ref('')

    const dataIsLoaded = computed(() => dataLoadingStatus.value === LOADED);
    const dataLoadingIsPending = computed(() => dataLoadingStatus.value === LOADING);
    const dataLoadingFailed = computed(() => dataLoadingStatus.value === ERROR);

    const call = (callOptions) => {
        const options = {
            ...defaultOptions,
            ...callOptions,
        }
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

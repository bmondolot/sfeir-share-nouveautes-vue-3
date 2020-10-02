export const fetchRandomQuote = () =>  fetch(process.env.VUE_APP_API_URL, {
    headers: new Headers({
        'Authorization': process.env.VUE_APP_API_AUTHORIZATION
    })
    }).then((response) => {
        if (!response.ok) {
            throw new Error(response.message);
        }
        return response.json()
    })

export const likeQuote = () => Promise.resolve('ok')

export const dislikeQuote = () => Promise.resolve('ok')
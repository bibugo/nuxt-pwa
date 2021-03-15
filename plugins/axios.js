export default function ({ $axios, redirect, error: nuxtError }) {
    // $axios.onRequest(config => {
    //     console.log('Making request to ' + config.url)
    // })

    // $axios.onError(error => {
    //     const code = parseInt(error.response && error.response.status)
    //     if (code === 400) {
    //         redirect('/400')
    //     } else {
    //         nuxtError({
    //             statusCode: code,
    //             message: error.message,
    //         });
    //     }
    //     return Promise.resolve(false);
    // })
}
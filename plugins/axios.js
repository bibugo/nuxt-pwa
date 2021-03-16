export default function ({ $message, $axios, redirect, error: nuxtError }) {
    // $axios.onRequest(config => {
    //     console.log('Making request to ' + config.url)
    // })

    $axios.onError(error => {
        const code = parseInt(error.response && error.response.status)
        let message = (error.response && error.response.data && error.response.data.errors && error.response.data.errors.message)
        message = message ? message : error.response && error.response.statusText
        $message({ content: message + ' (' + code + ')', color: 'error' });
        return Promise.resolve(false);
        //     if (code === 400) {
        //         redirect('/400')
        //     } else {
        //         nuxtError({
        //             statusCode: code,
        //             message: error.message,
        //         });
        //     }
        //     return Promise.resolve(false);
    })
}
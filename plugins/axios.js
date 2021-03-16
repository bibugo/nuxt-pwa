export default function ({ $message, $axios, redirect, error: nuxtError }) {
    // $axios.onRequest(config => {
    //     console.log('Making request to ' + config.url)
    // })

    $axios.onError(error => {
        const status = parseInt(error.response && error.response.status)
        const errors = error.response && error.response.data && error.response.data.errors
        let message = '[' + status + '] '
        message += (errors && errors.message) ? errors.message : error.response.statusText
        if(errors && errors.code) message += ' (' + errors.code + ')'
        $message({ content: message, color: 'error' });
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
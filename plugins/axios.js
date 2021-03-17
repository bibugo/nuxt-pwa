export default function ({ $message, $axios, redirect, error: nuxtError }) {
    // $axios.onRequest(config => {
    //     console.log('Making request to ' + config.url)
    // })

    $axios.onError(error => {
        const status = parseInt(error.response && error.response.status)
        if (status === 404) {
            nuxtError({ statusCode: status, message: error.message })
        } else {
            let errors = error.response && error.response.data && error.response.data.errors
            if (Array.isArray(errors)) errors = errors[0]
            let message = '[' + status + '] '
            message += (errors && errors.message) ? errors.message : ((error.response && error.response.statusText) || '')
            if (errors && errors.code) message += ' (' + errors.code + ')'
            $message({ content: message, color: 'error' });
        }
        return Promise.resolve(false);
    })
}
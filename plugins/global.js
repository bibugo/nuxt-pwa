export default ({ app, store }, inject) => {
    inject('message', function ({ content = '', color = 'success' }) {
        $nuxt.$emit('show-snackbar', { content, color })
    });

    inject('confirm', function (msg, opts) {
        let options = {}
        if (msg && msg.constructor === String) {
            Object.assign(options, { message: msg })
            if (opts && opts.constructor === Object) {
                Object.assign(options, opts)
            }
        } else if (msg && msg.constructor === Object) {
            Object.assign(options, msg)
        }

        return new Promise((resolve, reject) => {
            $nuxt.$emit('popup-dialog', options, resolve, reject)
        })
    });

};
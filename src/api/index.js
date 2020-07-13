const head = process.env === 'production' ? '' : 'http://localhost:1234/api';

export default {
    login: head + '/login post'
}
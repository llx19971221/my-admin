const head = process.env.NODE_ENV === 'production' ? 'http://localhost:1234/api' : '/api';

export default {
    login: head + '/login post',
    userControlQueryAll: head + '/userControl/queryAll post'
}
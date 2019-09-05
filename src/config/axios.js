import axios from 'axios'

let API_HOSTS = {
    production: 'https://market.neoin.club/api/v1/',
    develop: 'https://market.beta.neoin.club/api/v1/',
    local: 'http://0.0.0.0:3008/api/v1',
}

// let API_HOST = process.env.NODE_ENV !== 'production' ? 'http://0.0.0.0:3001/api/v1' : 'https://market.neoin.club/api/v1/'
// let API_HOST = 'http://market.neoin.club/api/v1/'
const request = axios.create({
    baseURL: API_HOSTS[process.env.NODE_ENV],
    // timeout: 1000,
    // headers: {'X-Custom-Header': 'foobar'}
});

let NEO_HOSTS = {
    production: 'https://neoin.club/api/v1/',
    develop: 'https://beta.neoin.club/api/v1/',
    local: 'https://beta.neoin.club/api/v1/',
}
const requestNeoin = axios.create({
    baseURL: NEO_HOSTS[process.env.NODE_ENV],
    // timeout: 1000,
    // headers: {'X-Custom-Header': 'foobar'}
});



export { axios, requestNeoin }
export default request
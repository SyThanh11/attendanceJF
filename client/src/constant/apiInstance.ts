import axios, { CreateAxiosDefaults } from 'axios'

export const apiInstance = (config?: CreateAxiosDefaults) => { 
    const api = axios.create(config);
    api.interceptors.request.use((config) => { 
        return {
            ... config,
        }
    })
    return api;
}
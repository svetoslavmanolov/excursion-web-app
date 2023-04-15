import * as request from './requester';

// const baseUrl = process.env.REACT_APP_BASE_URL;
const baseUrl = 'http://localhost:3005';


export const register = (email, username, password) =>
    request.post(`${baseUrl}/auth/register`, { email, username, password });

export const login = (email, password) =>
    request.post(`${baseUrl}/auth/login`, { email, password });

export const logout = (username) =>
    request.get(`${baseUrl}/auth/logout`, { username });
// import { cookieValue } from "../components/Catalog/Catalog";

const request = async (method, url, data) => {
    try {

        let headers = {};
        let buildRequest;

        if (method === 'GET') {
            // buildRequest = fetch(url, { headers, withCredentials: true });
            buildRequest = fetch(url, { headers, credentials: 'include' });
            // buildRequest = fetch(url, { headers });
        } else {
            buildRequest = fetch(url, {
                method,
                credentials: 'include',
                // withCredentials: true,
                headers: {
                    ...headers,
                    'content-type': 'application/json'
                },
                body: JSON.stringify(data)
            });
        }

        const response = await buildRequest;
        
        // if(!response.ok) {
        //     throw Error('Could not fetch the data');
        // }
        const result = await response.json();
        return result;
    } catch (error) {
        console.log(error);
    }
}

export const get = request.bind({}, 'GET');
export const post = request.bind({}, 'POST');
export const patch = request.bind({}, 'PATCH');
export const put = request.bind({}, 'PUT');
export const del = request.bind({}, 'DELETE');

// let headers = {
        //     'cookies': document.cookie.split(';')
        //         .find(row => row.startsWith('user='))
        //         .split('=')[1]
        // }
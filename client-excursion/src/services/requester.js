const request = async (method, url, data) => {
    try {
        let headers = {};
        let buildRequest;

        if (method === 'GET') {
            buildRequest = fetch(url, { headers, credentials: 'include' });
        } else {
            buildRequest = fetch(url, {
                method,
                credentials: 'include',
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

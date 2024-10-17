const fetch = require('node-fetch');

exports.handler = async (event) => {
    const { queryStringParameters } = event;
    const apiUrl = `http://ws.ga-media.fr/services?GA_part=EGNSDGGC&GA_ws=WBJQUCEP&${new URLSearchParams(queryStringParameters)}`;

    try {
        const response = await fetch(apiUrl);
        const data = await response.text();

        return {
            statusCode: response.status,
            body: data,
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: error.message }),
        };
    }
};

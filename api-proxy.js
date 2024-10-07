const fetch = require("node-fetch");

exports.handler = async (event, context) => {
    const url = "http://ws.ga-media.fr/services?" + event.queryStringParameters; // Utilise les paramètres de la requête
    
    try {
        const response = await fetch(url);
        const data = await response.json();
        return {
            statusCode: 200,
            body: JSON.stringify(data),
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: "Erreur lors de l'envoi des données" }),
        };
    }
};

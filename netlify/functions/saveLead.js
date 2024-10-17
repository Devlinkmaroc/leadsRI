const { MongoClient } = require('mongodb');

exports.handler = async (event) => {
    if (event.httpMethod !== 'POST') {
        return {
            statusCode: 405,
            body: JSON.stringify({ message: 'Method not allowed' }),
        };
    }

    const { url, leadData } = JSON.parse(event.body);

    const client = new MongoClient(process.env.MONGODB_URI);
    try {
        await client.connect();
        const database = client.db('leadsDatabase');
        const collection = database.collection('leads');

        const result = await collection.insertOne({ url, ...leadData });

        return {
            statusCode: 200,
            body: JSON.stringify({ message: 'Lead saved successfully', id: result.insertedId }),
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: error.message }),
        };
    } finally {
        await client.close();
    }
};

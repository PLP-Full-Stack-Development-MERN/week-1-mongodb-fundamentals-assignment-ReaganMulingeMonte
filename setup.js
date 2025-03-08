
const { MongoClient } = require('mongodb');
require('dotenv').config();

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

async function run() {
    try {
        await client.connect();
        const database = client.db('library');
        const books = database.collection('books');
        console.log('Connected to MongoDB Atlas and "library" database.');
    } finally {
        await client.close();
    }
}
run().catch(console.dir);
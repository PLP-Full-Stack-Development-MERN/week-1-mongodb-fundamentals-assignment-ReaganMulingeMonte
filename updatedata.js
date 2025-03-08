const { MongoClient } = require('mongodb');
require('dotenv').config();

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

async function run() {
    try {
        await client.connect();
        const database = client.db('library');
        const books = database.collection('books');

        const updateResult = await books.updateOne({ ISBN: "978-0345391803" }, { $set: { publishedYear: 1980 } });
        console.log(`${updateResult.modifiedCount} document updated.`);

        const addRating = await books.updateMany({}, { $set: { rating: 4.5 } });
        console.log(`${addRating.modifiedCount} documents updated with ratings.`);

    } finally {
        await client.close();
    }
}
run().catch(console.dir);
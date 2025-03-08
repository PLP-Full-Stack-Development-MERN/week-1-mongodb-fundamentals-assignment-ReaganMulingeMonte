const { MongoClient } = require('mongodb');
require('dotenv').config();

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

async function run() {
    try {
        await client.connect();
        const database = client.db('library');
        const books = database.collection('books');

        const deleteResult = await books.deleteOne({ ISBN: "978-0451524935" });
        console.log(`${deleteResult.deletedCount} document deleted.`);

        const deleteGenre = await books.deleteMany({ genre: "History" });
        console.log(`${deleteGenre.deletedCount} documents deleted by genre.`);

    } finally {
        await client.close();
    }
}
run().catch(console.dir);
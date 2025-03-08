const { MongoClient } = require('mongodb');
require('dotenv').config();

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

async function run() {
    try {
        await client.connect();
        const database = client.db('library');
        const books = database.collection('books');

        const genreCounts = await books.aggregate([{$group: {_id: "$genre", count: {$sum: 1}}}]).toArray();
        console.log("Books per genre:", genreCounts);

        const averageYear = await books.aggregate([{$group: {_id: null, averageYear: {$avg: "$publishedYear"}}}]).toArray();
        console.log("Average published year:", averageYear);

        const topRated = await books.aggregate([{$sort: {rating: -1}}, {$limit: 1}]).toArray();
        console.log("Top-rated book:", topRated);

    } finally {
        await client.close();
    }
}
run().catch(console.dir);
const { MongoClient } = require('mongodb');
require('dotenv').config();

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

async function run() {
    try {
        await client.connect();
        const database = client.db('ecommerce');
        const users = database.collection('users');
        const products = database.collection('products');
        const orders = database.collection('orders');

        console.log("ecommerce database and collections created");
    } finally {
        await client.close();
    }
}
run().catch(console.dir);
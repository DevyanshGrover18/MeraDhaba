const mongoose = require('mongoose');

async function connectToMongoDB() {
    await mongoose.connect('mongodb://localhost:27017/MeraDhaba')
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));
    const fetchedData= await mongoose.connection.db.collection("foodList")
    const data = await fetchedData.find({}).toArray()

    global.foodItems= data
}

module.exports = connectToMongoDB;

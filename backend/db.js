const mongoose = require('mongoose');

async function connectToMongoDB() {
    await mongoose.connect('mongodb+srv://devyanshgrover348:devogrover18@cluster0.0zltntp.mongodb.net/MeraDhabaa?retryWrites=true&w=majority&appName=Cluster0')
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));
    const fetchedData= await mongoose.connection.db.collection("foodList")
    const data = await fetchedData.find({}).toArray()
    global.foodItems= data
}

module.exports = connectToMongoDB;

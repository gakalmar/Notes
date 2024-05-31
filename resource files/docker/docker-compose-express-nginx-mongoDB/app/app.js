const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const port = process.env.PORT

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log('Connected to MongoDB');
});

// Define a schema and model
const Schema = mongoose.Schema;
const TestSchema = new Schema({
    name: String,
});
const TestModel = mongoose.model('Test', TestSchema);

// Middleware to parse JSON
app.use(express.json());

// Routes
app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.get('/items', async (req, res) => {
    const items = await TestModel.find();
    res.json(items);
});

app.post('/items', async (req, res) => {
    const newItem = new TestModel(req.body);
    await newItem.save();
    res.status(201).json(newItem);
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

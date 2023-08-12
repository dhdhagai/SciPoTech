const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/your-database-name', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Define Data Schema
const dataSchema = new mongoose.Schema({
  title: String,
  type: String,
  ageGroup: String,
  content: String,
  bloodSugarLevels: {
    fasting: Number,
    postMeal: Number
  },
  bloodType: String
});
const Data = mongoose.model('Data', dataSchema);

// Set up Express routes
const PORT = process.env.PORT || 3000;

app.get('/', async (req, res) => {
  try {
    const allData = await Data.find();
    res.json(allData);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.post('/api/data/identify', async (req, res) => {
  const { bloodSugarLevels, bloodType } = req.body;

  try {
    const data = await Data.findOne({ type: bloodType });
    if (!data) {
      res.status(404).json({ message: 'No matching data found for the given blood type' });
      return;
    }

    // Replace this logic with your actual identification process
    const identifiedType = data.type;
    res.json({ identifiedType });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
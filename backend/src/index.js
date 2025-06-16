const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 4000;

// 中间件
app.use(cors());
app.use(express.json());

// 连接 MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/todayeatwhat', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('Could not connect to MongoDB:', err));

// 定义食物选项的 Schema
const foodOptionSchema = new mongoose.Schema({
  name: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

const FoodOption = mongoose.model('FoodOption', foodOptionSchema);

// API 路由
// 获取所有选项
app.get('/api/options', async (req, res) => {
  try {
    const options = await FoodOption.find().select('name');
    res.json(options.map(option => option.name));
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// 添加新选项
app.post('/api/options', async (req, res) => {
  try {
    const { name } = req.body;
    const newOption = new FoodOption({ name });
    await newOption.save();
    res.status(201).json(newOption);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// 删除选项
app.delete('/api/options/:name', async (req, res) => {
  try {
    const { name } = req.params;
    await FoodOption.deleteOne({ name });
    res.status(200).json({ message: 'Option deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// 启动服务器
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
}); 
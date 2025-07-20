const express = require('express');
const mongoose = require('mongoose');
const app = express();
app.use(express.json());

mongoose.connect('mongodb+srv://your-username:your-password@cluster0.mongodb.net/goat-movie-site?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

const contentSchema = new mongoose.Schema({
  type: String,
  poster: String,
  title: String,
  summary: String,
  links: Object
});
const Content = mongoose.model('Content', contentSchema);

app.get('/api/content', async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 10;
    const contents = await Content.find().limit(limit).sort({ _id: -1 });
    res.json(contents);
  } catch (error) {
    res.status(500).json({ message: 'خطا در دریافت محتوا' });
  }
});

app.get('/api/content/:id', async (req, res) => {
  try {
    const content = await Content.findById(req.params.id);
    if (!content) return res.status(404).json({ message: 'محتوا یافت نشد' });
    res.json(content);
  } catch (error) {
    res.status(500).json({ message: 'خطا در دریافت محتوا' });
  }
});

app.post('/api/add-content', async (req, res) => {
  try {
    const { type, poster, title, summary, links } = req.body;
    if (!type || !poster || !title || !summary || !links) {
      return res.status(400).json({ message: 'همه فیلدها الزامی هستند!' });
    }
    const newContent = new Content({ type, poster, title, summary, links });
    await newContent.save();
    res.json({ message: 'محتوا با موفقیت اضافه شد!' });
  } catch (error) {
    console.error('Error adding content:', error);
    res.status(500).json({ message: 'خطا، دوباره تلاش کنید.' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
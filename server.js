const express = require('express');
const mongoose = require('mongoose');
const app = express();

app.use(express.json());
app.use(express.static('public'));

mongoose.connect('mongodb+srv://sitemoviemane:ZBcmX0XQDW9lQVb2@goatdb.qt4i3xr.mongodb.net/?retryWrites=true&w=majority&appName=GOATDB')
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error(err));

const contentSchema = new mongoose.Schema({
  type: String,
  poster: String,
  title: String,
  summary: String,
  links: [{
    season: Number,
    links: {
      '720p': String,
      '1080p': String
    }
  }]
});
const Content = mongoose.model('Content', contentSchema);

app.get('/api/content', async (req, res) => {
  const content = await Content.find();
  res.json(content);
});

app.get('/movie/:id', (req, res) => {
  res.sendFile(__dirname + '/public/movie.html');
});

app.get('/admin', (req, res) => {
  res.sendFile(__dirname + '/public/admin.html');
});

app.post('/api/add-content', async (req, res) => {
  const { type, poster, title, summary, links } = req.body;
  const newContent = new Content({ type, poster, title, summary, links });
  await newContent.save();
  res.json({ message: 'محتوا اضافه شد!' });
});

app.listen(process.env.PORT || 3000, () => console.log('Server running'));
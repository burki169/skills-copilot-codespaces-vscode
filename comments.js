// Create web server
// Create a route for comments
// Create a form for comments
// Create a route for submitting the form
// Create a route for the comments
// Create a route for the comments in JSON format

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const fs = require('fs');

app.use(bodyParser.urlencoded({ extended: false }));

app.get('/comments', (req, res) => {
  fs.readFile('./comments.json', (err, data) => {
    if (err) {
      console.log(err);
      res.send('Error reading comments file');
    } else {
      const comments = JSON.parse(data);
      res.send(comments);
    }
  });
});

app.get('/comments-json', (req, res) => {
  fs.readFile('./comments.json', (err, data) => {
    if (err) {
      console.log(err);
      res.send('Error reading comments file');
    } else {
      const comments = JSON.parse(data);
      res.json(comments);
    }
  });
});

app.post('/comments', (req, res) => {
  fs.readFile('./comments.json', (err, data) => {
    if (err) {
      console.log(err);
      res.send('Error reading comments file');
    } else {
      const comments = JSON.parse(data);
      comments.push(req.body);
      fs.writeFile('./comments.json', JSON.stringify(comments, null, 2), (err) => {
        if (err) {
          console.log(err);
          res.send('Error writing comments file');
        } else {
          res.send('Comment added');
        }
      });
    }
  });
});

app.get('/form', (req, res) => {
  res.send(`
    <form action="/comments" method="POST">
      <input type="text" name="name" placeholder="Name">
      <input type="text" name="message" placeholder="Message">
      <button type="submit">Submit</button>
    </form>
  `);
});

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
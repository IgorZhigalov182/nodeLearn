const http = require('http');
const chalk = require('chalk');
const fs = require('fs/promises');
const path = require('path');
const express = require('express');
const { addNote, getNotes, deleteNote, changeName } = require('./notes.controller');

const port = 3000;
// const basePath = path.join(__dirname, 'pages');
const app = express();
app.use(express.json());

app.set('view engine', 'ejs');
app.set('views', 'pages');

app.use(express.static(path.join(__dirname, 'public')));

app.use(
  express.urlencoded({
    extended: true,
  }),
);

app.get('/', async (req, res) => {
  res.render('index', {
    title: 'Express App',
    notes: await getNotes(),
    created: false,
  });
  // res.sendFile(path.join(basePath, 'index.html'));
});

app.post('/', async (req, res) => {
  await addNote(req.body.title);
  res.render('index', {
    title: 'Express App',
    notes: await getNotes(),
    created: true,
  });

  // res.sendFile(path.join(basePath, 'index.html'));
});

app.delete('/:id', async (req, res) => {
  //   console.log('id', req.params.id);
  deleteNote(req.params.id);
  res.render('index', {
    title: 'Express App',
    notes: await getNotes(),
    created: false,
  });
});

app.put('/:id', async (req, res) => {
  await changeName(req.params.id, req.body.title);
  res.render('index', {
    title: 'Express App',
    notes: await getNotes(),
    created: false,
  });
});

app.listen(port, () => {
  console.log(chalk.green(`Server has been started on port ${port}...`));
});

const fs = require('fs/promises');
const path = require('path');
const chalk = require('chalk');

const notesPath = path.join(__dirname, 'db.json');

async function addNote(title) {
  //   const notes = require('./db.json');
  //   const notes = Buffer.from(buffer).toString('utf-8');
  const notes = await getNotes();

  const note = {
    title,
    id: Date.now().toString(),
  };

  notes.push(note);

  await fs.writeFile(notesPath, JSON.stringify(notes));
  console.log(chalk.bgGreen('Note was added'));
}

async function getNotes() {
  const notes = await fs.readFile(notesPath, { encoding: 'utf-8' });
  return Array.isArray(JSON.parse(notes)) ? JSON.parse(notes) : [];
}

async function printNotes() {
  const notes = await getNotes();
  console.log(chalk.bgBlue('Here is the list of notes:'));
  notes.forEach((note) => {
    console.log(`${chalk.blue(note.title)} - ${chalk.yellow(note.id)}`);
  });
}

async function deleteNote(id) {
  const notes = await getNotes();
  const filteredArray = notes.filter((note) => note.id !== id);
  await fs.writeFile(notesPath, JSON.stringify(filteredArray));

  console.log(notes);
}

async function changeName(id, title) {
  const notes = await getNotes();
  notesArr = notes.map((note) => {
    if (note.id === id) {
      note.title = title;
    }
    return note;
  });
  await fs.writeFile(notesPath, JSON.stringify(notesArr));
}

module.exports = {
  addNote,
  getNotes,
  changeName,
  deleteNote,
};

const yargs = require('yargs');

const { addNote, getNotes, printNotes, deleteNote } = require('./notes.controller');

yargs.command({
  command: 'add',
  describe: 'add new buying note to',
  builder: {
    title: {
      type: 'string',
      describe: 'Buying title',
      demandOption: true,
    },
  },
  async handler({ title }) {
    await addNote(title);
  },
});

yargs.command({
  command: 'list',
  describe: 'print all buying list',
  async handler() {
    printNotes();
  },
});

yargs.command({
  command: 'remove',
  describe: 'delete note by id',
  builder: {
    id: {
      type: 'string',
      describe: 'Buying note id',
      demandOption: true,
    },
  },
  async handler({ id }) {
    await deleteNote(id);
  },
});

yargs.parse();

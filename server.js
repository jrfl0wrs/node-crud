const express = require('express');
const app = express();
const port = 8080;

app.use(express.json());
app.get('/', (req, res) => {
  res.send('CRUD APP RUNNING....');
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
})
let DB = [];

// Create a ENTRY
app.post('/DB', (req, res) => {
  // Logic to add a ENTRY

  const { entry_name, entry_author } = req.body;
  if (!entry_name || !entry_author) {
    return res.status(400).send('Missing entry data...');
  }

  const new_entry = { id: DB.length + 1, entry_name, entry_author };
  DB.push(new_entry);
  res.status(201).send(new_entry);
});

// Get All ENTRYS
app.get('/DB', (req, res) => {
  res.json(DB);
});

// Get a Single ENTRY
app.get('/DB/:id', (req, res) => {
  // Logic to get a single ENTRY

  const entry = DB.find(b => b.id === parseInt(req.params.id));
  if (!entry) {
    return res.status(404).send('Book not found');
  }
  res.json(entry);
});

// Update a ENTRY
app.put('/DB/:id', (req, res) => {
  // Logic to update a ENTRY

  const entry = DB.find(b => b.id === parseInt(req.params.id));
  if (!entry) {
    return res.status(404).send('entry not found');
  }

  const { entry_name, entry_author } = req.body;
  entry.entry_name = entry_name || entry.entry_name;
  entry.entry_author = entry_author || entry.entry_author;

  res.send(entry);
});

// Delete a ENTRY
app.delete('/DB/:id', (req, res) => {
  // Logic to delete a ENTRY

  const entry_index = DB.findIndex(b => b.id === parseInt(req.params.id));
  if (entry_index === -1) {
    return res.status(404).send('entry not found');
  }

  DB.splice(entry_index, 1);
  res.status(204).send();
});
import express from 'express';

const app = express();

app.get('/users', (req, res) => {
  res.json([
    'Diego',
    'Cleiton',
    'RObson',
    'ANa'
  ]);
});

app.listen(3377);
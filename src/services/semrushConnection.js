const express = require('express');
const fetch = require('node-fetch');

const app = express();
const port = 3001;

app.get('/api/semrush', async (req, res) => {
  const { database, keyword } = req.query;
  const apiKey = '';
  const endpoint = `https://api.semrush.com/?type=phrase_these&key=${apiKey}&phrase=${encodeURIComponent(keyword)}&export_columns=Dt,Db,Ph,Nq,Kd&database=${database}`;

  try {
    const response = await fetch(endpoint);
    const data = await response.text();
    res.set('Access-Control-Allow-Origin', '*'); // Permite CORS en el backend
    res.send(data);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al consultar la API de Semrush');
  }
});

app.listen(port, () => {
  console.log(`Servidor proxy corriendo en http://localhost:${port}`);
});

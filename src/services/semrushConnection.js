// Archivo de conexión: semrushConnection.js
const axios = require('axios');

const SEMrushConnection = {
  endpoint: 'https://api.semrush.com/',
  apiKey: 'API_KEY_HERE',

  makeRequest: async (params) => {
    try {
      const response = await axios.get(SEMrushConnection.endpoint, { params });
      if (response.status === 200) {
        return response.data;
      } else {
        throw new Error(`Error: ${response.status}`);
      }
    } catch (error) {
      console.error('Error en la solicitud a SEMrush:', error);
      throw error;
    }
  },
};

// Archivo de funciones: semrushFunctions.js
const SEMrushConnection = require('./semrushConnection');

const getKeywordDataForDatabases = async (keywords, databases) => {
  try {
    for (const keyword of keywords) {
      for (const database of databases) {
        const params = {
          type: 'phrase_this',
          key: SEMrushConnection.apiKey,
          phrase: keyword,
          database: database,
          export_columns: 'Ph,Nq,Cp,Co,Nr',
        };

        const databaseData = await SEMrushConnection.makeRequest(params);
        console.log(`Resultados para la palabra clave "${keyword}" en la base de datos ${database}:`);
        console.log(databaseData);
      }
    }
  } catch (error) {
    console.error('Error al obtener los datos de las palabras clave:', error);
  }
};

// Uso de la función
const keywords = ['seo', 'marketing'];
const databases = ['us', 'uk', 'ca'];
getKeywordDataForDatabases(keywords, databases);
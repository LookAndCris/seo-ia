import fetch from 'node-fetch';

export default async function handler(req, res) {
  // Obtener los parámetros de consulta (database y keyword) desde la solicitud
  const { database, keyword } = req.query;

  // Tu API key de Semrush
  const apiKey = '';

  // Endpoint de la API de Semrush
  const endpoint = `https://api.semrush.com/?type=phrase_these&key=${apiKey}&phrase=${encodeURIComponent(keyword)}&export_columns=Dt,Db,Ph,Nq,Kd&database=${database}`;

  try {
    // Hacer la solicitud a la API de Semrush
    const response = await fetch(endpoint);

    if (!response.ok) {
      throw new Error(`Error en la consulta a Semrush: ${response.statusText}`);
    }

    // Obtener la respuesta como texto
    const data = await response.text();

    // Enviar la respuesta de Semrush de vuelta al cliente
    res.status(200).send(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al consultar la API de Semrush' });
  }
}

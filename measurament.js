const { Client } = require('pg');

// Configura la cadena de conexión a tu base de datos Aurora PostgreSQL
const dbConfig = {
  user: 'nombre-de-usuario',
  host: 'nombre-del-endpoint-de-tu-db',
  database: 'samaydb',
  password: 'tu-contraseña',
  port: 5432,
  ssl: {
    rejectUnauthorized: false // Deshabilita la verificación de certificado SSL en entornos de desarrollo
  }
};

exports.handler = async (event) => {
  try {
    // Parsea el cuerpo del evento como un objeto JSON
    const requestBody = JSON.parse(event.body);

    // Crea un cliente PostgreSQL
    const client = new Client(dbConfig);
    await client.connect();

    // Ejecuta la consulta de inserción
    const result = await client.query(
      `INSERT INTO nombre-de-tu-tabla (ID, name, attribute1, attribute2, attribute3) VALUES ($1, $2, $3, $4, $5)`,
      [
        requestBody.ID,
        requestBody.name,
        requestBody.attribute1,
        requestBody.attribute2,
        requestBody.attribute3
      ]
    );

    // Cierra la conexión con la base de datos
    await client.end();

    // Respuesta exitosa
    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Inserción exitosa' })
    };
  } catch (error) {
    // Manejo de errores
    console.error('Error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Error al realizar la inserción' })
    };
  }
};

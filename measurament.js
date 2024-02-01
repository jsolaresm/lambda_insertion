const AWS = require('aws-sdk');

// Configura la región de AWS y crea un cliente de DynamoDB
AWS.config.update({ region: 'us-east-1 }); // Reemplaza 'tu-region' con la región de tu DynamoDB
const dynamoDB = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event) => {
  try {
    // Parsea el cuerpo del evento como un objeto JSON
    const requestBody = JSON.parse(event.body);

    // Define los atributos para la inserción en la tabla
    const item = {
      ID: requestBody.ID,
      name: requestBody.name,
      attribute1: requestBody.attribute1,
      attribute2: requestBody.attribute2,
      attribute3: requestBody.attribute3
    };

    // Parámetros para la operación de inserción
    const params = {
      TableName: 'nombre-de-tu-tabla', // Reemplaza 'nombre-de-tu-tabla' con el nombre de tu tabla en DynamoDB
      Item: item
    };

    // Realiza la inserción en la tabla
    await dynamoDB.put(params).promise();

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

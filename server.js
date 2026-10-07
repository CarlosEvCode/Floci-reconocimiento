require('dotenv').config()
const express = require('express')
const multer = require('multer')
const path = require('path')

//Cliente que gestiona el servicio AWS
const { RekognitionClient, DetectLabelsCommand } = require('@aws-sdk/client-rekognition')

//OPCIONAL (considerarse cuando se realice pruebas con Floci)
//Respuesta prueba.... (pendiente)

const app = express()
const port = process.env.PORT || 3000

//Iniciar el servicio reconocimiento
const rekognitionClient = new RekognitionClient({
    region: process.env.AWS_REGION || 'us-east-1',
    endpoint: process.env.AWS_ENDPOINT_URL || 'http://localhost:4566',
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID || 'test',
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || 'test'
    }
})

// Configuración de multer para manejar la carga de archivos
const upload = multer({ storage: multer.memoryStorage()})

//Servir archivo html
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.json())

//Ruta para procesar la imagen
//VERBO -> RUTA -> ACCION -> FUNCION ASINCRONA (solicitud, respuesta)
app.post('/api/analizar', upload.single('imagen'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'No se ha proporcionado ninguna imagen' })
        }

        //El buffer de la imagen subida
        const imageBuffer = req.file.buffer

        //Configurar el comando para detectar etiquetas en la imagen
        const params = {
            Image: { Bytes: imageBuffer },
            MaxLabels: 10,
            MinConfidence: 75
        }

        //Instanciar el comando de deteccion
        const command = new DetectLabelsCommand(params)
        const response = await rekognitionClient.send(command)

        //Enviar la respuesta al front como JSON
        res.json({
            success:true,
            labels: response.Labels
        })

    }catch (error) {
        console.error('Error al analizar la imagen:', error)
        res.status(500).json({
            error: 'Error al analizar la imagen',
            details: error.message,
            code: error.code
        })
    }
})

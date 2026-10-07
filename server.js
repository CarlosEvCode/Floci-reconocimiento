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

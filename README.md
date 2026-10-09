# Floci AWS Services Playground

Aplicación web desarrollada en Node.js y Express para la prueba, validación y consumo de servicios de inteligencia artificial de AWS emulados localmente con Floci y simulados mediante mocks del SDK oficial.

## Descripción

El proyecto sirve como un entorno de pruebas interactivo que permite enviar archivos multimedia (imágenes y documentos PDF) a través del AWS SDK v3, procesar las solicitudes en memoria y validar las estructuras de respuesta estándar de AWS sin incurrir en costos de infraestructura cloud.

## Servicios Implementados

### 1. AWS Rekognition
- **Operación**: `DetectLabelsCommand`
- **Tipo de entrada**: Imágenes (JPG, PNG, WebP)
- **Funcionalidad**: Detección y clasificación de objetos, escenas y conceptos visuales con cálculo de porcentaje de confianza.
- **Ruta API**: `POST /api/analizar`

### 2. AWS Textract
- **Operación**: `DetectDocumentTextCommand`
- **Tipo de entrada**: Documentos PDF (límite máximo de 5 MB)
- **Funcionalidad**: Extracción y análisis de texto estructurado en jerarquías de bloques (`PAGE`, `LINE`, `WORD`).
- **Ruta API**: `POST /api/textract`

## Stack Tecnológico

- **Entorno de ejecución**: Node.js
- **Framework Web**: Express 5
- **Gestión de archivos**: Multer (almacenamiento en memoria mediante `Buffer`)
- **SDK de AWS**: AWS SDK v3 (`@aws-sdk/client-rekognition`, `@aws-sdk/client-textract`)
- **Simulación y pruebas**: `aws-sdk-client-mock`
- **Frontend**: HTML5, CSS3 y JavaScript Vanilla con diseño de terminal oscura

## Configuración y Variables de Entorno

Crear un archivo `.env` en la raíz del proyecto con los siguientes valores:

```env
AWS_ACCESS_KEY_ID=test
AWS_SECRET_ACCESS_KEY=test
AWS_REGION=us-east-1
AWS_ENDPOINT_URL=http://localhost:4566
PORT=3000
```

## Instalación y Ejecución

1. Instalar dependencias:
   ```bash
   npm install
   ```

2. Iniciar el servidor:
   ```bash
   node server.js
   ```

3. Abrir en el navegador:
   ```text
   http://localhost:3000
   ```

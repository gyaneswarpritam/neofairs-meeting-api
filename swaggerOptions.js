// swaggerOptions.js
module.exports = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'Your API Documentation',
            version: '1.0.0',
            description: 'API documentation for your application',
        },
        servers: [
            {
                url: 'http://localhost:5000',
                description: 'Development server'
            }
            // Add more servers if needed
        ],
    },
    apis: ['./routes/*.js', './apiDocs.js'],
};

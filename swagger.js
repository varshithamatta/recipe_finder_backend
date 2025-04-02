const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Recipe Finder API",
      version: "1.0.0",
      description: "API documentation for Recipe Finder App",
    },
    servers: [{ url: "https://recipefinderbackend-production-6b07.up.railway.app/" }],
  },
  apis: ["./routes/*.js"], // Specify route files for API documentation
};

const swaggerSpec = swaggerJsdoc(options);

const swaggerDocs = (app) => {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  console.log("Swagger Docs available at https://recipefinderbackend-production-6b07.up.railway.app/api-docs");
};

module.exports = swaggerDocs;

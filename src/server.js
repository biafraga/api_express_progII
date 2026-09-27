const express = require('express');
const usuariosRoutes = require('./routes/usuarios.routes');
const healthRoutes = require('./routes/health.routes');
const authRoutes = require('./routes/auth.routes'); // instância
const logMiddleware = require('./middlewares/log.middleware');
const notFoundMiddleware = require('./middlewares/notFound.middleware');
const errorHandlerMiddleware = require(
 './middlewares/errorHandler.middleware'
);
const enderecosRoutes = require('./routes/enderecos.routes');
const contatosRoutes = require('./routes/contatos.routes');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./docs/swagger');

require('dotenv').config()
const app = express();
const PORT = 3000;
app.use(express.json());
app.use(logMiddleware);
app.use('/health', healthRoutes);
app.use('/api/v1/usuarios', usuariosRoutes);
app.use('/auth', authRoutes); //a aplicação está usando
app.use('/api/v1/enderecos', enderecosRoutes);
app.use('/api/v1/contatos', contatosRoutes);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Middlewares de erro devem ficar SEMPRE no final
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

app.listen(PORT, () => {
 console.log(
 `Servidor executando em http://localhost:${PORT}`
 );
});
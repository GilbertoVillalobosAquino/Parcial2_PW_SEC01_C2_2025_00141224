import express from 'express';
import cuentasRoutes from './routes/api.routes.js';

const app = express();
const PORT = 3130;

app.use(express.json());

app.use('/', cuentasRoutes);

app.listen(PORT, () => {
  console.log(`Servidor activo en http://localhost:${PORT}`);
});
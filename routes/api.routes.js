import { Router } from 'express';
import {
  handleGetCuentas,
  getCuentaById,
  getTotalBalance
} from '../controllers/cuentas.controller.js';

const router = Router();

router.get('/cuentas', handleGetCuentas);
router.get('/cuenta/:id', getCuentaById);
router.get('/cuentasBalance', getTotalBalance)

export default router;
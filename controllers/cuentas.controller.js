import {cuentas} from '../data/cuentas.js';

import express from "express";

const parseBalance = (balanceStr) => {
    const cleanedString = balanceStr.replace(/[$,]/g, '');
    return parseFloat(cleanedString);
};

export const handleGetCuentas = (req, res) => {
    let result = cuentas;

    const { _id, client, gender, isActive } = req.query;

    if (_id) {
        result = result.filter(c => c._id === _id);
    }

    if (client) {
        result = result.filter(c =>
            c.client.toLowerCase().includes(client.toLowerCase())
        );
    }

    if (gender) {
        result = result.filter(c =>
            c.gender.toLowerCase() === gender.toLowerCase()
        );
    }

    if (isActive !== undefined) {
        const isActiveBool = String(isActive).toLowerCase() === 'true';
        result = result.filter(c => c.isActive === isActiveBool);
    }

    if (result.length === 0) {
        return res.json({ finded: false });
    }

    if (result.length === 1) {
        return res.json({ finded: true, account: result[0] });
    }

    return res.json({ finded: true, data: result });
};

export const getCuentaById = (req, res) => {
    const { id } = req.params;
    const cuenta = cuentas.find(c => c._id === id);

    if (cuenta) {
        res.json({
            finded: true,
            account: cuenta
        });
    } else {
        res.status(404).json({
            finded: false
        });
    }
};

export const getTotalBalance = (req, res) => {
    const cuentasActivas = cuentas.filter(c => c.isActive === true);

    if (cuentasActivas.length === 0) {
        return res.json({
            status: false,
            balanceCuenta: 0
        });
    }

    const totalBalance = cuentasActivas.reduce((acumulador, cuenta) => {
        return acumulador + parseBalance(cuenta.balance);
    }, 0);

    res.json({
        status: true,
        balanceCuenta: totalBalance
    });
};


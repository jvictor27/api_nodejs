'use-strict';

const ValidationContract = require('../validators/fluent-validator');
const repositoryOrder = require('../repositories/order-repository');
const guid = require('guid');
const authService = require('../services/auth_service');

exports.get = async(req, res, next) => {
    try {
        const data = await repositoryOrder.get();
        res.status(200).send(data); 
    } catch (e) {
        res.status(500).send({
            message: 'Falha ao processar sua requisição'
        });
    }
}

exports.post = async(req, res, next) => {
    try {
        // Recupera o token
        const token = req.body.token || req.query.token || req.headers['x-access-token'];

        //Decodifica o token
        const data = await authService.decodeToken(token);

        await repositoryOrder
            .create({
                customer: data.id,
                number: guid.raw().substring(0,6),
                items: req.body.items
            });
        res.status(201).send({message: 'Pedido cadastrado com sucesso!'});
    } catch(e) {
        res.status(400).send({
            message: 'Falha ao processar o pedido',
            data: e
        });  
    }                 
};


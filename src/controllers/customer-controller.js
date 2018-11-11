'use-strict';

const ValidationContract = require('../validators/fluent-validator');
const repositoryCustomer = require('../repositories/customer-repository');
const md5 = require('md5');

exports.post = async(req, res, next) => {
    let contract = new ValidationContract();
    contract.hasMinLen(req.body.name, 3, 'O nome deve conter ao menos 3 caracteres.');
    contract.isEmail(req.body.email, 'E-mail inválido.');
    contract.hasMinLen(req.body.password, 6, 'A senha deve conter ao menos 3 caracteres.');

    // Se os dados forem inválidos
    if (!contract.isValid()) {
        res.status(400).send(contract.errors()).end();
        return;
    }

    try {
        await repositoryCustomer.create({
            name: req.body.name,
            email: req.body.email,
            password: md5(req.body.password + global.SALT_KEY)
        });
        res.status(201).send({message: 'Cliente cadastrado com sucesso!'});
    } catch(e) {
        res.status(400).send({
            message: 'Falha ao cadastrar o cliente',
            data: e
        });  
    }                 
};

exports.put = async(req, res, next) => {
    try {
        await repositoryCustomer
            .update(req.body);
        res.status(201).send({
                message: "Cliente atualizado com sucesso!"
        });
    } catch(e) {
        res.status(400).send({
            message: 'Falha ao atualizar cliente',
            data: e
        });
    }           
};

exports.delete = async(req, res, next) => {
    try {
        await repositoryCustomer
        .delete(req.param.id);
        res.status(200).send({
                message: "Cliente removido com sucesso!"
        });
    } catch(e) {
        res.status(400).send({
            message: 'Falha ao remover cliente',
            data: e
        });
    } 
};
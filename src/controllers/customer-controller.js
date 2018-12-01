'use-strict';

const ValidationContract = require('../validators/fluent-validator');
const repositoryCustomer = require('../repositories/customer-repository');
const md5 = require('md5');
const authService = require('../services/auth_service');

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
            password: md5(req.body.password + global.SALT_KEY),
            roles:["user"]
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

exports.authenticate = async(req, res, next) => {
    let contract = new ValidationContract();
    contract.isEmail(req.body.email, 'E-mail inválido.');
    contract.hasMinLen(req.body.password, 6, 'A senha deve conter ao menos 6 caracteres.');

    // Se os dados forem inválidos
    if (!contract.isValid()) {
        res.status(400).send(contract.errors()).end();
        return;
    }

    try {
        const customer = await repositoryCustomer.authenticate({
            email: req.body.email,
            password: md5(req.body.password + global.SALT_KEY)
        });

        if (!customer) {
            res.status(404).send({
                message: 'usuário ou senha inválidos'
            });
            return;
        }

        const token = await authService.generateToken({
            id: customer._id,
            email: customer.email, 
            name: customer.name,
            roles: customer.roles
        });

        res.status(201).send({
            token: token,
            data : {
                email: customer.email,
                name: customer.name
            }
        });
    } catch(e) {
        res.status(400).send({
            message: 'Falha ao autenticar o cliente',
            data: e
        });  
    }                 
};

exports.refreshToken = async(req, res, next) => {
    let contract = new ValidationContract();
    contract.isEmail(req.body.email, 'E-mail inválido.');
    contract.hasMinLen(req.body.password, 6, 'A senha deve conter ao menos 6 caracteres.');

    // Se os dados forem inválidos
    if (!contract.isValid()) {
        res.status(400).send(contract.errors()).end();
        return;
    }

    try {

        // Recupera o token
        const token = req.body.token || req.query.token || req.headers['x-access-token'];
        //Decodifica o token
        const data = await authService.decodeToken(token);  
        const customer = await repositoryCustomer.getById(data.id);

        if (!customer) {
            res.status(404).send({
                message: 'Cliente não encontrado'
            });
            return;
        }

        const tokenData = await authService.generateToken({
            id: customer._id,
            email: customer.email, 
            name: customer.name,
            roles: customer.roles
        });

        res.status(201).send({
            token: token,
            data : {
                email: customer.email,
                name: customer.name
            }
        });
    } catch(e) {
        res.status(400).send({
            message: 'Falha ao autenticar o cliente',
            data: e
        });  
    }                 
};
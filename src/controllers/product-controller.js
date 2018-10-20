'use-strict';

const ValidationContract = require('../validators/fluent-validator');
const repositoryProduct = require('../repositories/product-repository');

exports.get = async(req, res, next) => {
    try {
        const data = await repositoryProduct.get();
        res.status(200).send(data); 
    } catch (e) {
        res.status(500).send({
            message: 'Falha ao processar sua requisição'
        });
    }
}

exports.getBySlug = async(req, res, next) => {
    try {
        const data = await repositoryProduct
            .getBySlug(req.params.slug);
        res.status(200).send(data);
    } catch(e) {
        res.status(400).send({
            message: 'Falha ao buscar produtos',
            data: e
        });
    }  
}

exports.getById = async (req, res, next) => {
    try {
        const data = await repositoryProduct
            .getById(req.params.id)
        res.status(200).send(data);
    } catch(e) {
        res.status(400).send({
            message: 'Falha ao buscar produto(s)',
            data: e
        });
    }
}

exports.getByTag = async(req, res, next) => {
    try {
        const data = await  repositoryProduct
            .getByTag(req.params.tag)
        res.status(200).send(data);
    } catch(e) {
        res.status(400).send({
            message: 'Falha ao buscar produtos',
            data: e
        });
    } 
}

exports.post = async(req, res, next) => {
    let contract = new ValidationContract();
    contract.hasMinLen(req.body.title, 3, 'O título deve conter ao menos 3 caracteres.');
    contract.hasMinLen(req.body.slug, 3, 'O slug deve conter ao menos 3 caracteres.');
    contract.hasMinLen(req.body.description, 3, 'A descrição deve conter ao menos 3 caracteres.');

    // Se os dados forem inválidos
    if (!contract.isValid()) {
        res.status(400).send(contract.errors()).end();
        return;
    }

    try {
        await repositoryProduct
            .create(req.body);
        res.status(201).send({message: 'Produto cadastrado com sucesso!'});
    } catch(e) {
        res.status(400).send({
            message: 'Falha ao cadastrar o produto',
            data: e
        });  
    }                 
};

exports.put = async(req, res, next) => {
    try {
        await repositoryProduct
            .update(req.body);
        res.status(201).send({
                message: "Produto atualizado com sucesso!"
        });
    } catch(e) {
        res.status(400).send({
            message: 'Falha ao atualizar produto',
            data: e
        });
    }           
};

exports.delete = async(req, res, next) => {
    try {
        await repositoryProduct
        .delete(req.param.id);
        res.status(200).send({
                message: "Produto removido com sucesso!"
        });
    } catch(e) {
        res.status(400).send({
            message: 'Falha ao remover produto',
            data: e
        });
    } 
};
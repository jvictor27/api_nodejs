'use-strict';

const validationContract = require('../validators/fluent-validator');
const repositoryProduct = require('../repositories/product-repository');
const config = require('../config');
const AWS = require('aws-sdk');
const fs = require('fs');
const path = require('path');
const mime = require('mime');

// Configurando o AWS
AWS.config.update({
    accessKeyId: config.awsAccessKeyId,
    secretAccessKey: config.awsSecretAccessKey
});

var s3 = new AWS.S3();

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
    let contract = new validationContract();
    contract.hasMinLen(req.body.title, 3, 'O título deve conter ao menos 3 caracteres.');
    contract.hasMinLen(req.body.slug, 3, 'O slug deve conter ao menos 3 caracteres.');
    contract.hasMinLen(req.body.description, 3, 'A descrição deve conter ao menos 3 caracteres.');

    // Se os dados forem inválidos
    if (!contract.isValid()) {
        res.status(400).send(contract.errors()).end();
        return;
    }

    try {
        let mimeType = mime.getType(req.body.image);

        let paramsS3 = {
            Bucket: config.bucketImageName,
            Body: fs.createReadStream(req.body.image),
            Key: "products/"+Date.now()+"_"+path.basename(req.body.image),
            ContentType: mimeType, 
            ACL:  'public-read' 
        }

        let putObjectPromise = await s3.upload(paramsS3).promise();
        let imageLocation = putObjectPromise.Location;

        await repositoryProduct.create({
            title: req.body.title,
            slug: req.body.slug,  
            description: req.body.description,
            price: req.body.price,   
            active: true,
            tags: req.body.tags,
            image: imageLocation 
        });
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
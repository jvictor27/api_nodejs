'use-strict';

const mongoose = require('mongoose');
const Product = mongoose.model('Product');

exports.get = (req, res, next) => {
    Product
        .find({active: true})
        .select("-_id title slug price")
        .then(data => {
            res.status(200).send({
                data
            });
        }).catch(e => {
            res.status(400).send({
                message: 'Falha ao buscar produtos',
                data: e
            });
        });  
}

exports.getBySlug = (req, res, next) => {
    Product
        // .findOne
        .find({
            active: true,
            slug: req.params.slug
        })
        .select("-_id title description price slug tags")
        .then(data => {
            res.status(200).send({
                data
            });
        }).catch(e => {
            res.status(400).send({
                message: 'Falha ao buscar produtos',
                data: e
            });
        });  
}

exports.getById = (req, res, next) => {
    Product
        .findById(req.params.id)
        .then(data => {
            res.status(200).send({
                data
            });
        }).catch(e => {
            res.status(400).send({
                message: 'Falha ao buscar produto(s)',
                data: e
            });
        });  
}

exports.getByTag = (req, res, next) => {
    Product
        // .findOne
        .find({
            active: true,
            tags: req.params.tag
        })
        .select("-_id title description price slug tags")
        .then(data => {
            res.status(200).send({
                data
            });
        }).catch(e => {
            res.status(400).send({
                message: 'Falha ao buscar produtos',
                data: e
            });
        });  
}

exports.post = (req, res, next) => {
    var product = new Product(req.body);
    product.title = req.body.title;
    product.description = req.body.description;
    product
        .save()
        .then(x => {
            res.status(201).send({message: 'Produto cadastrado com sucesso!'});
        }).catch(e => {
            res.status(400).send({
                message: 'Falha ao cadastrar o produto',
                data: e
            });
        });
    // product
    //     .save((err) => {
    //         if(err){
    //             res.status(400).send({
    //                 message:'Falha ao cadastrar o produto.',
    //                 data:err
    //             });
    //         }else{
    //             res.status(201).send({
    //                 message:'Produto cadastrado com sucesso!'
    //             });
    //         }
    //     });       
        
    
};

exports.put = (req, res, next) => {
    const id = req.params.id;
    res.status(200).send({
        id: id,
        item: req.body
    });
};

exports.delete = (req, res, next) => {
    res.status(200).send(req.body);
};
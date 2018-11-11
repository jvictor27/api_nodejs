'use strict';

const mongoose = require('mongoose');
const Product = mongoose.model('Product');

exports.get = async() => {
    const res = await Product
             .find({active: true})
             .select("-_id title slug price");
    return res;
}

exports.getBySlug = async(slug) => {
    const res = await Product
        // .findOne
        .find({
            active: true,
            slug: slug
        })
        .select("-_id title description price slug tags");
    return res;    
}  

exports.getById = async(id) => {
    const res = await Product
        .findById(id);
    return res;    
}  

exports.getByTag = async(tag) => {
    const res = await Product
        // .findOne
        .find({
            active: true,
            tags: tag
        })
        .select("-_id title description price slug tags");
    return res;
} 

exports.create = async(data) => {
    var product = new Product(data);
    await product
            .save();
}

exports.update = async(data) => {
    await Product
        .findByIdAndUpdate(data.id, {
            $set: {
                title: data.title,
                description: data.description,
                price: data.price,
                slug: data.slug
            }
        });
}

exports.delete = async(id) => {
    await Product
        .findOneAndRemove(id);
}
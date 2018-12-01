'use strict';

const mongoose = require('mongoose');
const Customer = mongoose.model('Customer');

exports.create = async(data) => {
    var customer = new Customer(data);
    await customer.save();
}

exports.update = async(data) => {
    await Customer
        .findByIdAndUpdate(data.id, {
            $set: {
                name: data.name,
                email: data.email,
                password: data.password
            }
        });
}

exports.delete = async(id) => {
    await Customer.findOneAndRemove(id);
}

exports.authenticate = async(data) => {
    const res = await Customer.findOne({
        email: data.email,
        password: data.password
    });
    return res; 
}

exports.getById = async(id) => {
    const res = await Customer.findById(id);
    return res; 
}
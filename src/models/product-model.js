'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    // _id -> criado automaicamente
    title: {
        type: String,
        required: true,
        trim: true
    },
    slug: { // Item que vai compor a url do produto - exemplo: Cadeira Gamer = cadeira-gamer
        type: String,
        required: true,
        trim: true,
        index: true,
        unique: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    }, 
    price: {
        type: Number,
        required: true
    },
    active: {
        type: Boolean,
        required: true,
        default: true
    },
    tags: {
        type: String,
        required: true
    },
});

module.exports = mongoose.model('Product', schema);
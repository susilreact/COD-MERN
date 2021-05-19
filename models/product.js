const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;

const productSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            trim: true,
            required: true,
            maxlength: 32,
            text: true,
        },

        description: {
            type: String,
            required: true,
            maxlength: 2000,
            text: true,
        },
        price: {
            type: Number,
            required: true,
            trim: true,
            maxlength: 32,
        },
        category: {
            type: ObjectId,
            ref: 'Category',
            required: true,
        },
        stock: {
            type: Number,
        },
        sold: {
            type: Number,
            default: 0,
        },
        photo: {
            date: Buffer,
            contenttype: String,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model('Product', productSchema);

// controllers/productController.js
const Product = require('../models/Product');
const { successResponse } = require('../utils/sendResponse');
const productSchema = require('../validators/productValidator');
const schemaValidator = require('../validators/schemaValidator');

exports.createProduct = async (req, res) => {
    try {
        const validatedData = schemaValidator(productSchema, req.body);
        if (validatedData.success) {
            const product = await Product.create(validatedData.data);
            const successObj = successResponse('Product Created', product)
            res.status(successObj.status).send(successObj);
        } else {
            res.status(401).json({ message: validatedData.errors });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ message: 'Product entry not found' });
        }
        const successObj = successResponse('Product List', product)
        res.status(successObj.status).send(successObj);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.updateProduct = async (req, res) => {
    try {
        const validatedData = schemaValidator(productSchema, req.body);
        if (validatedData.success) {
            const product = await Product.findByIdAndUpdate(req.params.id, validatedData.data, { new: true });
            if (!product) {
                return res.status(404).json({ message: 'Product entry not found' });
            }
            const successObj = successResponse('Product updated', product)
            res.status(successObj.status).send(successObj);
        } else {
            res.status(401).json({ message: validatedData.errors });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.deleteProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);
        if (!product) {
            return res.status(404).json({ message: 'Product entry not found' });
        }
        res.json({ message: 'Product entry deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

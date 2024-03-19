// controllers/productController.js
const Product = require('../models/Product');
const productSchema = require('../validators/productValidator');
const schemaValidator = require('../validators/schemaValidator');

exports.createProduct = async (req, res) => {
    try {
        const validatedData = schemaValidator(productSchema, req.body);
        const product = await Product.create(validatedData);
        res.status(201).json(product);
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
        res.json(product);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.updateProduct = async (req, res) => {
    try {
        const validatedData = schemaValidator(productSchema, req.body);
        const product = await Product.findByIdAndUpdate(req.params.id, validatedData, { new: true });
        if (!product) {
            return res.status(404).json({ message: 'Product entry not found' });
        }
        res.json(product);
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

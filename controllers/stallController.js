// controllers/stallController.js
const Stall = require('../models/Stall');
const stallSchema = require('../validators/stallValidator');
const schemaValidator = require('../validators/schemaValidator');
const { successResponse } = require('../utils/sendResponse');
const ProductsListModel = require('../models/ProductsList');
const StallVideoListModel = require('../models/StallVideoList');
const GalleryImageListModel = require('../models/GalleryImageList');
const GalleryVideoListModel = require('../models/GalleryVideoList');
const CompanyProfileListModel = require('../models/CompanyProfileList');

exports.createStall = async (req, res) => {
    try {
        const validatedData = schemaValidator(stallSchema, req.body);
        if (validatedData.success) {
            // Create stall
            const stall = await Stall.create(validatedData.data);

            // Create products list
            await ProductsListModel.insertMany(req.body.productsList.map(product => ({
                ...product,
                stall: stall._id
            })));

            // Create company profile list
            await CompanyProfileListModel.insertMany(req.body.companyProfileList.map(profile => ({
                ...profile,
                stall: stall._id
            })));

            // Create gallery image list
            await GalleryImageListModel.insertMany(req.body.galleryImageList.map(image => ({
                ...image,
                stall: stall._id
            })));

            // Create gallery video list
            await GalleryVideoListModel.insertMany(req.body.galleryVideoList.map(video => ({
                title: video.title,
                url: video.link,
                stall: stall._id
            })));

            // Create stall video list
            await StallVideoListModel.insertMany(req.body.stallVideoList.map(video => ({
                title: video.title,
                url: video.link,
                stall: stall._id
            })));

            const successObj = successResponse('Stall Created', stall);
            res.status(successObj.status).send(successObj);
        } else {
            res.status(401).json({ message: validatedData.errors });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.getStallById = async (req, res) => {
    try {
        const stall = await Stall.findById(req.params.id)
            .populate('productsList')
            .populate('companyProfileList')
            .populate('galleryImageList')
            .populate('galleryVideoList')
            .populate('stallVideoList');

        if (!stall) {
            return res.status(404).json({ message: 'Stall entry not found' });
        }

        const successObj = successResponse('Stall List', stall);
        res.status(successObj.status).send(successObj);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


exports.updateStall = async (req, res) => {
    try {
        const validatedData = schemaValidator(stallSchema, req.body);
        if (validatedData.success) {
            // Update stall
            const stall = await Stall.findByIdAndUpdate(req.params.id, validatedData.data, { new: true });
            if (!stall) {
                return res.status(404).json({ message: 'Stall entry not found' });
            }

            // Update products list
            await ProductsListModel.updateMany({ stall: stall._id }, { $set: { stall: stall._id } });

            // Update company profile list
            await CompanyProfileListModel.updateMany({ stall: stall._id }, { $set: { stall: stall._id } });

            // Update gallery image list
            await GalleryImageListModel.updateMany({ stall: stall._id }, { $set: { stall: stall._id } });

            // Update gallery video list
            await GalleryVideoListModel.updateMany({ stall: stall._id }, { $set: { stall: stall._id } });

            // Update stall video list
            await StallVideoListModel.updateMany({ stall: stall._id }, { $set: { stall: stall._id } });

            const successObj = successResponse('Stall updated', stall);
            res.status(successObj.status).send(successObj);
        } else {
            res.status(401).json({ message: validatedData.errors });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};


exports.deleteStall = async (req, res) => {
    try {
        const stall = await Stall.findByIdAndDelete(req.params.id);
        if (!stall) {
            return res.status(404).json({ message: 'Stall entry not found' });
        }

        // Delete associated collections
        await Promise.all([
            ProductsListModel.deleteMany({ stall: stall._id }),
            CompanyProfileListModel.deleteMany({ stall: stall._id }),
            GalleryImageListModel.deleteMany({ stall: stall._id }),
            GalleryVideoListModel.deleteMany({ stall: stall._id }),
            StallVideoListModel.deleteMany({ stall: stall._id })
        ]);

        res.json({ message: 'Stall entry and associated data deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


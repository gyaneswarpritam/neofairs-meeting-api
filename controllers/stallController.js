// controllers/stallController.js
const Stall = require('../models/Stall');
const stallSchema = require('../validators/stallValidator');
const schemaValidator = require('../validators/schemaValidator');
const { successResponse, notFoundResponse } = require('../utils/sendResponse');
const ProductsListModel = require('../models/ProductsList');
const StallVideoListModel = require('../models/StallVideoList');
const GalleryImageListModel = require('../models/GalleryImageList');
const GalleryVideoListModel = require('../models/GalleryVideoList');
const CompanyProfileListModel = require('../models/CompanyProfileList');
const Briefcase = require('../models/Briefcase');

exports.createStall = async (req, res) => {
    try {
        const validatedData = schemaValidator(stallSchema, req.body);
        if (validatedData.success) {
            // Create stall
            const stall = await Stall.create(req.body);

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

exports.getAllStall = async (req, res) => {
    try {
        const stall = await Stall.find({})
            .populate('exhibitor').exec();

        if (!stall) {
            return res.status(404).json({ message: 'Stall entry not found' });
        }

        const successObj = successResponse('Stall List', stall);
        res.status(successObj.status).send(successObj);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getStallById = async (req, res) => {
    try {
        const stall = await Stall.findById(req.params.id)

        if (!stall) {
            const notFoundObj = notFoundResponse('Stall entry not found for this exhibitor');
            res.status(notFoundObj.status).send(notFoundObj);
        } else {
            const productsList = await ProductsListModel.find({ stall: stall._id });
            const companyProfileList = await CompanyProfileListModel.find({ stall: stall._id });
            const galleryImageList = await GalleryImageListModel.find({ stall: stall._id });
            const galleryVideoList = await GalleryVideoListModel.find({ stall: stall._id });
            const stallVideoList = await StallVideoListModel.find({ stall: stall._id });

            const successObj = successResponse('Stall List', { stall, productsList, companyProfileList, galleryImageList, galleryVideoList, stallVideoList });
            res.status(successObj.status).send(successObj);
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getByVisitorByStallById = async (req, res) => {
    try {
        const stallId = req.params.id;
        const visitorId = req.params.visitorId;

        const stall = await Stall.findById(stallId);

        if (!stall) {
            const notFoundObj = notFoundResponse('Stall entry not found for this exhibitor');
            return res.status(notFoundObj.status).send(notFoundObj);
        }

        const productsList = await ProductsListModel.find({ stall: stall._id });
        const companyProfileList = await CompanyProfileListModel.find({ stall: stall._id });
        const galleryImageList = await GalleryImageListModel.find({ stall: stall._id });
        const galleryVideoList = await GalleryVideoListModel.find({ stall: stall._id });
        const stallVideoList = await StallVideoListModel.find({ stall: stall._id });

        // Fetch briefcase items for the stall and visitor
        const briefcaseItems = await Briefcase.find({ stall: stall._id, visitor: visitorId }).select('product');

        // Create a set of product IDs in the briefcase for quick lookup
        const briefcaseProductIds = new Set(briefcaseItems.map(item => item.product.toString()));

        // Add briefcase flag to each product
        const productsWithBriefcaseFlag = productsList.map(product => ({
            ...product.toObject(),
            briefcase: briefcaseProductIds.has(product._id.toString())
        }));

        const successObj = successResponse('Stall List', {
            stall,
            productsList: productsWithBriefcaseFlag,
            companyProfileList,
            galleryImageList,
            galleryVideoList,
            stallVideoList
        });
        res.status(successObj.status).send(successObj);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getStallByHallId = async (req, res) => {
    try {
        const stall = await Stall.find({ hallId: req.params.hallId })

        if (!stall) {
            const notFoundObj = notFoundResponse('Stall entry not found for this exhibitor');
            res.status(notFoundObj.status).send(notFoundObj);
        } else {
            const successObj = successResponse('Stall List', stall);
            res.status(successObj.status).send(successObj);
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getStallByExhibitor = async (req, res) => {
    try {
        const stall = await Stall.findOne({ exhibitor: req.params.exhibitor })

        if (!stall) {
            const notFoundObj = notFoundResponse('Stall entry not found for this exhibitor');
            res.status(notFoundObj.status).send(notFoundObj);
        } else {
            const productsList = await ProductsListModel.find({ stall: stall._id });
            const companyProfileList = await CompanyProfileListModel.find({ stall: stall._id });
            const galleryImageList = await GalleryImageListModel.find({ stall: stall._id });
            const galleryVideoList = await GalleryVideoListModel.find({ stall: stall._id });
            const stallVideoList = await StallVideoListModel.find({ stall: stall._id });

            const successObj = successResponse('Stall List', { stall, productsList, companyProfileList, galleryImageList, galleryVideoList, stallVideoList });
            res.status(successObj.status).send(successObj);
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.updateStall = async (req, res) => {
    try {
        const validatedData = schemaValidator(stallSchema, req.body);
        if (validatedData.success) {
            // Update stall
            const stall = await Stall.findByIdAndUpdate(req.params.id, req.body, { new: true });
            if (!stall) {
                return res.status(404).json({ message: 'Stall entry not found' });
            }

            // Helper function to update or insert items
            const updateOrInsertItems = async (Model, items, stallId) => {
                const operations = items.map(async (item) => {
                    if (item._id) {
                        // Update existing item
                        return Model.findByIdAndUpdate(item._id, item, { new: true });
                    } else {
                        // Insert new item
                        item.stall = stallId; // Set the stall ID for the new item
                        const newItem = new Model(item);
                        return newItem.save();
                    }
                });
                return Promise.all(operations);
            };
            // Update or insert products list
            if (req.body.productsList) {
                await updateOrInsertItems(ProductsListModel, req.body.productsList, stall._id);
            }

            // Update or insert company profile list
            if (req.body.companyProfileList) {
                await updateOrInsertItems(CompanyProfileListModel, req.body.companyProfileList, stall._id);
            }

            // Update or insert gallery image list
            if (req.body.galleryImageList) {
                await updateOrInsertItems(GalleryImageListModel, req.body.galleryImageList, stall._id);
            }

            // Update or insert gallery video list
            if (req.body.galleryVideoList) {
                await updateOrInsertItems(GalleryVideoListModel, req.body.galleryVideoList, stall._id);
            }

            // Update or insert stall video list
            if (req.body.stallVideoList) {
                await updateOrInsertItems(StallVideoListModel, req.body.stallVideoList, stall._id);
            }

            const successObj = successResponse('Stall updated', stall);
            res.status(successObj.status).send(successObj);
        } else {
            res.status(401).json({ message: validatedData.errors });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
exports.updateStallPosition = async (req, res) => {
    try {
        // Update stall
        const stall = await Stall.findByIdAndUpdate(req.params.id, { position: req.body.position }, { new: true });
        if (!stall) {
            return res.status(404).json({ message: 'Stall entry not found' });
        }
        const successObj = successResponse('Stall updated', stall);
        res.status(successObj.status).send(successObj);
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


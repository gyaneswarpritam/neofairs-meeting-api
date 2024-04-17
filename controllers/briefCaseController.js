// controllers/stallController.js
const Briefcase = require('../models/Briefcase');
const { successResponse, notFoundResponse } = require('../utils/sendResponse');

exports.createBriefCase = async (req, res) => {
    try {
        const { stall, visitor, exhibitor, product } = req.body;

        // Check if the combination already exists
        const existingData = await Briefcase.findOne({ stall, visitor, exhibitor, product });

        if (existingData) {
            const successObj = successResponse('Already Added', []);
            return res.status(successObj.status).send(successObj);
        }

        // If not, create new data
        const BriefcaseData = await Briefcase.create(req.body);
        const successObj = successResponse('Stall Created', BriefcaseData);
        res.status(successObj.status).send(successObj);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};


exports.getAllBriefcaseForVisitor = async (req, res) => {
    try {
        const Briefcases = await Briefcase.find({ visitor: req.params.visitorId })
            .populate({
                path: 'exhibitor',
                select: 'firstName lastName companyName email phoneNo' // Select only the fields you need
            })
            .populate({
                path: 'stall',
                select: 'stallName' // Select only the fields you need
            })
            .exec();
        if (!Briefcases || Briefcases.length === 0) {
            return res.status(404).json({ message: 'No visited stalls found for this visitor' });
        }

        // Map the visited stalls to extract required information
        const stallList = Briefcases.map(stall => ({
            exhibitor: stall.exhibitor.firstName + " " + stall.exhibitor.lastName,
            companyName: stall.exhibitor.companyName,
            exhibitorEmail: stall.exhibitor.email,
            exhibitorPhone: stall.exhibitor.phoneNo,
            stallName: stall.stall.stallName,
            updatedAt: stall.updatedAt
        }));

        const successObj = successResponse('Visited Stall List', stallList);
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


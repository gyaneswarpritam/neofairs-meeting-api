// controllers/reviewController.js

const ProductsList = require("../models/ProductsList");
const ProductVisited = require("../models/ProductVisited");
const Review = require("../models/Review");
const Stall = require("../models/Stall");
const { successResponse } = require("../utils/sendResponse");

exports.addReview = async (req, res) => {
    try {
        const { stallId, productListId, visitorId, review } = req.body;
        const reviewData = await Review.findOneAndUpdate(
            { stall: stallId, productList: productListId, visitor: visitorId },
            { stall: stallId, productList: productListId, visitor: visitorId, review },
            { upsert: true, new: true, setDefaultsOnInsert: true }
        );
        res.status(201).json(reviewData);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getAverageReviewsByExhibitorId = async (req, res) => {
    const { exhibitorId } = req.params;

    try {
        // Find the stall associated with the exhibitor
        const stall = await Stall.findOne({ exhibitor: exhibitorId });

        // If no stall is found, return an empty array
        if (!stall) {
            return res.status(200).json([]);
        }

        // Find all product lists associated with the stall
        const productLists = await ProductsList.find({ stall: stall._id });

        // If no product lists found, return an empty array
        if (!productLists || productLists.length === 0) {
            return res.status(200).json([]);
        }

        // For each product list, calculate the average review rating
        const productListsWithAverageReviews = await Promise.all(
            productLists.map(async (productList) => {
                // Find all reviews for the product list
                const reviews = await Review.find({ productList: productList._id });

                // Calculate the average review rating
                const reviewSum = reviews.reduce((sum, review) => sum + review.review, 0);
                const reviewCount = reviews.length;
                const averageReview = reviewCount > 0 ? reviewSum / reviewCount : 0;

                return {
                    ...productList._doc,
                    review: averageReview,
                };
            })
        );


        const successObj = successResponse('Review count', productListsWithAverageReviews)
        res.status(successObj.status).send(successObj);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching products with average reviews', error });
    }
};

exports.getVisitedProductExhibitorId = async (req, res) => {
    const { exhibitorId } = req.params;

    try {
        // Find the stall associated with the exhibitor
        const stall = await Stall.findOne({ exhibitor: exhibitorId });

        // If no stall is found, return an empty array
        if (!stall) {
            return res.status(200).json([]);
        }

        // Find all product lists associated with the stall
        const productLists = await ProductsList.find({ stall: stall._id });

        // If no product lists found, return an empty array
        if (!productLists || productLists.length === 0) {
            return res.status(200).json([]);
        }

        // For each product list, calculate the total visit count
        const productListsWithVisitCounts = await Promise.all(
            productLists.map(async (productList) => {
                // Find all visit entries for the product list
                const visits = await ProductVisited.find({ productList: productList._id });

                // Calculate the total visit count
                const totalVisitCount = visits.reduce((sum, visit) => sum + visit.visitedCount, 0);

                return {
                    ...productList._doc,
                    totalVisitCount,
                };
            })
        );

        const successObj = successResponse('Product visit counts', productListsWithVisitCounts);
        res.status(successObj.status).send(successObj);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching products with visit counts', error });
    }
};
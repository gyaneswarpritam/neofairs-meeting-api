// controllers/likeController.js
const Like = require("../models/Like");
const Review = require("../models/Review");

exports.addLike = async (req, res) => {
    try {
        const { stallId, productListId, visitorId } = req.body;
        const like = await Like.findOneAndUpdate(
            { stall: stallId, productList: productListId, visitor: visitorId },
            { stall: stallId, productList: productListId, visitor: visitorId },
            { upsert: true, new: true, setDefaultsOnInsert: true }
        );
        res.status(201).json(like);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

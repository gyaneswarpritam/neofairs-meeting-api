
const TrackExhibitor = require('../models/TrackExhibitor');
const TrackVisitor = require('../models/TrackVisitor');
const { successResponse } = require('../utils/sendResponse');

exports.createTrackVisitor = async (req, res) => {
    try {
        const trackDetails = await TrackVisitor.create(req.body);
        const successObj = successResponse('Visitor Track Created', trackDetails)
        res.status(successObj.status).send(successObj);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
exports.createTrackExhibitor = async (req, res) => {
    try {
        const trackDetails = await TrackExhibitor.create(req.body);
        const successObj = successResponse('Visitor Track Created', trackDetails)
        res.status(successObj.status).send(successObj);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};


exports.getTrackVisitor = async (req, res) => {
    try {
        const visitedStalls = await TrackVisitor.find({})
            .populate({
                path: 'visitor',
                select: 'firstName lastName companyName email phoneNo' // Select only the fields you need
            })
            .exec();
        // if (!visitedStalls || visitedStalls.length === 0) {
        //     return res.status(404).json({ message: 'No visited stalls found for this visitor' });
        // }

        // // Map the visited stalls to extract required information
        // const stallList = visitedStalls.map(stall => ({
        //     exhibitor: stall.exhibitor.firstName + " " + stall.exhibitor.lastName,
        //     companyName: stall.exhibitor.companyName,
        //     exhibitorEmail: stall.exhibitor.email,
        //     exhibitorPhone: stall.exhibitor.phoneNo,
        //     stallName: stall.stall.stallName,
        //     updatedAt: stall.updatedAt
        // }));

        const successObj = successResponse('Track Visitor List', visitedStalls);
        res.status(successObj.status).send(successObj);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const { successResponse, notFoundResponse } = require('../utils/sendResponse');
const Visitor = require('../models/Visitor');
const Exhibitor = require('../models/Exhibitor');
const VisitedStall = require('../models/VisitedStall');

exports.visitorReport = async (req, res) => {
    try {
        const visitor = await Visitor.find({})

        if (!visitor) {
            return res.status(404).json({ message: 'Visitor entry not found' });
        }

        const successObj = successResponse('Visitor List', visitor);
        res.status(successObj.status).send(successObj);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.exhibitorReport = async (req, res) => {
    try {
        const exhibitors = await Exhibitor.find({});

        if (!exhibitors || exhibitors.length === 0) {
            return res.status(404).json({ message: 'Exhibitor entries not found' });
        }

        const successObj = successResponse('Exhibitor List', exhibitors);
        res.status(successObj.status).send(successObj);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getAllVisitedStall = async (req, res) => {
    try {
        const visitedStalls = await VisitedStall.find()
            .populate({
                path: 'exhibitor',
                select: 'firstName lastName companyName email phoneNo' // Select only the fields you need
            })
            .populate({
                path: 'visitor',
                select: 'firstName lastName companyName email phoneNo' // Select only the fields you need
            })
            .populate({
                path: 'stall',
                select: 'stallName' // Select only the fields you need
            })
            .exec();
        if (!visitedStalls || visitedStalls.length === 0) {
            const successObj = successResponse('No visited stalls found for this visitor', []);
            res.status(successObj.status).send(successObj);
        }

        // Map the visited stalls to extract required information
        const stallList = visitedStalls.map(stall => ({
            exhibitor: stall.exhibitor.firstName + " " + stall.exhibitor.lastName,
            exhibitorCompanyName: stall.exhibitor.companyName,
            exhibitorEmail: stall.exhibitor.email,
            exhibitorPhone: stall.exhibitor.phoneNo,
            visitor: stall.visitor.firstName + " " + stall.visitor.lastName,
            visitorCompanyName: stall.visitor.companyName,
            visitorEmail: stall.visitor.email,
            visitorPhone: stall.visitor.phoneNo,
            stallName: stall.stall.stallName,
            updatedAt: stall.updatedAt
        }));

        const successObj = successResponse('Visited Stall List', stallList);
        res.status(successObj.status).send(successObj);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};




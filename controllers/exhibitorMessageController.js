const Exhibitor = require("../models/Exhibitor");
const ExhibitorMessages = require("../models/ExhibitorMessage");
const Visitor = require("../models/Visitor");
const { successResponse } = require("../utils/sendResponse");

module.exports.getMessages = async (req, res, next) => {
  try {
    const { from, to } = req.body;

    const messages = await ExhibitorMessages.find({
      users: {
        $all: [from, to],
      },
    }).sort({ updatedAt: 1 });

    const projectedMessages = messages.map((msg) => {
      return {
        fromSelf: msg.sender.toString() === from,
        message: msg.message.text,
      };
    });
    res.json(projectedMessages);
  } catch (ex) {
    next(ex);
  }
};

module.exports.getChatUser = async (req, res, next) => {
  const visitorId = req.params.id; // Assuming visitorId is passed as a route parameter

  try {
    // Find messages where the current user (visitor) is either the sender or receiver
    const messages = await ExhibitorMessages.find({
      users: { $in: [visitorId] }
    });
    // Extract unique user IDs from the messages
    const userIds = new Set();
    messages.forEach(message => {
      message.users.forEach(user => {
        if (user !== visitorId) { // Check if the user is not the current visitor
          userIds.add(user); // Add the user ID to the set
        }
      });
    });

    // Fetch user details for the extracted user IDs
    const visitors = await Exhibitor.find({ _id: { $in: Array.from(userIds) } });
    const modifiedExhibitors = visitors.map(exhibitor => ({
      _id: exhibitor._id,
      firstName: exhibitor.firstName,
      lastName: exhibitor.lastName,
      email: exhibitor.email,
      companyName: exhibitor.companyName,
    }));
    const successObj = successResponse('Chat Exhibitor List', modifiedExhibitors);
    res.status(successObj.status).send(successObj);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
};
module.exports.getChatVisitors = async (req, res, next) => {
  const visitorId = req.params.id; // Assuming visitorId is passed as a route parameter

  try {
    // Find messages where the current user (visitor) is either the sender or receiver
    const messages = await ExhibitorMessages.find({
      users: { $in: [visitorId] }
    });
    // Extract unique user IDs from the messages
    const userIds = new Set();
    messages.forEach(message => {
      message.users.forEach(user => {
        if (user !== visitorId) { // Check if the user is not the current visitor
          userIds.add(user); // Add the user ID to the set
        }
      });
    });

    // Fetch user details for the extracted user IDs
    const visitors = await Visitor.find({ _id: { $in: Array.from(userIds) } });
    const modifiedExhibitors = visitors.map(exhibitor => ({
      _id: exhibitor._id,
      firstName: exhibitor.firstName,
      lastName: exhibitor.lastName,
      email: exhibitor.email,
      companyName: exhibitor.companyName,
    }));
    const successObj = successResponse('Chat Visitor List', modifiedExhibitors);
    res.status(successObj.status).send(successObj);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports.checkChatUserExist = async (req, res, next) => {
  try {
    // Check if a message with the same sender and receiver IDs exists
    const existingMessage = await ExhibitorMessages.findOne({
      users: { $all: [req.body.from, req.body.to] }
    });
    if (existingMessage) return res.status(200).json({ status: 1, message: 'Chat already exist' });
    return res.status(200).json({ status: 0, message: 'Chat not exist' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports.addMessage = async (req, res, next) => {
  try {
    const { from, to, message } = req.body;
    const data = await ExhibitorMessages.create({
      message: { text: message },
      users: [from, to],
      sender: from,
    });

    if (data) return res.json({ msg: "Message added successfully." });
    else return res.json({ msg: "Failed to add message to the database" });
  } catch (ex) {
    next(ex);
  }
};

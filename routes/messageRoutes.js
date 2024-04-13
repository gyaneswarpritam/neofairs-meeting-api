const { addMessage, getMessages, getChatUser, checkChatUserExist } = require("../controllers/messageController");
const router = require("express").Router();

router.post("/addmsg/", addMessage);
router.post("/getmsg/", getMessages);
router.get("/getChatUser/:id", getChatUser);
router.post("/checkChatUserExist/", checkChatUserExist);

module.exports = router;

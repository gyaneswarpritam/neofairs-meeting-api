const { addMessage, getMessages, getChatUser, checkChatUserExist, getChatVisitors } = require("../controllers/exhibitorMessageController");
const router = require("express").Router();

router.post("/addmsg/", addMessage);
router.post("/getmsg/", getMessages);
router.get("/getChatUser/:id", getChatUser);
router.get("/getChatVisitors/:id", getChatVisitors);
router.post("/checkChatUserExist/", checkChatUserExist);

module.exports = router;

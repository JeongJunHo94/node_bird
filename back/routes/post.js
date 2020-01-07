const express = require("express");
const { isLoggedIn } = require("./middlewares");
const router = express.Router();

//isAuthenticated가 중복되니 미들웨어로 뺴줄수있다.
//router도 미들웨어이지만 미들웨어에서 미들웨어를 호출 가능
router.post("/images", isLoggedIn, (req, res) => {});

//Post /post 게시물을 작성한다.
router.post("/", isLoggedIn, (req, res) => {});

module.exports = router;

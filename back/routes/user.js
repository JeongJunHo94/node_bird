const express = require("express");
const bcrypt = require("bcrypt");
const passport = require("passport");
const db = require("../models");

const router = express.Router();

//원래 app.post였으나 router이관에 따라 router.post로 변경
//또한 "/user"부분을 없애주어야한다. 왜냐하면 app.use에 이미 'user'가 있다.
router.post("/", async (req, res, next) => {
  try {
    //사람을 저장하면 저장된 결과가 newUser로 나온다.
    //그 결과를 밑의 json으로 응답하는 것.
    const hash = await bcrypt.hash(req.body.password, 10);
    const exUser = await db.User.findOne({
      where: {
        email: req.body.email
      }
    });
    //이미 회원가입되어있으면
    if (exUser) {
      return res.status(403).json({
        errorCode: 1, //원하는대로 번호 커스텀 가능
        message: "이미 존재하는 email주소입니다."
      });
    }
    await db.User.create({
      // const newUser = await db.User.create({
      email: req.body.email,
      password: hash,
      nickname: req.body.nickname
    }); //HTTP STATUS CODE
    //
    //밑의 회원가입과 동일하게 이부분을 복사해왔다.

    //회원가입시 회원검사를 한 후, create로 회원 등록을 하고, 그정보를 그대로 login에 사용
    passport.authenticate("local", (err, user, info) => {
      if (err) {
        console.error(err);
        return next(err);
      }
      if (info) {
        return res.status(401).send(info.reason);
      }
      return req.login(user, async err => {
        if (err) {
          console.error(err);
          return next(err);
        }
        return res.json(user);
      });
    })(req, res, next);
    // return res.status(201).json(newUser); //201은 성공적으로 생성했다, 200은 성공
  } catch (err) {
    console.log(err);
    return next(err);
  }
});

//Heap이라는 곳에 메모리로 존재한다.
//프론트에서 '키'를 보내주면 express-session 미들웨어에서는 그 키를 가지고 찾는다.
//문제는 그 키를 쿠키로 보내주기 때문에, app.use(cookie())를 쓴것. 쿠키를 기반으로 사용자를 찾는다.

//사실 user/login/이다.
router.post("/login", (req, res, next) => {
  //err.user.info 매개변수가 3개인 이유는 local의 LocalStrategy의 에러,성공,실패 done 인자때문
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      console.error(err);
      return next(err);
    }
    if (info) {
      //프론트쪽에서 잘못된 요청이기 떄문에 에러처리가 아닌 401거절
      return res.status(401).send(info.reason);
    }
    //로그인이 성공하면 해당 유저의 정보가 user에 담겨있다.세션에다가 사용자 정보를 저장한다.
    //매개변수를 항상 추적해라. 아래 user는 결국 DB의 exUser로부터 왔다.
    //세션에다가 사용자 정보를 어떻게 저장할 것인가? -> passport index의 serializeUser
    //쿠키이름은 connect.Sid, 프론트쪽에 쿠키를 보내줘야하는 것도 req.login이 대신 해준다.
    return req.login(user, async err => {
      if (err) {
        console.error(err);
        return next(err);
      }
      //쿠키는 header정보를 내려보내주고, body정보는 json(user)를 통해 같이 내려보내준다
      return res.json(user);
    });
  })(req, res, next);
});

//local.js구성에 따라 local쪽으로 기능이 대체됨.
// //이메일과 비밀번호를 받아서 세션을 구성해야함
// req.body.email;
// req.body.password;
// // user[user.id]={};이런식으로 하기도 하지만, 실무에서는 passport모듈을 사용한다.

// //이메일과 패스워드 검사를 먼저 진행, 일치한다? -> 세션에 쿠키와 객체를 저장
// // await db.User.findOne();
// user[cookie] = "유저정보"; //쿠키를 키로 삼아서 유저정보 저장
// //그 뒤에 프론트에 쿠키 내려보내주기 = 이게 바로 로그인이다.
// //과정이 복잡하고 세션도 간단히 만드는게 아니라 패스포트를 사용한다고 보면 된다.

//사용자가 로그인을 해 있어야 로그아웃이 가능하다. 따라서 로그인을 검사 해봐야한다.
router.post("/logout", (req, res) => {
  if (req.isAuthenticated()) {
    req.logout();
    req.session.destroy(); //로그아웃시 세션까지 전부 지우려고 한다. 다른정보도 들어있을수 있기 때문에
    return res.status(200).send("로그아웃 되었습니다.");
  }
});

module.exports = router;

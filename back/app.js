const morgan = require("morgan");
const express = require("express");
const cors = require("cors");
const bcrypt = require("bcrypt");
const passport = require("passport");
const session = require("express-session");
const cookie = require("cookie-parser");

const db = require("./models");
const passwordConfig = require("./passport");
const app = express();

//서버시작할때 app.js가 실행되면서 db.sequelize.sync가 같이 실행됨
//sync괄호 옆의 force:true하면 서버 열때마다 데이터가 초기화된다.
db.sequelize.sync();
// passportConfig();

//서버에서 요청이 오면 기록을 해준다.morgan은 맨 위에 위치할 것.
app.use(morgan("dev"));
//괄호안을 비워두면 모든요청을 허용하는것. 실무에서는 절대 하지않는다.
app.use(cors("http://localhost:3000"));
//이게 있어야만 json으로 온 데이터를 파싱해서 req바디에 넣어준다.
//form을 통해서 전송할때 그 데이터 해석해서 req바디에 넣어준다.
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookie("cookiesecret"));
app.use(
  session({
    resave: false,
    saveUninitialized: false,
    secret: "cookiesecret"
  })
);
//use는 req,res를 조작한다. 얘네를 익스프레스 미들웨어라고 부른다. 사실 get이나 post도 미들웨어라고 한다.
//요청이 들어오면 위에서부터 실행이 된다. 하나씩 훑어서 내려와서 use가 중간에 걸러주기 때문에 미들웨어라고 보면 된다.
app.use(passport.initialize());
app.use(passport.session());

app.get("/", (req, res) => {
  res.send("안녕 123");
});

const user = {
  // 'asdfasdfasdf' : 1,
  // 'asdfasdfsdad' : 2,
  // 'fasdsfdafsdf' : 3
};

app.post("/user", async (req, res, next) => {
  try {
    //사람을 저장하면 저장된 결과가 newUser로 나온다.
    //그 결과를 밑의 json으로 응답하는 것.
    const hash = await bcrypt.hash(req.body.password, 10);
    const exUser = db.User.findOne({
      email: req.body.email
    });
    //이미 회원가입되어있으면
    if (exUser) {
      return res.status(403).json({
        errorCode: 1, //원하는대로 번호 커스텀 가능
        message: "이미 존재하는 email주소입니다."
      });
    }
    const newUser = await db.User.create({
      email: req.body.email,
      password: hash,
      nickname: req.body.nickname
    });
    //HTTP STATUS CODE 한번 확인해볼것.
    return res.status(201).json(newUser); //201은 성공적으로 생성했다, 200은 성공
  } catch (err) {
    console.log(err);
    return next(err);
  }
});

//힙이라는 곳에 메모리로 존재한다.
//프론트에서 '키'를 보내주면 express-session 미들웨어에서는 그 키를 가지고 찾는다.
//문제는 그 키를 쿠키로 보내주기 때문에, app.use(cookie())를 쓴것. 쿠키를 기반으로 사용자를 찾는다.
const user = {};

app.post("/user/login", (req, res) => {
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
});

app.listen(3085, () => {
  console.log(`백엔드 서버 ${3085}번 포트에서 작동중`);
});

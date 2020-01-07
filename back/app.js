const express = require("express");
const cors = require("cors");
// const bcrypt = require("bcrypt");
const passport = require("passport");
const session = require("express-session");
const cookie = require("cookie-parser");
const morgan = require("morgan");

const db = require("./models");
const passportConfig = require("./passport");
const userRouter = require("./routes/user");
const postRouter = require("./routes/post");
const app = express();

//서버시작할때 app.js가 실행되면서 db.sequelize.sync가 같이 실행됨
//sync괄호 옆의 force:true하면 서버 열때마다 데이터가 초기화된다.
db.sequelize.sync();
passportConfig();

//서버에서 요청이 오면 기록을 해준다.morgan은 맨 위에 위치할 것.
app.use(morgan("dev"));
//괄호안을 비워두면 모든요청을 허용하는것. 실무에서는 절대 하지않는다.
app.use(
  cors({
    //주소가 달라서 withCredentials을 썼을때 뜨는 에러때문에 추가
    origin: "http://localhost:3000", //프론트 서버
    //axios에서는 withCredential, cols에서는 credentials
    credentials: true
  })
);
//이게 있어야만 json으로 온 데이터를 파싱해서 req바디에 넣어준다.
//form을 통해서 전송할때 그 데이터 해석해서 req바디에 넣어준다.
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookie("cookiesecret"));
app.use(
  session({
    resave: false,
    saveUninitialized: false,
    secret: "cookiesecret",
    cookie: {
      httpOnly: true,
      secure: false
    }
  })
);
//use는 req,res를 조작한다. 얘네를 익스프레스 미들웨어라고 부른다. 사실 get이나 post도 미들웨어라고 한다.
//요청이 들어오면 위에서부터 실행이 된다. 하나씩 훑어서 내려와서 use가 중간에 걸러주기 때문에 미들웨어라고 보면 된다.
app.use(passport.initialize());
app.use(passport.session());

app.get("/", (req, res) => {
  res.send("안녕 123");
});

app.use("/user", userRouter);
app.use("/post", postRouter);

//routes/user로 app.post(login, logout, local등등) 이관시켰다

app.post("/post", (req, res) => {
  //현재 사용자가 로그인 했는지 안했는지 파악
});

app.listen(3085, () => {
  console.log(`백엔드 서버 ${3085}번 포트에서 작동중`);
});

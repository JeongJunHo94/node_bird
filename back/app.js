const express = require("express");

const app = express();

app.use(express.json()); //이게 있어야만 json으로 온 데이터를 파싱해서 req바디에 넣어준다.
app.use(express.urlencoded({ extended: false })); //form을 통해서 전송할때 그 데이터 해석해서 req바디에 넣어준다.

//use는 req,res를 조작한다. 얘네를 익스프레스 미들웨어라고 부른다. 사실 get이나 post도 미들웨어라고 한다.

app.get("/", (req, res) => {
  res.send("안녕 123");
});

app.post("/user", (req, res) => {
  req.body.email;
  req.body.password;
  req.body.nickname;
});

app.listen(3085, () => {
  console.log(`백엔드 서버 ${3085}번 포트에서 작동중`);
});

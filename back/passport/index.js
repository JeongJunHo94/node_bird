const passport = require("passport");
const local = require("./local");
const db = require("../models");

module.exports = () => {
  passport.serializeUser((user, done) => {
    //facebook처럼 거대한 곳에서 모든 유저정보를 메모리에 저장해놨다간 남아나질 않는다
    //그래서 오로지 사용자의 id값만 저장해놓는다.
    //user(req.user)의 정보가 오면, user.id만 받아서 저장한다.
    return done(null, user.id);
  });
  //메모리를 절약하기위해 id값만 가지고 있던걸 토대로 사용자정보를 복구함
  //로그인후에 모든 요청에 아래가 실행됨. 모든요청마다 사용자정보 복구해서 req.user에 넣어준다.
  passport.deserializeUser(async (id, done) => {
    try {
      const user = await db.User.findeOne({ where: { id } }); //DB접속을 캐싱을 통해서 극복예정
      return done(null, user); //req.user에, req.isAuthenticated() ===true/2가지를 만들어준다
    } catch (err) {
      console.error(err);
      return done(err);
    }
  });
  //실행을 한번 시켜줘야 등록이 될 것이다.
  local();
};

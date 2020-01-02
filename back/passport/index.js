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
  //로그인후에 모든 요청에 아래가 실행됨. deserializeUser가 모든요청마다 사용자정보 복구해서 req.user에 넣어준다.
  passport.deserializeUser(async (id, done) => {
    try {
      const user = await db.User.findOne({ where: { id } }); //DB접속을 캐싱을 통해서 극복예정
      //done 첫번째 자리는 error
      return done(null, user); //모든요청마다 정보복구해서 req.user에 넣어주고, req.isAuthenticated() ===true로 만들어준다
    } catch (err) {
      console.error(err);
      return done(err);
    }
  });
  //실행을 한번 시켜줘야 등록이 될 것이다.
  local();
};

// 로그인 싸이클
// 회원가입 시킨후, 로그인할때는 로컬스트레트리지불러서 검사하고
// 세션에다 사용자정보저장하면서 시리얼라이즈유저하고
// 쿠키심어서 프론트보내고 로그인된 후에는 프론트에서 쿠키받아서
// 검사를 해서 쿠키를 통해서 유저아이디찾아낸후에
// 그 아이디로 사용자정보 복원해서 그 후 포스트를 한다
// req.user나 req.isAuthenticated로 검사를 할 수 있다.

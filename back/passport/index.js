const passport = require("passport");

module.exports = () => {
  passport.serializeUser((user, done) => {
    //facebook처럼 거대한 곳에서 모든 유저정보를 메모리에 저장해놨다간 남아나질 않는다
    //그래서 오로지 사용자의 id값만 저장해놓는다.
    return done(null, user.id);
  });
  passport.deserializeUser(() => {});
};

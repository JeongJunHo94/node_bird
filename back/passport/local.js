const passport = require("passport");
const bcrypt = require("bcrypt");
const { Strategy: LocalStrategy } = require("passport-local");
const db = require("../models");

module.exports = () => {
  passport.use(
    new localStorage(
      {
        //검사가 이루어지며, 아래 email과 password가 있는 자리에는 body에 해당되는 것을 넣어주면 된다.
        usernameField: "email", //req.body.email
        passwordField: "password" // req.body.password
      },
      async (userId, password, done) => {
        try {
          const exUser = await db.User.findOne({ where: { email } });
          if (!exUser) {
            //null:에러 , false : 성공, reason: 실패 .   순서중요함 에러/성공/실패 순
            return done(null, false, { reason: "존재하지 않는 사용자" });
          }
          //password : 사용자가 입력한 비밀번호, exUser.password : DB에 저장되어있는 비밀번호
          //두개를 비교해서 일치하면 result가 true, 불일치하면 result가 false가 된다.
          const result = await bcrypt.compare(password, exUser.password);
          if (result) {
            return done(null, exUser);
          } else {
            return done(null, false, { reason: "비밀번호가 틀립니다." });
          }
        } catch (err) {
          console.error(err);
          return done(err);
        }
      }
    )
  );
};

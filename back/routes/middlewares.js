//중복을 제거하기 위한 라우터 미들웨어
exports.isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    //인수가 있으면 에러처리, 비워져있으면 다음미들웨어로 넘어간다.
    return next();
  }
  return res.status(401).send("로그인이 필요합니다.");
};

exports.isNotLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    return next();
  }
  return res.status(401).send("로그인한 사람은 이용할 수 없습니다.");
};

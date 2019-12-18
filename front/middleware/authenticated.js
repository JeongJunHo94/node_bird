// authenticated.js
// 로그인을 한 사용자인지 검사하는 미들웨어
// 로그인하지 않은 사람은 접근못하고 리다이렉트(되돌려보냄)
// 미들웨어에서 디스패치나 엑시오스등등 무엇을 할지는 작성자 마음
export default function({ store, redirect }) {
  if (!store.state.users.me) {
    redirect("/");
  }
}

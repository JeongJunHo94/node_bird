export const state = () => ({
  me: null
});

export const mutations = {
  setMe(state, payload) {
    state.me = payload;
  }
};

export const actions = {
  signUp({ commit, state }, payload) {
    commit("setMe", payload);
    //서버에 회원가입 요청을 보내고 응답을 받은 후에 회원정보 me를 바꿔준다.
    //여기서 payload는 회원정보가 될 예정
  },
  logIn({ commit }, payload) {
    commit("setMe", payload);
  },
  logOut({ commit }, payload) {
    commit("setMe", null);
  }
};

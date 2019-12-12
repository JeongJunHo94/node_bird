export const state = () => ({
  me: null,
  followerList: [
    { value: 1, name: "팔로워1" },
    { value: 2, name: "팔로워2" },
    { value: 3, name: "팔로워3" }
  ],
  followingList: [
    { value: 1, name: "팔로잉1" },
    { value: 2, name: "팔로잉2" },
    { value: 3, name: "팔로잉3" }
  ]
});

export const mutations = {
  setMe(state, payload) {
    state.me = payload;
  },
  changeNickname(state, payload) {
    state.me.nickname = payload.nickname;
  },
  removeFollow(state, payload) {
    if (payload.type === "following") {
      state.followingList.splice(payload.index, 1);
    } else if (payload.type === "follower") {
      state.followerList.splice(payload.index, 1);
    }
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
  },
  changeNickname({ commit }, payload) {
    commit("changeNickname", payload);
  },
  removeFollow({ commit }, payload) {
    commit("removeFollow", payload);
  }
};

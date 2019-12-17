export const state = () => ({
  me: null,
  followerList: [
    {
      id: 1,
      nickname: "첫번째"
    },
    {
      id: 2,
      nickname: "두번째"
    },
    {
      id: 3,
      nickname: "세번째"
    }
  ],
  followingList: [
    {
      id: 1,
      nickname: "첫번째"
    },
    {
      id: 2,
      nickname: "두번째"
    },
    {
      id: 3,
      nickname: "세번째"
    }
  ]
});

export const mutations = {
  setMe(state, payload) {
    state.me = payload;
  },
  changeNickname(state, payload) {
    state.me.nickname = payload.nickname;
  },
  addFollower(state, payload) {
    state.followerList.push(payload);
  },
  addFollowing(state, payload) {
    state.followingList.push(payload);
  },
  removeFollower(state, payload) {
    const index = state.followerList.findIndex(v => v.id === payload.id);
    state.followerList.splice(index, 1);
  },
  removeFollowing(state, payload) {
    const index = state.followingList.findIndex(v => v.id === payload.id);
    state.followingList.splice(index, 1);
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
  addFollowing({ commit }, payload) {
    commit("addFollowing", payload);
  },
  addFollower({ commit }, payload) {
    commit("addFollower", payload);
  },
  removeFollowing({ commit }, payload) {
    // 비동기 요청
    commit("removeFollowing", payload);
  },
  removeFollower({ commit }, payload) {
    commit("removeFollower", payload);
  }
};

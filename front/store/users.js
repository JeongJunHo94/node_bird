export const state = () => ({
  me: null,
  followerList: [],
  followingList: [],
  hasMoreFollower: true,
  hasMoreFollowing: true
});

const totalFollowers = 8;
const totalFollowings = 6;
const limit = 3;

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
  },
  loadFollowings(state) {
    const diff = totalFollowings - state.followingList.length;
    const fakeUsers = Array(diff > limit ? limit : diff)
      .fill()
      .map(v => ({
        id: Math.random().toString(),
        nickname: Math.floor(Math.random() * 1000)
      }));
    state.followingList = state.followingList.concat(fakeUsers);
    state.hasMoreFollowing = fakeUsers.length === limit;
  },
  loadFollowers(state) {
    const diff = totalFollowers - state.followerList.length;
    const fakeUsers = Array(diff > limit ? limit : diff)
      .fill()
      .map(v => ({
        id: Math.random().toString(),
        nickname: Math.floor(Math.random() * 1000)
      }));
    state.followerList = state.followerList.concat(fakeUsers);
    state.hasMoreFollower = fakeUsers.length === limit;
  }
};

export const actions = {
  signUp({ commit, state }, payload) {
    this.$axios
      .post(
        "http://localhost:3085/user",
        {
          //REST API 그러나 대부분 REST 비스무리한 API, HTTP API
          email: payload.email,
          nickname: payload.nickname,
          password: payload.password
          //위에서 요청을 보내고 그 응답이 밑의 data에 담겨있다.
        },
        {
          //프론트와 백의 주소가 달라서 문제가 생겼을때, 주소가 달라도 쿠키가 저장되게 해준다.
          withCredentials: true
        }
      )
      .then(res => {
        commit("setMe", res.data);
      })
      .catch(err => {
        console.error(err);
      });
    // commit("setMe", payload);
    //서버에 회원가입 요청을 보내고 응답을 받은 후에 회원정보 me를 바꿔준다.
    //여기서 payload는 회원정보가 될 예정
  },
  logIn({ commit }, payload) {
    this.$axios
      .post(
        "http://localhost:3085/user/login",
        {
          //REST API 그러나 대부분 REST 비스무리한 API, HTTP API
          email: payload.email,
          password: payload.password
        },
        {
          //프론트와 백의 주소가 달라서 문제가 생겼을때, 주소가 달라도 쿠키가 저장되게 해준다.
          withCredentials: true
        }
      )
      //비동기여서 then 이나 async await 사용
      .then(res => {
        commit("setMe", res.data);
        //요청이 실패했을 경우도 대비
      })
      .catch(err => {
        console.error(err);
      });
  },
  logOut({ commit }) {
    this.$axios
      .post("http://localhost:3085/user/logout", {}, { withCredentials: true })
      .then(data => {
        commit("setMe", null);
      })
      .catch(err => {
        console.error(err);
      });
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
  // 비동기 요청
  removeFollowing({ commit }, payload) {
    commit("removeFollowing", payload);
  },
  removeFollower({ commit }, payload) {
    commit("removeFollower", payload);
  },
  loadFollowers({ commit, state }, payload) {
    if (state.hasMoreFollower) {
      commit("loadFollowers");
    }
  },
  loadFollowings({ commit, state }, payload) {
    if (state.hasMoreFollowing) {
      commit("loadFollowings");
    }
  }
};

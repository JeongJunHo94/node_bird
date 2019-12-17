export const state = () => ({
  mainPosts: [],
  hasMorePost: true
});

const totalPosts = 51;
const limit = 10;

export const mutations = {
  addMainPost(state, payload) {
    state.mainPosts.unshift(payload);
    console.log(state.mainPosts);
  },
  removeMainPost(state, payload) {
    const index = state.mainPosts.findIndex(v => v.id === payload.id);
    state.mainPosts.splice(index, 1);
  },
  addComment(state, payload) {
    const index = state.mainPosts.findIndex(v => v.id === payload.postId);
    state.mainPosts[index].Comments.unshift(payload);
  },
  loadPosts(state) {
    const diff = totalPosts - state.mainPosts.length; //아직 안불러오고 남은 게시글의 갯수가 나옴
    const fakePosts = Array(diff > limit ? limit : diff)
      .fill()
      .map(v => ({
        id: Math.random().toString(),
        User: {
          id: 1,
          nickname: "test"
        },
        content: `Hello scroll ${Math.random()}`,
        Comments: [],
        Images: []
      }));
    state.mainPosts = state.mainPosts.concat(fakePosts);
    state.hasMorePost = fakePosts.length === limit;
  }
};

export const actions = {
  add({ commit }, payload) {
    //서버에 게시글 등록 요청 보낼걸 고려해서 미리 만듬
    commit("addMainPost", payload);
  },
  remove({ commit }, payload) {
    commit("removeMainPost", payload);
  },
  addComment({ commit }, payload) {
    commit("addComment", payload);
  },
  loadPosts({ commit, state }, payload) {
    if (state.hasMorePost) {
      commit("loadPosts");
    }
  }
};

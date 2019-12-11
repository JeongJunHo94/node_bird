export const state = () => ({
  mainPosts: []
});

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
    const index = state.mainPosts.findIndex(v => v.id === payload.postID);
    state.mainPosts[index].Comments.unshift(payload);
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
  }
};

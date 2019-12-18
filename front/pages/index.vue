<template>
  <v-container>
    <post-form v-if="me" />
    <div>
      <post-card v-for="p in mainPosts" :key="p.id" :post="p" />
    </div>
  </v-container>
</template>

<script>
import PostCard from "~/components/PostCard";
import PostForm from "~/components/PostForm";

export default {
  components: {
    PostCard,
    PostForm
  },
  data() {
    return {
      name: "Nuxt.js"
    };
  },
  computed: {
    me() {
      return this.$store.state.users.me;
    },
    mainPosts() {
      return this.$store.state.posts.mainPosts;
    },
    hasMorePost() {
      return this.$store.state.posts.hasMorePost;
    }
  },
  //fetch는 보통 컴포넌트가 마운트 되기 전에(화면에 보이기 전에) vuex store에 비동기적으로 데이터를 넣을때 사용한다.
  fetch({ store }) {
    store.dispatch("posts/loadPosts");
  },
  //created로 생성시, destroy를 꼭 같이 써줘야 메모리 누수가 일어나지 않는다.
  //그러나 window는 created에서 사용할 수 없다. 하는수없이 mounted사용
  mounted() {
    window.addEventListener("scroll", this.onScroll);
  },
  beforeDestroy() {
    window.removeEventListener("scroll", this.onScroll);
  },
  methods: {
    onScroll() {
      if (
        window.scrollY + document.documentElement.clientHeight >
        document.documentElement.scrollHeight - 300
      ) {
        if (this.hasMorePost) {
          this.$store.dispatch("posts/loadPosts");
        }
      }
    }
  }
};
</script>

<style scoped>
a {
  color: inherit;
  text-decoration: none;
}
</style>

<template>
  <v-app>
    <nav>
      <v-toolbar dark color="green">
        <v-toolbar-title>
          <nuxt-link to="/">NodeBird</nuxt-link>
        </v-toolbar-title>
        <v-spacer />
        <v-toolbar-items>
          <v-form @submit.prevent="onSearchHashtag">
            <div :style="{ display: 'flex', alignItems: 'center' }">
              <v-text-field
                v-model="hashtag"
                label="검색"
                hide-details
                prepend-icon="mdi-magnify"
                :style="{ display: 'flex', alignItems: 'center' }"
              />
            </div>
          </v-form>
          <v-btn
            text
            nuxt
            to="/profile"
            :style="{ display: 'flex', alignItems: 'center' }"
          >
            <div>프로필</div>
          </v-btn>
          <v-btn
            text
            nuxt
            to="/signup"
            :style="{ display: 'flex', alignItems: 'center' }"
          >
            <div>회원가입</div>
          </v-btn>
        </v-toolbar-items>
      </v-toolbar>
    </nav>
    <v-row no-gutters>
      <v-col cols="12" md="4">
        <login-form />
      </v-col>
      <v-col cols="12" md="8">
        <nuxt />
      </v-col>
    </v-row>
  </v-app>
</template>

<script>
// 로그인폼 컴포넌트 연결 LoginForm
// 아래의 ~표시는 루트폴더를 의미한다. 루트폴더와 소스폴더는 다르기 때문이다.
// 상대경로가 많아지면 ../../../ 이런식으로 복잡해짐
import LoginForm from "~/components/LoginForm";

export default {
  components: {
    LoginForm
  },
  data() {
    return {
      hashtag: ""
    };
  },
  methods: {
    onSearchHashtag() {
      //주소만 바꿔줘
      this.$router.push({
        path: `/hashtag/${this.hashtag}`
      });
      //한번 검색하고나면 기존검색내용 삭제
      this.hashtag = "";
    }
  }
};
</script>

<style scoped>
a {
  text-decoration: none;
  color: inherit;
  display: inline-block;
}
.v-application a {
  color: inherit;
}
</style>

<template>
  <v-app>
    <div>
      <v-toolbar dark color="green">
        <v-toobar-title>
          <nuxt-link to="/">
            NodeBird
          </nuxt-link>
        </v-toobar-title>
        <v-spacer> </v-spacer>
        <v-toobar-items>
          <v-text-field prepend-icon="mdi-magnify" : style="{display : 'flex', alignItems: 'center'}" />
          <v-btn text nuxt to="/profile" : style="{display : 'flex', alignItems: 'center'}">
            <div>프로필</div>
          </v-btn>
          <v-btn text nuxt to="/signup" : style="{display : 'flex', alignItems: 'center'}">
            <div>회원가입</div>
          </v-btn>
        </v-toobar-items>
      </v-toolbar>
    </div>
  </v-app>
</template>

<script>
export default {
  data() {
    return {};
  }
  // head() {
  //   return {
  //     title: "Nodebird"
  //   };
  // }
};
</script>

<template>
  <v-form
    ref="form"
    v-model="valid"
    style="position: relative"
    @sbumit.prevent="onSubmitform"
  >
    <v-textare>
      v-model="content" filled label="댓글 달기" :hide-details="hideDetails"
      :success="success" :success-messages="successMessages"
      @input="onChangeTextarea"
    </v-textare>
    <v-btn color="green" dark absolute top right type="submit">삐약</v-btn>
  </v-form>
</template>

<script>
export default {
  props: {
    //props는 최대한 자세하게
    post: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      valid: false,
      content: null,
      success: false,
      hideDetails: true
    };
  },
  computed: {
    me() {
      return this.$store.state.users.me;
    }
  },
  methods: {
    onChangeTextarea(value) {
      if (value.length) {
        this.hideDetails = true;
        this.success = false;
      }
    },
    onSubmitForm() {
      if (this.$refs.form.validate()) {
        this.$store
          .dispatch("posts/addComment", {
            id: Date.now(),
            content: this.content,
            PostId: this.postId,
            User: {
              nickname: this.me.nickname
            }
          })
          .then(() => {
            this.hideDetails = false;
            this.success = true;
            this.content = null;
          })
          .catch(() => {});
      }
    }
  }
};
</script>

<style></style>

<template>
  <v-card style="margin-bottom: 20px">
    <v-container>
      <v-form ref="form" v-model="valid" @submit.prevent="onSubmitForm">
        <v-textarea
          v-model="content"
          outlined
          auto-grow
          clearable
          label="어떤 신기한 일이 있었나요?"
          :hide-details="hideDetails"
          :success-messages="successMessages"
          :success="success"
          @input="onChangeTextarea"
        />
        <v-btn type="submit" color="green" absolute right>글쓰기</v-btn>
        <!-- 이미지 여러개 + 숨김 -->
        <input
          ref="imageInput"
          type="file"
          multiple
          hidden
          @change="onChangeImages"
        />
        <!-- 실제 클릭버튼 말고 나머지는 type을 꼭 button으로 명시해주는게 좋다.
        form안의 버튼들은 form 전체를 보내기 때문에 -->
        <v-btn @click="onClickImageUpload" type="button">이미지 업로드</v-btn>
      </v-form>
    </v-container>
  </v-card>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      valid: false,
      hideDetails: true,
      successMessages: "",
      success: false,
      content: ""
    };
  },
  computed: {
    ...mapState("users", ["me"])
  },
  methods: {
    onChangeTextarea(value) {
      if (value.length) {
        this.hideDetails = true;
        this.success = false;
        this.successMessages = "";
      }
    },
    onSubmitForm() {
      if (this.$refs.form.validate()) {
        this.$store
          .dispatch("posts/add", {
            content: this.content,
            User: {
              nickname: this.me.nickname
            },
            Comments: [],
            Images: [],
            id: Date.now(),
            createdAt: Date.now()
          })
          .then(() => {
            this.hideDetails = false;
            this.success = true;
            this.content = "";
            this.successMessages = "게시물 등록 성공";
          })
          .catch(() => {});
      }
    },
    // 클릭 이벤트를 사용하려면 DOM에 직접 접근해야한다.
    onClickImageUpload() {
      this.$refs.imageInput.click();
    },
    onChangeImages(e) {
      console.log(e.target.files);
      const imageFormData = new FormData();
      [] /
        forEach.call(e.target.files, f => {
          imageFormData.append("image", f); // {image: [file1, file2]}
        });
      this.$store.dispatch("posts/uploadImages", imageFormData);
    }
  }
};
</script>

<style></style>

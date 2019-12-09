<template>
  <div>
    <v-container>
      <v-card>
        <v-container>
          <v-subheader>회원가입</v-subheader>
          <v-form ref="form" v-model="valid" @submit.prevent="onSubmitForm">
            <v-text-field
              v-model="email"
              label="이메일"
              type="email"
              :rules="emailRules"
              required
            />
            <v-text-field
              v-model="password"
              label="비밀번호"
              type="password"
              :rules="passwordRules"
              required
            />
            <v-text-field
              v-model="passwordCheck"
              label="비밀번호확인"
              type="password"
              :rules="passwordCheckRules"
              required
            />
            <v-text-field
              v-model="nickname"
              label="닉네임"
              type="nickname"
              :rules="nicknameRules"
              required
            />
            <v-checkbox
              v-model="terms"
              required
              :rules="[v => !!v || '약관에 동의해야 합니다.']"
              label="쌉소리"
            />
            <v-btn color="green" type="submit" :disabled="!valid"
              >가입하기</v-btn
            >
          </v-form>
        </v-container>
      </v-card>
    </v-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // valid -> 전체회원가입이 유효한지에 대한부분
      // 만약 아래 5개가 전부 유효하면 valid가 true가 되면서 회원가입이 진행되게 된다.
      valid: false,
      email: "",
      password: "",
      passwordCheck: "",
      nickname: "",
      terms: false,
      emailRules: [
        v => !!v || "이메일은 필수입니다.",
        v => /.+@.+/.test(v) || "이메일이 유효하지 않습니다."
      ],
      nicknameRules: [v => !!v || "닉네임은 필수입니다."],
      passwordRules: [v => !!v || "비밀번호는 필수입니다."],
      passwordCheckRules: [
        v => !!v || "비밀번호 확인은 필수입니다.",
        v => v === this.password || "비밀번호가 일치하지 않습니다."
      ]
    };
  },
  methods: {
    onSubmitForm() {
      if (this.$refs.form.validate()) {
        alert("회원가입시도");
      } else {
        alert("폼이 유효하지 않습니다");
      } //여기서 유효하면 valid=true, 유효하지 않으면 valid=false
      console.log(this.valid);
    }
  },
  head() {
    return {
      title: "회원가입"
    };
  }
};
</script>

<style></style>

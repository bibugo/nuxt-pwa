<template>
  <v-card v-bind="$attrs">
    <v-card-text>
      <v-form ref="login">
        <v-text-field
          v-model="login.username"
          name="username"
          prepend-icon="mdi-account"
          :rules="[rules.required, rules.nospaces]"
          label="用户名"
          :error="error"
          @focus="resetError"
        ></v-text-field>
        <v-text-field
          v-model="login.password"
          :append-icon="showpassword ? 'mdi-eye' : 'mdi-eye-off'"
          prepend-icon="mdi-lock"
          name="password"
          :rules="[rules.required, rules.minchars]"
          label="密码"
          :type="showpassword ? 'text' : 'password'"
          @click:append="showpassword = !showpassword"
          :error-messages="error_message"
          @focus="resetError"
        ></v-text-field>
      </v-form>
    </v-card-text>
    <v-card-actions class="justify-space-between mr-2 mb-4">
      <v-btn text color="primary">忘记密码</v-btn>
      <v-btn depressed color="primary" :loading="loading" @click="userLogin"
        >登录</v-btn
      >
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  data: () => ({
    rules: {
      required: (v) => !!v || "不能为空",
      minchars: (v) => v.length >= 3 || "至少3个字符",
      nospaces: (v) => (v || "").indexOf(" ") < 0 || "不能含有空格",
    },
    login: {
      username: "admin",
      password: "password",
    },
    showpassword: false,
    loading: false,
    error: false,
    error_message: "",
  }),
  methods: {
    async userLogin() {
      if (!this.$refs.login.validate()) return;
      this.loading = true;
      this.$auth
        .loginWith("local", {
          data: this.login,
        })
        .then((res) => {
          if (!res) {
            this.error = true;
            this.error_message = "登录错误！";
          } else {
            this.$router.push("/");
          }
        })
        .finally(() => {
          this.loading = false;
        });
    },
    resetError() {
      this.error = false;
      this.error_message = "";
    },
  },
};
</script>
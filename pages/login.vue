<template>
  <v-container fill-height fluid>
    <v-row align="center" justify="center">
      <v-col cols="12" sm="8" md="4">
        <v-card class="elevation-12 pb-2">
          <v-toolbar color="primary" dark flat>
            <v-icon class="mr-1">mdi-login-variant</v-icon>
            <v-toolbar-title>系统登录</v-toolbar-title>
            <v-spacer />
          </v-toolbar>
          <v-card-text>
            <v-form ref="form" v-model="valid">
              <v-text-field
                @focus="resetError"
                v-model="login.username"
                prepend-icon="mdi-account"
                label="用户名"
                name="login"
                type="text"
                :rules="[rules.required, rules.nospaces]"
              />

              <v-text-field
                @focus="resetError"
                v-model="login.password"
                :append-icon="showpassword ? 'mdi-eye' : 'mdi-eye-off'"
                prepend-icon="mdi-lock"
                label="密码"
                name="password"
                :rules="[rules.required, rules.minchars]"
                :type="showpassword ? 'text' : 'password'"
                @click:append="showpassword = !showpassword"
              ></v-text-field>
            </v-form>
          </v-card-text>
          <v-card-text class="py-0 pl-4">
            <div class="error--text" value="error_message">
              {{ error_message }}
            </div>
          </v-card-text>
          <v-card-actions class="px-4">
            <v-spacer />
            <v-btn :loading="loading" color="primary" @click="userLogin"
              >登录</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  layout: "empty",
  auth: false,
  props: {
    source: String,
  },
  data: () => ({
    showpassword: false,
    rules: {
      required: (v) => !!v || "Required.",
      minchars: (v) => v.length >= 3 || "Min 3 characters",
      nospaces: (v) => (v || "").indexOf(" ") < 0 || "No spaces are allowed",
    },
    valid: true,
    login: {
      username: "admin",
      password: "password",
    },
    loading: false,
    error_message: "",
  }),
  methods: {
    async userLogin() {
      if (!this.$refs.form.validate()) return;
      this.loading = true;
      this.$auth
        .loginWith("local", {
          data: this.login,
        })
        .then(() => {
          this.$router.push("/");
        })
        .catch((err) => {
          this.error_message = "错误代码： " + err.response?.status;
        })
        .finally(() => {
          this.loading = false;
        });
    },
    resetError() {
      if (!this.error_message) return;
      this.error_message = "";
    },
  },
};
</script>
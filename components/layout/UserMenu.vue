<template>
  <v-menu
    v-model="user_menu"
    :close-on-content-click="false"
    :nudge-width="260"
    offset-y
  >
    <template v-slot:activator="{ on, attrs }">
      <v-btn icon v-bind="attrs" v-on="on">
        <v-icon>mdi-account</v-icon>
        <!-- <v-avatar size="36">
          <img :src="$auth.user.avatar" />
        </v-avatar> -->
      </v-btn>
    </template>
    <v-card>
      <v-list>
        <v-list-item>
          <v-list-item-avatar>
            <img :src="$auth.user.avatar" />
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title>老嘢闲</v-list-item-title>
            <v-list-item-subtitle>系统管理员</v-list-item-subtitle>
          </v-list-item-content>
          <v-list-item-action>
            <v-btn :class="fav ? 'red--text' : ''" icon @click="fav = !fav">
              <v-icon>mdi-heart</v-icon>
            </v-btn>
          </v-list-item-action>
        </v-list-item>
      </v-list>
      <v-divider></v-divider>
      <v-list class="mb-1">
        <v-list-item class="justify-center">
          <v-btn-toggle dense multiple v-model="ui_toggle">
            <v-btn v-model="toggle_drawer">
              <v-icon>mdi-menu</v-icon>
            </v-btn>
            <v-btn v-model="toggle_clipped">
              <v-icon>mdi-application</v-icon>
            </v-btn>
            <v-btn v-model="toggle_fixed">
              <v-icon>mdi-minus</v-icon>
            </v-btn>
          </v-btn-toggle>
        </v-list-item>
        <v-list-item>
          <v-list-item-action>
            <v-switch v-model="dark_theme"></v-switch>
          </v-list-item-action>
          <v-list-item-title>深色模式</v-list-item-title>
        </v-list-item>
      </v-list>
      <v-card-actions class="mx-4">
        <v-btn
          dense
          outlined
          color="info"
          @click.stop="
            user_menu = false;
            user_profile = true;
          "
        >
          个人资料
        </v-btn>
        <v-spacer></v-spacer>
        <v-btn dense outlined color="error" @click="logout"> 退出系统 </v-btn>
      </v-card-actions>
      <v-card-actions class="justify-center"> </v-card-actions>
    </v-card>
    <v-dialog persistent v-model="user_profile" max-width="600px">
      <v-card>
        <v-card-title>
          <span class="headline">个人资料</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row class="fill-height">
              <v-col align-self="start" class="d-flex flex-column align-center">
                <v-hover>
                  <template v-slot:default="{ hover }">
                    <v-avatar color="grey" size="164" tile>
                      <v-img
                        :src="!!avatar_url ? avatar_url : $auth.user.avatar"
                      >
                      </v-img>
                      <v-fade-transition>
                        <v-overlay v-if="hover" absolute>
                          <v-btn icon @click="launchAvatarPicker"
                            ><v-icon>mdi-camera</v-icon></v-btn
                          >
                        </v-overlay>
                      </v-fade-transition>
                    </v-avatar>
                  </template>
                </v-hover>
                <v-btn
                  v-if="!avatar_saved"
                  icon
                  color="blue-grey"
                  class="white--text"
                  @click="saveAvatar"
                >
                  <v-icon>mdi-content-save</v-icon>
                </v-btn>
                <input
                  hidden
                  type="file"
                  ref="inputAvatar"
                  name="avatar_file"
                  @change="onAvatarChange($event)"
                />
              </v-col>
              <v-col cols="1" class="pa-0">
                <v-divider vertical></v-divider>
              </v-col>
              <v-col class="py-0">
                <v-text-field
                  v-model="userData.phone"
                  dense
                  label="电话号码"
                ></v-text-field>
                <v-text-field
                  v-model="userData.email"
                  dense
                  label="电子邮箱"
                ></v-text-field>
                <v-subheader class="px-0">修改密码</v-subheader>
                <v-text-field
                  v-model="userData.password"
                  dense
                  label="新密码"
                  type="password"
                ></v-text-field>
                <v-text-field
                  v-model="userData.passwordconfirm"
                  dense
                  label="确认密码"
                  type="password"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click="saveProfile"> 保存 </v-btn>
          <v-btn color="secondary" text @click="user_profile = false">
            退出
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-menu>
</template>

<script>
export default {
  props: ["drawer", "clipped", "fixed", "preferences"],
  data: () => ({
    user_menu: false,
    user_profile: false,
    avatar_url: "",
    max_size: 100,
    avatar_saved: true,
    avatarData: null,
    userData: {
      phone: "",
      email: "",
      password: "",
      passwordconfirm: "",
    },
  }),
  mounted() {
    this.userData.phone = this.$auth.user.phone;
    this.userData.email = this.$auth.user.email;
  },
  watch: {
    user_profile: function (val) {
      if (val === false) {
        this.avatar_url = "";
        this.avatar_saved = true;
        this.$refs.inputAvatar.value = "";
      }
    },
  },
  computed: {
    dark_theme: {
      get: function () {
        return this.preferences.dark_theme;
      },
      set: function (val) {
        const obj = Object.assign({}, this.preferences, {
          dark_theme: val,
        });
        this.$emit("update:preferences", obj);
        this.$vuetify.theme.dark = val;
      },
    },
    fav: {
      get: function () {
        return this.preferences.fav;
      },
      set: function (val) {
        const obj = Object.assign({}, this.preferences, { fav: val });
        this.$emit("update:preferences", obj);
      },
    },
    ui_toggle: {
      get: function () {
        const arr = [];
        this.drawer && arr.push(0);
        this.clipped && arr.push(1);
        this.fixed && arr.push(2);
        return arr;
      },
      set: function () {},
    },
    toggle_drawer: {
      get: function () {
        return this.drawer;
      },
      set: function () {
        this.$emit("update:drawer", !this.drawer);
      },
    },
    toggle_clipped: {
      get: function () {
        return this.clipped;
      },
      set: function () {
        this.$emit("update:clipped", !this.clipped);
      },
    },
    toggle_fixed: {
      get: function () {
        return this.fixed;
      },
      set: function () {
        this.$emit("update:fixed", !this.fixed);
      },
    },
  },
  methods: {
    launchAvatarPicker() {
      this.$refs.inputAvatar.click();
    },
    onAvatarChange(e) {
      const { max_size } = this;
      if (e.target.files.length > 0) {
        let imageFile = e.target.files[0];
        let size = imageFile.size / max_size / 1024;
        if (!imageFile.type.match("image.*")) {
          this.$message({
            content: "Please choose an image file",
            color: "error",
          });
        } else if (size > 1) {
          this.$message({
            content: "Your file is too big! Please select an image under 1MB",
            color: "error",
          });
        } else {
          this.avatarData = new FormData();
          let imageURL = URL.createObjectURL(imageFile);
          this.avatar_url = imageURL;
          this.avatarData.append(e.target.name, imageFile);
          this.avatar_saved = false;
        }
      }
    },
    async saveAvatar() {
      const avatar = await this.$axios.post(
        "/api/user/avatar",
        this.avatarData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (avatar.error) return;
      this.$message({
        content: "avatar uploaded!",
        color: "success",
      });
      this.avatar_saved = true;
      this.$auth.setUser(
        Object.assign({}, this.$auth.user, { avatar: avatar.data })
      );
    },
    async saveProfile() {
      const user = await this.$axios.patch("/api/user", this.userData);
      if (user.error) return;
      this.$auth.setUser(user.data.user);
      this.$message({
        content: "save!",
        color: "success",
      });
    },
    logout() {
      this.$confirm("确定要退出系统吗?").then(async (result) => {
        if (!result) return;
        await this.$auth.logout();
        this.$auth.redirect("login");
      });
    },
  },
};
</script>
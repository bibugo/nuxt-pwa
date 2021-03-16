<template>
  <v-menu
    v-model="user_menu"
    :close-on-content-click="false"
    :nudge-width="200"
    offset-y
  >
    <template v-slot:activator="{ on, attrs }">
      <v-btn icon v-bind="attrs" v-on="on">
        <v-icon>mdi-account</v-icon>
      </v-btn>
    </template>
    <v-card>
      <v-list>
        <v-list-item>
          <v-list-item-avatar>
            <img :src="$auth.user.avatar" />
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title>John Leider</v-list-item-title>
            <v-list-item-subtitle>Founder of Vuetify</v-list-item-subtitle>
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
            <v-switch v-model="do_not_disturb" color="error"></v-switch>
          </v-list-item-action>
          <v-list-item-title>Do Not Disturb</v-list-item-title>
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
              <v-col align-self="start" class="text-center">
                <v-hover v-slot="{ hover }">
                  <v-avatar
                    class="profile"
                    color="grey"
                    size="164"
                    tile
                    @click="launchAvatarPicker()"
                    :class="{ 'on-hover': hover }"
                  >
                    <v-img :src="!!avatar_url ? avatar_url : $auth.user.avatar">
                      <div
                        v-if="hover"
                        class="d-flex flex-grow-1 fill-height align-center justify-center"
                      >
                        <v-sheet rounded color="grey lighten-1" class="px-1"
                          >点击选择头像</v-sheet
                        >
                      </div>
                    </v-img>
                  </v-avatar>
                </v-hover>
                <input
                  type="file"
                  ref="inputAvatar"
                  name="avatar_file"
                  @change="
                    onAvatarChange($event.target.name, $event.target.files)
                  "
                  style="display: none"
                />
                <v-btn
                  v-if="!avatar_saved"
                  small
                  rounded
                  elevation="0"
                  color="blue-grey"
                  class="ma-2 white--text"
                  @click="saveAvatar"
                >
                  上传头像
                  <v-icon right dark> mdi-cloud-upload </v-icon>
                </v-btn>
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
                <small>留空不修改密码</small>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="saveProfile"> 保存 </v-btn>
          <v-btn color="blue darken-1" text @click="user_profile = false">
            关闭
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
    max_size: 1024,
    avatar_saved: true,
    formData: null,
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
  computed: {
    do_not_disturb: {
      get: function () {
        return this.preferences.do_not_disturb;
      },
      set: function (val) {
        const obj = Object.assign({}, this.preferences, {
          do_not_disturb: val,
        });
        this.$emit("update:preferences", obj);
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
    onAvatarChange(fieldName, file) {
      const { max_size } = this;
      let imageFile = file[0];
      if (file.length > 0) {
        let size = imageFile.size / max_size / max_size;
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
          this.formData = new FormData();
          let imageURL = URL.createObjectURL(imageFile);
          this.avatar_url = imageURL;
          this.formData.append(fieldName, imageFile);
          this.avatar_saved = false;
        }
      }
    },
    async saveAvatar() {
      const avatar = await this.$axios.post("/api/user/avatar", this.formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      this.avatar_saved = true;
      this.$auth.user.avatar = avatar["data"];
    },
    async saveProfile() {
      const user = await this.$axios.patch("/api/user", this.userData);
      if (!user) return;
      this.$auth.setUser(user);
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

<style scoped>
.v-avatar.on-hover {
  opacity: 0.6;
}
</style>
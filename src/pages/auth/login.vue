<template>
  <f7-page class="font" no-hairlines-md name="signin">
    <!-- <div class="langchange">
        <f7-row>
          <f7-col></f7-col>
          <f7-col></f7-col>
          <f7-col></f7-col>
          <f7-col></f7-col>
          <f7-col></f7-col>
          <f7-col></f7-col>
          <f7-col><select name="lang" id="">
          <option value="EN" >EN</option>
          <option value="LA">LA</option>
        </select></f7-col>
        </f7-row>
      </div> -->

    <div class="wrapper">
      <img class="image--cover" src="../../assets/logo_avatar.png" alt="" />
    </div>

    <f7-login-screen-title>ເຂົ້າສູ່ລະບົບ</f7-login-screen-title>

    <f7-block no-hairlines>
      <f7-list>
        <f7-list-input
          floating-label
          :value="user.username"
          @input="user.username = $event.target.value"
          label="ຊື່ຜູ້ໃຊ້"
          type="text"
          outline
          clear-button
        >
          <!-- :value="user.username"
            @input="user.username = $event.target.value" -->
        </f7-list-input>
        <f7-list-input
          floating-label
          outline
          :value="user.password"
          @input="user.password = $event.target.value"
          label="ລະຫັດຜ່ານ"
          type="password"
          clear-button
        >
          <!-- :append-icon="value ? 'mdi-eye' : 'mdi-eye-off'"
            @click:append="() => (value = !value)" -->
        </f7-list-input>
        <!-- <div class="text_pass">
            <f7-link>Forget Password?</f7-link>
          </div> -->
      </f7-list>
    </f7-block>
    <f7-block no-hairlines>
      <f7-block class="text-align-center">
        <f7-list>
          <f7-button
            style="height: 46px"
            outline
            class="btn-login bg-color-primary text-color-white"
            @click="login()"
            >ເຂົ້າສູ່ລະບົບ</f7-button
          >
          <f7-list-item divider style="height: 10px"></f7-list-item>
          <!-- <f7-button outline @click="login()" class="btn-login" round>Login</f7-button> -->

          <f7-button
            outline
            href="/signup/"
            class="btn-signup button"
            style="height: 46px"
            >ສະໝັກຜູ້ໃຊ້</f7-button
          >
        </f7-list>
      </f7-block>
    </f7-block>
  </f7-page>
</template>

<script>
import { http } from "../../http";
import LocalStorageService from "../../js/script/ServiceLocalStorage";
//import { f7ready } from "framework7-vue";
// import { f7 } from "framework7-vue";
const localStorageService = LocalStorageService.getService();
export default {
  props: {
    f7router: Object,
  },
  data() {
    return {
      value: "",
      user: {
        username: "santi",
        password: "s96616118",
      },
    };
  },
  methods: {
    login() {
      var _this = this;
      // console.log(this);

      //  _this.$f7router.navigate('/ProjectView/');
      http
        .post("/api/login", {
          username: this.user.username,
          password: this.user.password,
        })
        .then(async (Response) => {
          const has = await Response.data;
          if (Response.status === 200) {
            const msg = await has.STT;
            this.msg = msg;
            this.sheet = true;
            // console.log("have sothing");
          }
          if (Response.status === 201) {
            var _seft = _this;
            const token = await Response.data.token;
            localStorageService.setToken(Response.data);

            await localStorage.setItem(
              "info-user",
              JSON.stringify(Response.data.results[0])
            );
            await localStorage.setItem(
              "ispa",
              Response.data.results[0].isSuperUser
            );
            // await store.commit("AUTH_SUCCESS", token);
            // await store.commit("ISPA", Response.data.results[0].isSuperUser);
            this.f7router.navigate("/projectView/");
          }
        })
        .catch((err) => {
          localStorageService.clearToken();
          return err;
        });
    },
  },
};
</script>

<style scoped>
.font {
  font-family: "noto sans lao";
  font-size: 100pt;
}

.wrapper {
  text-align: center;
}

.image--cover {
  width: 180px;
  height: 180px;
  border-radius: 50%;
  margin: 20px;
  object-fit: cover;
  object-position: center;
}
.btn-login {
  width: 100%;
}
.text_pass {
  font-weight: 5px;
  text-align: right;
}
.langchange {
  text-align: center;
  align-items: right;
  position: relative;
  align-self: right;
  margin: 5px 5px;
  margin-top: 10px;
  object-position: right;
}
.button .ripple-wave {
  background-color: #f6c851;
}
</style>

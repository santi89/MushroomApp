<template>
  <f7-page name="signup" class="font">
    <f7-navbar title="ລົງຊື່ເຂົ້າໃຊ້" back-link="back"></f7-navbar>
    <f7-block>
      <f7-list no-hairlines-md>
        <f7-list-input
        :rules="rulesUsername"
          required
          outline
          floating-label
          :value="user.firstname"
          @input="user.firstname = $event.target.value"
          label="ຊື່"
          type="text"
          clear-button
          >
        </f7-list-input>
        <f7-list-input
          floating-label
          :value="user.lastname"
          @input="user.lastname = $event.target.value"
          label="ນາມສະກຸນ"
          type="text"
          outline
          clear-button
          >
        </f7-list-input>
        <f7-list-input
          floating-label
          :value="user.username"
          @input="user.username = $event.target.value"
          label="ຊື່ຜູ້ໃຊ້"
          type="text"
          outline
          clear-button
          >
        </f7-list-input>

        <f7-list-input
          :rules="rulesPass"
          floating-label
          :value="user.password"
          @input="user.password = $event.target.value"
          label="ລະຫັດຜ່ານ"
          type="password"
          outline
          required
          clear-button
        >
        </f7-list-input>
        <f7-list-input
          floating-label
          :value="user.email"
          @input="user.email = $event.target.value"
          label="ອີເມວ"
          type="email"
          outline
          required
          clear-button
        >
        </f7-list-input>
        <f7-list-input
          floating-label
          :value="user.phone"
          @input="user.phone = $event.target.value"
          label="ເບີໂທ"
          type="text"
          outline
          required
          clear-button
          validate
          pattern="[0-9]*"
          data-error-message="Only numbers please!"
        >
        </f7-list-input>

        <f7-block>
          <f7-button outline round @click="clear_text()">ລົງຊື່ເຂົ້າໃຊ້</f7-button>
        </f7-block>
      </f7-list>
    </f7-block>

    <!-- <input
        type="file"
        ref="file"
        style="display: none"
        @change="onFilePicked"
      /> -->
  </f7-page>
</template>
<script>
import { http } from "../../http"; 
import {f7} from "framework7-vue";
export default {
  props: {
    f7router: Object,
  },
  data() {
    return {
      dep: [],
      user: {
        firstname: "",
        lastname: "",
        username: "",
        password: "",
        status: "anyPerson",
        department: "",
        email: "",
        phone: "",
      },
      rulesUsername: [
        (value) => !!value || "Enter Username",
        (value) => (value && value.length >= 3) || "Min 3 characters",
      ],
      rulesPass: [
        (value) => !!value || "Enter Password",
        (value) => (value && value.length >= 6) || "Min 6 characters ",
      ],
    };
  },
  created() {
    this.fecth_dep();
  },
  methods: {
    fecth_dep() {
      http
        .get("/api/dep/sig")
        .then((Response) => {
          this.dep = Response;
        })
        .catch((err) => {
          return err;
        });
    },
    signup() {
      http
        .post("/api/signup", {
          firstname: this.user.firstname,
          lastname: this.user.lastname,
          username: this.user.username,
          password: this.user.password,
          status: this.user.status,
          department: this.dep[0],
          email: this.user.email,
          phone: this.user.phone,
        })
        .then((Response) => {
          if (Response.status === 200) {
            const msg = Response.data.STT;
            this.msg = msg;
          } else if (
            Response.data.STT === "PHONE NUMBER HAS USED" ||
            Response.data.STT === "EMAIL HAS USED" ||
            Response.data.STT === "USERNAME HAS USED"
          ) {
            const msg = Response.data.STT;
            this.msg = msg;
            f7.dialog.alert(msg,"ແຈ້ງເຕືອນ");
          } else if (Response.data.STT === "DONE") {
            this.f7router.navigate("/login/");
          }
        })
        .catch(() => {});
    },
    clear_text() {
      f7.dialog.alert("msg","ແຈ້ງເຕືອນ");
    },
  },
};
</script>

<style scoped>
.wrapper {
  text-align: center;
}
.log-switch {
  text-align: center;
}

.image--cover {
  width: 150px;
  height: 150px;
  border-radius: 50%;
  margin: 10px;
  object-fit: cover;
  object-position: center;
}
</style>

<template>
  <f7-page class="font">
    
      <f7-navbar back-link="back">
        <f7-nav-title>ແກ້ໄຂໂປຣໄຟລ໌</f7-nav-title>
        <f7-nav-right>
          <f7-link @click="updateuser">ບັນທຶກ</f7-link>
        </f7-nav-right>
      </f7-navbar>
      <f7-block>
        <f7-list inline-labels>
          <f7-list-input
            required
            :value="firstname"
            @input="firstname = $event.target.value"
            label="ຊື່"
            type="text"
            clear-button
            outline
            validate
          >
          </f7-list-input>
          <f7-list-input
            :value="lastname"
            @input="lastname = $event.target.value"
            label="ນາມສະກຸນ"
            type="text"
            clear-button
            outline
          >
          </f7-list-input>
          <f7-list-input
            :value="username"
            @input="username = $event.target.value"
            label="ຊື່ຜູ້ໃຊ້"
            type="text"
            outline
            required
            clear-button
          >
          </f7-list-input>
          <f7-list-input
            :value="email"
            @input="email = $event.target.value"
            label="ອີເມວ"
            type="email"
            required
            outline
            clear-button
          >
          </f7-list-input>
          <f7-list-input
            :value="phone"
            @input="phone = $event.target.value"
            label="ເບີໂທ"
            type="text"
            outline
            required
            clear-button
          >
          </f7-list-input>
        </f7-list>
      </f7-block>
      <!-- <f7-block>
          <f7-button @click="update()" outline strong>Update</f7-button>
        </f7-block> -->
    
  </f7-page>
</template>
<script>
import { http } from "../../http";
import { f7 } from "framework7-vue";
import get_users from "../../js/script/get/get_users";

export default {
  props: {
    f7router: Object,
  },
  data() {
    return {
      dep: [],
      firstname: "",
      lastname: "",
      username: "",
      password: "",
      email: "",
      phone: "",
      department: "",
    };
  },
  methods: {
    updateuser: function () {
      const user = JSON.parse(localStorage.getItem("info-user"));
      const data = {
        user_id: user.user_id,
        username: this.username,
        email: this.email,
        firstname: this.firstname,
        lastname: this.lastname,
        dep_name: this.department,
        status: this.status,
        phone: this.phone,
        isSuperUser: user.isSuperUser,
        stt: 1,
      };

      console.log("dd" + this.username + "J" + this.lastName);
      f7.dialog.confirm("ຕ້ອງການແກ້ໄຂກົດ OK ", "ຢືນຢັນ", () => {
        http
          .put("/api/users", data)
          .then((Response) => {
            if (Response.status === 201) {
              localStorage.setItem("info-user", JSON.stringify(data));
              this.f7router.back({ force: true });
            }
          })
          .catch(() => {});
      });
    },
  },
  computed: {},
  created() {
    // this.fecth_dep();
    // const user = JSON.parse(localStorage.getItem("info-user"));
    // this.username = user.username;
    // this.email = user.email;
    // this.firstname = user.firstname;
    // this.lastname = user.lastname;
    // this.department = user.dep_name;
    // this.status = user.status;
    // this.phone = user.phone;
  },
  mounted() {
    //  this.fecth_dep();
    const user = JSON.parse(localStorage.getItem("info-user"));
    this.username = user.username;
    this.email = user.email;
    this.firstname = user.firstname;
    this.lastname = user.lastname;
    this.department = user.dep_name;
    this.status = user.status;
    this.phone = user.phone;
  },
  watch: {},
};
</script>

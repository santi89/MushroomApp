<template>
  <f7-page name="profile" class="font">
    <f7-navbar title="ໂປຣໄຟລ໌" back-link="Back">
      <f7-nav-right>
        <f7-link @click="f7router.navigate(`/editprofile/`)"> ແກ້ໄຂ </f7-link>
      </f7-nav-right>
    </f7-navbar>

    <!-- <div class="wrapper">
      <img
        class="image--cover"
        src="https://maxcdn.icons8.com/Share/icon/Users//user_male_circle_filled1600.png"
        alt=""
      />
    </div> -->
    <!-- <f7-block>
      <f7-button outline popup-open=".demo-edit">
        Edit</f7-button
      >
      <input
        type="file"
        ref="file"
        style="display: none"
        @change="onFilePicked"
      />
    </f7-block> -->

    <f7-list no-hairlines-md>
      <f7-list-item title="ຊື່:">{{ firstname }}</f7-list-item>
      <f7-list-item title="ນາມສະກຸນ:">{{ lastname }}</f7-list-item>
      <!-- <f7-list-item title="userName:">{{ user.username }}</f7-list-item> -->
      <f7-list-item title="ອີເມວ:">{{ email }}</f7-list-item>
      <f7-list-item title="ເບີໂທ:">{{ phone }}</f7-list-item>
    </f7-list>
    <!-- pop up edit -->
    
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
    update: function () {
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
      confirm("ຕ້ອງການແກ້ໄຂກົດ OK ") &&
        http
          .put("/api/users", data)
          .then((Response) => {
            if (Response.status === 201) {
              localStorage.setItem("info-user", JSON.stringify(data));
              window.location.reload();
            }
          })
          .catch(() => {});
    },
    fecth_dep() {
      const user = JSON.parse(localStorage.getItem("info-user"));
      this.username = user.username;
      this.email = user.email;
      this.firstname = user.firstname;
      this.lastname = user.lastname;
      this.department = user.dep_name;
      this.status = user.status;
      this.phone = user.phone;
    },
    // ss() {
    //   console.log("aa" + this.firstname);
    //   console.log("aa" + this.lastname);
    //   console.log("aa" + this.username);
    //   console.log("aa" + this.email);
    //   console.log("aa" + this.firstname);
    //   console.log("aa" + this.department);
    // },
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
    this.fecth_dep();
    // const user = JSON.parse(localStorage.getItem("info-user"));
    // this.username = user.username;
    // this.email = user.email;
    // this.firstname = user.firstname;
    // this.lastname = user.lastname;
    // this.department = user.dep_name;
    // this.status = user.status;
    // this.phone = user.phone;
  },
  watch: {},
};
</script>

<style scoped>
.wrapper {
  text-align: center;
}

.image--cover {
  width: 150px;
  height: 150px;
  border-radius: 50%;
  margin: 20px;
  object-fit: cover;
  object-position: center;
}
</style>

<template>
  <f7-page name="home" class="font">
    <!-- Top Navbar -->
    <f7-navbar :sliding="false">
      <f7-nav-title class="">Mushroom App</f7-nav-title>
      <f7-nav-right>
        <f7-link href="/notificate/">
          <f7-icon
            ios="f7:bell_circle"
            aurora="f7:bell_circle"
            md="material:notifications"
          >
            <f7-badge color="red">5</f7-badge>
          </f7-icon>
        </f7-link>
        <f7-link
         
          panel-open="right"
          icon-ios="f7:menu"
          icon-aurora="f7:menu"
          icon-md="material:menu"
          icon-f7="menu"
        ></f7-link>
      </f7-nav-right>
    </f7-navbar>

    <!-- Left panel with cover effect-->
    <f7-panel right cover theme-dark>
      <f7-view>
        <f7-page>
          <div class="wrapper">
            <img class="image--cover" src="../../assets/logo_avatar.png" alt />
          </div>
          <f7-block style="text-align: center; margin-top: 1px"
            >{{ firstname }} {{ lastname }}</f7-block
          >
          <f7-list>
            <f7-list-item
              link="/profile/"
              view=".view-main"
              panel-close
              title="ໂປຣໄຟລ໌"
            ></f7-list-item>

            <f7-list-item
              @click="f7router.navigate(`/report/`)"
              view=".view-main"
              panel-close
              title="ລາຍງານ"
              link=""
            >
            </f7-list-item>

            <f7-list-item
              link
              @click="logout()"
              view=".view-main"
              panel-close
              title="ອອກລະຈາກບົບ"
            ></f7-list-item>
          </f7-list>
        </f7-page>
      </f7-view>
    </f7-panel>

    <!-- Page content-->
    <f7-card
      class="data-table data-table-init bg-color-creamlight"
      v-for="(item, i) in project_data"
      :key="i"
    >
      <f7-card-header class="card-header">
        <div>ໂຄງການຂອງທ່ານ</div>
        <!--   <f7-link
          color="white"
          icon-ios="f7:plus"
          icon-aurora="f7:plus"
          icon-md="material:add"
          icon-f7="add"
        ></f7-link> -->
      </f7-card-header>
      <f7-card-content :padding="false">
        <f7-row style="align-items: center" class="bg-color-creamlight">
          <div class="col-66 bg-color-creamlight">
            <f7-list>
              <f7-list-item
                :title="item.project_name"
                :value="item.project_id"
                @input="pro_id = $event.target.value"
                @click="f7router.navigate(`/devicelist/${item.project_id}/`)"
                link=""
              >
              </f7-list-item>
            </f7-list>
          </div>
          <div class="col-33 btn-inner">
            <f7-button outline fill @click="remove_pro(item.project_id)"
              >ລືບ</f7-button
            >
          </div>
        </f7-row>
      </f7-card-content>
    </f7-card>

    <f7-fab position="center-bottom" href="/addproject/">
      <f7-icon ios="f7:plus" aurora="f7:plus" md="material:add"></f7-icon>
      <f7-icon ios="f7:xmark" aurora="f7:xmark" md="material:close"></f7-icon>
    </f7-fab>
  </f7-page>
</template>
<script>
import store from "../../store/index";
import get_projects from "../../js/script/get/get_projects";
import { http } from "../../http";
import LocalStorageService from "../../js/script/ServiceLocalStorage";
import { f7 } from "framework7-vue";

export default {
  props: {
    f7router: Object,
  },
  data() {
    return {
      project_Name: "",
      project_data: "",
      firstname: "",
      lastname: "",
      pro_id: "",
    };
  },
  methods: {
    showMo() {
      console.log("ff:" + this.pro_id);
    },
    remove_pro(pro_id) {
      f7.dialog.confirm("ທ່ານຕ້ອງການລືບຫຼືບໍ", "ຢືນຢັນ", () => {
        http
          .put("/api/project/delete_pro", {
            pro_id: pro_id,
          })
          .then((Response) => {
            if (Response.status == 200) {
              this.fecth_detail();
              console.log("dd");
            }
          })
          .catch(() => {});
      });
    },
    logout() {
      // localStorage.removeItem("access_token");
      // localStorage.removeItem("refresh_token");
      // localStorage.removeItem("info-user");

      this.$store.dispatch("AUTH_LOGOUT");
      this.f7router.navigate("/login/");
    },
    fecth_detail: function () {
      // ໂຕໄໝ່
      const user = JSON.parse(localStorage.getItem("info-user"));
      http
        .get("/api/users/admin_m", {
          params: { user_id: user.user_id },
        })
        .then((Response) => {
          if (Response.status === 200) {
            // const data = Response.data;
            this.project_data = Response.data;
            // console.log(data);
            // this.project_Name = response.data;
            // console.log("d");
            // this.project_data = project_Name.project_name;
            // console.log(this.project_data);
          }
        })
        .catch(() => {});
    },
  },
  mounted() {
    this.fecth_detail();
    const user = JSON.parse(localStorage.getItem("info-user"));
    this.firstname = user.firstname;
    this.lastname = user.lastname;
  },
  computed: {},
  created() {
    // this.fecth_detail();
  },
  // filters: {
  //   tolist1(item) {
  //     return `/devicelist/${item.project_id}/`;
  //   },
  // },
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
.col-33.btn-inner {
  align-items: center;
  margin-right: 10px;
}
.row-item {
  align-items: center;
  justify-content: center;
  height: 56px;
}
</style>

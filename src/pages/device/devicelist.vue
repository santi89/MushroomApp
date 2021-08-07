<template>
  <f7-page>
    <f7-navbar back-link="back" color-teal>
      <f7-nav-title class="">ອຸປະກອນ</f7-nav-title>
      <f7-nav-right> </f7-nav-right>
    </f7-navbar>

    <!-- <f7-fab position="right-top" color="teal" href="">
      <f7-icon ios="f7:plus" aurora="f7:plus" md="material:add"></f7-icon>
      <f7-button popup-open=".addDevice-popup"> </f7-button>
    </f7-fab> -->
    <f7-card class="bg-color-creamlight">
      <f7-card-header>
        <div>ຊື່ອຸປະກອນ</div>
        <div class="data-table-links">
          <f7-row>
            <f7-col>
              <!-- popup-open=".addDevice-popup" -->
              <f7-link
                @click="add_device()"
                color="blue"
                class="color-black"
                icon-only
                icon-ios="f7:plus"
                icon-aurora="f7:plus"
                icon-md="material:add"
                icon-f7="add"
              ></f7-link>
            </f7-col>
          </f7-row>
        </div>
      </f7-card-header>

      <f7-card-content>
        <f7-list
          v-for="(item, i) in device_data"
          :key="i"
          class="item-list"
          hairlines
        >
          <f7-row style="align-items: center">
            <div class="col-80">
              <f7-list>
                <f7-list-item
                  :title="item.device_name"
                  :value="item.device_id"
                  @input="device_id = $event.target.value"
                  @click="
                    f7router.navigate(
                      `/devicedata/${item.sub_id}/`
                    )
                  "
                  link=""
                  outline
                ></f7-list-item>
              </f7-list>
            </div>
            <div class="col-20">
              <!-- <f7-button outline fill @click="remove_device(item.device_id)" -->
              <f7-button outline fill @click="remove_device(item.device_id)">ລືບ</f7-button>
            </div>
          </f7-row>
          
          <hr />
        </f7-list>
      </f7-card-content>
    </f7-card>
  </f7-page>
</template>

<script>
import { f7 } from "framework7-vue";
import { http } from "../../http";

export default {
  props: {
    f7router: Object,
    pro_id: {
      type: String,
    },
  },
  data() {
    return {
      device_id: "",
      device_Key: "",
      device_data: "",
      check_device: "",
      project_admin: "",
    };
  },
  computed: {},
  created() {
  },
  mounted() {
    this.fatch_device();
    
    const user = JSON.parse(localStorage.getItem("info-user"));
    this.project_admin = user.user_id;
  },
  methods: {
    add_device() {
      var _this = this;
      f7.dialog.prompt("ລະຫັດອຸປະກອນ", "ເພີ່ມອຸປະກ່ອນ", function (device_Key) {
        var data = {
          project_id: _this.pro_id,
          user_id: _this.project_admin,
          sub_id: device_Key,
        };

        console.log("gg " + JSON.stringify(data));

        http
          .post("/api/device/insert_device_token", data)
          .then((Response) => {
            if (Response.data === 201) {
              console.log("well ");
              this.fatch_device();
            }
          })
          .catch(() => {});

        // f7.dialog.confirm(
        //   "Are you sure that your name is " + this.pro_id +"  f "+ this.project_admin +"  "+this.device_Key,
        //   "ຢືນຢັນ"
        // );
      });
    },
    remove_device(deviceId) {
      // var _this = this;
      var device_id = deviceId.toString();

      console.log("done" + this.pro_id + " " + device_id);

      f7.dialog.confirm(
          "ທ່ານຕ້ອງການລືບອຸປະກອນນີ້ຫຼືບໍ",
          "ຢືນຢັນ",()=>{

            http
          .put("/api/device/delete_device", {
            project_id: this.pro_id,
            device_id: device_id,
          })
          .then((Response) => {
            if (Response.status == 200) {
              this.fecth_detail();
            }
          })
          .catch(() => {});
          }
        );
    
    },
    fatch_device() {
      http
        .get("/api/dashboard/device_by_pro", {
          params: { project_id: this.pro_id },
        })
        .then((Response) => {
          if (Response.status === 200) {
            this.device_data = Response.data;
            //  this.device_name = Response.data;
            console.log("d");
            // this.project_Name = response.data;

            console.log(this.device_data);
          }
        })
        .catch(() => {});
    },
  },
};
</script>

<style scoped>

.item-list {
  margin: 0 5px 0 5px;
}
</style>

<template>
  <f7-page no-hairlines-md>
    <f7-navbar title="Add Project" back-link="back" class="bg-color-teal">
      <!-- <f7-nav-right fill onclick="">Add</f7-nav-right>      -->
    </f7-navbar>

    <f7-list no-hairlines-md strong>
      <f7-list-input
        outline
        type="text"
        placeholder="ຊື່ໂຄງການ"
        :value="project_name"
        @input="project_name = $event.target.value"
        required
        class="item-label"
        label="ຊື່ໂຄງການ"
      >
      </f7-list-input>
      <f7-list-input
        class="item-label"
        outline
        placeholder="ເສັ້ນແວງ"
        label="ເສັ້ນແວງ"
        type="number"
        :value="longitube"
        @input="longitube = $event.target.value"
      ></f7-list-input>

      <f7-list-input
        outline
        class="item-label"
        placeholder="ເສັ້ນຂະໜານ"
        label="ເສັ້ນຂະໜານ"
        type="number"
        :value="latitube"
        @input="latitube = $event.target.value"
      ></f7-list-input>

      <!-- <f7-list-input
        floating-label
        outline
        label="time Start"
        type="Date"
        :value="timestart"
        @input="timestart = $event.target.value"
      ></f7-list-input>
-->
      <f7-list-input
        outline
        label="ເລືອກວັນທີເລີ່ມ"
        placeholder="ເລືອກວັນທີເລີ່ມ"
        type="date"
        :value="date1"
        @input="date1 = $event.target.value"
      ></f7-list-input>
      <!-- @calendar:change="timed = $event.target.value" -->
      <!-- :value="timed"
        @input="timed = $event.target.value" -->

      <f7-list-input
        outline
        class="item-label"
        label="ວັນທີຈົບ"
        placeholder="ວັນທີຈົບ"
        type="date"
        :value="date2"
        @input="date2 = $event.target.value"
      ></f7-list-input>
      <!-- <f7-list-input 
        floating-label
        outline
        label="device Name"
        type="text"
        :value="projects.devicename"
        @input="projects.devicename = $event.target.value"
      ></f7-list-input> -->
    </f7-list>
    <f7-list-item>{{ timed }}</f7-list-item>
    <f7-block>
      <f7-button outline @Click="addProject()" fill>ເພີ່ມໂຄງການ</f7-button>
    </f7-block>
  </f7-page>
</template>

<script>
import { f7 } from "framework7-vue";
import { http } from "../../http";
import { mapState } from "vuex";

export default {
  props: { f7router: Object },
  data() {
    return {
      dep: [],
      date: [],
      date2: "",
      date1: "",
      gpio_type: ["Input", "Output"],
      project_name: "",
      project_admin: "",
      dep_name: "ພາກວິຊາປູກຝັງ",
      longitube: "",
      latitube: "",
      msg: "",
    };
  },
  created() {},
  mounted() {
    this.fecth_dep();
    const user = JSON.parse(localStorage.getItem("info-user"));
    this.project_admin = user.user_id;
    this.dep_name = user.dep_id;
  },
  computed: {
  },
  methods: {
    test() {
      this.date.push(this.date1, this.date2);
      console.log("dd" + this.date);
      //console.log(user.isSuperUser);
    },
    fecth_dep: function () {
      http
        .get("/api/dep/sig")
        .then((Response) => {
          this.dep = Response;
        })
        .catch((err) => {
          return err;
        });
    },
    addProject() {
      this.date.push(this.date1, this.date2);
      var data = {
        project_name: this.project_name,
        project_admin: this.project_admin,
        dep_name: this.dep_name,
        date: this.date,
        longitube: this.longitube,
        latitube: this.latitube,
      };
      console.log("test" + JSON.stringify(data));
      http
        .post("/api/mushroom_project", data)
        .then((Response) => {
          if (Response.status === 201) {
            console.log("error");
            this.msg = Response.data.stt;
            f7.dialog.confirm("Done", "ການເພີ່ມສຳເລັດ", () => {
              this.f7router.navigate("/projectView/");
            });
          }
          if (Response.status === 200) {
            this.msg = Response.data.stt;
          }
        })
        .catch(() => {});
    },
  },
};
</script>

<style scoped></style>

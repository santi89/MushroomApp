<template>
  <f7-page>
    <f7-navbar title="ຕັ້ງຄ່າຄວາມຊຸ່ມຕາມເວລາ" back-link="back">
      <f7-nav-right>
        <f7-link @click="SaveSettingHumidity()">ບັນທຶກ</f7-link>
      </f7-nav-right>
    </f7-navbar>
    <div>
      <f7-card class="container bg-color-creamlight">
        <f7-list class="list-container" inline-labels>
          <f7-list-input
            class
            label="ເວລາເລີ່ມ"
            type="time"
            :value="time_h"
            @input="time_h = $event.target.value"
            outline
          >
            <f7-icon icon="demo-list-icon"></f7-icon>
          </f7-list-input>

          <f7-list-input
            outline
            label="ສະຖານະ"
            type="select"
            :value="status_w"
            @input="status_w = $event.target.value"
            placeholder="......."
          >
            <option value="0">OFF</option>
            <option value="1">ON</option>
          </f7-list-input>
        </f7-list>
      </f7-card>
    </div>

    <!-- <div>
      <f7-block class="del-button">
        <f7-button outline @click="showtime()">ລືບ</f7-button>
      </f7-block>
    </div> -->

    <f7-toolbar tabbar bottom class="tool-bottom">
      <f7-link tab-link-active @click="deleteH_setting()">ລືບ</f7-link>
    </f7-toolbar>
  </f7-page>
</template>
<script>
import { f7 } from "framework7-vue";
import { http } from "../../http";

export default {
  props: {
    f7router: Object,
    action_id: {
      type: Number,
    },
    time: {
      type: Number,
    },
    stt_work: {
      type: String,
    },
  },
  data() {
    return {
      time_h: this.ConvertMinutes(this.time),
      status_w: this.changeStatus(this.stt_work),
    };
  },
  methods: {
    SaveSettingHumidity() {
      const arr = this.time_h.split(":");
      const seconds = parseInt(arr[0]) * 60 + parseInt(arr[1]);
      http
        .post("/api/control/update_H_setting", {
          time: seconds, //format ເປັນນາທີ
          stt_work: this.status_w,
          action_id: this.action_id,
        })
        .then((Response) => {
          if (Response.status === 201) {
            // console.log("form H");
            this.f7router.back({ force: true });

            // console.log(
            //   "this:id" + this.status_w + "vv" + this.action_id + "vv" + seconds
            // );
          }
        })
        .catch(() => {});
    },
    deleteH_setting() {
       const arr = this.time_h.split(":");
      const seconds = parseInt(arr[0]) * 60 + parseInt(arr[1]);

      http
        .delete("/api/control/delete_HT_setting", {
          params: { action_id: this.action_id },
        })
        .then((Response) => {
          // console.log("vv" + this.action_id);
          if (Response.status === 201) {
            http
              .delete("/api/delete_Setting", {
                id:this.action_id,
                pin:"D0",
                val:seconds,
                stWork:this.status_w,
                stUse:0,
              })
              .then((Response) => {
                // console.log("vv" + this.action_id);
                if (Response.status === 201) {
                  this.f7router.back({ force: true });
                }
              })
              .catch(() => {});
           // this.f7router.back({ force: true });
          }
        })
        .catch(() => {});
    },

    //convert

    ConvertMinutes(num) {
      var h = Math.floor(num / 60);
      var m = Math.floor(num % 60);
      return [h, m]
        .map((v) => (v < 10 ? "0" + v : v))
        .filter((v, i) => v !== "00" || i > 0)
        .join(":");
    },
    changeStatus(status) {
      if (status == "ON") {
        return 1;
      } else if (status == "OFF") {
        return 0;
      }
    },
  },
  mounted() {},
  created() {},
};
</script>
<style scoped>
.tool-bottom {
  bottom: 10px;
}
</style>

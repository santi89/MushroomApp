<template>
  <f7-page>
    <f7-navbar title="ຕັ້ງຄ່າອຸນຫະພູມຕາມເວລາ" back-link="back">
      <f7-nav-right>
        <f7-link @click="Update_temperature_setting">ບັນທຶກ</f7-link>
      </f7-nav-right>
    </f7-navbar>
    <div>
      <f7-card class="container bg-color-creamlight">
        <f7-list class="list-container" inline-labels>
          <f7-list-input
            outline
            label="ການເຮັດວຽກ"
            type="select"
            :value="select_fan_type"
            @input="select_fan_type = $event.target.value"
            placeholder="ດູດອາກາດອອກ"
          >
            <option value="D4">ດູດອາກາດອອກ</option>
            <option value="D5">ດູດອາກາດເຂົ້າ</option>
          </f7-list-input>

          <f7-list-input
            class
            label="ເວລາເລີ່ມ"
            type="time"
            :value="time_t"
            @input="time_t = $event.target.value"
            outline
          >
          </f7-list-input>

          <f7-list-input
            outline
            label="ສະຖານະ"
            type="select"
            :value="select_stt_Temperature"
            @input="select_stt_Temperature = $event.target.value"
            placeholder="ດູດອາກາດອອກ"
          >
            <option value="1">ON</option>
            <option value="0">OFF</option>
          </f7-list-input>
        </f7-list>
      </f7-card>
    </div>

    <f7-toolbar tabbar bottom class="tool-bottom">
      <f7-link tab-link-active @click="deleteT_setting">ລືບ</f7-link>
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
    sub_id: {
      type: String,
    },
    time: {
      type: String,
    },
    stt_work: {
      type: String,
    },
    gpio_name: {
      type: String,
    },
  },
  data() {
    return {
      time_t: this.ConvertMinutes(this.time),
      select_stt_Temperature: this.changeStatus(this.stt_work),
      select_fan_type:this.gpio_name,
    };
  },
  methods: {
    Update_temperature_setting() {
      const arr = this.time_t.split(":");
      const seconds = parseInt(arr[0]) * 60 + parseInt(arr[1]);

      var data = {
        sub_id: this.sub_id,
        time: seconds, //format ເປັນນາທີ
        stt_work: this.select_stt_Temperature,
        action_id: this.action_id,
      };
              // console.log("this:  "+JSON.stringify(data));
      http
        .post("/api/control/update_T_setting", data)
        .then((Response) => {
          if (Response.status === 201) {
            this.f7router.back({ force: true });
          }
        })
        .catch(() => {});
    },
     deleteT_setting() {
      http
        .delete("/api/control/delete_HT_setting", {
          params: { action_id: this.action_id },
        })
        .then((Response) => {
          // console.log("vv" + this.action_id);
          if (Response.status === 201) {
            this.f7router.back({ force: true });
          }
        })
        .catch(() => {});
    },
    // convert
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
  created() {},
};
</script>
<style scoped>
.tool-bottom {
  bottom: 20px;
}
</style>

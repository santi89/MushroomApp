<template>
  <f7-page class="font">
    <f7-navbar :title="convertNavbar(head_name)" back-link="Back"></f7-navbar>
    <!-- <f7-toolbar tabbar top >
      <f7-link tab-link="#humidity" tab-link-active>ຄວາມຊຸ່ມ</f7-link>
      <f7-link tab-link="#tab-Temperature" >ອຸນຫະພູມ</f7-link>
    </f7-toolbar> -->

    <!-- tabs1 -->
    <div
      v-if="
        'humidity' === head_name ||
        'humidity_in' === head_name ||
        'humidity_out' === head_name
      "
    >
      <f7-list>
        <f7-card
          class="bg-color-creamlight text-color-black"
          title="ON/OFF Manual"
        >
          <f7-row>
            <div class="col-80">
              <f7-list>
                <f7-list-input
                  label="ໄລຍະເວລາປີດ"
                  type="time"
                  :value="manual_timeH"
                  @input="manual_timeH = $event.target.value"
                  outline
                  :disabled="manual_chekH"
                ></f7-list-input>
              </f7-list>
            </div>
            <div class="col-20 toggle">
              <f7-toggle
                color="blue"
                :checked="manual_chekH"
                @change="switchManualHumidity($event.target.checked)"
              ></f7-toggle>
            </div>
          </f7-row>
        </f7-card>
        <!-- Humidity -->
        <f7-card class="bg-color-creamlight" title="ຕັ້ງຄວາມຊູ່ມAuto">
          <f7-row>
            <div class="col-70">
              <f7-list>
                <f7-list-input
                  label="ປ້ອນຄ່າ"
                  type="number"
                  :value="auto_H"
                  @input="auto_H = $event.target.value"
                  outline
                  :disabled="off_input"
                ></f7-list-input>
              </f7-list>
            </div>
            <div class="col-20 toggle">
              <f7-toggle
                @change="switchAutoHumidity"
                color="blue"
                :checked="chek_autoH"
              ></f7-toggle>
            </div>
          </f7-row>
        </f7-card>
        <!-- list timer -->

        <f7-card class="bg-color-creamlight">
          <f7-card-header>
            <div>ລາຍການເຮັດວຽກ</div>
            <div class="data-table-links">
              <f7-row>
                <f7-col>
                  <f7-link
                    popup-open=".Humidity_setting"
                    class="color-teal"
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
            <f7-row v-for="item in settingH" :key="item">
              <div class="col-80">
                <f7-list>
                  <f7-list-item
                    @click="
                      f7router.navigate(
                        `/settingHumidity/${item.action_id}/${item.time}/${item.stt_work}/${item.stt_use}/`
                      )
                    "
                    :title="'ເວລາ :' + ConvertMinutes(item.time)"
                    :footer="'ສະຖານະ :' + item.stt_work"
                  >
                  </f7-list-item>
                </f7-list>
              </div>
              <f7-toggle
                color="blue"
                :value="checked"
                :checked="convertStt_Use(item.stt_use)"
                @change="
                  switchH_Setting(
                    item.action_id,
                    item.time,
                    $event.target.checked,
                    item.stt_work
                  )
                "
              ></f7-toggle>
            </f7-row>
          </f7-card-content>
        </f7-card>

        <!-- popup for add setting -->
        <f7-popup
          class="Humidity_setting"
          :opened="popupSetting"
          @popup:closed="popupSetting = false"
        >
          <f7-page>
            <f7-navbar>
              <f7-nav-left
                ><f7-link
                  popup-close
                  icon-ios="f7:arrow_left"
                  icon-aurora="f7:arrow_left"
                  icon-md="material:arrow_back"
                  icon-f7="arrow_back"
                ></f7-link>
              </f7-nav-left>
              <div class="col nav-title">ຕັ້ງຄ່າຄວາມຊູ່ມຕາມເວລາ</div>
              <f7-nav-right>
                <f7-button popup-close @click="SaveSettingHumidity"
                  >ບັນທຶກ</f7-button
                >
              </f7-nav-right>
            </f7-navbar>

            <f7-card class="bg-color-creamlight">
              <f7-list class="list-container" inline-labels>
                <f7-list-input
                  class
                  label="ເວລາເລີ່ມ"
                  type="time"
                  outline
                  :value="start_H"
                  @input="start_H = $event.target.value"
                >
                  <f7-icon icon="demo-list-icon"></f7-icon>
                </f7-list-input>

                <li class="item-content item-input">
                  <!-- <div class="item-media">
              <i class="icon demo-list-icon"></i>
            </div> -->
                  <div class="item-inner">
                    <div class="item-title item-label">ສະຖານະ</div>
                    <div class="item-input-wrap input-dropdown-wrap">
                      <select v-model="select_stt_humidity">
                        <option value="1">ON</option>
                        <option value="0">OFF</option>
                      </select>
                    </div>
                  </div>
                </li>
              </f7-list>
            </f7-card>
          </f7-page>
        </f7-popup>
      </f7-list>
    </div>
    <!-- tabs2 ============-->
    <div
      v-if="
        'temperature' === head_name ||
        'temperature_in' === head_name ||
        'temperature_out' === head_name
      "
    >
      <f7-list class="text-color-black">
        <f7-card
          class="bg-color-creamlight text-color-black"
          title="ON/OFF Manual"
        >
          <f7-row>
            <div class="col-80">
              <f7-list :disabled="manual_chekT">
                <f7-list-input
                  outline
                  label="ການເຮັດວຽກ"
                  type="select"
                  @input="select_fan_manual = $event.target.value"
                  placeholder="ດູດອາກາດອອກ"
                >
                  <option value="D4">ດູດອາກາດອອກ</option>
                  <option value="D5">ດູດອາກາດເຂົ້າ</option>
                </f7-list-input>
              </f7-list>
            </div>
          </f7-row>
          <f7-row>
            <div class="col-80">
              <f7-list>
                <f7-list-input
                  label="ເວລາປີດ"
                  type="time"
                  :value="manual_timeT"
                  @input="manual_timeT = $event.target.value"
                  outline
                  :disabled="manual_chekT"
                ></f7-list-input>
              </f7-list>
            </div>
            <div class="col-20 toggle">
              <f7-toggle
                color="blue"
                :checked="manual_chekT"
                @change="switchManualTemperatrue($event.target.checked)"
              ></f7-toggle>
            </div>
          </f7-row>
        </f7-card>

        <!-- list timer -->

        <f7-card class="bg-color-creamlight">
          <f7-card-header>
            <div>ລາຍການເຮັດວຽກ</div>
            <div class="data-table-links">
              <f7-row>
                <f7-col>
                  <f7-link
                    popup-open=".settingFan"
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
            <f7-row v-for="item in settingT" :key="item">
              <div class="col-80">
                <f7-list>
                  <!-- `/settingTemperature/${sub_id}/${item.time}/${item.stt_work}/${item.gpio_detail}/` -->
                  <f7-list-item
                    @click="
                      f7router.navigate(
                        `/settingTemperature/${item.action_id}/${sub_id}/${item.time}/${item.stt_work}/${item.pin}/${item.stt_use}/`
                      )
                    "
                    :title="'ເວລາ: ' + ConvertMinutes(item.time)"
                    :footer="'ສະຖານະ: ' + item.stt_work"
                    :header="'ເຮັດວຽກ: ' + item.gpio_detail"
                  >
                  </f7-list-item
                ></f7-list>
              </div>

              <f7-toggle
                color="blue"
                :value="checked"
                :checked="convertStt_Use(item.stt_use)"
                @change="
                  switch_TSetting(
                    item.action_id,
                    item.time,
                    item.pin,
                    item.stt_work,
                    $event.target.checked
                  )
                "
              ></f7-toggle>
            </f7-row>

            <!-- <f7-row>
                  <div class="col-80">
                    <f7-list>
                      <f7-list-item
                        title="time_H"
                        footer="status_H"
                        header="ດູດເຂົ້າ" >
                      </f7-list-item>
                    </f7-list>
                  </div>
                  <f7-toggle color="blue" class="toggle-on"></f7-toggle>
                </f7-row> -->
          </f7-card-content>
        </f7-card>
      </f7-list>
    </div>

    <!-- popup for add setting fan -->
    <f7-popup class="settingFan">
      <f7-page>
        <f7-navbar>
          <f7-nav-left
            ><f7-link
              popup-close
              icon-ios="f7:arrow_left"
              icon-aurora="f7:arrow_left"
              icon-md="material:arrow_back"
              icon-f7="arrow_back"
            ></f7-link>
          </f7-nav-left>
          <div class="col nav-title">ຕັ້ງຄ່າອຸນຫະພູມຕາມເວລາ</div>

          <f7-nav-right>
            <f7-button @click="saveSettingTemperature()" popup-close
              >ບັນທຶກ</f7-button
            >
          </f7-nav-right>
        </f7-navbar>

        <f7-card class="bg-color-creamlight">
          <f7-list class="list-container" inline-labels>
            <f7-list-input
              outline
              label="ການເຮັດວຽກ"
              type="select"
              v-model="select_fan_type"
            >
              <!-- @input="select_fan_type = $event.target.value" -->
              <option value="D4">ດູດອາກາດອອກ</option>
              <option value="D5">ດູດອາກາດເຂົ້າ</option>
            </f7-list-input>
            <f7-list-input
              class
              label="ເວລາ"
              type="time"
              outline
              :value="start_insertT"
              @input="start_insertT = $event.target.value"
            >
              <f7-icon icon="demo-list-icon"></f7-icon>
            </f7-list-input>
            <f7-list-input
              outline
              label="ສະຖານະ"
              type="select"
              @input="select_stt_Temperature = $event.target.value"
              placeholder="ON"
            >
              <option value="1">ON</option>
              <option value="0">OFF</option>
            </f7-list-input>
          </f7-list>
        </f7-card>
      </f7-page>
    </f7-popup>
  </f7-page>
</template>

<script>
import { http } from "../../http";
import { f7 } from "framework7-vue";

export default {
  props: {
    f7router: Object,
    sub_id: {
      type: String,
    },
    head_name: {
      type: String,
    },
  },

  data() {
    return {
      popupFan: false,
      popupSetting: false,
      select_fan_type: "",
      select_fan_manual: "",
      manual_timeH: "",
      manual_chekH: false,
      manual_timeT: "",
      manual_chekT: false,
      auto_H: "",
      select_stt_humidity: "",
      select_stt_Temperature: "",
      action_type: [],
      at_auto: "",
      at_timer: "",
      start_insertT: "",
      start_H: "",
      settingT: [],
      settingH: [],
      chek_autoH: false,

      auto_stt: "",
      action_id: "",
      first: null,
      off_input: false,
      gpio_data: "",
    };
  },

  methods: {
    switchManualHumidity(chekh) {
      var stUse = "";
      if (chekh == true) {
        this.manual_chekH = true;
        stUse = 1;
      } else if (chekh == false) {
        this.manual_chekH = false;
        stUse = 0;
      }
      console.log("ffjfj" + stUse);

      var time = [new Date().getHours() + ":" + new Date().getMinutes()]
        .map((v) => (v < 10 ? "0" + v : v))
        .filter((v, i) => v !== "00" || i > 0)
        .join(":");

      var timeout = this.converttime_Int(this.manual_timeH);
      var timenow = this.converttime_Int(time);
      if (stUse == 1) {
        if (timeout <= timenow || this.manual_timeH == "") {
          return f7.dialog.alert(
            "ເວລາຢຸດໜ້ອຍກ່ວາເວລາປະຈຸບັນ",
            "ແຈ້ງເຕືອນ",
            () => {
              this.manual_chekH = false;
            }
          );
        }
      }

      // console.log("all:" + this.converttime_Int(this.manual_timeH) + "f:" +this.converttime_Int(time));
      http
        .post("/api/post_manualconfig", {
          pin: "D0",
          val: timeout,
          stUse: stUse,
        })
        .then((Response) => {
          if (Response.status === 200) {
            //send to board
            // console.log("all:" + stUse + "f:" + manual_timeH);
          }
        })
        .catch(() => {});
    },
    switchManualTemperatrue(chekt) {
      var stUse = "";
      if (chekt == true) {
        this.manual_chekT = true;
        stUse = 1;
      } else if (chekt == false) {
        this.manual_chekT = false;
        stUse = 0;
      }
      console.log("ffjfj" + stUse);

      var time = [new Date().getHours() + ":" + new Date().getMinutes()]
        .map((v) => (v < 10 ? "0" + v : v))
        .filter((v, i) => v !== "00" || i > 0)
        .join(":");

      var timeout = this.converttime_Int(this.manual_timeT);
      var timenow = this.converttime_Int(time);
      if (stUse == 1) {
        if (timeout <= timenow || this.manual_timeT == "") {
          return f7.dialog.alert(
            "ເວລາຢຸດໜ້ອຍກ່ວາເວລາປະຈຸບັນ",
            "ແຈ້ງເຕືອນ",
            () => {
              this.manual_chekT = false;
            }
          );
        }
      }

      console.log("all:" + timeout + "f:" + stUse);
      http
        .post("/api/post_manualconfig", {
          pin: this.select_fan_manual,
          val: timeout,
          stUse: stUse,
        })
        .then((Response) => {
          if (Response.status === 200) {
            //send to board
            console.log(
              "all:" +
                stUse +
                "f:" +
                this.manual_timeT +
                ";;;" +
                this.select_fan_manual
            );
          }
        })
        .catch(() => {});
      // console.log("ເວລາ Manual:" + this.manuel_timeT);
    },
    switchAutoHumidity() {
      if (this.first == 1) {
        if (this.auto_stt == 1) {
          this.auto_stt = 0;
          this.off_input = false;
        } else if (this.auto_stt == 0) {
          this.auto_stt = 1;
          this.off_input = true;
        }
        // console.log("ff" + this.auto_stt);

        http
          .post("/api/control/switch_Auto", {
            time: this.auto_H,
            stt_use: this.auto_stt,
            action_id: this.action_id,
          })
          .then((Response) => {
            if (Response.status === 200) {
              //send to board
              http
                .post("/api/post_autoconfig", {
                  action_id: this.action_id,
                  pin: "D0",
                  val: this.auto_H,
                  stUse: this.auto_stt,
                })
                .then((Response) => {
                  if (Response.status === 200) {
                    //send to board
                    // console.log("ff" + this.auto_stt);
                  }
                })
                .catch(() => {});
            }
          })
          .catch(() => {});
      }
      this.first = 1;
    },
    switchH_Setting(action_id, value, check_h_s, stt_work) {
      var stt_use = "";
      if (check_h_s == true) {
        stt_use = 1;
      } else if (check_h_s == false) {
        stt_use = 0;
      }
      // console.log("h s" + action_id + "b: v:" + stt_use);

      http
        .post("/api/control/switchH_setting", {
          stt_use: stt_use,
          action_id: action_id,
        })
        .then((Response) => {
          if (Response.status === 201) {
            //send to board
            this.fetch_H_setting();
            // console.log("all:" + value + "f:" + stt_use);
            http
              .post("/api/post_SettingConfig", {
                id: action_id,
                pin: "D0",
                val: value, //no convert coz it is int
                stWork: this.convertStt_work(stt_work),
                stUse: stt_use,
              })
              .then((Response) => {
                if (Response.status === 200) {
                  //send to board
                  console.log("aldddl:" + action_id + "f:" + stt_use);
                }
              })
              .catch(() => {});
          }
        })
        .catch(() => {});
    },
    switch_TSetting(action_id, value, pin, work, check_h_s) {
      var stt_use = "";
      if (check_h_s == true) {
        stt_use = 1;
      } else if (check_h_s == false) {
        stt_use = 0;
      }
      // console.log("h s" + action_id + "b: v:" + stt_use);

      http
        .post("/api/control/switchH_setting", {
          stt_use: stt_use,
          action_id: action_id,
        })
        .then((Response) => {
          if (Response.status === 201) {
            //send to board
            // this.fetch_H_setting();
            http
              .post("/api/post_SettingConfig", {
                id: action_id,
                pin: pin,
                val: value, //no convert coz it is int
                stWork: this.convertStt_work(work),
                stUse: stt_use,
              })
              .then((Response) => {
                if (Response.status === 200) {
                  //send to board
                  console.log(
                    "all:" + action_id + "f:" + this.select_stt_humidity
                  );
                }
              })
              .catch(() => {});
          }
        })
        .catch(() => {});
    },
    // switchTemperatureSetting(action_id,checkT_stt) { },
    SaveSettingHumidity() {
      const arr = this.start_H.split(":");
      const seconds = parseInt(arr[0]) * 60 + parseInt(arr[1]);

      var data = {
        sub_id: this.sub_id,
        time: seconds,
        stt_work: this.select_stt_humidity,
      };
      http
        .post("/api/control/insert_H_setting", data)
        .then((Response) => {
          if (Response.status === 201) {
            // console.log("form H");
            this.start_H = "";
            this.select_stt_humidity = "";
            this.fetch_H_setting();
          }
        })
        .catch(() => {});
    },
    saveSettingTemperature() {
      const arr = this.start_insertT.split(":");
      const seconds = parseInt(arr[0]) * 60 + parseInt(arr[1]);

      console.log("formf"+this.select_fan_type)
      var data = {
        pin: this.select_fan_type,
        sub_id: this.sub_id,
        time: seconds,
        stt_work: this.select_stt_Temperature,
      };
      http
        .post("/api/control/insert_T_setting", data)
        .then((Response) => {
          if (Response.status === 201) {
            this.start_insertT = "";
            this.select_fan_type = "";
            this.select_stt_Temperature = "";
            this.fetch_T_setting();
          }
        })
        .catch(() => {});
    },
    // convert
    converttime_Int(time) {
      const arr = time.split(":");
      const seconds = parseInt(arr[0]) * 60 + parseInt(arr[1]);
      return seconds;
    },
    ConvertMinutes(num) {
      var h = Math.floor(num / 60);
      var m = Math.floor(num % 60);
      return [h, m]
        .map((v) => (v < 10 ? "0" + v : v))
        .filter((v, i) => v !== "00" || i > 0)
        .join(":");
    },
    convertStt_Use(st_use) {
      if (st_use == 1) {
        return true;
      } else if (st_use == 0) {
        return false;
      }
    },
    convertStt_work(st_work) {
      if (st_work == "ON") {
        return 1;
      } else if (st_work == "OFF") {
        return 0;
      }
    },
    convertNavbar(title) {
      if (
        title == "humidity" ||
        "humidity_in" === title ||
        "humidity_out" === title
      ) {
        return "ຄວບຄຸມຄວາມຊຸ່ມ";
      }
      if (
        title == "temperature" ||
        "temperature_in" === title ||
        "temperature_out" === title
      ) {
        return "ຄວບຄຸມອຸນຫະພູມ";
      }
    },
    //fetch
    fatch_action_type() {
      http
        .get("/api/display/action_type")
        .then((Response) => {
          if (Response.status === 200) {
            this.action_type = Response.data;
            this.at_auto = Response.data[0].at_id;
            this.at_timer = Response.data[1].at_id;
            // console.log("d:" + JSON.stringify(this.at_timer));
          }
        })
        .catch(() => {});
    },

    fetch_T_setting() {
      // console.log("a:" + this.at_timer);
      http
        .get("/api/display/controlT_setting")
        .then((Response) => {
          if (Response.status === 200) {
            this.settingT = Response.data;
            // console.log("d:" + JSON.stringify(this.settingT));
          }
        })
        .catch(() => {});
    },
    fetch_H_setting() {
      http
        .get("/api/display/controlH_setting")
        .then((Response) => {
          if (Response.status === 200) {
            this.settingH = Response.data;

            // console.log("d:" + JSON.stringify(this.settingH));
          }
        })
        .catch(() => {});
    },
    fatch_gpio() {
      http
        .get("/api/project/createtrack/showgpio", {
          params: { sub_id: this.sub_id },
        })
        .then((Response) => {
          if (Response.status === 200) {
            this.gpio_data = Response.data;
            // console.log("d:" + JSON.stringify(this.gpio_data));
          }
        })
        .catch(() => {});
    },
    fetch_auto() {
      http
        .get("/api/display/control_Auto")
        .then((Response) => {
          if (Response.status === 200) {
            this.auto_H = Response.data.time;
            this.action_id = Response.data.action_id;
            this.auto_stt = Response.data.stt_use;
            if (this.auto_stt == 1) {
              this.chek_autoH = true;
              this.off_input = true;
            } else if (this.auto_stt == 0) {
              this.chek_autoH = false;
              this.first = 1;
              this.off_input = false;
            }
            // console.log("fetch:" + this.auto_H + "" + this.auto_stt);
          }
        })
        .catch(() => {});
    },

    //call data from board
  },
  watch: {},
  computed: {},
  mounted() {
    this.fatch_action_type();
    this.fetch_H_setting();
    this.fetch_auto();
    this.fetch_T_setting();
  },
  created() {},
};
</script>

<style scoped>
.list-container {
  display: grid;
}
.toggle {
  align-items: bottom;
}
.toggle-on {
  margin-right: 10px;
}
.nav-title {
  align-items: center;
}
.col-80 {
  border: 2px;
}
</style>

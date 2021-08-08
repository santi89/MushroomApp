<template>
  <f7-page class="font">
    <f7-navbar back-link="back" >
      ຂໍ້ມູນການແທກໃນປັດຈຸບັນ
      <f7-nav-right> </f7-nav-right>
    </f7-navbar>
    <f7-card class="bg-color-creamlight">
      <f7-card-header>
        <div>ຂໍ້ມູນ</div>
        <div class="data-table-links">
          <f7-row>
            <f7-col>
              <!-- @Click="
                  f7router.navigate(`/humidityAndtemperature/${token_id}/`)
                " -->
            </f7-col>
          </f7-row>
        </div>
      </f7-card-header>
      <f7-list>
        <f7-row>
          <f7-col class="col-50"
            ><f7-button
              class="btn-con"
              outline
              fill
              @Click="
                f7router.navigate(
                  `/humidityAndtemperature/${sub_id}/humidity/`
                )
              "
              >ຄວາມຊຸ່ມ</f7-button
            ></f7-col
          >
          <f7-col class="col-50"
            ><f7-button
              class="btn-con"
              outline
              fill
              @Click="
                f7router.navigate(
                  `/humidityAndtemperature/${sub_id}/temperature/`
                )
              "
              >ອຸນຫະພູມ</f7-button
            ></f7-col
          >
        </f7-row>
        <f7-row class="row-content">
          <div
            class="col-50 real-data bg-color-creamlight"
            v-for="(item, i) in real_data"
            :key="i"
          >
            <f7-card class="c1">
              <f7-list>
                <div class="item-content">
                  <div class="item-inner">
                    <div class="item-title">
                      <div class="item-header">
                        {{ item.head_name }}
                      </div>
                      {{ item.data }} {{ item.unit_name }}
                      <div class="item-footer">
                        Update:
                        {{ item.dtime }}
                      </div>
                    </div>
                  </div>
                </div>
              </f7-list>
            </f7-card>
          </div>
        </f7-row>
      </f7-list>
    </f7-card>
  </f7-page>
</template>
<script>
import { f7 } from "framework7-vue";
import { http } from "../../http";
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
      real_data: [
        {
          data: "",
          dtime: "22/08/21",
          head_detail: "",
          head_name: "",
          icon: null,
          unit_name: "",
        },
      ],
      token_id: "",
      list_show: false,
      id: "",
    };
  },
  methods: {
    test() {
      console.log("sub" + this.sub_id);
    },
    get_real() {
      http
        .get("/api/dashboard/head_id", {
          params: { sub_id: this.sub_id },
        })
        .then((res) => {
          var head = res.data.length;
          http
            .get("/api/dashboard/realtime", {
              params: {
                sub_id: this.sub_id,
                limit: head,
              },
            })
            .then((res) => {
              if (res.data[0] !== null) {
                const data = res.data;
                this.real_data = data;
              }

              // console.log("s" + this.real_data);
            })
            .catch(() => {});
        })
        .catch(() => {});
    },
  },
  mounted() {
    this.get_real();
    // this.id = setInterval(this.get_real, 30000);
  },
  destroyed() {
    // clearInterval(this.id);
  },
  computed: {
    // dtimeformat(dtime) {
    //   if (dtime === null || dtime === "") {
    //     return "ບໍມີ";
    //   } else {
    //     return (
    //       new Date(dtime).toISOString().substring(0, 10) +
    //       " " +
    //       new Date(dtime).toTimeString().substring(0, 8)
    //     );
    //   }
    // },
  },
};
</script>

<style scoped>
.real-data444 {
  height: fit-content;
  margin: 5px 5px;
  background: #fff;
  text-align: center;
  /* line-height: 50px; */
  width: 154px;
}
.row-content {
  align-items: center;
  margin-bottom: 5px;
  justify-content: flex-start;
}
.item-inner {
  justify-content: center;
}
.list .item-header {
  font-size: 17px;
}
.list .item-title {
  font-size: 20px;
  text-align: center;
}
.btn-con {
  margin: 5px;
}
</style>

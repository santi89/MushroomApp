<template>
  <f7-page>
    <f7-navbar back-link="back" title="ລາຍງານຄວາມຊຸ່ມ ແລະ ອຸນຫະພູມ">
    </f7-navbar>

    <f7-card class="bg-color-gray-light">
      <f7-row
        ><f7-col class="col-50">
          <f7-list>
            <f7-list-input
              v-for="(item, i) in project_data"
              :key="i"
              outline
              label="ເລືອກໂຄງການ"
              type="select"
              @input="pro_id = $event.target.value"
              placeholder="......."
              @change="fatch_device"
            >
              <option :value="item.project_id">
                {{ item.project_name }}
              </option>
            </f7-list-input></f7-list
          ></f7-col
        >

        <f7-col class="col-50">
          <f7-list>
            <f7-list-input
              v-for="(item, i) in device_data"
              :key="i"
              outline
              label="ເລືອກອຸປະກອນ"
              type="select"
              @input="sub_id = $event.target.value"
              placeholder="......."
              @change="showinput = true"
            >
              <option :value="item.sub_id">{{ item.device_name }}</option>
            </f7-list-input></f7-list
          ></f7-col
        ></f7-row
      >
      <f7-row class="showDate" v-show="showinput">
        <div class="col-66">
          <f7-list>
            <f7-list-input
              outline
              label="ເລືອກວັນທີເລີ່ມ"
              placeholder="ເລືອກ"
              type="datepicker"
              @change="date[0] = $event.target.value"
              :calendar-params="{
                openIn: 'customModal',
                header: true,
                footer: true,
                dateFormat: 'yyyy-mm-dd',
              }"
            ></f7-list-input>
            <f7-list-input
              outline
              label="ເລືອກວັນທີສິ້ນສຸດ"
              placeholder="ເລືອກ"
              type="datepicker"
              @change="date[1] = $event.target.value"
              :calendar-params="{
                openIn: 'customModal',
                header: true,
                footer: true,
                dateFormat: 'yyyy-mm-dd',
              }"
            ></f7-list-input>
          </f7-list>
        </div>
        <div class="col-33">
          <f7-button outline @click="graph_HT">ສະແດງ</f7-button>
        </div>
      </f7-row>
    </f7-card>

    <f7-card v-for="(item, i) in graph_data" :key="i">
      <v-row justify="center">
        <strong class="ma-3">{{ item.series[0].name }}</strong>
      </v-row>
    
    </f7-card>

    <!-- <f7-area-chart
        tooltip
        axis
        :axis-labels="dates"
        legend
        toggle-datasets
        line-chart
        :format-axis-label="(date) => axisDateFormat.format(date)"
        :format-tooltip-axis-label="(date) => tooltipDateFormat.format(date)"
        :datasets="[
          {
            label: 'Red data',
            color: '#f00',
            values: [0, 300, 127, 47],
          },
          {
            label: 'Blue data',
            color: '#00f',
            values: [0, 75, 133, 237],
          },
          {
            label: 'Green data',
            color: '#0f0',
            values: [0, 100, 250, 307],
          },
        ]"
      /> <LineChart :chart-data='datacollecttion'/> -->
  </f7-page>
</template>

<script>
import { http } from "../../http";
// // import { Line } from "vue-chartjs";
// // import LineChart from "../projects/testRE.vue";
// import ApexChart from "vue-apexcharts";

export default {
  // // extends: Line,
  // components: {
  //   // LineChart,
  //   apexchart: ApexChart,
  // },
  setup() {
    // helpers data for axis

    const dates = [];
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth();
    for (let i = 0; i < 4; i += 1) {
      dates.push(new Date(year, month - (3 - i)));
    }
    const axisDateFormat = Intl.DateTimeFormat(undefined, {
      date: "numeric",
      month: "short",
      time: "numeric",
    });
    const tooltipDateFormat = Intl.DateTimeFormat(undefined, {
      date: "numeric",
      month: "numeric",
      year: "numeric",
    });
    return {
      dates,
      axisDateFormat,
      tooltipDateFormat,
    };
  },
  data() {
    return {
      val: 1,
      date: [],
      device_data: "",
      sub_id: "",
      pro_id: "",
      project_data: "",
      graph_data: [],
      showinput: false,

      datacollecttion: null,
      loading: false,
      timestamp: "",
      chartOptions: {
        chart: {
          id: "kaded-connect",
          zoom: {
            autoScaleYaxis: true,
          },
          toolbar: {
            export: {
              csv: {
                headerCategory: "time",
                dateFormatter(timestamp) {
                  return new Date(timestamp).toISOString();
                },
              },
            },
          },
        },
        dataLabels: {
          enabled: false,
        },
        stroke: {
          width: 1,
          curve: "straight",
        },
        markers: {
          size: 0.5,
          colors: ["#d65660"],
          strokeColors: "#2f61e0",
          strokeWidth: 1,
          hover: {
            size: 1,
          },
        },
        xaxis: {
          type: "datetime",
        },
        tooltip: {
          x: {
            format: "dd MMM HH:mm",
          },
        },
        fill: {
          type: "gradient",
          gradient: {
            shade: "dark",
            gradientToColors: ["#FDD835"],
            shadeIntensity: 1,
            type: "horizontal",
            opacityFrom: 1,
            opacityTo: 1,
            stops: [0, 100, 100, 100],
          },
        },
      },
    };
  },
  mounted() {
    this.fecth_pro();
    // this.renderChart(this.chartdata, this.options);
    // const user = JSON.parse(localStorage.getItem("info-user"));
    // this.firstname = user.firstname;
    // this.lastname = user.lastname;
  },
  methods: {
   
    getNow: function () {
      const today = new Date();
      const date =
        today.getFullYear() +
        "-" +
        (today.getMonth() + 1) +
        "-" +
        today.getDate();
      const time =
        today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
      const dateTime = date + " " + time;
      this.timestamp = dateTime;
    },
    get_sub() {
      console.log("this:" + this.date);
    },
    totimestramp1(date) {
      return (
        new Date(date).toISOString().substring(0, 10) +
        " " +
        new Date(new Date().setHours(0, 0, 0, 0)).toTimeString().substring(0, 8)
      );
      // dates = new Date(date);
      // year = dates.getFullYear();
      // month = dates.getMonth() + 1;
      // dt = dates.getDate();

      // if (dt < 10) {
      //   dt = "0" + dt;
      // }
      // if (month < 10) {
      //   month = "0" + month;
      // }
    },
    totimestramp2(date) {
      return (
        new Date(date).toISOString().substring(0, 10) +
        " " +
        new Date(new Date().setHours(23, 59, 59, 999))
          .toTimeString()
          .substring(0, 8)
      );
    },
    reverseData: function () {
      if (this.date[0] > this.date[1]) {
        this.date = this.date.reverse();
      }
    },
    graph_HT: function () {
      console.log(
        "sub: " + this.sub_id,
        +"rrr" +
          this.totimestramp1(this.date[0]) +
          "-" +
          this.date[1] +
          "min" +
          this.val
      );
      // this.reverseData();
      http
        .get("/api/report", {
          params: {
            sub_id: this.sub_id,
            time1: this.totimestramp1(this.date[0]),
            time2: this.totimestramp2(this.date[1]),
            min: this.val,
          },
        })
        .then((Response) => {
          if (Response.status === 200) {
            var data_set = Response.data;
            this.graph_data = data_set;
            // this.overlay = false;
            //this.table = false;
            // this.graph = true;
            console.log(
              "sub: " + this.sub_id,
              +"rr" + JSON.stringify(this.graph_data) + "min" + this.val
            );
          }
        });
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

            // this.project_Name = response.data;

            console.log(this.device_data);
          }
        })
        .catch(() => {});
    },
    fecth_pro: function () {
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
  computed() {
    if (this.pro_id != "") {
      this.fatch_device();
    }
    console.log(this.pro_id);
  },
};
</script>

<style scoped>
.showDate {
  align-items: center;
}
</style>

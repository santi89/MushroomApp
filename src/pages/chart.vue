<template>
  <f7-page class="font">
  <div class="small">
    <apexcharts :options="this.chartOptions" :series="this.series" />
    <!-- <button @click="fillData()">Randomize</button> -->
     <f7-area-chart
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
        }
      ]"
    />
  </div>
    <f7-page>
</template>

<script>
// import a from './testRE.js'
// import { VueApexCharts } from "vue-apexcharts";

export default {
  // components: {
  //   apexcharts: () => import("vue-apexcharts"),
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
      datacollection: null,

      chartOptions: {
        chart: {
          id: "vuechart-example",
          type: "line",
        },
        xaxis: {
          type: "numberic",
        },
      },
      series: [
        {
          name: "series-1",
          data: [
            [30, 40],
            [35, 50],
            [49, 60],
            [70, 91],
            [87, 125],
          ],
        },
      ],
    };
  },
  mounted() {
    // this.renderData(this.options,this.series)
    // this.renderChart(th, this.options)
  },
  methods: {},
};
</script>

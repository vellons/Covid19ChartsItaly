<template>
  <div class="chart-tamponi">
    <BoxContainer :height="height" :minHeight="minHeight" :title="'Totale tamponi: ' + total" :loading="chartLoading">
      <apexchart v-if="!chartLoading" type="area" :options="chartOptions" :series="chartSeries"/>
    </BoxContainer>
  </div>
</template>

<script>
  import BoxContainer from "@/components/global/BoxContainer";
  import {chartMixins} from "@/mixins/ChartMixins";

  export default {
    name: "chart-tamponi",
    components: {BoxContainer},
    mixins: [chartMixins],
    props: {
      height: {default: "100%"},
      minHeight: {default: "300px"}
    },
    data: () => ({
      chartLoading: true,
      chartOptions: {},
      chartSeries: [
        {
          name: "Tamponi",
          data: []
        },
        {
          name: "Nuovi positivi",
          data: []
        }
      ],
      total: ""
    }),
    mounted() {
      this.chartOptions = this.getChartAreaOptions("apex-chart-tamponi")
      this.chartOptions.colors = ["#228b22", "#ffa547"]
      this.downloadData()
    },
    methods: {
      downloadData: function () {
        this.chartLoading = true
        let url = "https://raw.githubusercontent.com/pcm-dpc/COVID-19/master/dati-json/dpc-covid19-ita-andamento-nazionale.json"
        this.$http.get(url).then((response) => {
          if (response.status === 200 && response.body && response.body.length > 1) {
            this.total = response.body[response.body.length - 1].tamponi
            let yesterday = 0
            response.body.forEach((item => {
              this.chartSeries[0].data.push(item.tamponi - yesterday)
              this.chartSeries[1].data.push(item.nuovi_positivi)
              this.chartOptions.xaxis.categories.push(item.data)
              yesterday = item.tamponi
            }))
            this.chartLoading = false
          }
        })
      }
    }
  }
</script>

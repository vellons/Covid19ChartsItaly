<template>
  <div class="chart-percent-positivi-tamponi">
    <BoxContainer :height="height" :minHeight="minHeight" :title="'Percentuale nuovi positivi al tampone'" :centerContent="true"
                  :loading="chartLoading">
      <apexchart v-if="!chartLoading" type="area" :options="chartOptions" :series="chartSeries"/>
    </BoxContainer>
  </div>
</template>

<script>
  import BoxContainer from "@/components/global/BoxContainer";
  import {chartMixins} from "@/mixins/ChartMixins";

  export default {
    name: "chart-percent-positivi-tamponi",
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
          name: "Nuovi positivi/Tamponi*100",
          data: []
        }
      ],
      total: ""
    }),
    mounted() {
      this.chartOptions = this.getChartAreaOptions("apex-chart-percent-positivi-tamponi")
      this.chartOptions.colors = ["#ffa547"]
      this.chartOptions.tooltip.y = {
        formatter: function (value) {
          return value + "%"
        }
      }
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
              let tamponi = item.tamponi - yesterday
              let positivi = item.nuovi_positivi
              this.chartSeries[0].data.push((positivi / tamponi * 100).toFixed(2))
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

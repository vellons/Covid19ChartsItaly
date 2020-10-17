<template>
  <div class="chart-nuovi-positivi-regione">
    <BoxContainer :height="height" :minHeight="minHeight" :title="'Regioni con più nuovi positivi'" :loading="chartLoading">
      <apexchart v-if="!chartLoading" type="bar" :options="chartOptions" :series="chartSeries"/>
    </BoxContainer>
  </div>
</template>

<script>
  import BoxContainer from "@/components/global/BoxContainer";
  import {chartMixins} from "@/mixins/ChartMixins";

  export default {
    name: "chart-nuovi-positivi-regione",
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
          name: "Nuovi positivi",
          data: []
        }
      ],
    }),
    mounted() {
      this.chartOptions = this.getChartBarOptions("apex-chart-nuovi-positivi-regione")
      this.chartOptions.colors = ["#ffa547"]
      this.downloadData()
    },
    methods: {
      downloadData: function () {
        this.chartLoading = true
        let url = "https://raw.githubusercontent.com/pcm-dpc/COVID-19/master/dati-json/dpc-covid19-ita-regioni-latest.json"
        this.$http.get(url).then((response) => {
          if (response.status === 200 && response.body && response.body.length > 1) {
            let regioni = response.body
            regioni = regioni.sort((a,b) => (a.nuovi_positivi < b.nuovi_positivi) ? 1 : ((b.nuovi_positivi < a.nuovi_positivi) ? -1 : 0))
            for (let i = 0; i < 10; i++) {
              this.chartOptions.xaxis.categories.push(regioni[i].denominazione_regione)
              this.chartSeries[0].data.push(regioni[i].nuovi_positivi)
            }
            this.chartLoading = false
          }
        })
      }
    }
  }
</script>

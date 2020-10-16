<template>
  <div class="chart-condizione-positivi">
    <BoxContainer :height="height" :minHeight="minHeight" :title="'Condizione positivi'" :loading="chartLoading">
      <apexchart v-if="!chartLoading" type="area" :options="chartOptions" :series="chartSeries"/>
    </BoxContainer>
  </div>
</template>

<script>
  import BoxContainer from "@/components/global/BoxContainer";
  import {chartMixins} from "@/mixins/ChartMixins";

  export default {
    name: "chart-condizione-positivi",
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
          name: "Isolamento domiciliare",
          data: []
        },
        {
          name: "Ricoverati",
          data: []
        },
        {
          name: "Terapia intensiva",
          data: []
        }
      ],
    }),
    mounted() {
      this.chartOptions = this.getChartAreaOptions("apex-chart-condizione-positivi")
      this.chartOptions.colors = ["#0040ff", "#ffd500", "#ff2600"]
      this.downloadData()
    },
    methods: {
      downloadData: function () {
        this.chartLoading = true
        let url = "https://raw.githubusercontent.com/pcm-dpc/COVID-19/master/dati-json/dpc-covid19-ita-andamento-nazionale.json"
        this.$http.get(url).then((response) => {
          if (response.status === 200 && response.body && response.body.length > 1) {
            response.body.forEach((item => {
              this.chartSeries[0].data.push(item.isolamento_domiciliare)
              this.chartSeries[1].data.push(item.ricoverati_con_sintomi)
              this.chartSeries[2].data.push(item.terapia_intensiva)
              this.chartOptions.xaxis.categories.push(item.data)
            }))
            this.chartLoading = false
          }
        })
      }
    }
  }
</script>

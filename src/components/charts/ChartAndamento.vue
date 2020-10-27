<template>
  <div class="chart-andamento">
    <BoxContainer :height="height" :minHeight="minHeight" :title="'Andamento italiano'" :loading="chartLoading">
      <apexchart ref="apexAndamento" v-if="!chartLoading" type="area" :options="chartOptions" :series="chartSeries"/>
    </BoxContainer>
  </div>
</template>

<script>
  import BoxContainer from "@/components/global/BoxContainer";
  import {chartMixins} from "@/mixins/ChartMixins";

  export default {
    name: "chart-andamento",
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
          name: "Dimessi/Guariti",
          data: []
        },
        {
          name: "Attuali positivi",
          data: []
        },
        {
          name: "Deceduti",
          data: []
        },
        {
          name: "Totale casi",
          data: []
        }
      ],
    }),
    mounted() {
      this.chartOptions = this.getChartAreaOptions("apex-chart-andamento")
      this.chartOptions.colors = ["#228b22", "#ffa547", "#e60000", "#8a4343"]
      this.downloadData()
    },
    methods: {
      downloadData: function () {
        this.chartLoading = true
        let url = "https://raw.githubusercontent.com/pcm-dpc/COVID-19/master/dati-json/dpc-covid19-ita-andamento-nazionale.json"
        this.$http.get(url).then((response) => {
          if (response.status === 200 && response.body && response.body.length > 1) {
            response.body.forEach((item => {
              this.chartSeries[0].data.push(item.dimessi_guariti)
              this.chartSeries[1].data.push(item.totale_positivi)
              this.chartSeries[2].data.push(item.deceduti)
              this.chartSeries[3].data.push(item.totale_casi)
              this.chartOptions.xaxis.categories.push(item.data)
            }))
            this.chartLoading = false
            setTimeout(() => {
              try {
                this.$refs.apexAndamento.toggleSeries("Totale casi")
              } catch (error) {
                console.error("Error: ", error.message)
              }
            }, 150); // Disable
          }
        })
      }
    }
  }
</script>

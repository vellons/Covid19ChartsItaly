<template>
  <div class="chart-tamponi">
    <BoxContainer :height="'400px'" :title="'Totale tamponi ' + total" :centerContent="true" :loading="chartLoading">
      <apexchart v-if="!chartLoading" type="area" :options="chartOptions" :series="chartSeries"/>
    </BoxContainer>
  </div>
</template>

<script>
  import BoxContainer from "@/components/global/BoxContainer";

  export default {
    name: "chart-tamponi",
    components: {BoxContainer},
    data: () => {
      return {
        chartLoading: true,
        chartOptions: {
          chart: {
            id: "apex-chart-tamponi",
            locales: [{
              name: 'it',
              options: {
                months: ['Gennaio', 'Febbraio', 'Marzo', 'Aprile', 'Maggio', 'Giugno', 'Luglio', 'Agosto', 'Settembre', 'Ottobre', 'Novembre', 'Dicembre'],
                shortMonths: ['Gen', 'Feb', 'Mar', 'Apr', 'Mag', 'Giu', 'Lug', 'Ago', 'Set', 'Ott', 'Nov', 'Dic'],
                days: ['Domenica', 'Lunedì', 'Martedì', 'Mercoledì', 'Giovedì', 'Venerdì', 'Sabato'],
                shortDays: ['Dom', 'Lun', 'Mar', 'Mer', 'Gio', 'Ven', 'Sab'],
                toolbar: {
                  download: 'Download SVG',
                  selection: 'Seleziona',
                  selectionZoom: 'Seleziona Zoom',
                  zoomIn: 'Zoom dentro',
                  zoomOut: 'Zoom fuori',
                  pan: 'Muoviti',
                  reset: 'Reset Zoom',
                }
              }
            }],
            defaultLocale: "it",
            toolbar: {
              show: false
            }
          },
          theme: {
            mode: "light",
          },
          xaxis: {
            type: "datetime",
            categories: []
          },
          dataLabels: {
            enabled: false
          }
        },
        chartSeries: [
          {
            name: "Tamponi",
            data: []
          },
          {
            name: "Positivi",
            data: []
          }
        ],
        total: ""
      }
    },
    mounted() {
      this.chartOptions.theme.mode = this.chartTheme()
      this.downloadData()
    },
    methods: {
      chartTheme: function () {
        if (localStorage.userTheme === "dark") return "dark"
        else return "light"
      },
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
              this.chartSeries[0].data.push(tamponi)
              this.chartSeries[1].data.push(positivi)
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

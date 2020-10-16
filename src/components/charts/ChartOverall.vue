<template>
  <div class="chart-overall">
    <div class="overall-container">
      <div v-for="card in covidCards" class="covid-card md-elevation-5" :key="card.title">
        <div class="left">
          <div class="title">{{card.title}}</div>
          <div class="explained">
            <div class="number">{{card.number}}</div>
            <div class="difference">{{card.difference}}</div>
          </div>
        </div>
        <div class="right">
          <div class="percentage">{{card.percentage}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "chart-overall",
    props: {
      height: {default: "100%"},
      minHeight: {default: "50px"}
    },
    data: () => ({
      loading: true,
      covidCards: []
    }),
    mounted() {
      //let colors = ["#ffa547", "#228b22", "#e60000"]
      this.downloadData()
    },
    methods: {
      downloadData: function () {
        this.loading = true
        let url = "https://raw.githubusercontent.com/pcm-dpc/COVID-19/master/dati-json/dpc-covid19-ita-andamento-nazionale.json"
        this.$http.get(url).then((response) => {
          if (response.status === 200 && response.body && response.body.length > 1) {
            let meno2 = response.body[response.body.length - 3]
            let meno1 = response.body[response.body.length - 2]
            let meno0 = response.body[response.body.length - 1]
            console.log(meno1, meno0)
            this.covidCards = [
              {
                "title": "Nuovi positivi",
                "number": meno0.nuovi_positivi,
                "difference": this.toStringPlus(meno0.nuovi_positivi - meno1.nuovi_positivi),
                "percentage": this.toStringPlus((meno0.nuovi_positivi - meno1.nuovi_positivi) / meno1.nuovi_positivi * 100) + "%",
                "tooltip": "Nuovi positivi al Covid-19. Ieri erano " + (meno1.nuovi_positivi)
              },
              {
                "title": "Decessi giornalieri",
                "number": meno0.deceduti - meno1.deceduti,
                "difference": this.toStringPlus((meno0.deceduti - meno1.deceduti) - (meno1.deceduti - meno2.deceduti)),
                "percentage": this.toStringPlus(((meno0.deceduti - meno1.deceduti) - (meno1.deceduti - meno2.deceduti)) / (meno1.deceduti - meno2.deceduti) * 100) + "%",
                "tooltip": "Decessi per Covid-19 avvenuti. Ieri erano " + (meno1.deceduti - meno2.deceduti)
              },
              {
                "title": "Terapia intensiva",
                "number": meno0.terapia_intensiva - meno1.terapia_intensiva,
                "difference": this.toStringPlus((meno0.terapia_intensiva - meno1.terapia_intensiva) - (meno1.terapia_intensiva - meno2.terapia_intensiva)),
                "percentage": this.toStringPlus(((meno0.terapia_intensiva - meno1.terapia_intensiva) - (meno1.terapia_intensiva - meno2.terapia_intensiva)) / (meno1.terapia_intensiva - meno2.terapia_intensiva) * 100) + "%",
                "tooltip": "Persone che sono state ricoverate in terapia intensiva. Ieri erano " + (meno1.terapia_intensiva - meno2.terapia_intensiva)
              }
            ]
            this.loading = false
          }
        })
      },
      toStringPlus: function (x) {
        x = parseInt(x)
        if (x === 0) return x.toString()
        if (x < 0) return x.toString()
        if (x > 0) return "+" + x.toString()
      }
    }
  }
</script>

<style lang="scss">
  .chart-overall {
    padding: 8px;

    .overall-container {
      height: 100%;
      //box-sizing: border-box;
      //border: 1px solid #bbbbbb !important;
      //border-radius: 10px;
      //padding: 10px;

      .covid-card {
        border: 1px solid #bbbbbb;
        border-radius: 10px;
        padding: 5px 15px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 80px;
        width: 250px;

        .left {
          display: flex;
          flex-direction: column;

          .title {
            font-weight: bold;
            font-size: 120%;
            margin-bottom: 5px;
          }

          .explained {
            display: flex;
            align-items: center;

            .number {
              margin-right: 5px;
              font-weight: bold;
            }

            .difference {
              &::before {
                content: "(";
              }
              &::after {
                content: ")";
              }
            }
          }
        }

        .right {
          .percentage {
            font-weight: bold;
            font-size: 150%;
          }
        }
      }
    }
  }
</style>

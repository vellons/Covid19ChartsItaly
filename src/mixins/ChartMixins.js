export const chartMixins = {
  data: () => ({}),
  methods: {
    getChartLang: function () {
      return "it"
    },
    getChartTheme: function () {
      if (localStorage.userTheme === "dark") return "dark"
      else return "light"
    },
    getChartLocales: function () {
      return [{
        name: "it",
        options: {
          months: ["Gennaio", "Febbraio", "Marzo", "Aprile", "Maggio", "Giugno", "Luglio", "Agosto", "Settembre", "Ottobre", "Novembre", "Dicembre"],
          shortMonths: ["Gen", "Feb", "Mar", "Apr", "Mag", "Giu", "Lug", "Ago", "Set", "Ott", "Nov", "Dic"],
          days: ["Domenica", "Lunedì", "Martedì", "Mercoledì", "Giovedì", "Venerdì", "Sabato"],
          shortDays: ["Dom", "Lun", "Mar", "Mer", "Gio", "Ven", "Sab"],
          toolbar: {
            download: "Download SVG",
            selection: "Seleziona",
            selectionZoom: "Seleziona un area per zoommare",
            zoomIn: "Zoom dentro",
            zoomOut: "Zoom fuori",
            pan: "Muoviti",
            reset: "Reset Zoom",
          }
        }
      }]
    },
    getChartAreaOptions: function (chartID) {
      return {
        chart: {
          id: chartID,
          locales: this.getChartLocales(),
          defaultLocale: this.getChartLang(),
          toolbar: {
            show: true,
            tools: {
              download: false,
              selection: false,
              zoom: true,
              zoomin: false,
              zoomout: false,
              pan: false,
              reset: true
            },
          },
          width: "100%"
        },
        theme: {
          mode: this.getChartTheme(),
        },
        xaxis: {
          type: "datetime",
          categories: [] // Categories will be added here
        },
        markers: {
          hover: {
            sizeOffset: 5
          }
        },
        stroke: {
          show: true,
          curve: 'smooth',
          width: 2.2,
        },
        dataLabels: {
          enabled: false
        },
        tooltip: {
          x: {
            show: false
          }
        }
      }
    },
    getChartBarOptions: function (chartID) {
      return {
        chart: {
          id: chartID,
          locales: this.getChartLocales(),
          defaultLocale: this.getChartLang(),
          stacked: true,
          toolbar: {
            show: true,
            tools: {
              download: false,
              selection: false,
              zoom: true,
              zoomin: false,
              zoomout: false,
              pan: false,
              reset: true
            },
          },
          width: "100%"
        },
        theme: {
          mode: this.getChartTheme(),
        },
        plotOptions: {
          bar: {
            horizontal: false,
            dataLabels: {
              enabled: false,
              //position: 'top'
            }
          },
        },
        xaxis: {
          type: "string",
          categories: [] // Categories will be added here
        },
        tooltip: {
          enabled: true,
          shared: true,
          followCursor: true
        }
      }
    }
  }
}

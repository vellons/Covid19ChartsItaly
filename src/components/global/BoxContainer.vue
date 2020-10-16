<template>
  <div class="global-box-container">
    <div class="content-container" :style="{'height' : height}">
      <md-content :md-theme="theme" class="md-elevation-10 content-area" :style="{'min-height' : minHeight}">
        <div v-if="title" class="box-title">
          <span>{{title}}</span>
        </div>
        <div v-if="showSpinnerLoading" class="loader">
          <md-progress-spinner class="md-accent" md-mode="indeterminate"/>
        </div>
        <div v-if="showContent" class="content-slot" :class="{'center-content': centerContent}">
          <slot/>
        </div>
      </md-content>
    </div>
  </div>
</template>

<script>
  export default {
    name: "BoxContainer",
    props: {
      height: {
        default: '100%'
      },
      minHeight: {
        default: '100px'
      },
      loading: {
        default: false
      },
      title: {
        default: ""
      },
      centerContent: {
        default: false
      },
      theme: {
        default: ""
      }
    },
    data: () => ({
      showSpinnerLoading: true,
      showContent: false,
    }),
    mounted() {
      this.showSpinnerLoading = this.loading;
      if (!this.loading) this.showContent = true;
    },
    watch: {
      loading: function () {
        this.showSpinnerLoading = this.loading;
        if (!this.showSpinnerLoading) {
          setTimeout(() => (this.showContent = true), 25);
        } else {
          this.showContent = false;
        }
      }
    }
  }
</script>

<style lang="scss">
  .global-box-container {
    .content-container {
      padding: 8px;

      .content-area {
        box-sizing: border-box;
        border: 1px solid #bbbbbb !important;
        border-radius: 10px;
        padding: 10px;
        height: 100%;
        display: flex;
        flex-direction: column;

        .box-title {
          span {
            margin: 0;
            font-size: 120%;
            font-weight: bold;
          }
        }

        .loader {
          flex-grow: 1;
          align-items: center;
          margin: 0 auto;
          display: flex;
        }

        .content-slot {
          flex-grow: 1;
          overflow: hidden;

          &.center-content {
            display: flex;
            align-items: center;
            justify-content: center;
          }
        }
      }
    }
  }
</style>

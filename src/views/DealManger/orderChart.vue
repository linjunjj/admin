<template>
  <div :class="className" :style="{height:height,width:width}"></div>
</template>

<script>
  import echarts from 'echarts';
  require('echarts/theme/macarons'); // echarts 主题

  export default {
    props: {
      className: {
        type: String,
        default: 'chart'
      },
      width: {
        type: String,
        default: '100%'
      },
      height: {
        type: String,
        default: '300px'
      },
      data: {
        required: true,
        type: Object
      },
    },
    data() {
      return {
        chart: null,
        data:this.data
      };
    },
    mounted() {
      this.initChart();
    },
    beforeDestroy() {
      if (!this.chart) {
        return;
      }
      this.chart.dispose();
      this.chart = null;
    },
    methods: {
      initChart() {
        this.chart = echarts.init(this.$el, 'macarons');

        this.chart.setOption({
          title: {
            text: '本月订单进度',
            x: 'center'
          },
          tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b} : {c} ({d}%)'
          },
          legend: {
            x: 'center',
            y: 'bottom',
            data: ['收入', '支出']
          },
          calculable: true,
          series: [
            {
              name: '本周订单进度',
              type: 'pie',
              roseType: 'radius',
              data: [
                { value: this.data[0], name: '收入' },
                { value: this.data[1], name: '支出' },
              ]
            }
          ]
        });
      }
    }
  };
</script>

<template>
  <div :class="className" :style="{height:height,width:width}" v-loading="listLoading"></div>
</template>

<script>
  import echarts from 'echarts';
  require('echarts/theme/macarons'); // echarts 主题
  import { debounce } from '../../assets/js/tool';


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
      autoResize: {
        type: Boolean,
        default: true
      },
      data: {
        required: true,
        default: 0,
        type: Array
      },
      month: {
        required: true,
        default: 0,
        type: Array
      },
    },
    data() {
      return {
        chart: null,
        data:this.data,
        month:this.month,
      };
    },
    mounted() {
      this.listLoading=true;
      setTimeout(()=>{
        this.initChart();
        this.listLoading=false
      },1000)
      if (this.autoResize) {
        this.__resizeHanlder = debounce(() => {
          this.chart.resize();
        }, 100);
        window.addEventListener('resize', this.__resizeHanlder);
      }

      // 监听侧边栏的变化
      const sidebarElm = document.getElementsByClassName('sidebar-container')[0];
      sidebarElm.addEventListener('transitionend', this.__resizeHanlder);
    },
    created(){
      setTimeout(()=>{
        this.initChart();
      })
    },
    beforeDestroy() {
      if (!this.chart) {
        return;
      }
      if (this.autoResize) {
        window.removeEventListener('resize', this.__resizeHanlder);
      }
      const sidebarElm = document.getElementsByClassName('sidebar-container')[0];
      sidebarElm.removeEventListener('transitionend', this.__resizeHanlder);
      this.chart.dispose();
      this.chart = null;
    },

    methods: {
      initChart() {
        console.log(this.month);
        console.log(this.month);
        this.chart = echarts.init(this.$el, 'macarons');
        this.chart.setOption({
          title: {
            text: '新增用户数量',
            x: 'center'
          },
          xAxis: {
            data: this.month,
            boundaryGap: false
          },
          grid: {
            left: 10,
            right: 10,
            bottom: 20,
            containLabel: true
          },

          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'cross'
            }
          },
          yAxis: {},
          series:

            {
              name: 'buyers',
              smooth: true,
              type: 'line',
              itemStyle: {
                normal: {
                  color: 'rgba(2, 197, 233, 0.2)',
                  lineStyle: {
                    color: 'rgba(2, 197, 233, 0.2)'
                  },
                  areaStyle: {
                    color: 'rgba(99,194,255, 0.6)'
                  }
                }
              },
              data: this.data,
            }
        });
      }
    }
  };

</script>

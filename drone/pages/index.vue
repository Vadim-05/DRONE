<template>
  <div class="main-content">
    <NuxtImg class="drone position-absolute" :style="droneStyle" src="/drone.jpg"/>
    <v-btn class="stop-flight position-absolute" v-if="button" @click="startFlight">start</v-btn>
    <v-btn class="stop-flight position-absolute" v-else-if="button === false" @click="stopFlight(true)">stop</v-btn>
  </div>
  <modalMessage/>
</template>

<script>
import data from '~/data.json';
export default {
  data() {
    return {
      droneStyle: {
        transform: 'translate(0%, 0%)', 
      },
      flightData: data,
      flightInterval: null,
      button: true,
    };
  },
  methods: {
   startFlight(){
    this.button=false
    let totalTime = 0;
    this.flightInterval = setInterval(() => {
      if(this.flightData.length > 0){
        this.updatePosition(this.flightData.shift());
      }else if(this.flightData.length == 0){
        this.stopFlight(null)
        this.$bus.$emit('dataModalWindow',{
          status:'Політ завершений.',
        });
      } else {
        clearInterval(this.flightInterval);
        }
      },1000);
   },
   async stopFlight(statusBtn){
      clearInterval(this.flightInterval);
      this.droneStyle.transform = 'translate(0%, 0%)';
      this.button=statusBtn
    },
    updatePosition(data) {
      const { speed, direction } = data;
      const distance = (speed / 3600) * 1000; // Конвертація км/год в м/с
      const dx = distance * Math.cos(direction * (Math.PI / 180)); // Зміщення по x
      const dy = distance * Math.sin(direction * (Math.PI / 180)); // Зміщення по y
      this.droneStyle.transform = `translate(${dx}px, ${dy}px)`;
    },
  },
};
</script>

<style scoped lang="scss">
@import '~/scss/mainColors.scss';
.position-absolute{
  position: absolute;
  right: 50%;
}
.drone {
  top: 50%;
  width: 80px;
  height: 80px;
  transition: all 1s ease-in-out;
}
.stop-flight{
  transform: translate(0%, 0%);
  top: 70%;
  width: 80px;
  height: 40px;
  background: $btn-background;
  color: white;
  font-size: 17px;
  border-radius: none;
  cursor: pointer;
}
.main-content{
  height: 90vh;
  background: bottom;
  display: block;
  width: 100%;
}
</style>

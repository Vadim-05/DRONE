<template>
  <v-dialog class="v-dialog" v-model="dialog" width="auto">
    <v-card class="v-card">
      <v-card-actions class="flex-end">
        <img class="close-modal-picture" @click="dialog = false" src="/closeModal.png"/>
      </v-card-actions>
      <v-card-title v-if='statusMessage' class="font-open-sans text-center">
        {{ statusMessage }}
      </v-card-title>
    </v-card>
  </v-dialog>
</template>

<script setup>
var dialog = ref(false);

const statusMessage = ref('');
const message = ref('');
const bus = useNuxtApp().$bus

bus.$on('dataModalWindow', (data) => {
  dialog.value = true;
  statusMessage.value = data.status;
});
</script>
<style scoped >
.v-card .v-card-title{
  padding-bottom: 30px;
}
.v-dialog > .v-overlay__content > .v-card, .v-dialog > .v-overlay__content > form > .v-card{
  border: 3px solid silver;
  width: 300px;
}
.close-modal-picture{
  width: 20px;
  cursor: pointer;
}
.v-dialog > .v-overlay__content{
  max-width: 400px ;
}
</style>
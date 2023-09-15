<template>
  <ion-content class="ion-padding">
    <h1>Create Party</h1>

    <form action="#">

      <ion-item>
        <ion-input label="Part name"></ion-input>
      </ion-item>

      <ion-item>
        <label for="">When is the party?</label>
        <ion-datetime value="2022-04-21T00:00:00" min="2022-03-01T00:00:00" max="2024-05-31T23:59:59"></ion-datetime>
      </ion-item>
      <ion-button>Submit</ion-button>
    </form>
  </ion-content>
</template>

<script setup lang="ts">
 //TODO: For store perhaps use Pinia
</script>


<style scoped>

</style>
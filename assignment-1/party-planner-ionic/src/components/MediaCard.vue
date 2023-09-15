<template>
  <ion-card>
    <img :src="imageUrl" alt="Media Image" />
    <ion-card-header>
      <ion-card-title>{{ title }}</ion-card-title>
      <ion-card-subtitle>{{ location }}</ion-card-subtitle>
    </ion-card-header>

    <ion-card-content>
      <p>{{ description }}</p>
    </ion-card-content>
  </ion-card>
</template>

<script lang="ts">
import { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle } from '@ionic/vue';
import { defineComponent } from 'vue';

export default defineComponent({
  components: {
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonCardSubtitle,
    IonCardTitle
  },
  props: {
    title: String,
    imageUrl: String,
    description: String,
    location: String
  }
});
</script>
<template>
  <ion-card>
    <img :src="party.imageUrl" alt="Media Image" />
    <ion-card-header>
      <ion-card-title>{{ party.title }}</ion-card-title>
      <ion-card-subtitle>{{ party.location }}</ion-card-subtitle>
    </ion-card-header>

    <ion-card-content>
      <p>{{ party.description }}</p>
    </ion-card-content>
  </ion-card>
</template>

<script setup lang="ts">
  import type { Party } from '@/types/party';

  import {
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonCardSubtitle,
    IonCardTitle
  } from '@ionic/vue';

  interface Props {
    party: Party;
  }

  defineProps<Props>();
</script>
<template>
  <ion-card class="party-card">
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
import type { Party } from '@/types/Party';

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

<style scoped>
  .party-card {
    border-left: 5px solid var(--ion-color-primary);
    box-shadow: 0 2px 4px rgba(0, 0, 0, .20);
  }
</style>
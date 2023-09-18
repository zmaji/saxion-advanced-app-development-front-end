<template>
  <ion-card>
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
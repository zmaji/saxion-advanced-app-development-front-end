<template>
  <ion-modal ref="partyModal">
    <ion-header>
      <ion-toolbar>
        <ion-title>{{ party.title }}</ion-title>

        <ion-buttons slot="end">
          <ion-button @click="closeModal">Close</ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>

    <ion-content>
      <ion-card>
        <ion-card-header>
          <ion-card-title>{{ party.location }}</ion-card-title>
        </ion-card-header>

        <ion-card-content>
          {{ party.description }}
        </ion-card-content>
      </ion-card>
    </ion-content>
  </ion-modal>
</template>

<script setup lang="ts">
import type { Party } from '@/types/Party';

import { ref, defineProps, defineEmits } from 'vue';
import {
  IonModal,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonButton,
  IonContent,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent
} from '@ionic/vue';

interface Props {
  party: Party,
}

defineProps<Props>();

const partyModal = ref();
const emit = defineEmits();

const closeModal = () => {
  partyModal.value.$el.dismiss(null, 'cancel');
  emit('modal-closed');
};
</script>
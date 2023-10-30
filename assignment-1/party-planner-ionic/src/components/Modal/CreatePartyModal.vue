<template>
  <ion-modal ref="createPartyModal" trigger="open-createPartyModal" @willDismiss="onWillDismiss">
    <ion-header class="ion-padding">
      <ion-title>
        Create a party
      </ion-title>
    </ion-header>

    <ion-content class="ion-padding">
      <ion-item>
        <ion-label position="stacked" class="ion-padding-bottom">Name the party</ion-label>

        <ion-input v-model="newParty.title" label-placement="floating" type="text" placeholder="Party name"
          aria-label="Party name input" />
      </ion-item>

      <ion-item>
        <ion-label position="stacked" class="ion-padding-bottom">What's the party about?</ion-label>

        <ion-textarea v-model="newParty.description" label-placement="floating" placeholder="Party description"
          aria-label="Party description input" :auto-grow="true" />
      </ion-item>

      <ion-item>
        <ion-label position="stacked" class="ion-padding-bottom">Where is the party?</ion-label>

        <ion-input v-model="newParty.location" label-placement="floating" type="text" placeholder="Party location"
          aria-label="Party location input" />
      </ion-item>

      <ion-item>
        <ion-label position="stacked" class="ion-padding-bottom">When is the party?</ion-label>

        <ion-datetime v-model="newParty.datetime" />
      </ion-item>
    </ion-content>

    <ion-footer class="ion-padding-horizontal">
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-button @click="cancel()">Cancel</ion-button>
        </ion-buttons>

        <ion-buttons slot="end">
          <ion-button :strong="true" @click="confirm()">Submit</ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-footer>
  </ion-modal>
</template>

<script setup lang="ts">
import type { Party } from '@/types/Party';

import { reactive, ref } from 'vue';
import {
  IonButtons,
  IonButton,
  IonDatetime,
  IonFooter,
  IonModal,
  IonHeader,
  IonContent,
  IonToolbar,
  IonTitle,
  IonTextarea,
  IonItem,
  IonInput,
  IonLabel,
} from '@ionic/vue';
import { OverlayEventDetail } from '@ionic/core/components';
import { addPartyToLocalstorage } from "@/helper/PartyHelper";


const emit = defineEmits<{ (event: 'partyCreated', value: Party): void }>();

const createPartyModal = ref();

const newParty: Party = reactive({
  id: 1,
  title: '',
  description: '',
  location: '',
  datetime: new Date().toISOString(),
  attendees: []
});

const cancel = () => createPartyModal.value.$el.dismiss(null, 'cancel');

const confirm = async () => {
  createPartyModal.value.$el.dismiss(newParty, 'confirm');
};

const resetNewParty = (): void => {
  newParty.title = '';
  newParty.description = '';
  newParty.location = '';
  newParty.datetime = new Date().toISOString();
}

const onWillDismiss = (event: CustomEvent<OverlayEventDetail>) => {
  if (event.detail.role === 'confirm') {
    addPartyToLocalstorage(event.detail.data);
    resetNewParty();
    emit('partyCreated', event.detail.data);
  }
};
</script>

<style scoped></style>
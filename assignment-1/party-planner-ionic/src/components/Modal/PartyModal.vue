<template>
  <ion-modal ref="partyModal">
    <ion-header class="ion-padding">
      <ion-title>
        {{ party.title }}
      </ion-title>
    </ion-header>

    <ion-content class="ion-padding">
      <ion-item>
        <ion-label position="stacked" class="ion-padding-bottom">Party location</ion-label>

        <p>{{ party.location }}</p>
      </ion-item>

      <ion-item>
        <ion-label position="stacked" class="ion-padding-bottom">Party description</ion-label>

        <p>{{ party.description }}</p>
      </ion-item>

      <ion-item>
        <ion-label position="stacked" class="ion-padding-bottom">Date and time</ion-label>

        <p>{{ party.datetime }}</p>
      </ion-item>

      <ion-item>
        <ion-label position="stacked" class="ion-padding-bottom">Attendees</ion-label>

        <ion-list v-if="party.attendees.length > 0">
          <p>Attendees</p>

          <ion-item v-for="attendee in party.attendees" :key="attendee.id">
            <p>{{ attendee.name }}</p>

            <ion-icon v-if="attendee.email" name="mail-outline"></ion-icon>
          </ion-item>
        </ion-list>

        <p v-else>Currently no attendees</p>
      </ion-item>

      <ion-content class="ion-padding">
        <ion-button @click="openContactModal(party)">Add Contacts</ion-button>
        </ion-content>

      <ContactsModal :party="party" :is-open="isOpen" @modal-closed="onModalClosed" />
    </ion-content>

    <ion-footer class="ion-padding-horizontal">
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-button :strong="true" :color="'primary'"  @click="shareParty(party)">Share party</ion-button>
        </ion-buttons>

        <ion-buttons slot="end">
          <ion-button @click="closePartyModal">Close</ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-footer>
  </ion-modal>
</template>

<style scoped></style>>

<script setup lang="ts">
import type { Party } from '@/types/Party';

import { ref, defineEmits } from 'vue';
import {
  IonModal,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonButton,
  IonContent,
} from '@ionic/vue';
import { IonIcon, IonLabel } from '@ionic/vue';
import { Share } from '@capacitor/share';
import ContactsModal from './ContactsModal.vue'

interface Props {
  party: Party,
}

const isOpen = ref(false);
const partyModal = ref();
const selectedParty = ref<Party | null>(null);
const emit = defineEmits();

defineProps<Props>();

const shareParty = async (party: Party) => {
  console.log('Entered shareParty function')
  try {
    await Share.share({
      title: party.title,
      text:
        `Hey! You\'re invited to ${party.title} at ${party.location}! \n
        Hope to see you there!`,
      dialogTitle: 'Invited!',
    });
  } catch (error) {
    console.error('Failed sharing the party to this contact:', error);
  }
};

const openContactModal = (party: Party) => {
  console.log('Party from partymodal');
  console.log(party);
  isOpen.value = true;
  selectedParty.value = party;
  console.log('SelectedParty from partymodal');
  console.log(selectedParty.value);
};

const onModalClosed = () => {
  isOpen.value = false;
};

const closePartyModal = () => {
  partyModal.value.$el.dismiss(null, 'cancel');
  emit('modal-closed');
};

</script>

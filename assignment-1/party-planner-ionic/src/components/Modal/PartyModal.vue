<template>
  <ion-modal ref="partyModal">
    <ion-header>
      <ion-toolbar>
        <ion-title>{{ party.title }}</ion-title>
        <ion-buttons slot="end">
          <ion-button @click="closePartyModal">Close</ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>

    <ion-content class="modal-content">
      <h2>{{ party.location }}</h2>
      <p>{{ party.description }}</p>
      <ion-button @click="openContactModal(party)">Add Contacts</ion-button>

      <div class="attendees">
        <h3>Attendees</h3>
        <ul>
          <li v-for="attendee in party.attendees" :key="attendee.id">{{ attendee.name }}</li>
        </ul>
      </div>

      <ContactsModal :party="party" :is-open="isOpen" @modal-closed="onModalClosed" />

    </ion-content>
  </ion-modal>
</template>

//TODO : fix styling, not working
<style scoped>
.note-item {
  display: block;
  margin-top: 5px;
}

.margin-bottom {
  margin-bottom: 10px;
}

.modal-content {
  margin-left: 16px;
}
</style>

<script setup lang="ts">
import type { Party } from '@/types/Party';
import ContactsModal from './ContactsModal.vue'

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

interface Props {
  party: Party,
}

const isOpen = ref(false);
const partyModal = ref();
const selectedParty = ref<Party | null>(null);
const emit = defineEmits();

defineProps<Props>();

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

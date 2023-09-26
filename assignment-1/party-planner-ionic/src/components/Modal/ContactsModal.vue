<template>
  <ion-modal ref="contactModal">
    <ion-header class="ion-padding">
      <ion-title>
        Contacts
      </ion-title>
    </ion-header>

    <ion-content class="ion-padding">
      <ion-button @click="addToParty">Add to party</ion-button>

      <ion-list class="ion-padding-top" v-if="contactResults.length">
        <ion-item v-for="(contact, index) in contactResults" :key="index">
          <ion-checkbox @click="handleCheckboxClick(contact)"></ion-checkbox>
          <ion-label class="ion-margin-start">{{ contact.name.display }}</ion-label>
        </ion-item>
      </ion-list>
    </ion-content>

    <ion-footer class="ion-padding-horizontal">
      <ion-toolbar>
        <ion-buttons slot="end">
          <ion-button @click="closeContactModal">Close</ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-footer>
  </ion-modal>
</template>

<script setup lang="ts">
import type { Party } from '@/types/Party';

import { ref, onBeforeMount } from 'vue';
import { IonButton,
  IonButtons,
  IonCheckbox,
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar
} from '@ionic/vue';
import { Contacts } from '@capacitor-community/contacts';
import { Attendee } from '@/types/Attendee';

const contactResults = ref<any[]>([]);
const contactModal = ref();
const selectedContacts = ref<any[]>([]);
const emit = defineEmits();

interface Props {
  party: Party,
}

const { party } = defineProps<Props>();

const handleCheckboxClick = (contact: any) => {
  const isSelected = selectedContacts.value.some((c) => c.id === contact.id);

  if (!isSelected) {
    const newAttendee: Attendee = {
      id: contact.id,
      name: contact.name.display,
      phoneNumber: contact.phones[0]?.number || '',
      email: contact.emails[0]?.address || '',
    };

    selectedContacts.value.push(newAttendee);
    console.log('Selected contacts length');
    console.log(selectedContacts.value.length);
  }
};

const addToParty = () => {
  console.log('Selected contacts length');
  console.log(selectedContacts.value.length);

  selectedContacts.value.forEach((attendee) => {
    // @ts-ignore
    party.attendees.push(attendee);
  });

  console.log('Party array');
  console.log(party.attendees);

  selectedContacts.value = [];
  closeContactModal();
};

async function fetchContacts() {
  try {
    const projection = {
      name: true,
      phones: true,
      emails: true,
    };

    const result = await Contacts.getContacts({
      projection,
    });
    contactResults.value = result.contacts;
  } catch (error) {
    console.error(error);
  }
}

onBeforeMount(() => {
  fetchContacts();
});

const closeContactModal = () => {
  contactModal.value.dismiss();
  emit('modal-closed');
};
</script>

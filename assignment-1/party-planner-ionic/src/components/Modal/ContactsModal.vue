<template>
  <ion-modal ref="contactModal">
    <ion-header>
      <ion-toolbar>
        <ion-title>Contacts</ion-title>
        <ion-buttons slot="end">
          <ion-button @click="closeContactModal">Close</ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    <ion-content class="contacts-content">
      <ion-button @click="addToParty">Add to party</ion-button>
      <ion-list v-if="contactResults.length">
        <ion-item v-for="(contact, index) in contactResults" :key="index">
          <ion-checkbox @click="handleCheckboxClick(contact)"></ion-checkbox>
          <ion-label>{{ contact.name.display }}</ion-label>
          <ion-note>{{ contact.phones[0]?.number }}</ion-note>
          <ion-note>{{ contact.emails[0]?.address }}</ion-note>
        </ion-item>
      </ion-list>
    </ion-content>
  </ion-modal>
</template>

<script setup lang="ts">
import { ref, onBeforeMount } from 'vue';
import { IonCheckbox } from '@ionic/vue';
import { Contacts } from '@capacitor-community/contacts';
import { Party } from '@/types/Party';

const contactResults = ref<any[]>([]);
const contactModal = ref();
const selectedContacts = ref<any[]>([]);
const emit = defineEmits();

interface Props {
  party: Party,
}

const { party } = defineProps<Props>();

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

const handleCheckboxClick = (contact: any) => {
  const contactIndex = selectedContacts.value.findIndex((c) => c.id === contact.id);
  if (contactIndex !== -1) {
    selectedContacts.value.splice(contactIndex, 1);
  } else {
    console.log('Added the contact to the selected list')
    selectedContacts.value.push(contact);
    console.log('Selected contacts length:')
    console.log(selectedContacts.value.length)
  }
};

const addToParty = () => {
  console.log('Selected contacts length:')
  console.log(selectedContacts.value.length);
  if (selectedContacts.value.length > 0) {
    console.log('Entered addToParty if-statement')
    const attendees = selectedContacts.value.map((contact: any) => ({
      id: contact.id,
      name: contact.name.display,
      phone: contact.phones[0]?.number || '',
      email: contact.emails[0]?.address || '',
    }));

    party.attendees = party.attendees ? party.attendees.concat(attendees) : attendees;
    selectedContacts.value = [];
    closeContactModal();
    console.log('Attendees: ')
    console.log(party.attendees[0])
  }
};

onBeforeMount(() => {
  fetchContacts();
});

const closeContactModal = () => {
  contactModal.value.dismiss();
  emit('modal-closed');
};
</script>

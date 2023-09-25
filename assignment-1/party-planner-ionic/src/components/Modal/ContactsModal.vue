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
      <ion-list v-if="contactResults.length">
        <ion-item v-for="(contact, index) in contactResults" :key="index">
          <div class="contact-item">
            <ion-label>{{ contact.name.display }}</ion-label>
            <ion-note class="note-item">{{ contact.phones[0]?.number }}</ion-note>
            <ion-note class="note-item margin-bottom">{{ contact.emails[0]?.address }}</ion-note>
          </div>
        </ion-item>
      </ion-list>
    </ion-content>
  </ion-modal>
</template>

<script setup lang="ts">
import { ref, onBeforeMount } from 'vue';
import { Contacts } from '@capacitor-community/contacts';

const contactResults = ref<any[]>([]);
const contactModal = ref();
const emit = defineEmits();

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
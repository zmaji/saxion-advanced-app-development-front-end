<template>
  <ion-modal ref="createPartyModal" trigger="open-createPartyModal" @willDismiss="onWillDismiss">
    <ion-header class="ion-padding">
        <ion-title>Create a party</ion-title>
    </ion-header>

    <ion-content class="ion-padding">
      <ion-item>
        <ion-label position="stacked" class="ion-padding-bottom">Name the party</ion-label>

        <ion-input
            v-model="newParty.title"
            label-placement="floating"
            type="text"
            placeholder="Party name"
        />
      </ion-item>

      <ion-item>
        <ion-label position="stacked" class="ion-padding-bottom">What's the party about?</ion-label>

        <ion-textarea
            v-model="newParty.description"
            label-placement="floating"
            placeholder="Party description"
            :auto-grow="true"
        />
      </ion-item>

      <ion-item>
        <ion-label position="stacked" class="ion-padding-bottom">Where is the party?</ion-label>

        <ion-input
            v-model="newParty.location"
            label-placement="floating"
            type="text"
            placeholder="Party location"
        />
      </ion-item>

      <ion-item>
        <ion-label position="stacked" class="ion-padding-bottom">When is the party?</ion-label>

        <ion-datetime v-model="newParty.datetime"/>
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
  import type { Party } from '@/types/party';

  import {reactive, ref} from 'vue';
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

  const emit = defineEmits<{(event: 'partyCreated', value: Party): void}>();

  const createPartyModal = ref();

  const newParty: Party = reactive({
    title: null,
    description: null,
    location: null,
    datetime: null
  });

  const cancel = () => createPartyModal.value.$el.dismiss(null, 'cancel');

  const confirm = () => {
    createPartyModal.value.$el.dismiss(newParty, 'confirm');
  };

  const addPartyToLocalstorage = (party: Party): void => {
    const existingPartiesJSON = localStorage.getItem('parties');
    const existingParties: Party[] = existingPartiesJSON
        ? JSON.parse(existingPartiesJSON)
        : [];

    const maxId = existingParties.reduce((max, party) => (party.id || 0) > max ? (party.id || 0) : max, 0);
    party.id = maxId + 1;

    existingParties.push(party);

    localStorage.setItem('parties', JSON.stringify(existingParties));
  }

  const resetNewParty = (): void => {
    newParty.title = '';
    newParty.description = '';
    newParty.location = '';
    newParty.datetime = null;
  }

  const onWillDismiss = (event: CustomEvent<OverlayEventDetail>) => {
    if (event.detail.role === 'confirm') {
      addPartyToLocalstorage(event.detail.data);
      resetNewParty();
      emit('partyCreated', event.detail.data);
    }
  };
</script>

<style scoped>

</style>
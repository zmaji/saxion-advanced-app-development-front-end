<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-title>Party overview</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content>
      <div class="introduction ion-padding">
        <h1>
          All upcoming parties
        </h1>

        <ion-button id="open-createPartyModal">
          Add a party
        </ion-button>

        <p>
          Explore the details, mark your calendars, and prepare for an epic journey through the latest and greatest
          parties
          in town!
        </p>
      </div>

      <ion-grid>
        <ion-row>
          <ion-col v-for="party in parties" :key="party.id" size="12" size-md="6" size-lg="3">
            <MediaCard :party="party" @click="openPartyModal(party)" />
          </ion-col>
        </ion-row>
      </ion-grid>

      <CreatePartyModal @partyCreated="fetchParties" />
      <PartyModal :party="selectedParty" :is-open="isOpen" @modal-closed="onModalClosed" />
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { Party } from "@/types/Party";

import { ref } from 'vue';
import {
  IonButton,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonPage,
  IonRow,
  IonToolbar,
  IonTitle,
} from "@ionic/vue";
import { CreatePartyModal, MediaCard, PartyModal } from "@/components";

const parties = ref<Party[]>([]);
const selectedParty = ref<Party | null>(null);
const isOpen = ref(false);

const openPartyModal = (party: Party) => {
  console.log('parties.value.length')
  console.log('parties.value.length')
  console.log('parties.value.length')
  console.log('parties.value.length')
  console.log(parties.value.length)
  isOpen.value = true;
  selectedParty.value = party;
};

const onModalClosed = () => {
  isOpen.value = false;
};

function fetchParties(): void {
  const partiesJSON = localStorage.getItem('parties');
  parties.value = partiesJSON ? JSON.parse(partiesJSON) : [];

  console.log('Fetching parties from LocalStorage');
}

// onMounted(() => {
//   //Temporary to leave clean entries within localstorage
//   localStorage.clear();

//   const partyOne: Party = {
//     id: 1,
//     title: 'Party at Saxion',
//     description: 'description',
//     location: 'location 1',
//     datetime: new Date().toISOString(),
//     attendees: []
//   };

//   const partyTwo: Party = {
//     id: 2,
//     title: 'Domino\'s',
//     description: 'description',
//     location: 'location 2',
//     datetime: new Date().toISOString(),
//     attendees: []
//   };

//   const partyThree: Party = {
//     id: 3,
//     title: 'Max his project X chess party',
//     description: 'description',
//     location: 'location 3',
//     datetime: new Date().toISOString(),
//     attendees: []
//   };

//   addPartyToLocalstorage(partyOne);
//   addPartyToLocalstorage(partyTwo);
//   addPartyToLocalstorage(partyThree);

//   fetchParties();
// });
</script>

<style scoped>
.introduction {
  background-color: var(--ion-color-light);
}
</style>
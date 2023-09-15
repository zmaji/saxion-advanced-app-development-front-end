<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-title>Party overview</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">
      <h1>All upcoming parties</h1>
      <p>Explore the details, mark your calendars, and prepare for an epic journey through the latest and greatest parties
        in town!</p>

      <ion-grid>
        <ion-row>
          <ion-col v-for="party in parties" :key="party.id" size="auto">
            <MediaCard :party="party" @click="openPartyModal(party)" />
          </ion-col>
        </ion-row>
      </ion-grid>

      <PartyModal :party="selectedParty" :is-open="isOpen" @modal-closed="onModalClosed" />

    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { MediaCard } from "@/components";
import { PartyModal } from "@/components";

const selectedParty = ref<Party | null>(null);
const isOpen = ref(false);

const openPartyModal = (party: Party) => {
  isOpen.value = true;
  selectedParty.value = party;
};

const onModalClosed = () => {
  isOpen.value = false;
};

// TODO: Move to store and fill store on startup
const parties = ref<Party[]>([]);
const partyOne: Party = {
  id: 1,
  title: 'Party at Saxion',
  description: 'description',
  location: 'location 1',
  imageUrl: 'https://ionicframework.com/docs/img/demos/card-media.png'
};

const partyTwo: Party = {
  id: 2,
  title: 'Domino\'s',
  description: 'description',
  location: 'location 2',
  imageUrl: 'https://ionicframework.com/docs/img/demos/card-media.png'
};

const partyThree: Party = {
  id: 3,
  title: 'Max his project X chess party',
  description: 'description',
  location: 'location 3',
  imageUrl: 'https://ionicframework.com/docs/img/demos/card-media.png'
};

parties.value.push(partyOne);
parties.value.push(partyTwo);
parties.value.push(partyThree);

</script>

<style scoped></style>
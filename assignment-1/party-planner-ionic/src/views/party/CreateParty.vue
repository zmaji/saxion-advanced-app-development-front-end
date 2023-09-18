<template>
  <ion-content class="ion-padding">
    <h1>Create a Party</h1>

    <ion-button id="open-createPartyModal" expand="block">Open</ion-button>

    <CreatePartyModal @partyCreated="fetchParties" />

    <ion-grid>
      <ion-row>
        <ion-col v-for="party in parties" :key="party.id" size="auto">
          <MediaCard :party="party" />
        </ion-col>
      </ion-row>
    </ion-grid>


  </ion-content>
</template>

<script setup lang="ts">
import type { Party } from "@/types/party";

import {onMounted, ref} from "vue";

import {IonButton, IonContent} from '@ionic/vue';
import {CreatePartyModal, MediaCard} from '@/components';

//TODO: Remove CreateParty page and route if model gets accepted
const parties = ref<Party[]>([]);

  function fetchParties(): void {
    const partiesJSON = localStorage.getItem('parties');
    parties.value = partiesJSON ? JSON.parse(partiesJSON) : [];

    console.log('Fetching parties from LocalStorage');
  }

  onMounted(() => {
    fetchParties();
  });
</script>


<style scoped>

</style>
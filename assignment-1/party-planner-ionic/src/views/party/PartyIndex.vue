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

      <!-- Creating a grid out of each party entry with an auto width based on the screen size -->
      <ion-grid>
        <ion-row>
          <!-- Iterate through parties and use MediaCard component for each party -->
          <ion-col v-for="party in parties" :key="party.id" size="auto">
            <MediaCard :party="party" />
          </ion-col>
        </ion-row>
      </ion-grid>

    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/vue';
import { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle } from '@ionic/vue';
import { ref } from 'vue';
import MediaCard from "@/components/MediaCard/MediaCard.vue";

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
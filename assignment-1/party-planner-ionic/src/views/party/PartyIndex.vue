<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-title>Blank</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">
      <h1>All parties</h1>

      <p>Here's a small text description for the content. Nothing more, nothing less.</p>

      <ion-grid>
        <ion-row>
          <ion-col
              v-for="party in parties"
              :key="party.id"
              class="ion-align-self-start">
            <div>
              <h4>{{ party.title }}</h4>
              <p>{{ party.description }}</p>
              <small>{{ party.location }}</small>
            </div>
          </ion-col>
        </ion-row>
      </ion-grid>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
  import {IonHeader, IonPage, IonTitle, IonToolbar} from '@ionic/vue';
  import {ref} from 'vue';


  // TODO: Move to store and fill store on startup
  const parties = ref([]);
  const partyOne: Party = {
    id: 1,
    title: 'Party at Saxion',
    description: 'description',
    location: 'location'
  };

  const partyTwo: Party = {
    id: 2,
    title: 'Domino\'s',
    description: 'description',
    location: 'location'
  };

  const partyThree: Party =  {
    id: 3,
    title: 'Max his project X chess party',
    description: 'description',
    location: 'location'
  };

  parties.value.push(partyOne);
  parties.value.push(partyTwo);
  parties.value.push(partyThree);
</script>

<style scoped>

</style>
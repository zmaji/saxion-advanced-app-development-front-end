# Prototype 2: React Native

## Description

This project is a hybrid prototype built by Nils Kimenai and Maurice ten Teije
using Node.js, React native and Expo Go.

## Prerequisites
Before you begin, ensure you have met the following requirements:

- **Expo Go App**: You should have the Expo Go App installed from your App Store. 
- **Node.js**: If you don't have Node installed, you can install it by following
  the instructions at
  [Node.js's official website](https://nodejs.org/en).

## Getting Started

To get this project up and running, follow these steps:

1. Unzip the project
2. Navigate to 'assignment-1-party-planner-react-native'
3. Install all dependencies using 'npm i'
4. Run the application using 'npm run start'
**NOTE:** If you're using a public network like Saxion's, use 'npx expo start --tunnel'
5. Scan the QR code in the console with the Expo Go App (or with the camera if you're using iOS).

## Functionality

The following functionality has been added to the app:

1. The landing page shows you a list of upcoming parties.
2. You can create a new party with the 'Create Party' button.
3. The party will be added to your calendar (iOS).
4. The index page of a party shows information about the party and a list of attendees (if filled).
5. To add one of your contacts to the party, click the 'Select Attendee(s)' button.
6. Select as many contacts as you'd like to and click on the 'Select Attendee(s)' button.
7. If the attendee has an email set in your contacts, you may invite them through email by clicking on the envelope icon.

The following functionality has NOT been added to the app:

1. The party will be added to your calendar (Android).
The permissions couldn't be set for this requirement. Due to the immense time that has been put into this requirement, we decided to let it rest.
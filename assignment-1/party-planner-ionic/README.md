# Prototype 1: Ionic

## Description

This project is a hybrid prototype built by Nils Kimenai and Maurice ten Teije
using Ionic and Vue.js.

## Prerequisites
Before you begin, ensure you have met the following requirements:

- **Android Studio**: You should have Android Studio [installed](https://developer.android.com/studio). 
- **Android Emulator**: You should have an emulator set up in Android Studio. 
You can do this by following these instructions:
1. Open Android Studio
2. Click on 'Configure' from the welcome screen and 'AVD Manager' from the dropdown.
3. In the AVD Manager, click on the 'Create Virtual Device' button.
4. Select a hardware profile (e.g. Pixel 7 Pro, which has been used for testing purposes) and click 'Next'.
5. Select a system image and if you haven't downloaded it yet, click 'Download'.
6. Give your virtual device a name and customize the device properties such as RAM and storage size if needed. Click 'Next'.
7. Review the settings and click 'Finish'.
- **(Optional) Node.js**: If you don't have Node installed, you can install it by following
  the instructions at
  [Node.js's official website](https://nodejs.org/en).

## Getting Started

To get this project up and running, follow these steps:

1. Unzip the project
2. Navigate to 'assignment-1-party-planner-ionic'
3. Install all dependencies using 'npm i'
4. Build and run the application using 'ionic cap build android'
5. Wait for Android Studio to build the app.
6. Run the app in your emulator by pressing the green 'play' button next to it or by pressing 'Shift + F10'.

## Functionality

The following functionality has been added to the app:

1. The landing page shows you a list of upcoming parties.
2. You can create a new party with the 'Add a party' button.
4. The index page of a party shows information about the party and a list of attendees (if filled).
5. To add one of your contacts to the party, click the 'Add contacts' button.
6. Select as many contacts as you'd like to and click on the 'Add to party' button.
7. You may share (invite someone to) a party by clicking the 'Share Party' button and selecting an app.

The following functionality has NOT been added to the app:

1. The party will be added to your calendar.
Due to deprecated Cordova en Capacitor plugins, without any reference to correct replacements and poor community plugins/libraries it has been impossible to meet this requirement.
# Fly With Confidence Hybrid Application

## Description

This project is a hybrid application built by Nils Kimenai and Maurice ten Teije
using React native and Expo Go.

## Prerequisites
Before you begin, ensure you have met the following requirements:

- **Expo Go App**: You should have the Expo Go App installed from your App Store on your mobile device. 
- **Node.js**: If you don't have Node installed, you can install it by following
  the instructions at
  [Node.js's official website](https://nodejs.org/en).
  - **Docker**: You should have Docker installed on your system to run the back-end. If not, you can
  download it from
  [Docker's official website](https://www.docker.com/products/docker-desktop/).

## Getting Started

If you want to run the application together with the back-end, follow these steps:
1. Unzip the back-end project
2. Navigate to `Assignment-1/Express`
3. Dockerize the back-end application and MongoDB database using: 'docker compose build'
4. Run the application using 'docker compose up'

To get this project up and running, follow these steps:

1. Unzip the hybrid project
2. Open a command prompt and retrieve your host's IPV4 address by running the `ipconfig` command (on Windows).
3. Enter your IP address as BASE_URL ('http://yourip:3000') variable, this is needed for your mobile device to connect to the local back-end
4. Navigate to 'assignment-2/fly-with-confidence/config.ts'
5. Enter your IP address as BASE_URL variable, this is needed for your mobile device to connect to the local back-end.
6. Navigate to 'assignment-2/fly-with-confidence' 
7. Install all dependencies using 'npm i'
8. Run the application using 'npm run start'
**NOTE:** If you're using a public network like Saxion's, use 'npx expo start --tunnel'
9. Scan the QR code in the console with the Expo Go App (or with the camera if you're using iOS).

## Running tests
The project includes Jest tests to ensure the application work as expected. To run these tests, use the following command:
`npm run test`.

To generate test coverage, use following command: `npm run test:coverage`. This will generate a test report in the `coverage` directory in the root. To see this report navigate to the folder then click on `Icov-report` and open `index` in your browser.

## Linting
To check the code for errors, use the following command: `npm run lint`. To fix any possible problems, use `npm run lint:fix`.
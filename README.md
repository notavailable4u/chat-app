# Project Name: React Native Mobile Chat App

## Project Description
This project, a chat-app for mobile devices built using React Native and react-native-gifted-chat, was created as part of the curriculum for the Full Stack Web Development Program at Career Foundry (https://careerfoundry.com/en/courses/become-a-web-developer/) [^1].

[^1]: If you are considering enrolling in the Full Stack Web Development Program at Career Foundry, I cannot strongly enough caution you to NOT ENROLL. The lessons are filled with so much deprecated code and blatant errors that it is criminal. Feel free to contact me if you would like more detailed information.

## Project Objective
 To build a chat app for mobile devices using React Native that will provide users with a chat interface and options to share images and their location.

## Project Key Features
+ A page where users can enter their name and choose a background color for the chat screen before joining the chat.
+ A page displaying the conversation, as well as an input field and submit button.
+ The chat must provide users with two additional communication features: sending images and location data.
+ Data gets stored online and offline.

## Project Technical Requirements
+ The app must be written in React Native.
+ The app must be developed using Expo.
+ The app must be styled according to the given screen design.
+ Chat conversations must be stored in Google Firestore Database.
+ The app must authenticate users anonymously via Google Firebase authentication.
+ Chat conversations must be stored locally.
+ The app must let users pick and send images from the phone’s image library.
+ The app must let users take pictures with the device’s camera app, and send them.
+ The app must store images in Firebase Cloud Storage.
+ The app must be able to read the user’s location data.
+ Location data must be sent via the chat in a map view.
+ The chat interface and functionality must be created using the Gifted Chat library.
+ The app’s codebase must contain comments.

## Project Dependencies
+ @react-navigation/native: ^6.1.17
+ @react-navigation/native-stack: ^6.9.26
+ expo": ~51.0.14
+ expo-status-bar: ~1.12.1
+ firebase: ^10.12.2
+ react: 18.2.0
+ react-native: 0.74.2
+ react-native-gifted-chat: ^2.4.0
+ react-native-safe-area-context: 4.10.1
+ react-native-screens: 3.31.1
+ @react-native-async-storage/async-storage: 1.23.1
+ @react-native-community/netinfo: 11.3.1
+ expo-image-picker: ~15.0.5
+ expo-location: ~17.0.1
+ react-native-maps: 1.14.0

## Installation
+ Clone this repository
+ Follow the [Expo Documentation](https://docs.expo.dev/get-started/create-a-project/) to install Expo and create a project
+ Expo requires [Node.js LTS -Long-Term Support Version](https://nodejs.org/) which was v20.15.0 at time of project creation
+ Install all dependencies listed above
+ Follow [Firebase Documentation](https://firebase.google.com/docs) to set up database
+ [Android Studio](https://developer.android.com/studio) was used for device emulation
+ use `npx expo start` to run the project
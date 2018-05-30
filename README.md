# generator-composer-ionic

[![Build Status](https://travis-ci.com/Jakeeyturner/composer-ionic.svg?branch=master)](https://travis-ci.com/Jakeeyturner/composer-ionic)

The composer-ionic code generation tool produces [Ionic framework](https://ionicframework.com/framework) hybrid mobile applications, that can interact with blockchains using the [Hyperledger Composer](https://hyperledger.github.io/composer/latest) framework.


## Running the mobile application code generation tool

1. [Install Hyperledger Composer pre-requisites](https://hyperledger.github.io/composer/latest/installing/installing-prereqs.html)


2. [Install Hyperledger Composer development environment](https://hyperledger.github.io/composer/latest/installing/development-tools.html)


3. Install the Ionic CLI and Cordova using the command: `npm install -g ionic cordova`


4. Install the Composer-Ionic code generation tool using the command: `npm install -g generator-composer-ionic`


5. Run the code generation tool using the command: `yo composer-ionic`


6. Generated mobile applications can be run in a browser debug mode, by changing into the directory and running the command: `npm start`


7. Native platform binaries can be built and run on devices using [Apache Cordova](https://ionicframework.com/docs/cli/#using-cordova)



### Android Platform Instructions

TODO


### iOS Platform Instructions

**To run in an iOS simulator:**

`ionic cordova emulate ios`


**To run on an iPhone / iPad**

- Ensure the device is connected to your MacBook

- Launch Xcode on your MacBook

- Open the Xcode workspace for where the generated iOS artifacts are located. For example: `Users/username/APP-NAME/platforms/ios/APP-NAME.xcworkspace`

- Within Xcode, go to Project Settings -> General

- In the signing section, ensure your name is setup as a personal team next to the Team drop down. If not, select 'Add an account' in the drop down next to Team and supply your Apple ID login info.

- Go to Build Settings

- Ensure your team (usually your name) is selected under Development Team in the Signing section. If not, select your name.

- Near the top-left, click your project name and select your connected iOS device under the device drop down list

- Click the run icon

- The app should install automatically on your iOS device.

- To run the app, on your iOS device, go to General Settings -> Profiles & Device Management -> Developer App.

- Select your app, and click to trust the app.

(Thanks to  [@DennisM330](https://github.com/DennisM330) for this guide)

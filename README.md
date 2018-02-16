

### Serverless League of Legends PH community website currently being build with React , Firebase and Redux

Current Progress Demo: https://dodge-950cd.firebaseapp.com/

#### Current Features
- Google authentication
- Thread Creation
- Thread Markdowns
- Reacting to threads
- Admin tool (announcement tool)
- Restricted thread creation/viewing for unauthenticated users


#### Setting config

1. Create an `.env` file on the root level of this project 
2. Inside the `.env` file define the following environment variables
    REACT_APP_FIREBASE_APIKEY= ,
    REACT_APP_FIREBASE_AUTHDOMAIN=,
    REACT_APP_FIREBASE_DATABASEURL=
    REACT_APP_FIREBASE_PROJECTID=,
    REACT_APP_FIREBASE_BUCKET=,
    REACT_APP_FIREBASE_MSGSENDERID=

3. Go to firebase console `https://firebase.google.com/` and copy and paste each of your config in the environment variables defined inside the `.env`

#### Installation

1. Run `npm install` and `npm run build`
2. Run `npm start` 

#### Deploy to firebase hosting

1. Navigate to .firebaserc file and change the projects default to your firebase app name
2. You can specify which directory to upload to firebase hosting the default is the build directory, you can change this by opening `firebase.json` and changing the hosting.public
3. Run `firebase deploy` to deploy your app. Check your app `<YOUR-FIREBASE-APP>.firebaseapp.com`


DodgePH isn’t endorsed by Riot Games and doesn’t reflect the views or opinions of Riot Games or anyone officially involved in producing or managing League of Legends. League of Legends and Riot Games are trademarks or registered trademarks of Riot Games, Inc. League of Legends © Riot Games, Inc.

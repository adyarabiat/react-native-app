import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import * as Font from "expo-font";
// import { AppLoading } from "expo";
import AppLoading from "expo-app-loading";

import Header from "./components/Header";
import StartGameScreen from "./screens/StartGameScreen";
import GameScreen from "./screens/GameScreen";
import GameOverScreen from "./screens/GameOverScreen";

// import AppLoading from 'expo-app-loading';
// fonts doesn't inherits from each other like to put the font on the parent component then the others will have it
// but Text will inhert from the parent is the onley one
{
   /* <Text font>
   <Text>this will inhert from the parent</Text>
</Text> */
}

// also one important thing that <View></View> uses flexbox but text does not
// but <Text></Text> uses it is own postioning system so if it is not fitting in one line it will wrrape itself and put the text in the next line
const fetchFonts = () => {
   return Font.loadAsync({
      "open-sans": require("./assets/fonts/OpenSans-Regular.ttf"),
      "open-sans-bold": require("./assets/fonts/OpenSans-Bold.ttf"),
   });
};

export default function App() {
   const [userNumber, setUserNumber] = useState();
   const [guessRounds, setGuessRounds] = useState(0);
   const [dataLoaded, setDataLoaded] = useState(false);

   if (!dataLoaded) {
      return (
         <AppLoading
            startAsync={fetchFonts}
            onFinish={() => setDataLoaded(true)}
            onError={(err) => console.log(err)}
         />
      );
   }
   const configureNewGameHandler = () => {
      setGuessRounds(0);
      setUserNumber(null);
   };
   const startGameHandler = (selectedNumber) => {
      setUserNumber(selectedNumber);
   };

   const gameOverHandler = (numOfRounds) => {
      setGuessRounds(numOfRounds);
   };

   let content = <StartGameScreen onStartGame={startGameHandler} />;
   if (userNumber && guessRounds <= 0) {
      content = (
         <GameScreen userChoice={userNumber} onGameOver={gameOverHandler} />
      );
   } else if (guessRounds > 0) {
      content = (
         <GameOverScreen
            roundsNumber={guessRounds}
            userNumber={userNumber}
            onRestart={configureNewGameHandler}
         />
      );
   }

   return (
      <View style={styles.screen}>
         <Header title="Guess a number" />
         {content}
      </View>
   );
}

const styles = StyleSheet.create({
   screen: {
      flex: 1,
   },
});

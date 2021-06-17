import React, { useState, useRef, useEffect } from "react";
import { StyleSheet, Text, View, Alert, ScrollView } from "react-native";
// Adding Icons
import { Ionicons } from "@expo/vector-icons";

import NumberContainer from "../components/NumberContainer";
import Card from "../components/Card";
import DefaultStyles from "../constants/default-styles";
import MainButton from "../components/MainButton";
import BodyText from "../components/BodyText";

// the logic of the game
// I put it outside the component to save some performance becouse I am not using props or state so it is better to keep it out of the component
const gerateRandomBetween = (min, max, exclude) => {
   min = Math.ceil(min);
   max = Math.floor(max);
   const rndNum = Math.floor(Math.random() * (max - min)) + min;
   if (rndNum === exclude) {
      return gerateRandomBetween(min, max, exclude);
   } else {
      return rndNum;
   }
};
const GameScreen = (props) => {
   const initialGuess = gerateRandomBetween(1, 100, props.userChoice);

   const [currentGuess, setCurrentGuess] = useState(initialGuess);
   const [pastGuesses, setPastGuesses] = useState([initialGuess]);
   //we are using useRef here to update state without rerender the whole component
   const currentLow = useRef(1);
   const currentHigh = useRef(100);

   const { onGameOver, userChoice } = props;

   useEffect(() => {
      if (currentGuess === userChoice) {
         onGameOver(pastGuesses.length);
      }
   }, [currentGuess, onGameOver, userChoice]);

   const nextGuessHandler = (direction) => {
      if (
         (direction === "lower" && currentGuess < props.userChoice) ||
         (direction === "greater" && currentGuess > props.userChoice)
      ) {
         Alert.alert("Don't lie", "You know that this is wrong...", [
            { text: "Sorry!", style: "cancel" },
         ]);
         return;
      }

      if (direction === "lower") {
         currentHigh.current = currentGuess;
      } else {
         currentLow.current = currentGuess + 1;
      }

      const nextNumber = gerateRandomBetween(
         currentLow.current,
         currentHigh.current,
         currentGuess
      );
      setCurrentGuess(nextNumber);
      // setRounds((curRounds) => curRounds + 1);
      setPastGuesses((curPastGuesses) => [nextNumber, ...curPastGuesses]);
   };

   return (
      <View style={styles.screen}>
         <Text style={DefaultStyles.title}>Opponent's Guess</Text>
         <NumberContainer>{currentGuess}</NumberContainer>
         <Card style={styles.buttonContainer}>
            <MainButton onPress={nextGuessHandler.bind(this, "lower")}>
               <Ionicons name="md-remove" size={24} color="white" />
            </MainButton>
            <MainButton onPress={nextGuessHandler.bind(this, "greater")}>
               <Ionicons name="md-add" size={24} color="white" />
            </MainButton>
         </Card>
         <View style={styles.list}>
            <ScrollView>
               {pastGuesses.map((guess, index) => {
                  return (
                     <View key={guess} style={styles.listItem}>
                        <BodyText>#{pastGuesses.length - index}</BodyText>
                        <BodyText> {guess}</BodyText>
                     </View>
                  );
               })}
            </ScrollView>
         </View>
      </View>
   );
};

export default GameScreen;

const styles = StyleSheet.create({
   screen: {
      flex: 1,
      padding: 10,
      alignItems: "center",
   },
   buttonContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginTop: 20,
      width: 400,
      maxWidth: "80%",
   },
   listItem: {
      borderColor: "#ccc",
      borderWidth: 1,
      padding: 15,
      marginVertical: 10,
      backgroundColor: "white",
      flexDirection: "row",
      justifyContent: "space-between",
   },
   list: {
      flex: 1,
      width: "40%",
   },
});

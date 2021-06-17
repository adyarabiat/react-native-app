import React, { useState } from "react";
import {
   StyleSheet,
   Text,
   View,
   Button,
   TouchableWithoutFeedback,
   Keyboard,
   Alert,
} from "react-native";

import Card from "../components/Card";
import Colors from "../constants/colors";
import Input from "../components/Input";
import NumberContainer from "../components/NumberContainer";
import BodyText from "../components/BodyText";
import TitleText from "../components/TitleText";
import MainButton from "../components/MainButton";

const StartGameScreen = (props) => {
   const [enteredValue, setEnteredValue] = useState(""); //we said value becouse all the inputs always strings not really a numbers
   const [confirmed, setConfirmed] = useState(false);

   const [selectedNumber, setSelectedNumber] = useState("");

   const enteredValueHandler = (Value) => {
      //  Validate the entered value
      // we are saying anything not a number between 0-9 to replace it with empty string ""
      setEnteredValue(Value.replace(/[^0-9]/g, ""));
   };

   const resetInputHandler = () => {
      setEnteredValue("");
   };

   const confirmInputHandler = () => {
      const chosenNumber = parseInt(enteredValue);
      if (isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber > 99) {
         // 1. what is the title
         // 2. the message to inform the user
         // 3.
         Alert.alert(
            "Invalid number",
            "Number has to be a number between 1 and 99",
            [
               {
                  text: "Okay",
                  style: "destructive",
                  onPress: resetInputHandler,
               },
            ]
         );
         return;
      }
      setConfirmed(true);
      setSelectedNumber(chosenNumber);
      setEnteredValue("");
      Keyboard.dismiss();
   };

   // Confirm text
   let confirmedOutput;
   if (confirmed) {
      confirmedOutput = (
         <Card style={styles.summaryContainer}>
            <BodyText>You Selected </BodyText>
            <NumberContainer>{selectedNumber}</NumberContainer>
            <MainButton
               // onPress={() => props.onStartGame(selectedNumber)}
               onPress={props.onStartGame.bind(this, selectedNumber)}
            >
               Start Game
            </MainButton>
         </Card>
      );
   }

   return (
      <TouchableWithoutFeedback
         onPress={() => {
            Keyboard.dismiss();
         }}
      >
         <View style={styles.screen}>
            <Text style={styles.title}>Start a New Game!</Text>
            <Card style={styles.inputContainer}>
               <TitleText>Select a Number</TitleText>

               <Input
                  style={styles.input}
                  blurOnSubmit
                  autoCapitalize="none"
                  autoCorrect={false}
                  keyboardType="number-pad"
                  maxLength={2}
                  onChangeText={enteredValueHandler}
                  value={enteredValue}
               />

               <View style={styles.buttonContainer}>
                  <View style={styles.button}>
                     <Button
                        title="Reset"
                        color={Colors.accent}
                        onPress={resetInputHandler}
                     />
                  </View>
                  <View style={styles.button}>
                     <Button
                        title="Confirm"
                        color={Colors.primary}
                        onPress={confirmInputHandler}
                     />
                  </View>
               </View>
            </Card>
            {confirmedOutput}
         </View>
      </TouchableWithoutFeedback>
   );
};

export default StartGameScreen;

const styles = StyleSheet.create({
   screen: {
      flex: 1,
      padding: 10,
      alignItems: "center",
   },
   title: {
      fontSize: 20,
      marginVertical: 10,
      fontFamily: "open-sans-bold",
   },
   inputContainer: {
      width: 300,
      maxWidth: "80%",
      alignItems: "center",
   },
   buttonContainer: {
      flexDirection: "row",
      width: "100%",
      justifyContent: "space-between",
      paddingHorizontal: 15,
   },
   button: {
      width: 100,
   },
   input: {
      width: 50,
      textAlign: "center",
   },
   summaryContainer: {
      marginTop: 20,
      alignItems: "center",
   },
});

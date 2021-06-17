import React from "react";
import { StyleSheet, Text, View, Button, Image } from "react-native";

import BodyText from "../components/BodyText";
import TitleText from "../components/TitleText";
import Colors from "../constants/colors";
import MainButton from "../components/MainButton";

const GameOverScreen = (props) => {
   return (
      <View style={styles.screen}>
         <TitleText>The Game is Over!</TitleText>
         <View style={styles.imageContainer}>
            <Image
               style={styles.image}
               source={require("../assets/success.png")} //this is how we get image from a local source
               // this how to add image from the web
               // source={{
               //    uri: "https://images.unsplash.com/photo-1426901555017-389235de7b0d?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=900&ixid=MnwxfDB8MXxyYW5kb218fHx8fHx8fHwxNjIzODgzOTE0&ixlib=rb-1.2.1&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=1600",
               // }}
               resizeMode="cover"
            />
         </View>

         <BodyText>
            Your phone needed
            <Text style={styles.highLight}> {props.roundsNumber} </Text>rounds
            to guess the number
            <Text style={styles.highLight}> {props.userNumber}</Text>
         </BodyText>
         <BodyText>
            Number was:
            <Text style={styles.highLight}> {props.userNumber}</Text>
         </BodyText>
         <MainButton onPress={props.onRestart} style={styles.button}>
            NEW GAME
         </MainButton>
      </View>
   );
};

export default GameOverScreen;

const styles = StyleSheet.create({
   screen: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
   },
   imageContainer: {
      width: 300,
      height: 300,
      borderRadius: 150,
      borderWidth: 3,
      borderColor: "black",
      overflow: "hidden",
      marginVertical: 30,
   },
   image: {
      width: "100%",
      height: "100%",
   },
   highLight: {
      color: Colors.primary,
   },
   button: {
      marginVertical: 30,
   },
});

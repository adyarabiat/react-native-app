import React from "react";
import { StyleSheet, Text, View } from "react-native";

const Card = (props) => {
   return (
      <View style={{ ...styles.card, ...props.style }}>{props.children}</View>
   );
};

export default Card;

const styles = StyleSheet.create({
   card: {
      shadowColor: "black", //IOS
      shadowOffset: { width: 0, height: 2 }, //IOS
      shadowOpacity: 0.26, //IOS
      shadowRadius: 6, //IOS
      elevation: 8, //this for Android to do the same as the IOS
      backgroundColor: "white",
      padding: 20,
      borderRadius: 10,
   },
});

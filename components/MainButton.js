import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

import Colors from "../constants/colors";

const MainButton = (props) => {
   return (
      <TouchableOpacity onPress={props.onPress} activeOpacity={0.6}>
         <View style={{ ...styles.button, ...props.style }}>
            <Text style={styles.buttonText}>{props.children}</Text>
         </View>
      </TouchableOpacity>
   );
};

export default MainButton;

const styles = StyleSheet.create({
   button: {
      backgroundColor: Colors.primary,
      paddingVertical: 12,
      paddingHorizontal: 30,
      borderRadius: 30,
   },
   buttonText: {
      color: "white",
      fontFamily: "open-sans",
      fontSize: 18,
   },
});

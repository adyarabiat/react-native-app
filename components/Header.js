import React from "react";
import { StyleSheet, Text, View } from "react-native";

import Colors from "../constants/colors";
import DefaultStyles from "../constants/default-styles";

const Header = (props) => {
   return (
      <View style={styles.header}>
         <Text style={DefaultStyles.title}>{props.title}</Text>
      </View>
   );
};

export default Header;

const styles = StyleSheet.create({
   header: {
      width: "100%",
      height: 90,
      paddingTop: 36,
      backgroundColor: Colors.primary,
      alignItems: "center",
      justifyContent: "center",
   },
});

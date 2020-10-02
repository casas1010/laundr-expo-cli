import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";

const NewOrderScreen = (props) => {
  const [pickUpDate, setPickUpDate] = useState();
  const [pickUpTime, setPickUpTime] = useState();
  const [preference, setPreference] = useState();
  const [preferecenNote, setPreferenceNote] = useState();
  const [pickUpAddress, setPickUpAddress] = useState();

  useEffect(() => {
    console.log("NewOrderScreen loaded");
  }, []);

  return (
    <View>
      <Text>NewOrderScreen</Text>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {},
});
export default NewOrderScreen;

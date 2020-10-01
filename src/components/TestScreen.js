import React from "react";
import { View, Modal, Image, Text, SafeAreaView } from "react-native";
import Loader from "../components/Loader";
import GlobalStyles from "../components/GlobalStyles";
import { HEIGHT, WIDTH } from "../../src/components/Items/";

const TestScreen = () => {
  return (
    <SafeAreaView style={GlobalStyles.droidSafeArea}>
      <Loader />
    </SafeAreaView>
  );
};

export default TestScreen;

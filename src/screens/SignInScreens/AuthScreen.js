import React, { useState, useEffect } from "react";
import { View, AsyncStorage, Image } from "react-native";
import _ from "lodash";
// import { AppLoading } from "expo";
import { HEIGHT, WIDTH } from "../../components/Items/";

import Slides from "../../components/Slides";

const SLIDE_DATA = [
  { text: "Welcome to Laundr", color: "#0000f4" },
  {
    text: "Use is app to save item",
    color: "#010088",
  },
  { text: "Point and scan to get started!", color: "#0000cf" },
];

const AuthScreen = (props) => {
  const [token, setToken] = useState(null);

  useEffect(() => {
    checkToken();
  }, []);

  const checkToken = async () => {
    console.log("Checking Token");
    let token = await AsyncStorage.getItem("email_token");
    if (token) {
      console.log("Token is present");
      props.navigation.navigate("home");
      setToken(token);
    } else {
      console.log("Token is not present");
      setToken(false);
    }
  };

  const onSlidesComplete = () => {
    props.navigation.navigate("welcome");
  };

  // if (_.isNull(token)) {
  //   console.log("_.isNull(token): ", _.isNull(token));
  //   return <AppLoading />;
  // }
  console.log("After _.isNull(token) check");
  console.log("_.isNull(token): ", _.isNull(token));



  props.navigation.navigate("welcome");
  return (
    <View>
      {/* <Slides data={{ SLIDE_DATA }} onComplete={onSlidesComplete} /> */}
      {/* <Image
        style={{ height: HEIGHT * 0.15, width: WIDTH * 0.85 }}
        resizeMode="contain"
        source={require("../../assets/Launch_Logo.png")}
      /> */}
    </View>
  );
};

export default AuthScreen;

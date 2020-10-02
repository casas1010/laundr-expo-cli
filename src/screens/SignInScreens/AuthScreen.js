import React, { useState, useEffect } from "react";
import { View, AsyncStorage, Image } from "react-native";
import _ from "lodash";
// import { AppLoading } from "expo";
import { HEIGHT, WIDTH ,KEYBOARD_AWARE_SCROLL_VIEW_STYLE} from "../../components/Items/";
import Loader from "../../components/Loader";

const AuthScreen = (props) => {
  const [token, setToken] = useState(null);

  useEffect(() => {
    checkToken();
  }, []);

  const checkToken = async () => {
    console.log("Checking Token");
    let token = await AsyncStorage.getItem("token");
    console.log("token1:  ", token);
    if (token) {
      console.log("Token is present");
      props.navigation.navigate("drawer");
      setToken(token);
    } else {
      console.log("Token is not present");
      setToken(false);
      props.navigation.navigate("welcome");
    }
  };

  if (_.isNull(token)) {
    console.log("_.isNull(token): ", _.isNull(token));
    return (
      <View style={{ alignItems: "center", justifyContent: "center" ,...KEYBOARD_AWARE_SCROLL_VIEW_STYLE}}>
        <Loader />
      </View>
    );
  }
  console.log("After LOADER");
  console.log("_.isNull(token): ", _.isNull(token));

  // props.navigation.navigate("welcome");
  return <View>{/* <Loader /> */}</View>;
};

export default AuthScreen;

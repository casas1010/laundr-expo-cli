import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { Provider } from "react-redux";
import store from "./src/store";

// import DrawerNavigator from "./navigation/DrawerNavigator";
import TabNavigator from "./src/navigation/TabNavigator";


// not sure if this is going to work
const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <TabNavigator />
      </NavigationContainer>
    </Provider>
  );
};

export default App;

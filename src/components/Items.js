import React from "react";
import { Dimensions, TouchableOpacity, Text } from "react-native";

export const HEIGHT = Dimensions.get("window").height;
export const WIDTH = Dimensions.get("window").width;

export const FIELD_NAME_FONT_SIZE = Math.floor((HEIGHT * 0.1) / 4);
export const FIELD_VALUE_FONT_SIZE = Math.floor((HEIGHT * 0.1) / 5);

export const BUTTON_TEXT_FONT_SIZE = Math.floor((HEIGHT * 0.1) / 4);

export const KEYBOARD_AWARE_SCROLL_VIEW_STYLE ={backgroundColor:'#f8f9fa',flex:1}

const SHADOW = {
  shadowColor: "#000",
  shadowOffset: { width: 1, height: 1 },
  shadowOpacity: 0.4,
  shadowRadius: 3,
  elevation: 5,
};

export const FIELD_NAME_TEXT = {
  fontSize: FIELD_NAME_FONT_SIZE,
  fontWeight: "bold",
};

export const FIELD_VALUE_TEXT = {
  fontSize: FIELD_VALUE_FONT_SIZE,
  fontWeight: "bold",
  width: "100%",
};

export const FIELD_VALUE_CONTAINER = {
  width: "100%",
  borderColor: "#d3d3d3",
  borderWidth: 1,
  borderRadius: 8,
  padding: 7,
  fontSize: FIELD_VALUE_FONT_SIZE,
  justifyContent: "center",
  alignItems: "center",
};

export const BUTTON_CONTAINER = {
  alignItems: "center",
  backgroundColor: "#01c9e2",
  margin: 10,
  width: "80%",
  borderRadius: 20,
  ...SHADOW,
};

export const BUTTON_TEXT = {
  fontSize: BUTTON_TEXT_FONT_SIZE,
  fontWeight: "bold",
  color: "white",
  padding: 10,
};

export const BUTTON = (props) => {
  return (
    <TouchableOpacity
      style={[BUTTON_CONTAINER, { ...props.style }]}
      onPress={props.onPress}
    >
      <Text style={[BUTTON_TEXT, { ...props.textStyle }]}>{props.text}</Text>
    </TouchableOpacity>
  );
};


export const findProductIndex = (products, id) => {
  return products.findIndex((product) => product.id === id);
};

export const roundDecimals = (number, decimals = 2) => {
  return Math.round(number * 10 ** decimals) / 10 ** decimals;
};
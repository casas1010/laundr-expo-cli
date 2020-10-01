// // import React, { useEffect } from "react";
// // import {
// //   View,
// //   Modal,
// //   Image,
// //   StyleSheet,
// //   SafeAreaView,
// //   Text,
// //   Animated,
// // } from "react-native";
// // import GlobalStyles from "../components/GlobalStyles";
// // import { HEIGHT, WIDTH } from "../../src/components/Items/";

// // const Loader = () => {
// //   const animatedValue = new Animated.Value(0);

// //   useEffect(() => {
// //     Animated.timing(animatedValue, {
// //       toValue: 1,
// //       duration: 4000,
// //     }).start();
// //     // this.animation();
// //   }, []);

// //   const interpolateRotation = animatedValue.interpolate({
// //     inputRange: [0, 1],
// //     outputRange: ["0rad", "10rad"],
// //   });
// //   const animatedStyle = {
// //     transform: [{ rotate: interpolateRotation }],
// //   };

// //   return (
// //     <View style={styles.container}>
// //       <View style={{ position: "relative" }}>
// {
//   /* <Image
//   style={{ height: HEIGHT * 0.15, width: WIDTH * 0.85 }}
//   resizeMode="contain"
//   source={require("../assets/Launch_Logo.png")}
// /> */
// }

// //         <Animated.View style={[styles.box, animatedStyle]}>
// //   <Image
// //     style={{
// //       height: HEIGHT * 0.15 * (1 / 2.5),
// //       width: WIDTH * 0.85 * (1 / 4.5),
// //       position: "absolute",
// //       left: "3%",
// //       top: "30%",
// //     }}
// //     resizeMode="contain"
// //     source={require("../assets/spinner.png")}
// //   />
// //         </Animated.View>
// //       </View>
// //     </View>
// //   );
// // };
// // const styles = StyleSheet.create({
// //   box: {
// //     width: 100,
// //     height: 100,
// //     backgroundColor: "#333",
// //     alignItems: "center",
// //     justifyContent: "center",
// //   },
// //   container: {
// //     flex: 1,
// //     // height:300,
// //     alignItems: "center",
// //     justifyContent: "center",
// //     backgroundColor: "red",
// //   },
// // });
// // export default Loader;

// import React, { Component, useRef } from "react";
// import {
//   AppRegistry,
//   StyleSheet,
//   Text,
//   View,
//   Animated,
//   Image,
//   Button,
// } from "react-native";
// import { HEIGHT, WIDTH } from "../../src/components/Items/";

// export default class Loader extends Component {
//   componentWillMount() {
//     this.animatedValue = new Animated.Value(0);
//   }
//   componentDidMount() {
//     Animated.timing(this.animatedValue, {
//       toValue: 1,
//       duration: 4000,
//     }).start();
//   }

//   render() {
//     const interpolateRotation = this.animatedValue.interpolate({
//       inputRange: [0, 1],
//       outputRange: ["0rad", "10rad"],
//     });
//     const animatedStyle = {
//       transform: [{ rotate: interpolateRotation }],
//     };
//     return (
//       <View style={[styles.container]}>
//         <View
//           style={{
//             // backgroundColor: "blue",
//             borderWidth:0,
//             height: HEIGHT * 0.15,
//             width: WIDTH * 0.85,
//           }}
//         >
//           <Image
//             style={{ height: HEIGHT * 0.15, width: WIDTH * 0.85,borderWidth:0, }}
//             // resizeMode="contain"
//             source={require("../assets/Launch_Logo.png")}
//           />
//           <Animated.View
//             style={[
//               {
//                 position: "absolute",
//                 left: WIDTH * 0.85 * 0.024,

//                 top: HEIGHT * 0.15 * 0.29,
//               },
//               animatedStyle,
//             ]}
//           >
//             <Image
//               style={{
//                 height: HEIGHT * 0.15 * (1 / 2.3),
//                 width: WIDTH * 0.85 * (1 / 4.3),
//               }}
//               resizeMode="contain"
//               source={require("../assets/spinner.png")}
//             />
//           </Animated.View>
//         </View>
//       </View>
//     );
//   }
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   box: {
//     // position: "absolute",
//     // left: "10%",
//     //             top: "30%",
//     //             marginTop:"50%",
//     // backgroundColor: "#333",
//     // alignItems: "center",
//     // justifyContent: "center",
//   },
//   text: {
//     color: "#FFF",
//   },
// });

// AppRegistry.registerComponent("Loader", () => Loader);

// import React, { useEffect } from "react";
// import {
//   View,
//   Modal,
//   Image,
//   StyleSheet,
//   SafeAreaView,
//   Text,
//   Animated,
// } from "react-native";
// import GlobalStyles from "../components/GlobalStyles";
// import { HEIGHT, WIDTH } from "../../src/components/Items/";

// const Loader = () => {
//   const animatedValue = new Animated.Value(0);

//   useEffect(() => {
//     Animated.timing(animatedValue, {
//       toValue: 1,
//       duration: 4000,
//     }).start();
//     // this.animation();
//   }, []);

//   const interpolateRotation = animatedValue.interpolate({
//     inputRange: [0, 1],
//     outputRange: ["0rad", "10rad"],
//   });
//   const animatedStyle = {
//     transform: [{ rotate: interpolateRotation }],
//   };

//   return (
//     <View style={styles.container}>
//       <View style={{ position: "relative" }}>
{
  /* <Image
    style={{ height: HEIGHT * 0.15, width: WIDTH * 0.85 }}
    resizeMode="contain"
    source={require("../assets/Launch_Logo.png")}
  /> */
}

//         <Animated.View style={[styles.box, animatedStyle]}>
//   <Image
//     style={{
//       height: HEIGHT * 0.15 * (1 / 2.5),
//       width: WIDTH * 0.85 * (1 / 4.5),
//       position: "absolute",
//       left: "3%",
//       top: "30%",
//     }}
//     resizeMode="contain"
//     source={require("../assets/spinner.png")}
//   />
//         </Animated.View>
//       </View>
//     </View>
//   );
// };
// const styles = StyleSheet.create({
//   box: {
//     width: 100,
//     height: 100,
//     backgroundColor: "#333",
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   container: {
//     flex: 1,
//     // height:300,
// alignItems: "center",
// justifyContent: "center",
//     backgroundColor: "red",
//   },
// });
// export default Loader;

import React, { Component, useRef } from "react";
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Animated,
  Image,
  Button,
} from "react-native";
import { HEIGHT, WIDTH } from "../../src/components/Items/";

console.log(WIDTH * 0.25);
console.log(WIDTH * 0.25 * 0.59);
export default class Loader extends Component {
  componentWillMount() {
    this.animatedValue = new Animated.Value(0);
    console.log("Loader has loaded");
  }
  componentDidMount() {
    Animated.timing(this.animatedValue, {
      toValue: 1,
      duration: 8000,
    }).start();
    setTimeout(() => {
      Animated.timing(this.animatedValue, {
        toValue: 50,
        duration: 4000,
      }).start();
    }, 8000);
  }

  render() {
    const interpolateRotation = this.animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: ["0rad", "10rad"],
    });
    const animatedStyle = {
      transform: [{ rotate: interpolateRotation }],
    };
    return (
      <View style={[styles.container]}>
        <View
          // MASTER CONTAINER
          style={{
            // backgroundColor: "blue",
            borderWidth: 0,
          }}
        >
          <Image
            style={{
              height: WIDTH * 0.25,
              width: WIDTH * 0.9,
              borderWidth: 0,
            }}
            source={require("../assets/Launch_Logo.png")}
          />
          {/*  */}
          {/*  */}
          <Animated.View
            style={[
              {
                position: "absolute",
                left: WIDTH * 0.25 * 0.23,
                top: WIDTH * 0.9 * 0.056,
              },
              animatedStyle,
            ]}
          >
            <Image
              style={{
                height: WIDTH * 0.25 * 0.59,
                width: WIDTH * 0.25 * 0.59,
              }}
              source={require("../assets/spinner.png")}
            />
          </Animated.View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    //   flex:1,
    // alignItems: "center",
    // justifyContent: "center",
  },
  box: {},
  text: {
    color: "#FFF",
  },
});

AppRegistry.registerComponent("Loader", () => Loader);

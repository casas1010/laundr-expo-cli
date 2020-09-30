import React, {useEffect, useState} from 'react';
import {
  Button,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import MapView from 'react-native-maps';
// import Geolocation from '@react-native-community/geolocation';
// import * as Location from 'expo-location';
// import * as Permissions from 'expo-permissions';

// import MapView, { AnimatedRegion } from 'react-native-maps';
import Icon from 'react-native-vector-icons/FontAwesome';
import {HEIGHT, WIDTH,SHADOW} from '../../components/Items/'



const HomeScreen = (props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState('user');
  const [initialRegion, setInitialRegion] = useState();
  const [address, setAddress] = useState();

  // gets position code
  useEffect(() => {
    getCurrentLocation();
  }, [initialRegion]);

  const getCurrentLocation = async () => {
    await navigator.geolocation.getCurrentPosition(
      (position) => {
        let region = {
          latitude: parseFloat(position.coords.latitude),
          longitude: parseFloat(position.coords.longitude),
          latitudeDelta: 0.03,
          longitudeDelta: 0.03,
        };
        setInitialRegion(region);
      },
      (error) => console.log(error),
      {
        enableHighAccuracy: true,
        timeout: 20000,
        maximumAge: 1000,
      },
    );
  };

  function goToInitialLocation() {
    let initialRegion = Object.assign({}, initialRegion);
    initialRegion['latitudeDelta'] = 0.005; // sets zoom level
    initialRegion['longitudeDelta'] = 0.005; // sets zoom level
    this.mapView.animateToRegion(initialRegion, 2000);
  }
  // gets position code

  return (
    <View style={styles.container}>
      <MapView
        style={styles.mapStyle}
        region={initialRegion}
        followUserLocation={true}
        ref={(ref) => (this.mapView = ref)}
        zoomEnabled={true}
        showsUserLocation={true}
        onMapReady={goToInitialLocation}
        initialRegion={initialRegion}
      />
      <View style={styles.topInputs_ButtonContainer}>
        <Icon name="gear" color={'black'} size={90} />

        <View style={styles.searchBoxContainer}>
          {/* <FontAwesome5
            name="search-location"
            size={20}
            color="black"
            style={styles.icon}
          /> */}
          <TextInput
            value={address}
            onChangeText={(address) => setAddress(address)}
            placeholder="Address"
            style={styles.addressTextInput}
          />
        </View>
      </View>
      <View style={styles.bottomButtonsContainer}>
        <View style={styles.newOrderButton}>
          <Button color="black" title="New Order" />
        </View>

        <View style={styles.bottomInnerButtonsContainer}>
          <View style={[styles.noCard_FAQButton, {marginRight: WIDTH * 0.1}]}>
            <Button color="#5bcae2" title="No Card" />
          </View>
          <View style={[styles.noCard_FAQButton, {marginLeft: WIDTH * 0.1}]}>
            <Button color="#5bcae2" title="FAQ" />
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mapStyle: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  topInputs_ButtonContainer: {
    backgroundColor: 'transparent',
    position: 'absolute',
    top: 22,
  },
  menuIcon: {
    paddingLeft: 15,
  },
  searchBoxContainer: {
    flexDirection: 'row',
    paddingLeft: 15,
    paddingRight: 15,
    height: 50,
    width: WIDTH * 0.95,
    borderWidth: 1,
    borderRadius: 20,
    borderColor: '#f9f9f9',
    backgroundColor: '#f9f9f9',
    ...SHADOW,
  },
  icon: {
    width: 20,
    marginTop: 15,
    marginBottom: 15,
  },
  addressTextInput: {
    width: '90%',
    height: 45,
    paddingLeft: 10,
  },
  bottomButtonsContainer: {
    backgroundColor: 'transparent',
    position: 'absolute',
    bottom: 40,
    height: HEIGHT * 0.2,
    width: WIDTH,
    alignItems: 'center',
  },
  bottomInnerButtonsContainer: {
    flexDirection: 'row',
    position: 'relative',
    paddingTop: 10,
  },
  newOrderButton: {
    backgroundColor: '#f9f9f9',
    position: 'relative',
    justifyContent: 'center',
    borderColor: '#f9f9f9',
    width: WIDTH * 0.8,
    height: 50,
    borderWidth: 1,
    borderRadius: 20,
    ...SHADOW,
  },
  noCard_FAQButton: {
    height: 50,
    width: 50,
    backgroundColor: '#f9f9f9',
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#f9f9f9',
    position: 'relative',
    borderWidth: 1,
    borderRadius: 20,
    width: WIDTH * 0.4,
    ...SHADOW,
  },
});
export default HomeScreen;
















// import React, {useEffect, useState} from 'react';
// import {
//   Button,
//   Keyboard,
//   KeyboardAvoidingView,
//   Platform,
//   StyleSheet,
//   Text,
//   TextInput,
//   TouchableWithoutFeedback,
//   View,
//   TouchableOpacity,
//   Image,
//   Dimensions,
// } from 'react-native';
// // import MapView from 'react-native-maps';
// import MapView, { AnimatedRegion } from 'react-native-maps';
// import Icon from 'react-native-vector-icons/FontAwesome';
// import {HEIGHT, WIDTH,SHADOW} from '../../components/Items/'



// const HomeScreen = (props) => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [userType, setUserType] = useState('user');
//   const [initialRegion, setInitialRegion] = useState();
//   const [address, setAddress] = useState();

//   // gets position code
//   useEffect(() => {
//     getCurrentLocation();
//   }, [initialRegion]);

//   const getCurrentLocation = async () => {
//     await navigator.geolocation.getCurrentPosition(
//       (position) => {
//         let region = {
//           latitude: parseFloat(position.coords.latitude),
//           longitude: parseFloat(position.coords.longitude),
//           latitudeDelta: 0.03,
//           longitudeDelta: 0.03,
//         };
//         setInitialRegion(region);
//       },
//       (error) => console.log(error),
//       {
//         enableHighAccuracy: true,
//         timeout: 20000,
//         maximumAge: 1000,
//       },
//     );
//   };

//   function goToInitialLocation() {
//     let initialRegion = Object.assign({}, initialRegion);
//     initialRegion['latitudeDelta'] = 0.005; // sets zoom level
//     initialRegion['longitudeDelta'] = 0.005; // sets zoom level
//     this.mapView.animateToRegion(initialRegion, 2000);
//   }
//   // gets position code

//   return (
//     <View style={styles.container}>
//       <MapView
//         style={styles.mapStyle}
//         region={initialRegion}
//         followUserLocation={true}
//         ref={(ref) => (this.mapView = ref)}
//         zoomEnabled={true}
//         showsUserLocation={true}
//         onMapReady={goToInitialLocation}
//         initialRegion={initialRegion}
//       />
//       <View style={styles.topInputs_ButtonContainer}>
//         <Icon name="gear" color={'black'} size={90} />

//         <View style={styles.searchBoxContainer}>
//           {/* <FontAwesome5
//             name="search-location"
//             size={20}
//             color="black"
//             style={styles.icon}
//           /> */}
//           <TextInput
//             value={address}
//             onChangeText={(address) => setAddress(address)}
//             placeholder="Address"
//             style={styles.addressTextInput}
//           />
//         </View>
//       </View>
//       <View style={styles.bottomButtonsContainer}>
//         <View style={styles.newOrderButton}>
//           <Button color="black" title="New Order" />
//         </View>

//         <View style={styles.bottomInnerButtonsContainer}>
//           <View style={[styles.noCard_FAQButton, {marginRight: WIDTH * 0.1}]}>
//             <Button color="#5bcae2" title="No Card" />
//           </View>
//           <View style={[styles.noCard_FAQButton, {marginLeft: WIDTH * 0.1}]}>
//             <Button color="#5bcae2" title="FAQ" />
//           </View>
//         </View>
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   mapStyle: {
//     width: Dimensions.get('window').width,
//     height: Dimensions.get('window').height,
//   },
//   topInputs_ButtonContainer: {
//     backgroundColor: 'transparent',
//     position: 'absolute',
//     top: 22,
//   },
//   menuIcon: {
//     paddingLeft: 15,
//   },
//   searchBoxContainer: {
//     flexDirection: 'row',
//     paddingLeft: 15,
//     paddingRight: 15,
//     height: 50,
//     width: WIDTH * 0.95,
//     borderWidth: 1,
//     borderRadius: 20,
//     borderColor: '#f9f9f9',
//     backgroundColor: '#f9f9f9',
//     ...SHADOW,
//   },
//   icon: {
//     width: 20,
//     marginTop: 15,
//     marginBottom: 15,
//   },
//   addressTextInput: {
//     width: '90%',
//     height: 45,
//     paddingLeft: 10,
//   },
//   bottomButtonsContainer: {
//     backgroundColor: 'transparent',
//     position: 'absolute',
//     bottom: 40,
//     height: HEIGHT * 0.2,
//     width: WIDTH,
//     alignItems: 'center',
//   },
//   bottomInnerButtonsContainer: {
//     flexDirection: 'row',
//     position: 'relative',
//     paddingTop: 10,
//   },
//   newOrderButton: {
//     backgroundColor: '#f9f9f9',
//     position: 'relative',
//     justifyContent: 'center',
//     borderColor: '#f9f9f9',
//     width: WIDTH * 0.8,
//     height: 50,
//     borderWidth: 1,
//     borderRadius: 20,
//     ...SHADOW,
//   },
//   noCard_FAQButton: {
//     height: 50,
//     width: 50,
//     backgroundColor: '#f9f9f9',
//     justifyContent: 'center',
//     alignItems: 'center',
//     borderColor: '#f9f9f9',
//     position: 'relative',
//     borderWidth: 1,
//     borderRadius: 20,
//     width: WIDTH * 0.4,
//     ...SHADOW,
//   },
// });
// export default HomeScreen;

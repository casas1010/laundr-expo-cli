import React, { useEffect, useState } from "react";
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
} from "react-native";
import MapView from "react-native-maps";
import Geocoder from "react-native-geocoding";
import { Entypo } from "@expo/vector-icons";

import Icon from "react-native-vector-icons/FontAwesome";
import { HEIGHT, WIDTH, SHADOW } from "../../components/Items/";
import { GOOGLE_MAPS_KEY } from "../../../key/";

const TEST_LOCATION = "306 NW 13th St, Gainesville, FL 32601";

const HomeScreen = (props) => {
  const [initialRegion, setInitialRegion] = useState(null); 
  const [onLoadLocation, setOnLoadLocation] = useState(false);
  const [address, setAddress] = useState();
  const [addressCordinates, setAddressCordinates] = useState();



  // perform API call to get coordinates from the address state variable
  const getLatLongFromAddress = async () => {
    console.log(`initiated API to get coordinates for address:  ${address}`);
    const KEY = GOOGLE_MAPS_KEY;
    let url = `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${KEY}`;
    let locationObj = {};
    await fetch(url)
      .then((response) => response.json())
      .then((data) => {
        console.log(`the coordinates for the address ${address} are:`);
        console.log(data.results[0]["geometry"]["location"]);
        locationObj["latitude"] =
          data.results[0]["geometry"]["location"]["lat"];
        locationObj["longitude"] =
          data.results[0]["geometry"]["location"]["lng"];
   
      })
      .catch((err) => console.warn(err.message));
    console.log("setting addressCordinates state variable from API  call");
    setAddressCordinates(locationObj);
    return locationObj;
  };

  // performs API call to google with Lat and Long from addressCordinates state variable
  // analyzie response
  // set state address variable
  const getAddressFromLatLong = async (lat, long) => {
    let possibleClientLocations = [];
    const KEY = GOOGLE_MAPS_KEY;
    const LAT = lat;
    const LNG = long;
    let url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${LAT},${LNG}&key=${KEY}`;
    await fetch(url)
      .then((response) => response.json())
      .then((data) => {
        for (let i = 0; data.results.length > i; i++) {
          if (data.results[i]["geometry"]["location_type"] != "APPROXIMATE") {
            // console.log(data.results[i]["geometry"]["location_type"]);
            possibleClientLocations.push({
              address: data.results[i]["formatted_address"],
              location: data.results[i]["geometry"]["location_type"],
            });
          }
        }
      })
      .catch((err) => console.warn(err.message));
    setAddress(sortThroughClientsLocation(possibleClientLocations));
  };

  // sort through possible client location
  // set best possible guess for clients location
  const sortThroughClientsLocation = (possibleClientLocations) => {
    console.log("sortThroughClientsLocation initiated");
    const typesArray = ["GEOMETRIC_CENTER", "RANGE_INTERPOLATED", "ROOFTOP"];
    let clientsLocationBestGuess = null;
    
    for (let i = 0; i < typesArray.length; i++) {
      for (let I = 0; I < possibleClientLocations.length; I++) {
     
        if (typesArray[i] == possibleClientLocations[I]["location"]) {
          clientsLocationBestGuess = possibleClientLocations[I]["address"];
          console.log('From the coordinates   ',initialRegion.latitude, initialRegion.longitude)
          console.log("The best guess for the clients location is:  ", clientsLocationBestGuess);
          return clientsLocationBestGuess;
        }
      }
    }
  };

  // get current address from lat and longitude (this runs all the time, very ineficient)
  // set state region variable
  useEffect(() => {
    getCurrentLocation();
    if (initialRegion !== null) {
      if (onLoadLocation == false) {
        setOnLoadLocation(true);
        console.log("setting location on address bar");

        getAddressFromLatLong(initialRegion.latitude, initialRegion.longitude);
        // console.log(address);
      }
    }
  }, [initialRegion]);


  // gets distance between two points  
  function getDistanceFromLatLon(lat1, lon1, lat2, lon2) {
    console.log("calculating distance from gainsville");
    function deg2rad(deg) {
      return deg * (Math.PI / 180);
    }

    var R = 6371; // Radius of the earth in km
    var dLat = deg2rad(lat2 - lat1); // deg2rad below
    var dLon = deg2rad(lon2 - lon1);
    var a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(lat1)) *
        Math.cos(deg2rad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c * 1000; // Distance in m
    return d;
  }

  // verifies if the distances is within the gainsville zone
  const checkIfClientIsInZone = (distance) => {
    console.log("clientsDistance:   ", distance);
    if (distance < 16094) {
      return true;
    }
    return false;
  };

  // get current location
  // set state region variable
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
      (error) => console.log("ERROR getting location", error),
      {
        enableHighAccuracy: true,
        timeout: 20000,
        maximumAge: 1000,
      }
    );
  };

  function goToInitialLocation() {
    let initialRegion = Object.assign({}, initialRegion);
    initialRegion["latitudeDelta"] = 0.005; // sets zoom level
    initialRegion["longitudeDelta"] = 0.005; // sets zoom level
    this.mapView.animateToRegion(initialRegion, 2000);
  }

  // grabs the address state variable
  // gets the coordinates from it
  // verifies if customer is in range
  // perform API c
  const newOrder = async () => {
    console.log("new order process initiated");
    // Gainsville reference coordinates

    let location = await getLatLongFromAddress();
    console.log(`verifiying location item: ${location}`);

    const gainesvilleLat = 29.6499;
    const gainesvilleLong = -82.3486;

    // console.log('location.latitude   :',location.latitude)
    let clientsDistance = getDistanceFromLatLon(
      gainesvilleLat,
      gainesvilleLong,
      location.latitude,
      location.longitude
    );
    if (!checkIfClientIsInZone(clientsDistance)) {
      console.log("Client is out of range");
      console.log(`The location ${address} is ${clientsDistance} from gainsville`);
      
      alert(`Sorry!  You are currently out of Lanndr' active service area. Visit the site to request Landr at your location`)

      return;
    }

    props.navigation.navigate('New Order Screen')
    console.log("Client is in range");
  };

  

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
        <TouchableOpacity onPress={props.navigation.openDrawer}>
          <Entypo name="menu" size={50} color="black" />
        </TouchableOpacity>
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
          <Button color="black" title="New Order" onPress={newOrder} />
        </View>

        <View style={styles.bottomInnerButtonsContainer}>
          <View style={[styles.noCard_FAQButton, { marginRight: WIDTH * 0.1 }]}>
            <Button color="#5bcae2" title="No Card" />
          </View>
          <View style={[styles.noCard_FAQButton, { marginLeft: WIDTH * 0.1 }]}>
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
    alignItems: "center",
    justifyContent: "center",
  },
  mapStyle: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
  topInputs_ButtonContainer: {
    backgroundColor: "transparent",
    position: "absolute",
    top: 22,
  },
  menuIcon: {
    paddingLeft: 15,
  },
  searchBoxContainer: {
    flexDirection: "row",
    paddingLeft: 15,
    paddingRight: 15,
    height: 50,
    width: WIDTH * 0.95,
    borderWidth: 1,
    borderRadius: 20,
    borderColor: "#f9f9f9",
    backgroundColor: "#f9f9f9",
    ...SHADOW,
  },
  icon: {
    width: 20,
    marginTop: 15,
    marginBottom: 15,
  },
  addressTextInput: {
    width: "90%",
    height: 45,
    paddingLeft: 10,
  },
  bottomButtonsContainer: {
    backgroundColor: "transparent",
    position: "absolute",
    bottom: 40,
    height: HEIGHT * 0.2,
    width: WIDTH,
    alignItems: "center",
  },
  bottomInnerButtonsContainer: {
    flexDirection: "row",
    position: "relative",
    paddingTop: 10,
  },
  newOrderButton: {
    backgroundColor: "#f9f9f9",
    position: "relative",
    justifyContent: "center",
    borderColor: "#f9f9f9",
    width: WIDTH * 0.8,
    height: 50,
    borderWidth: 1,
    borderRadius: 20,
    ...SHADOW,
  },
  noCard_FAQButton: {
    height: 50,
    width: 50,
    backgroundColor: "#f9f9f9",
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#f9f9f9",
    position: "relative",
    borderWidth: 1,
    borderRadius: 20,
    width: WIDTH * 0.4,
    ...SHADOW,
  },
});
export default HomeScreen;

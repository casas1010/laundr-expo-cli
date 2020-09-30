/*
code clean up 100% complete
wire up actions

change lock to pencil with the word 'edit'

add logout button

*/

import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  SafeAreaView,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import Icon from 'react-native-vector-icons/FontAwesome';

//
import {connect} from 'react-redux';
import * as actions from '../../actions';
//
import GlobalStyles from '../../components/GlobalStyles';
import Header from '../../components/Header';
import MenuModal from '../../components/MenuModal';
import Container from '../../components/Container';
import {
  WIDTH,
  HEIGHT,
  FIELD_NAME_TEXT,
  FIELD_VALUE_TEXT,
  FIELD_VALUE_CONTAINER,
} from '../../components/Items/';
import {CITIES} from '../../components/Data/';

const AccountScreen = (props) => {
  // state variables
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [country, setCountry] = useState('United States');
  const [state, setState] = useState('Florida');
  const [city, setCity] = useState();
  const [zipCode, setZipCode] = useState();
  const [address, setAddress] = useState();
  const [number, setNumber] = useState();
  // lock variables
  const [editable, setEditable] = useState(true);
  const [lock, setLock] = useState(true);
  const [textColor, setTextColor] = useState('#990000');
  const [lockColor, setLockColor] = useState('#990000');
  // modal variables
  const [cityModalView, setCityModalView] = useState(false);

  useEffect(() => {
    console.log('AccountScreen loaded');
  }, []);

  useEffect(() => {
    setEditable(!editable);
    lock ? setTextColor('#990000') : setTextColor('black');
    lock ? setLockColor('#990000') : setLockColor('black');
  }, [lock]);

  //  MODAL VARIABLES
  const setCityHelper = (item) => {
    setCity(item);
    showModalCity();
  };
  const showModalCity = () => {
    console.log('showModalCity()');
    setCityModalView(!cityModalView);
  };
  const modalButtonHelper = () => {
    if (editable) {
      showModalCity();
    }
  };
  //

  return (
    <SafeAreaView style={GlobalStyles.droidSafeArea}>
      <Header openDrawer={props.navigation.openDrawer} name="Account" />
      {/* SCREEN LOCK  */}
      <TouchableOpacity
        style={[styles.lockButton, {backgroundColor: lockColor}]}
        onPress={() => setLock(!lock)}>
        {lock ? (
          <Icon name="lock" color={'black'} size={HEIGHT * 0.05} />
        ) : (
          <Icon name="lock" color={'white'} size={HEIGHT * 0.05} />
        )}
      </TouchableOpacity>
      {/* SCREEN LOCK  */}
      <KeyboardAwareScrollView
        resetScrollToCoords={{x: 0, y: 0}}
        contentContainerStyle={styles.container}>
        <ScrollView>
          <Container>
            {/*  */}
            {/*  */}
            <View style={styles.container_Tittle_Input}>
              <Text style={[FIELD_NAME_TEXT, {color: textColor}]}>Name</Text>
              <View style={[FIELD_VALUE_CONTAINER, {alignItems: 'flex-start'}]}>
                <TextInput
                  editable={editable}
                  value={name}
                  onChangeText={(txt) => setName(txt)}
                  placeholder=" Name"
                  style={FIELD_VALUE_TEXT}
                />
              </View>
            </View>
            {/*  */}
            {/*  */}
            <View style={styles.container_Tittle_Input}>
              <Text style={[FIELD_NAME_TEXT, {color: textColor}]}>Email</Text>
              <View style={[FIELD_VALUE_CONTAINER, {alignItems: 'flex-start'}]}>
                <TextInput
                  editable={editable}
                  value={email}
                  onChangeText={(txt) => setEmail(txt)}
                  placeholder=" Email"
                  style={FIELD_VALUE_TEXT}
                />
              </View>
            </View>
            {/*  */}
            {/*  */}
            <View style={styles.container_Tittle_Input}>
              <Text style={[FIELD_NAME_TEXT, {color: textColor}]}>
                Password
              </Text>
              <View style={[FIELD_VALUE_CONTAINER, {alignItems: 'flex-start'}]}>
                <TextInput
                  editable={editable}
                  value={password}
                  onChangeText={(txt) => setPassword(txt)}
                  placeholder=" Email"
                  style={FIELD_VALUE_TEXT}
                />
              </View>
            </View>
            {/*  */}
            {/*  */}
            <View style={styles.container_Tittle_Input}>
              <Text style={[FIELD_NAME_TEXT, {color: textColor}]}>Number</Text>
              <View style={[FIELD_VALUE_CONTAINER, {alignItems: 'flex-start'}]}>
                <TextInput
                  editable={editable}
                  value={number}
                  onChangeText={(txt) => setNumber(txt)}
                  placeholder=" Number"
                  style={FIELD_VALUE_TEXT}
                />
              </View>
            </View>
            {/*  */}
            {/*  */}
            <View style={styles.container_Tittle_Input}>
              <Text style={[FIELD_NAME_TEXT, {color: textColor}]}>Country</Text>
              {/* <TouchableOpacity> */}
              <View style={[FIELD_VALUE_CONTAINER, {alignItems: 'flex-start'}]}>
                <TextInput
                  editable={false}
                  value={country}
                  onChangeText={(txt) => setCountry(txt)}
                  placeholder=" Country"
                  style={FIELD_VALUE_TEXT}
                />
              </View>
              {/* </TouchableOpacity> */}
            </View>
            {/*  */}
            {/*  */}
            <View style={styles.container_Tittle_Input}>
              <Text style={[FIELD_NAME_TEXT, {color: textColor}]}>State</Text>
              <View style={[FIELD_VALUE_CONTAINER, {alignItems: 'flex-start'}]}>
                <Text style={FIELD_VALUE_TEXT}>{state}</Text>
              </View>
            </View>
            {/*  */}
            {/*  */}
            <View style={styles.container_Tittle_Input}>
              <TouchableOpacity onPress={modalButtonHelper}>
                <Text style={[FIELD_NAME_TEXT, {color: textColor}]}>City</Text>
                <View
                  style={[FIELD_VALUE_CONTAINER, {alignItems: 'flex-start'}]}>
                  <Text style={FIELD_VALUE_TEXT}>{city}</Text>
                </View>
              </TouchableOpacity>
              <MenuModal
                setCardTypeHelper={setCityHelper}
                showModal={showModalCity}
                modalView={cityModalView}
                data={CITIES}
                title="Select Your City"
              />
            </View>
            {/*  */}
            {/*  */}
            <View style={styles.container_Tittle_Input}>
              <Text style={[FIELD_NAME_TEXT, {color: textColor}]}>
                Zip Code
              </Text>
              <View style={[FIELD_VALUE_CONTAINER, {alignItems: 'flex-start'}]}>
                <TextInput
                  editable={editable}
                  value={zipCode}
                  keyboardType="number-pad"
                  onChangeText={(txt) => setZipCode(txt)}
                  placeholder="Zip Code"
                  style={FIELD_VALUE_TEXT}
                />
              </View>
            </View>
            {/*  */}
            {/*  */}
            <View style={styles.container_Tittle_Input}>
              <Text style={[FIELD_NAME_TEXT, {color: textColor}]}>Address</Text>
              <View style={[FIELD_VALUE_CONTAINER, {alignItems: 'flex-start'}]}>
                <TextInput
                  editable={editable}
                  value={name}
                  onChangeText={(txt) => setAddress(txt)}
                  placeholder="Address"
                  style={FIELD_VALUE_TEXT}
                />
              </View>
            </View>
            {/*  */}
            {/*  */}
          </Container>
        </ScrollView>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  lockButton: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    right: 0,
    top: HEIGHT * 0.1,
    zIndex: 2,
    height: 80,
    width: 80,
    borderRadius: 80,
    backgroundColor: 'black',
  },
  container_Tittle_Input: {
    marginTop: 10,
    marginBottom: 10,
  },
});

function mapStateToProps({auth}) {
  return {token: auth.token};
}

export default connect(mapStateToProps, actions)(AccountScreen);

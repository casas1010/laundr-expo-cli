import React, {useEffect} from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {FIELD_VALUE_FONT_SIZE, FIELD_NAME_TEXT,HEIGHT, WIDTH} from '../components/Items/';

const Header = (props) => {
  useEffect(() => {
    console.log('Header loaded');
  }, []);
  return (
    <View style={[styles.container]}>
      <TouchableOpacity
        style={styles.container_Button}
        onPress={() => props.openDrawer()}>
        <Icon name="arrow-left" color={'black'} size={HEIGHT * 0.05} />
      </TouchableOpacity>

      <View style={styles.container_Text}>
        <Text style={FIELD_NAME_TEXT}>{props.name}</Text>
      </View>
    </View>
  );
};
Header.defaultProps = {
  name: 'default',
};

const styles = StyleSheet.create({
  container: {
    height: HEIGHT * 0.05,
    width: WIDTH,
    // backgroundColor: 'red',
    flexDirection: 'row',
    position: 'relative',
  },
  container_Button: {
    position: 'absolute',
    left: 10,
    zIndex: 2,
  },
  container_Text: {
    justifyContent: 'center',
    alignItems: 'center',
    width: WIDTH,
  },

});

export default Header;

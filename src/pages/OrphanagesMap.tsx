import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import MapView, { Callout, Marker } from 'react-native-maps';
import mapMarker from '../images/map-marker.png';

import { Feather } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native';
import { RectButton } from 'react-native-gesture-handler';

export default function OrphanagesMap() {
  const navigation = useNavigation()

  function handleNavigateToOrphanagesDetail() {
    navigation.navigate('OrphanageDetails');
  }

  function handleNavigateToOrphanageCreate() {
    navigation.navigate('SelectMapPosition');
  }

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={
          {
            latitude: -12.9452397,
            longitude: -38.4534359,
            latitudeDelta: 0.008,
            longitudeDelta: 0.008
          }
        }>
        <Marker
          icon={mapMarker}
          coordinate={
            {
              latitude: -12.9452397,
              longitude: -38.4534359,
            }
          }
        >
          <Callout onPress={handleNavigateToOrphanagesDetail} >
            <View style={styles.callOutContainer}>
              <Text>Lar dos mininus</Text>
            </View>
          </Callout>
        </Marker>
      </MapView>
      <View style={styles.footer}>
        <Text style={styles.footerText}>2 Orphanatos encontrados</Text>
        <RectButton style={styles.createOrphanageButton} onPress={handleNavigateToOrphanageCreate}>
          <Feather name="plus" size={20} />
        </RectButton>
      </View>
    </View>

  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#222222',
  },
  map: {
    flex: 1
  },
  callOutContainer: {
    fontFamily: 'Nunito_700Bold',

    width: 120,
    padding: 10,
    backgroundColor: '#fff'
  },
  footer: {
    position: "absolute",
    left: 24,
    right: 24,
    bottom: 20,

    backgroundColor: '#fff',
    borderRadius: 10,
    height: 56,
    paddingLeft: 24,

    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',

    elevation: 3,
  },
  footerText: {
    color: '#8fa7b6',
    fontFamily: 'Nunito_700Bold'
  },
  createOrphanageButton: {
    width: 56,
    height: 56,
    backgroundColor: '#15c3d6',
    borderRadius: 10,

    justifyContent: 'center',
    alignItems: 'center'
  },
});

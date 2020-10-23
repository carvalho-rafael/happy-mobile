import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import MapView, { Callout, Marker } from 'react-native-maps';
import mapMarker from '../images/map-marker.png';

import { Feather } from '@expo/vector-icons'
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { RectButton } from 'react-native-gesture-handler';
import api from '../services/api';

interface Orphanage {
  id: number;
  latitude: number;
  longitude: number;
  name: string;
}

export default function OrphanagesMap() {
  const [orphanages, setOrphanages] = useState<Orphanage[]>([]);

  const navigation = useNavigation();

  useFocusEffect(() => {
    api.get('orphanages').then(response => {
      setOrphanages(response.data);
    })
  })

  function handleNavigateToOrphanagesDetail(id: number) {
    navigation.navigate('OrphanageDetails', { id });
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
            latitude: -12.23112121,
            longitude: -39.12212112,
            latitudeDelta: 0.008,
            longitudeDelta: 0.008
          }
        }>
        {
          orphanages.map( orphanage => {
            return (
              <Marker key={orphanage.id}
                icon={mapMarker}
                coordinate={
                  {
                    latitude:  orphanage.latitude,
                    longitude: orphanage.longitude,
                  }
                }
              >
                <Callout onPress={() => handleNavigateToOrphanagesDetail(orphanage.id)} >
                  <View style={styles.callOutContainer}>
                    <Text>{orphanage.name}</Text>
                  </View>
                </Callout>
              </Marker>
            )
          })
        }
      </MapView>
      <View style={styles.footer}>
        <Text style={styles.footerText}>{orphanages.length} Orphanatos encontrados</Text>
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

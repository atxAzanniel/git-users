import React, { useEffect, useState } from 'react'
import Map, { Callout, Marker, PROVIDER_GOOGLE, Region } from 'react-native-maps'
import { RectButton } from 'react-native-gesture-handler'
import * as Location from 'expo-location'
import { FontAwesome } from '@expo/vector-icons'
import { View, Text, TextInput, Alert } from 'react-native'

import { Dev, fetchUserGithub, fetchLocalMapBox } from '../../services/apiGithub'

import styles from './styles'

const initialRegion = {
  latitude: -3.033434,
  longitude: -59.972489,
  latitudeDelta: 90,
  longitudeDelta: 90
}

const MapView: React.FC = () => {
  const [region, setRegion] = useState<Region>()
  const [username, setUsername] = useState<string>()
  const [devs, setDevs] = useState<Dev[]>([])

  const handleSearchUser = async () => {
    if (!username) return

    const githubUser = await fetchUserGithub(username)
    if (!githubUser || !githubUser.location) {
      Alert.alert(
        'Ops!',
        'Usuário não encontrado ou não tem localização definida no Github'
      )
    }

    const localMapBox = await fetchLocalMapBox(githubUser.location)
    const [longitude, latitude] = localMapBox.features[0].center

    const dev: Dev = {
      ...githubUser,
      latitude,
      longitude
    }

    setRegion({
      latitude,
      longitude,
      latitudeDelta: 0.20,
      longitudeDelta: 0.20
    })

    const devAlreadyExists = dev && devs.find((user) => user.id === dev.id)

    if (devAlreadyExists) return

    setDevs([...devs, dev])
    setUsername('')
  }

  useEffect(() => {
    async function getLocation () {
      const { status } = await Location.requestPermissionsAsync()
      if (status === 'granted') {
        const { coords } = await Location.getCurrentPositionAsync()
        setRegion({
          latitude: coords.latitude,
          longitude: coords.longitude,
          latitudeDelta: 0.078,
          longitudeDelta: 0.078
        })
      }
    }

    getLocation()
  }, [])

  return (
    <View style={styles.container}>
      <Map
        style={styles.map}
        showsUserLocation
        showsMyLocationButton={false}
        showsCompass={false}
        initialRegion={initialRegion}
        region={region}
        provider={PROVIDER_GOOGLE}
      >
        {devs.map((dev) => (
          <Marker
            key={dev.id}
            image={{ uri: `${dev.avatar_url}&s=120` }}
            calloutAnchor={{
              x: 2.4,
              y: 1.2
            }}
            coordinate={{
              latitude: Number(dev.latitude),
              longitude: Number(dev.longitude)
            }}
          >
            <Callout tooltip onPress={() => {}}>
              <View style={styles.calloutContainer}>
                <Text style={styles.calloutText}>{dev.name ?? dev.login}</Text>
                <Text style={styles.calloutSmallText}>{dev.bio ?? 'Sem bio'}</Text>
              </View>
            </Callout>
          </Marker>
        ))}
      </Map>

      <View style={styles.footer}>
        <TextInput
          style={styles.footerText}
          autoCompleteType='off'
          placeholder={`${devs.length} Dev's encontrados`}
          onChangeText={setUsername}
          value={username}
        />

        <RectButton
          style={styles.searchUserButton}
          onPress={handleSearchUser}
        >
          <FontAwesome name="github" size={24} color="#fff" />
        </RectButton>
      </View>
    </View>
  )
}

export default MapView

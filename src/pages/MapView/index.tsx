import React, { useEffect, useState } from 'react'
import Map, { Callout, Marker, PROVIDER_GOOGLE, Region } from 'react-native-maps'
import { RectButton } from 'react-native-gesture-handler'
import * as Location from 'expo-location'
import { FontAwesome } from '@expo/vector-icons'
import { View, Text, TextInput, Alert, ActivityIndicator, Linking } from 'react-native'

import { Dev, fetchUserGithub, fetchLocalMapBox } from '../../services/apiGithub'

import styles from './styles'

const MapView: React.FC = () => {
  const [region, setRegion] = useState<Region>()
  const [username, setUsername] = useState<string>()
  const [loading, setLoading] = useState(false)
  const [dev, setDev] = useState<Dev | null>()

  const handleSearchUser = async () => {
    if (!username) return

    setLoading(true)

    const githubUser = await fetchUserGithub(username)
    if (!githubUser || !githubUser.location) {
      setLoading(false)
      setDev(null)
      Alert.alert(
        'Ops!',
        'Usuário não encontrado ou não tem localização definida no Github',
        [{ text: 'Vou procurar outro !' }]
      )
      return
    }

    const localMapBox = await fetchLocalMapBox(githubUser.location)
    const [longitude, latitude] = localMapBox.features[0].center

    const newDev: Dev = {
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

    setDev(newDev)
    setUsername('')
    setLoading(false)
  }

  const handleOpenGithub = (url: string) => {
    Linking.openURL(url)
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
        initialRegion={{
          latitude: -3.033434,
          longitude: -59.972489,
          latitudeDelta: 90,
          longitudeDelta: 90
        }}
        region={region}
        provider={PROVIDER_GOOGLE}
      >
        {
          dev
            ? (
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
              <Callout tooltip onPress={() => { handleOpenGithub(dev.html_url) }}>
                <View style={styles.calloutContainer}>
                  <Text style={styles.calloutText}>{dev.name ?? dev.login}</Text>
                  <Text style={styles.calloutSmallText}>{dev.bio ?? 'Sem bio'}</Text>
                </View>
              </Callout>
            </Marker>
              )
            : null
        }
      </Map>

      <View style={styles.footer}>
        <TextInput
          style={styles.footerText}
          autoCompleteType='off'
          placeholder='Informe um usuário do Github'
          onChangeText={setUsername}
          onSubmitEditing={handleSearchUser}
          value={username}
        />

        <RectButton
          style={styles.searchUserButton}
          onPress={handleSearchUser}
          enabled={!loading}
        >
          {
            loading
              ? <ActivityIndicator color="#fff" />
              : <FontAwesome name="github" size={24} color="#fff" />
          }
        </RectButton>
      </View>
    </View>
  )
}

export default MapView

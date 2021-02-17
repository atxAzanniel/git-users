/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import { StatusBar } from 'expo-status-bar'
import Apploading from 'expo-app-loading'
import * as Updates from 'expo-updates'

import Routes from './src/routes'

export default function App () {
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    async function updateApp () {
      setLoading(true)

      const { isAvailable } = await Updates.checkForUpdateAsync()

      if (isAvailable) {
        await Updates.fetchUpdateAsync()
        await Updates.reloadAsync()
      }

      setLoading(false)
    }

    // updateApp()
  }, [])

  if (loading) {
    return (
      <Apploading />
    )
  }

  return (
    <>
      <StatusBar style="auto" />
      <Routes />
    </>
  )
}

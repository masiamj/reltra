/**
 * In the latest version of React Navigation (targeting modern iOS), the library introduced a new style
 * of Modal called "presentation".
 *
 * The presentational modal appears to place the current screen in a background-looking state.
 *
 * When it does do, the status bar area of the app transitions to black. This modal-specific
 * status bar component is included on Modal pages to turn the status bar back to white content.
 *
 * This isn't a big deal, but one of those small touches that really makes an app feel professional and
 * inspires trust with users.
 */
import React from 'react'
import { StatusBar } from 'expo-status-bar'
import { isiOS } from '@lib/platform'

const ModalStatusBar = () => {
  return <StatusBar style={isiOS() ? 'light' : 'auto'} />
}

export default ModalStatusBar

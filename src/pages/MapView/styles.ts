import { Dimensions, StyleSheet } from 'react-native'
import { heightDPI, widthDPI } from '../../utils/pixelDensity'

const styles = StyleSheet.create({
  container: {
    flex: 1
  },

  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('screen').height
  },

  footer: {
    position: 'absolute',
    left: 24,
    right: 24,
    bottom: 32,

    backgroundColor: '#fff',
    borderRadius: widthDPI('5%'),
    height: heightDPI('10%'),
    paddingLeft: widthDPI('5%'),

    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',

    elevation: 3
  },

  footerText: {
    height: heightDPI('8%'),
    width: widthDPI('60%'),
    color: '#8fa7b3'
  },

  searchUserButton: {
    width: widthDPI('18%'),
    height: heightDPI('10%'),
    backgroundColor: '#0089a5',
    borderRadius: widthDPI('5%'),

    justifyContent: 'center',
    alignItems: 'center'
  },

  calloutContainer: {
    width: 160,
    height: '100%',
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 16,
    justifyContent: 'center'
  },

  calloutText: {
    color: '#0089a5',
    textDecorationLine: 'underline',
    fontSize: 14
  },

  calloutSmallText: {
    color: '#005555',
    fontSize: 10
  }
})

export default styles

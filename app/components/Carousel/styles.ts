import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  statsHead: {
    paddingTop: 10,
    paddingHorizontal: 12,
  },
  container: {
    marginBottom: 20,
    width: '100%',
    paddingTop: 90,

    height: '80%',
    backgroundColor: 'transparent',

    marginTop: 10,
    shadowOffset: {
      width: 0,
      height: 5
    },
  },

  bgct: {
    flex: 0.7,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgb(39, 38, 39)',
  },

  scrollView: {
    display: 'flex',
    flexDirection: 'row',
    overflow: 'hidden',
    backgroundColor: 'transparent',
  },
  bullets: {
    position: 'absolute',
    bottom: 10,
    left: 0,
    right: 0,
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'row',
    paddingHorizontal: 10,
    paddingTop: 5,

  },
  bullet: {
    paddingHorizontal: 3,
    fontSize: 30,

    color: 'white'

  }
});

export default styles;
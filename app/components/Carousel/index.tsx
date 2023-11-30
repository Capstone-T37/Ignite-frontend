
import React, { useRef } from 'react'
import { View, ScrollView, Text, Dimensions } from 'react-native'
import { Stat } from './Stat';
import { Slide } from './Slide';
import { styles } from './styles'
import { Button } from 'react-native-paper';

export const Carousel = (props: any) => {

  const { items, style, callback } = props;

  const itemsPerInterval = props.itemsPerInterval === undefined
    ? 1
    : props.itemsPerInterval;

  const [interval, setInterval] = React.useState(1);
  const [intervals, setIntervals] = React.useState(1);
  const [width, setWidth] = React.useState(0);

  const scrollViewRef = useRef<any>(null);

  const windowWidth = Dimensions.get('window').width - 20;


  const init = (width: number) => {
    // initialise width
    setWidth(width);
    // initialise total intervals
    const totalItems = items.length;
    setIntervals(Math.ceil(totalItems / itemsPerInterval));
  }

  const getInterval = (offset: any) => {
    for (let i = 1; i <= intervals; i++) {

      if (offset+1 < (width / intervals) * i) {
        return i;
      }
      if (i == intervals) {
        return i;
      }
    }
  }

  const toNextPage = () => {
    scrollViewRef.current?.scrollTo({x: windowWidth * interval, animated: true});
 };

  let btContent = interval === items.length ? 'Get started' : 'continue'


  let bullets = [];
  for (let i = 1; i <= intervals; i++) {
    bullets.push(
      <Text
        key={i}
        style={{
          ...styles.bullet,
          opacity: interval === i ? 0.5 : 0.1
        }}
      >
        &bull;
      </Text>
    );
  }

  return (

    <View style={styles.bgct}>
    <View style={styles.container}>
      <ScrollView
        ref={scrollViewRef}
        horizontal={true}
        contentContainerStyle={{ ...styles.scrollView, width: `${100 * intervals}%` }}
        showsHorizontalScrollIndicator={false}
        onContentSizeChange={(w, h) => init(w)}
        onScroll={data => {
          setWidth(data.nativeEvent.contentSize.width);
          setInterval(getInterval(data.nativeEvent.contentOffset.x));
        }}
        scrollEventThrottle={200}
        pagingEnabled
        decelerationRate="fast"
      >
        {items.map((item: any, index: number) => {
              return (
                <Slide
                  key={index}
                  title={item.title}
                />
              );
        })}
      </ScrollView>
      <View style={styles.bullets}>
        {bullets}
      </View>
    </View>
    <Button 
      style={{borderRadius: 8, width: 350, marginBottom: 7}}
      mode="contained" 
      textColor='black'
      onPress={interval === items.length ? callback : toNextPage}
      > {btContent}</Button>
  </View>



  )
}

export default Carousel;

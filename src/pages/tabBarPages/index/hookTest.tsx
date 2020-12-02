import React, { useEffect, useState } from 'react'
// import { View } from '@tarojs/components'
import { View } from '@tarojs/components'
import './index.scss'


 function useIncrementTimer() {
  const [count, setCount] = useState(0);
  useEffect(() => {
    const timer = setInterval(() => {
      setCount(count + 1);
    }, 1000);
    return () => {
      clearInterval(timer);
    }
  });
  return count;
}

export default function App() {
  const count = useIncrementTimer();

  return <View>
    <View style={{ color: count % 2 === 0 ? 'red' : 'blue' }}>hello world</View>
  </View>
}
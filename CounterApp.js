import React, { useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const CounterApp = () => {
  const [count, setCount] = useState(0);

  const decrementCounter = () => {
    setCount((prevCount) => prevCount - 1);
  };


  const incrementCounter = () => {
    setCount((prevCount) => prevCount + 1);
  };

  

  const resetCounter = () => {
    setCount(0);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Counter App</Text>
      <Text style={styles.counterText}>Count: {count}</Text>
      <View style={styles.buttonContainer}>

        <Button style={styles.button} title="Decrement" onPress={decrementCounter} />
        
        <Button style={styles.button} title="Reset" onPress={resetCounter} />
        
        <Button style={styles.button} title="Increment" onPress={incrementCounter} />
        
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText: {
    fontSize: 30,
    paddingBottom: 20,
  },
  counterText: {
    fontSize: 24,
    paddingBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
  },
  button: {
    marginHorizontal: 10,
  },
});

export default CounterApp;
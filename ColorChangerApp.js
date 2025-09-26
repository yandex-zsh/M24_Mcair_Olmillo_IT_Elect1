import React, { useState } from 'react';
import { View, Button,Text, StyleSheet } from 'react-native';

export default function ColorChangerApp() {
  const [bgColor, setBgColor] = useState("white"); 

  return (
    <View style={[styles.container, { backgroundColor: bgColor }]}>
          <Text className="head" style={styles.title}>Color Changer App</Text>
      <Button title="White" onPress={() => setBgColor('white')} />
      <View style={{ height: 10 }} />  
      <Button title="Yellow Green" onPress={() => setBgColor('yellowgreen')} />
      <View style={{ height: 10 }} /> 
      <Button title="Light Green" onPress={() => setBgColor('lightgreen')} />
    <View style={{ height: 10 }} /> 
    <Button title="Sky Blue" onPress={() => setBgColor('skyblue')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center', 
    textAlign: 'center',
    borderRadius:  50,
    padding: 20,
  },
  title: { fontSize: 24, marginBottom: 20 },
  Button:{
    backgroundColor: 'black',
  }
  
});
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';

const CustomInput = (props) => {
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(false);
    setDate(currentDate);
    // Chama a função onChangeText se estiver definido
    if (props.onChangeText) {
      props.onChangeText(currentDate.toLocaleDateString());
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{props.label}</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={props.value}
          onChangeText={props.onChangeText}
          placeholder={props.placeholder}
        />
        {props.showDatePicker && (
          <TouchableOpacity style={styles.button} onPress={() => setShow(true)}>
            <Text style={styles.buttonText}>📅</Text>
          </TouchableOpacity>
        )}
      </View>
      {show && (
        <DateTimePicker
          value={date}
          mode="date"
          display="default"
          onChange={onChange}
        />
      )}
      {props.err && <Text style={styles.errorText}>{props.errorMessage}</Text>}
    </View>
  );
};

export default CustomInput;

const styles = StyleSheet.create({
  container: {
    marginTop: 8,
  },
  label: {
    color: '#ffffff',
    fontSize: 16,
    marginBottom: 4,
    fontFamily: 'AveriaLibre-Regular',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    padding: 8,
    color: '#3F92C5',
    height: 40,
    backgroundColor: '#fff',
    fontFamily: 'AveriaLibre-Regular',
  },
  button: {
    flex: 0.05, 
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 8,
    backgroundColor: '#fff',
  },
  buttonText: {
    fontSize: 18,
  },
  errorText: {
    marginTop: 4,
    color: '#FF6347',
    fontSize: 14,
    fontFamily: 'AveriaLibre-Regular',
  },
});

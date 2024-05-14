import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';

const Contactus = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>DROP US A NOTE</Text>
      <Text style={{marginTop: 10, textAlign: 'center', color: 'black'}}>
        You can also fill in the form below to send us your queries.
      </Text>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="first name"
          placeholderTextColor={'black'}
          style={styles.input}
          value={firstName}
          onChangeText={text => setFirstName(text)}
        />
        <TextInput
          placeholder="last name"
          placeholderTextColor={'black'}
          value={lastName}
          style={styles.input}
          onChangeText={text => setLastName(text)}
        />
        <TextInput
          value={email}
          placeholderTextColor={'black'}
          placeholder="email"
          style={styles.input}
          onChangeText={text => setEmail(text)}
        />
        <TextInput
          keyboardType="numeric"
          value={phone}
          placeholder="contact number"
          placeholderTextColor={'black'}
          style={styles.input}
          onChangeText={text => setPhone(text)}
        />
        <TextInput
          placeholder="message"
          placeholderTextColor={'black'}
          value={message}
          multiline
          style={[styles.input, {height: 100}]}
          onChangeText={text => setMessage(text)}
        />
      </View>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Contactus;

const styles = StyleSheet.create({
  container: {flex: 1, padding: 10},
  heading: {
    fontSize: 25,
    color: '#00308F',
    fontWeight: '400',
    alignSelf: 'center',
  },
  input: {
    backgroundColor: 'white',
    borderRadius: 10,
    paddingHorizontal: 10,
    fontSize: 16,
    elevation: 5,
  },
  inputContainer: {marginTop: 20, rowGap: 20},
  button: {
    alignSelf: 'center',
    marginTop: 50,
    width: 120,
    height: 50,
    backgroundColor: '#00308F',
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold',
  },
});

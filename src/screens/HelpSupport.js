import {
  Alert,
  Button,
  StyleSheet,
  Text,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import Dropdown from 'react-native-dropdown-picker';
import DocumentPicker from 'react-native-document-picker';

const HelpSupport = () => {
  const [companyPhone, setCompanyPhone] = useState('9123456789');
  const [phone, setPhone] = useState('9090239023');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState('General');
  const [items, setItems] = useState([
    {label: 'General', value: 'General'},
    {label: 'KYC Approval', value: 'KYC Approval'},
    {label: 'Loyalty Approval', value: 'Loyalty Approval'},
  ]);
  const [selectedFile, setSelectedFile] = useState(null);

  const pickFile = async () => {
    try {
      const file = await DocumentPicker.pickSingle({
        type: [DocumentPicker.types.allFiles],
      });
      setSelectedFile(file);
    } catch (err) {
      console.log('err', err);
      Alert.alert(`${err}`);
    }
  };
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Help & Support</Text>
      <Text style={{marginTop: 10, textAlign: 'center', color: 'black'}}>
        You can also fill in the form below to send us your queries.
      </Text>
      <View style={styles.inputContainer}>
        <TextInput editable={false} style={styles.input} value={companyPhone} />
        <TextInput editable={false} value={phone} style={styles.input} />
        <Dropdown
          open={open}
          value={value}
          items={items}
          setOpen={setOpen}
          setValue={setValue}
          setItems={setItems}
          style={[
            styles.input,
            {border: 'none', borderColor: 'white', elevation: 5},
          ]}
        />
        <TextInput
          placeholder="Subject"
          placeholderTextColor={'black'}
          value={subject}
          style={styles.input}
          onChangeText={setSubject}
        />

        <TextInput
          placeholder="message"
          placeholderTextColor={'black'}
          value={message}
          multiline
          style={[styles.input, {height: 100}]}
          onChangeText={setMessage}
        />
      </View>
      <View style={styles.fileSection}>
        <Text style={{fontSize: 18, color: 'black'}}>
          {selectedFile ? `${selectedFile.name}` : 'Upload Attachment'}
        </Text>
        <TouchableOpacity onPress={pickFile} style={styles.uploadButton}>
          <Text style={styles.upload}>Upload</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
};

export default HelpSupport;

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
    color: 'black',
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
  fileSection: {
    marginTop: 20,
    backgroundColor: 'white',
    height: 50,
    borderRadius: 10,
    elevation: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 20,
  },
  uploadButton: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#00308F',
    padding: 10,
    borderRadius: 10,
    height: 50,
    width: 100,
  },
  upload: {fontSize: 18, fontWeight: 'bold', color: 'white'},
});

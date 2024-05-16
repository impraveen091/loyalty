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
// import Dropdown from 'react-native-dropdown-picker';
import DocumentPicker from 'react-native-document-picker';
import {RadioButton} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';

const AddBankDetails = () => {
  const navigation = useNavigation();
  const [bank, setBank] = useState('');
  const [account, setAccount] = useState('');
  const [cfmaccount, setCfmaccount] = useState('');
  const [name, setName] = useState('');
  const [ifsc, setIfsc] = useState('');
  const [checked, setChecked] = useState('Savings');
  //   const [open, setOpen] = useState(false);
  //   const [value, setValue] = useState('General');
  //   const [items, setItems] = useState([
  //     {label: 'General', value: 'General'},
  //     {label: 'KYC Approval', value: 'KYC Approval'},
  //     {label: 'Loyalty Approval', value: 'Loyalty Approval'},
  //   ]);
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
      <Text style={styles.heading}>Add Bank Details</Text>

      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Bank Name"
          placeholderTextColor={'grey'}
          value={bank}
          style={styles.input}
          onChangeText={setBank}
        />
        {/* <Dropdown
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
        /> */}
        <TextInput
          placeholder="Account Number"
          placeholderTextColor={'grey'}
          value={account}
          style={styles.input}
          onChangeText={setAccount}
        />
        <TextInput
          placeholder="confirm Account Number"
          placeholderTextColor={'grey'}
          value={cfmaccount}
          style={styles.input}
          onChangeText={setCfmaccount}
        />
        <TextInput
          placeholder="Account holder's name"
          placeholderTextColor={'grey'}
          value={name}
          style={styles.input}
          onChangeText={setName}
        />
        <View>
          <Text style={{color: 'grey', marginLeft: 10, fontSize: 16}}>
            Account Type
          </Text>
          <RadioButton.Group
            onValueChange={newValue => setChecked(newValue)}
            value={checked}>
            <RadioButton.Item label="Savings" value="Savings" />
            <RadioButton.Item label="Current" value="current" />
          </RadioButton.Group>
        </View>

        <TextInput
          placeholder="Enter IFSC code"
          placeholderTextColor={'grey'}
          value={ifsc}
          style={styles.input}
          onChangeText={setIfsc}
        />
      </View>
      <View style={styles.fileSection}>
        <Text style={{fontSize: 18, color: 'grey'}}>
          {selectedFile ? `${selectedFile.name}` : 'Bank Passbook First Page'}
        </Text>
        <TouchableOpacity onPress={pickFile} style={styles.uploadButton}>
          <Text style={styles.upload}>Upload</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Dashboard')}>
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
};

export default AddBankDetails;

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

import * as React from 'react';

import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  TextInput,
} from 'react-native';
import {
  FluidcoinsProvider,
  useFluidcoinsPay,
} from 'react-native-fluidcoins-pay';

export default function App() {
  const [value, setValue] = React.useState('0');

  const config = {
    publicKey: 'pk_test_e079029d17c14d07a044e1fdc0434e64',
    email: 'seun@gmail.com',
    onSuccess: () => {},
    amount: parseInt(value, 10) * 100,
  };

  const Button = () => {
    const { open } = useFluidcoinsPay();

    return (
      <View style={styles.button}>
        <TouchableOpacity onPress={open}>
          <Text style={styles.text}>Pay {value}</Text>
        </TouchableOpacity>
      </View>
    );
  };
  return (
    <View style={styles.container}>
      <FluidcoinsProvider {...config}>
        <TextInput
          style={styles.input}
          value={value}
          onChangeText={(v) => setValue(v)}
        />
        <Button />
      </FluidcoinsProvider>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 64,
  },
  box: {
    width: 60,
    height: 60,
    marginVertical: 20,
  },
  button: {
    backgroundColor: 'blue',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderRadius: 4,
    width: '100%',
  },
  text: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
  },
  input: {
    borderColor: 'green',
    borderWidth: 1,
    borderRadius: 2,
    marginBottom: 8,
    padding: 10,
    width: '100%',
  },
});

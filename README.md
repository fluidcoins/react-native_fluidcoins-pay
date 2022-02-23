# Fluidcoins Pay React Native SDK

Fluidcoins Pay.js is quick and secure way to receive crypto payments in your application. It works with all Javascript frameworks
## Documentation

## Getting Started
1: Register a merchant account on [Fluidcoins](https://fluidcoins.com/) and get your public API key

## Installation

You can install the package via NPM or Yarn;

```
npm i @fluidcoins/react-native-fluidcoins-pay

```

OR

```
yarn add @fluidcoins/react-native-fluidcoins-pay
```
Also install **`react-native-webview`** because it's a peer dependency for this package.

## Usage

**Hooks**

```
import * as React from 'react';

import { StyleSheet, View, TouchableOpacity, Text, TextInput,} from 'react-native';
import { FluidcoinsProvider, useFluidcoinsPay } from 'react-native-fluidcoins-pay';

export default function App() {
  const [value, setValue] = React.useState('0');

  const config = {
    publicKey: 'YOUR_FLUIDCOINS_PUBLIC_KEY',
    email: 'johndoe@test.com',
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

```

## Configurations Options

- `publicKey`
- `amount`
- `email`
- `onSuccess`
- `onLoad` (optional)
- `onClose` (optional)
- `name` (optional)
- `phone` (optional)
- `metadata` (optional)

**_`publicKey`_**

**REQUIRED**

This is your Fluidcoins public API key from the [Fluidcoins](https://fluidcoins.com/) dashboard.

**_`amount`_**

**REQUIRED**

This is amount in **KOBO** you'd want to collect from the customer.

**NOTE: The miumum amount is 500 NGN**

```
const config = {
    publicKey: 'YOUR_FLUIDCOINS_PUBLIC_KEY',
    amount: parseInt(value, 10) * 100,
  };
```

**_`email`_**

**REQUIRED**

This is the email address of the customer

```
const config = {
    publicKey: 'YOUR_FLUIDCOINS_PUBLIC_KEY',
    amount: parseInt(value, 10) * 100,
    email: 'johndoe@test.com',
  };
```

**_`onSuccess`_**

**REQUIRED**

This is function that will be called when a successful transaction occurs.

```
const config = {
  publicKey: 'YOUR_FLUIDCOINS_PUBLIC_KEY',
  amount: parseInt(value, 10) * 100,
  email: 'johndoe@test.com',
  onSuccess: (data) => {
    console.log(data)
  }
};
```

 A JSON payload is passed as argument with the structure below;

```
{
    reference: TRANS_REFERENCE,
    coin: 'BTC',
    human_readable_amount: 1000,
    payment_status: 'underpaid | overpaid | paid_in_full'
}
```
> Payment status could be overpaid, underpaid or paid_in_full


**_`onClose`_**

**OPTIONAL**

This optional closure is called when a user closes the Fluidcoins Widget. It takes no argument

```
const config = {
  publicKey: 'YOUR_FLUIDCOINS_PUBLIC_KEY',
  amount: parseInt(value, 10) * 100,
  email: 'johndoe@test.com',
  onSuccess: (data) => {
    console.log(data)
  },
  onClose: () => {},
};
```


**_`name`_**

**OPTIONAL**

This optional parameter; which is the name of customer who want to initiate the transaction. It reflects on the  [Fluidcoins dashboard](https://fluidcoins.com/).

```
const config = {
  publicKey: 'YOUR_FLUIDCOINS_PUBLIC_KEY',
  amount: parseInt(value, 10) * 100,
  email: 'johndoe@test.com',
  onSuccess: (data) => {
    console.log(data)
  },
  onClose: () => {},
  name: 'Seun Akanni'
};
```


**_`phone`_**

**OPTIONAL**

This optional parameter; which is the phone number of customer who want to initiate the transaction. It reflects on the  [Fluidcoins dashboard](https://fluidcoins.com/).

```
const config = {
  publicKey: 'YOUR_FLUIDCOINS_PUBLIC_KEY',
  amount: parseInt(value, 10) * 100,
  email: 'johndoe@test.com',
  onSuccess: (data) => {
    console.log(data)
  },
  onClose: () => {},
  name: 'Seun Akanni',
  phone: '+2348090909090',
};
```

**_`reference`_**

**OPTIONAL**

This optional parameter; which is used to identify the initiated transaction.

**NOTE** : It must be unique per transaction

```
const config = {
  publicKey: 'YOUR_FLUIDCOINS_PUBLIC_KEY',
  amount: parseInt(value, 10) * 100,
  email: 'johndoe@test.com',
  onSuccess: (data) => {
    console.log(data)
  },
  onClose: () => {},
  name: 'Seun Akanni',
  phone: '+2348090909090',
  reference: 'random-unique-identifier'
};
```


**_`metadata`_**

**OPTIONAL**

This optional parameter, which is should contain data you will like to be passed via webhooks about the transaction.
NOTE: The _metadata_ must be an **OBJECT**

```
const config = {
  publicKey: 'YOUR_FLUIDCOINS_PUBLIC_KEY',
  amount: parseInt(value, 10) * 100,
  email: 'johndoe@test.com',
  onSuccess: (data) => {
    console.log(data)
  },
  onClose: () => {},
  name: 'Seun Akanni',
  phone: '+2348090909090',
  reference: 'random-unique-identifier'
  metadata: {
      key: 1
  }
};
```


**_`currency`_**

**OPTIONAL**

Possible values are the ISO 4217 currency codes, such as "USD" for the US dollar"

NOTE: It defaults to default currency set on your [Fluidcoins](https://fluidcoins.com/)  dashboard.

```
const config = {
  publicKey: 'YOUR_FLUIDCOINS_PUBLIC_KEY',
  amount: parseInt(value, 10) * 100,
  email: 'johndoe@test.com',
  onSuccess: (data) => {
    console.log(data)
  },
  onClose: () => {},
  name: 'Seun Akanni',
  phone: '+2348090909090',
  reference: 'random-unique-identifier'
  metadata: {
      key: 1
  },
  currency: 'USD'
};
```

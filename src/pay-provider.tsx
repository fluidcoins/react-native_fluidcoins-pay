import React, { useState } from 'react';
import FluidcoinsPay from './fluidcoins-pay';
import type { ConfigProps } from './types';
import { generatePayUrl } from './utils';

const initialState = {
  open: null,
} as { open: any };

export const FluidcoinsContext = React.createContext(initialState);

interface FPProps extends ConfigProps {
  children?: React.ReactNode;
}

const FluidcoinsProvider = (props: FPProps) => {
  const [openWidget, setOpenWidget] = useState<boolean>(false);
  const [payURL, setPayURL] = useState<string>('');
  const {
    publicKey,
    amount,
    email,
    name,
    phone,
    metadata,
    reference,
    currency,
  } = props;

  const open = () => {
    setPayURL(
      generatePayUrl({
        api_key: publicKey,
        amount,
        email,
        name,
        phone,
        metadata,
        reference,
        currency,
      })
    );
    setOpenWidget(true);
  };
  return (
    <FluidcoinsContext.Provider value={{ open }}>
      <FluidcoinsPay
        {...Object.assign({}, { openWidget, setOpenWidget, payURL }, props)}
      />
      {props.children}
    </FluidcoinsContext.Provider>
  );
};

export default FluidcoinsProvider;

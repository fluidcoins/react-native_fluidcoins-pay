import React, { useState } from 'react';
import FluidcoinsPay from './fluidcoins-pay';
import type { ConfigProps } from './types';

const initialState = {
  open: null,
} as { open: any };

export const FluidcoinsContext = React.createContext(initialState);

interface FPProps extends ConfigProps {
  children?: React.ReactNode;
}

const FluidcoinsProvider = (props: FPProps) => {
  const [openWidget, setOpenWidget] = useState<boolean>(false);

  const open = () => {
    setOpenWidget(true);
  };
  return (
    <FluidcoinsContext.Provider value={{ open }}>
      <FluidcoinsPay
        {...Object.assign({}, { openWidget, setOpenWidget }, props)}
      />
      {props.children}
    </FluidcoinsContext.Provider>
  );
};

export default FluidcoinsProvider;

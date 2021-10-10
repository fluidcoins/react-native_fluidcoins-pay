import React from 'react';
import { FluidcoinsContext } from './pay-provider';

const useFluidcoinsPay = () => {
  const context = React.useContext(FluidcoinsContext);
  if (context.open === null) {
    throw new Error(
      `useFluidcoinsPay must be used within a FluidcoinsProvider`
    );
  }

  return context;
};

export default useFluidcoinsPay;

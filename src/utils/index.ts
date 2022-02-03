import type { Config } from 'src/types';

const generatePayUrl = (config: Config) => {
  let endpoint = 'https://widget.fluidcoins.com/?';
  const isValid = validate(config);
  if (isValid) {
    Object.entries(config).forEach(([key, value]) => {
      if (value) {
        endpoint += `${key}=${value}&`;
      }
    });
  }
  return endpoint;
};

const validate = (config: Config) => {
  if (!config.amount || config.amount / 100 < 500) {
    return new Error(
      `Minimum 'amount' is 500 naira. Validation failed for FluidcoinsPay`
    );
  }
  if (config.metadata && typeof config.metadata !== 'object') {
    throw new Error(
      'metadata MUST be an object. Validation failed for FluidcoinsPay'
    );
  }
  return true;
};
export { generatePayUrl };

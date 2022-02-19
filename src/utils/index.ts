import { Config, SUPPORTED_CURRENCIES } from '../types';

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
  const supportedCurrencies = Object.keys(SUPPORTED_CURRENCIES).filter(
    (currency) => typeof currency === 'string'
  );
  const currencyIsNotSupported =
    config.currency &&
    !supportedCurrencies.includes(config.currency.toUpperCase());

  if (currencyIsNotSupported) {
    throw new Error(
      `We currently don't support ${config.currency}. Validation failed for FluidcoinsPay`
    );
  }

  const currency = (config.currency && config.currency.toUpperCase()) || 'NGN';

  switch (currency) {
    case SUPPORTED_CURRENCIES.USD:
      if (!config.amount || config.amount / 100 < 1) {
        throw new Error(
          `Minimum 'amount' is 1 USD. Validation failed for FluidcoinsPay`
        );
      }
      break;
    default:
      if (!config.amount || config.amount / 100 < 500) {
        throw new Error(
          `Minimum 'amount' is 500 NGN. Validation failed for FluidcoinsPay`
        );
      }
      break;
  }

  if (config.metadata && typeof config.metadata !== 'object') {
    throw new Error(
      'metadata MUST be an object. Validation failed for FluidcoinsPay'
    );
  }
  return true;
};
export { generatePayUrl };

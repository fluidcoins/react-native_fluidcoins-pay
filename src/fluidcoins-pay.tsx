import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Modal,
  ActivityIndicator,
  View,
} from 'react-native';
import WebView from 'react-native-webview';
import PropTypes from 'prop-types';
import { generatePayUrl } from './utils';
import { ConfigProps, WebViewMessage, WebViewMessageType } from './types';

const FluidcoinsPay = (configProps: ConfigProps): JSX.Element => {
  const { publicKey, amount, email, name, phone, metadata } = configProps;
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const pay_url = React.useMemo(() => {
    return generatePayUrl({
      api_key: publicKey,
      amount,
      email,
      name,
      phone,
      metadata,
    });
  }, [publicKey, amount, email, name, phone, metadata]);

  const messageHandler = (message: string) => {
    const response = JSON.parse(message) as WebViewMessage;

    switch (response.type) {
      case WebViewMessageType.WIDGET_OPEN:
        configProps.onEvent(response.data);
        break;
      case 'fluidcoins.widget_closed':
        configProps.setOpenWidget(false);
        break;
      case 'fluidcoins.success':
        configProps.onSuccess(response.data);
        break;
      case 'fluidcoins.error':
        configProps.onError(response.data);
        break;
      default:
        break;
    }
  };
  return (
    <SafeAreaView style={styles.full}>
      <Modal
        transparent={false}
        animationType="fade"
        visible={configProps.openWidget}
        onRequestClose={() => {
          configProps.setOpenWidget(false);
        }}
      >
        <SafeAreaView style={styles.full}>
          <WebView
            style={styles.full}
            source={{ uri: pay_url }}
            onLoadStart={() => setIsLoading(true)}
            onLoadEnd={() => setIsLoading(false)}
            onMessage={(event) => {
              messageHandler(event.nativeEvent.data);
            }}
          />
          {isLoading && (
            <View style={styles.full}>
              <ActivityIndicator size="large" color="#035AA6" />
            </View>
          )}
        </SafeAreaView>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  full: {
    flex: 1,
  },
});

FluidcoinsPay.propTypes = {
  publicKey: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  amount: PropTypes.number.isRequired,
  onSuccess: PropTypes.func.isRequired,
  onError: PropTypes.func,
  onEvent: PropTypes.func,
  metadata: PropTypes.object,
};

export default FluidcoinsPay;

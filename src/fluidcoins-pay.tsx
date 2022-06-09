import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Modal,
  ActivityIndicator,
  View,
  StatusBar,
} from 'react-native';
import WebView from 'react-native-webview';
import PropTypes from 'prop-types';
import {
  ConfigPropsWithURL,
  WebViewMessage,
  WebViewMessageType,
} from './types';

const FluidcoinsPay = (configProps: ConfigPropsWithURL): JSX.Element => {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const messageHandler = (message: string) => {
    const response = JSON.parse(message) as WebViewMessage;

    switch (response.type) {
      case WebViewMessageType.WIDGET_OPEN:
        configProps.onEvent && configProps.onEvent(response.data);
        break;
      case 'fluidcoins.widget_closed':
        configProps.setOpenWidget && configProps.setOpenWidget(false);
        break;
      case 'fluidcoins.success':
        configProps.onSuccess(response.data);
        break;
      case 'fluidcoins.error':
        configProps.onError && configProps.onError(response.data);
        break;
      default:
        break;
    }
  };
  return (
    <SafeAreaView style={styles.fullFlex}>
      <Modal
        transparent={false}
        animationType="fade"
        visible={configProps.openWidget}
        onRequestClose={() => {
          configProps.setOpenWidget && configProps.setOpenWidget(false);
        }}
      >
        <SafeAreaView style={[styles.fullFlex, styles.innerContainer]}>
          <StatusBar backgroundColor="#252525" barStyle={'light-content'} />
          <WebView
            style={styles.webView}
            source={{
              uri: configProps.payURL,
            }}
            onLoadStart={() => setIsLoading(true)}
            onLoadEnd={() => setIsLoading(false)}
            onMessage={(event) => {
              messageHandler(event.nativeEvent.data);
            }}
          />
          {isLoading && (
            <View style={styles.loaderContainer}>
              <ActivityIndicator size="large" color="#035AA6" />
            </View>
          )}
        </SafeAreaView>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  fullFlex: {
    flex: 1,
  },
  innerContainer: {
    flex: 1,
    backgroundColor: '#252525',
  },
  webView: {
    flex: 4,
    backgroundColor: '#252525',
  },
  loaderContainer: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

FluidcoinsPay.propTypes = {
  publicKey: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  amount: PropTypes.number.isRequired,
  onSuccess: PropTypes.func.isRequired,
  onError: PropTypes.func,
  onEvent: PropTypes.func,
  reference: PropTypes.string,
  metadata: PropTypes.object,
  currency: PropTypes.string,
  payURL: PropTypes.string.isRequired,
};

export default FluidcoinsPay;

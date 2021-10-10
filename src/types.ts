export interface Config {
  api_key?: string;
  amount: number;
  email: string;
  name?: string;
  phone?: string;
  metadata?: Object;
}

export interface ConfigProps extends Config {
  publicKey: string;
  callback_url?: string;
  onSuccess: (data: PaySuccessData) => void;
  onError(data: PayEventData): (data: PayEventData) => void;
  onLoad(): () => undefined;
  onEvent(data: any): (event: PayEventData) => void;
  openWidget?: boolean;
  setOpenWidget(open: boolean): () => void;
}

export interface PayEventData {
  type: string;
  data: any;
}

export interface PaySuccessData {
  reference: string;
  coin: string;
  human_readable_amount: number;
  payment_status: PAY_STATUS;
}

export enum PAY_STATUS {
  UNDERPAID = 'underpaid',
  OVERPAID = 'overpaid',
  PAID_IN_FULL = 'paid_in_full',
}

export enum WebViewMessageType {
  WIDGET_OPEN = 'fluidcoins.widget_opened',
  WIDGET_CLOSED = 'fluidcoins.widget_closed',
  SUCCESS = 'fluidcoins.success',
  ERROR = 'fluidcoins.error',
  CALL_CALLBACK_URL = 'fluidcoins.call_callback_url',
}

export interface WebViewMessage {
  type: WebViewMessageType;
  data: any;
}

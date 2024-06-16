import {action, computed, makeObservable, observable} from 'mobx';
import RootStore from './RootStore';
import webSocketClient from '../protocol/webSocket/socket';
import convertAllMarketFromWS from '../utils/convertAllMarketFromWS';
import convertCurrencyDepth from '../utils/convertCurrencyDepth';
import {CurrencyType, MarketType} from '../dataTypes';

function mergeArrays(arr1, arr2) {
  // Create a result array starting with all elements from arr1
  const result = [...arr1];

  // Iterate over arr2 to update or add objects to result
  arr2.forEach(item2 => {
    const index = result.findIndex(item1 => item1.symbol == item2.symbol);
    if (index !== -1) {
      // If the object exists in both arrays, update the object in result
      result[index] = item2;
    } else {
      // If the object exists only in arr2, add it to result
      result.push(item2);
    }
  });

  return result;
}

const defaultCurrency = 'BTCUSDT';

class PriceFeedStore {
  rootStore: RootStore;

  constructor(rootStore: RootStore) {
    makeObservable(this);
    this.rootStore = rootStore;
  }

  @observable
  loadingMarkets = false;

  @observable
  loadingCurrency = false;

  @observable
  selectedCurrency = '';

  @observable
  listOfMarkets: Array<MarketType> = [];

  @observable
  currencyDepth: CurrencyType = {} as CurrencyType;

  @observable
  onDisconnect = () => {};

  @observable
  onDisconnectCurrency = () => {};

  @computed
  get selectedCurrencyPrice(): number {
    let selectedCurrencyInfo = this.listOfMarkets.find(
      item => item.symbol == this.selectedCurrency,
    );
    return selectedCurrencyInfo?.openPrice
      ? Number(selectedCurrencyInfo.openPrice.toString())
      : 0;
  }

  @action
  setListOfMarkets = (data: Array<any>) => {
    this.listOfMarkets = mergeArrays(this.listOfMarkets, data);
  };

  @action
  setLoadingCurrency = (data: boolean) => {
    this.loadingCurrency = data;
  };

  @action
  setCurrencyDepth = (data: any) => {
    this.currencyDepth = data;
  };

  @action
  setLoadingCurrencies = (data: boolean) => {
    this.loadingMarkets = data;
  };

  @action
  setSelectedCurrency = (data: string) => {
    this.selectedCurrency = data;
  };

  @action
  getListOfMarkets = async () => {
    try {
      this.loadingMarkets = true;
      const {onMessage, disconnect} = webSocketClient('/ws/!miniTicker@arr');

      onMessage(this.updateListOfMarkets);

      this.onDisconnect = disconnect;
    } catch (error) {
      console.warn('PriceFeedStore -> getListOfMarkets method error:', error);
      this.loadingMarkets = false;
    } finally {
    }
  };

  @action
  updateListOfMarkets = async (e: WebSocketMessageEvent) => {
    try {
      const convertedData = await convertAllMarketFromWS(e);
      if (this.loadingMarkets) {
        convertedData.forEach(item => {
          if (item.symbol == defaultCurrency) {
            if (!this.selectedCurrency) {
              this.getCurrencyDeep(defaultCurrency);
            }
            this.setLoadingCurrencies(false);
          }
        });
      }
      this.setListOfMarkets(convertedData);
    } catch (error) {
      console.warn(
        'PriceFeedStore -> updateListOfMarkets method error:',
        error,
      );
    }
  };

  @action
  getCurrencyDeep = async (currency: string) => {
    if (currency !== this.selectedCurrency) {
      try {
        this.setLoadingCurrency(true);
        this.setSelectedCurrency(currency);
        this.onDisconnectCurrency();
        const {onMessage, disconnect} = webSocketClient(
          `/ws/${currency.toLowerCase()}@depth`,
        );

        onMessage(this.updateCurrency);

        this.onDisconnectCurrency = disconnect;
      } catch (error) {
        console.warn('PriceFeedStore -> getCurrencyDeep method error:', error);
      }
    }
  };

  @action
  updateCurrency = async (e: WebSocketMessageEvent) => {
    try {
      const convertedData = await convertCurrencyDepth(e);
      this.setCurrencyDepth(convertedData);
      this.setLoadingCurrency(false);
    } catch (error) {
      console.warn('PriceFeedStore -> updateCurrency method error:', error);
    }
  };
}

export default PriceFeedStore;

import PriceFeedStore from './PriceFeedStore';

class RootStore {
  priceFeedStore: PriceFeedStore;

  constructor() {
    this.priceFeedStore = new PriceFeedStore(this);
  }
}

export const rootStore = new RootStore();

export default RootStore;

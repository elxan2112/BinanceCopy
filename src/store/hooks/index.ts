import {useStore} from '..';
import PriceFeedStore from '../PriceFeedStore';

export function usePriceFeedStore(): PriceFeedStore {
  return useStore().priceFeedStore;
}

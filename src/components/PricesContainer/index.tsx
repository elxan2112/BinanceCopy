import {observer} from 'mobx-react';
import React, {FC, useCallback, useEffect, useMemo, useState} from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {usePriceFeedStore} from '../../store/hooks';
import AsksAndBids from '../../assets/icons/asksAndBids';
import Asks from '../../assets/icons/asks';
import Bids from '../../assets/icons/bids';

interface IPricesContainerProps {}

const PricesContainer: FC<IPricesContainerProps> = () => {
  const {
    currencyDepth,
    onDisconnectCurrency,
    selectedCurrencyPrice,
    loadingCurrency,
  } = usePriceFeedStore();

  const [pricesFilter, setPricesFilter] = useState('asksAndBids');
  const [countOfAsks, setCountOfAsks] = useState(10);
  const [countOfBids, setCountOfBids] = useState(10);

  const onPressPricesFilter = useCallback(() => {
    switch (pricesFilter) {
      case 'asksAndBids':
        setPricesFilter('asks');
        setCountOfBids(0);
        setCountOfAsks(10);
        break;
      case 'asks':
        setPricesFilter('bids');
        setCountOfAsks(0);
        setCountOfBids(10);
        break;
      case 'bids':
        setPricesFilter('asksAndBids');
        setCountOfAsks(10);
        setCountOfBids(10);
        break;
    }
  }, [pricesFilter, setPricesFilter, setCountOfAsks, setCountOfBids]);

  const pricesFilterIcon = useMemo(() => {
    switch (pricesFilter) {
      case 'asksAndBids':
        return <AsksAndBids />;
      case 'asks':
        return <Asks />;
      case 'bids':
        return <Bids />;
      default:
        return <></>;
    }
  }, [pricesFilter]);

  useEffect(() => {
    return () => {
      onDisconnectCurrency();
    };
  }, []);

  if (loadingCurrency) {
    return (
      <View style={styles.indicatorContainer}>
        <ActivityIndicator size={'large'} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.columnContainer}>
        <Text style={styles.title}>Price</Text>
        <Text style={styles.title}>Amount</Text>
      </View>
      <View>
        {currencyDepth?.asks?.map((item, index) => {
          if (countOfBids == 0 ? index > 0 : index < countOfAsks) {
            return (
              <View key={item[0] + item[1]} style={styles.columnContainer}>
                <Text style={styles.askPrice}>
                  {Number(item[0].toString())}
                </Text>
                <Text style={styles.amount}>{Number(item[1].toString())}</Text>
              </View>
            );
          }
        })}
      </View>
      <Text style={styles.currentPrice}>{selectedCurrencyPrice}</Text>
      <View>
        {currencyDepth?.bids?.map((item, index) => {
          if (countOfAsks == 0 ? index > 0 : index < countOfBids) {
            return (
              <View key={item[0] + item[1]} style={styles.columnContainer}>
                <Text style={styles.bidPrice}>
                  {Number(item[0].toString())}
                </Text>
                <Text style={styles.amount}>{Number(item[1].toString())}</Text>
              </View>
            );
          }
        })}
      </View>
      <TouchableOpacity onPress={onPressPricesFilter}>
        {pricesFilterIcon}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 8,
  },
  indicatorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  columnContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  currentPrice: {
    fontSize: 16,
    color: 'white',
    alignSelf: 'center',
    marginVertical: 16,
  },
  title: {
    color: '#848E9C',
  },
  askPrice: {
    color: 'red',
  },
  bidPrice: {
    color: 'green',
  },
  amount: {
    color: 'white',
  },
});

export default observer(PricesContainer);

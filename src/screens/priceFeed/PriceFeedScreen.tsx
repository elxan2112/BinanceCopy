import React, {FC, useEffect} from 'react';
import {ActivityIndicator, StyleSheet, View} from 'react-native';

import {observer} from 'mobx-react';
import {usePriceFeedStore} from '../../store/hooks';
import MarketsContainer from '../../components/MarketsContainer';
import PricesContainer from '../../components/PricesContainer';

interface IPriceFeedScreenProps {}

const PriceFeedScreen: FC<IPriceFeedScreenProps> = ({}) => {
  const {getListOfMarkets, loadingMarkets, onDisconnect} = usePriceFeedStore();

  useEffect(() => {
    getListOfMarkets();

    return () => {
      onDisconnect();
    };
  }, []);

  if (loadingMarkets) {
    return (
      <View style={styles.indicatorContainer}>
        <ActivityIndicator size={'large'} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.screenPart}>
        <MarketsContainer />
      </View>
      <View style={styles.screenPart}>
        <PricesContainer />
      </View>
    </View>
  );
};

export default observer(PriceFeedScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#161A1E',
    flexDirection: 'row',
  },
  indicatorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  screenPart: {
    flex: 0.5,
  },
});

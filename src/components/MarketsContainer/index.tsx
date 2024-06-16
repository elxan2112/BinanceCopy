import React, {FC, useCallback} from 'react';
import {observer} from 'mobx-react';
import {FlatList, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {usePriceFeedStore} from '../../store/hooks';
import {MarketType} from '../../dataTypes';

interface IMarketsContainerProps {}

const MarketsContainer: FC<IMarketsContainerProps> = () => {
  const {listOfMarkets, selectedCurrency, getCurrencyDeep} =
    usePriceFeedStore();

  const renderItem = useCallback(
    ({item}: {item: MarketType}) => (
      <TouchableOpacity
        onPress={() => getCurrencyDeep(item.symbol)}
        key={item.symbol}
        style={{
          backgroundColor: selectedCurrency == item.symbol ? 'blue' : 'white',
        }}>
        <Text style={styles.item}>
          {item.symbol}: {Number(item.openPrice.toString())}
        </Text>
      </TouchableOpacity>
    ),
    [selectedCurrency, getCurrencyDeep],
  );

  return (
    <FlatList
      data={listOfMarkets}
      renderItem={renderItem}
      initialNumToRender={20}
    />
  );
};

const styles = StyleSheet.create({
  item: {
    fontSize: 16,
    fontWeight: '600',
    margin: 16,
  },
});

export default observer(MarketsContainer);

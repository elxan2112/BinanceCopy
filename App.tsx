import React from 'react';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';
import {StyleSheet} from 'react-native';
import {StoreProvider} from './src/store';
import AppContainer from './src/screens/AppContainer';
import ErrorBoundary from './src/utils/error/ErrorBoundary';

function App(): JSX.Element {
  return (
    <StoreProvider>
      <SafeAreaProvider>
        <SafeAreaView style={styles.container}>
          <ErrorBoundary>
            <AppContainer />
          </ErrorBoundary>
        </SafeAreaView>
      </SafeAreaProvider>
    </StoreProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#161A1E',
  },
});

export default App;

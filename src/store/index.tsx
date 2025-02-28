import React, {Context, createContext, FC, ReactNode, useContext} from 'react';

import RootStore, {rootStore} from './RootStore';

const StoreContext: Context<RootStore> = createContext(rootStore);

/**
 * Hook for connecting stores in components
 */
export function useStore(): RootStore {
  return useContext(StoreContext);
}

export const StoreProvider: FC<{children?: ReactNode}> = ({children}) => {
  return (
    <StoreContext.Provider value={rootStore}>{children}</StoreContext.Provider>
  );
};

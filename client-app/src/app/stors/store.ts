import { useContext } from 'react';
import { createContext } from "react";
import ActvityStore from './ActivityStore';
import CommonStore from './commonStore';

interface Store {
    activityStore: ActvityStore
    commonStore: CommonStore
}

export const store: Store = {
    activityStore: new ActvityStore(),
    commonStore: new CommonStore()
}
export const StoreContext = createContext(store);

export function useStore() {
    return useContext(StoreContext)
}
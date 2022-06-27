import { useContext } from 'react';
import { createContext } from "react";
import ActvityStore from './ActivityStore';

interface Store {
    activityStore: ActvityStore
}

export const store: Store = {
    activityStore: new ActvityStore()
}
export const StoreContext = createContext(store);

export function useStore() {
    return useContext(StoreContext)
}
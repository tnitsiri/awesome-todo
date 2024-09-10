'use client';

import { ReactNode, useRef } from 'react';
import { Provider } from 'react-redux';
import { makeStore, AppStore } from './store';

/**
 * ANCHOR Props
 * @date 9/11/2024 - 1:35:07 AM
 *
 * @typedef {Props}
 */
type Props = {
    children: ReactNode;
};

/**
 * ANCHOR Store Provider
 * @date 9/11/2024 - 1:35:13 AM
 *
 * @param {Props} { children }
 * @returns {*}
 */
const StoreProvider = ({ children }: Props) => {
    const storeRef = useRef<AppStore>();

    if (!storeRef.current) {
        storeRef.current = makeStore();
    }

    return <Provider store={storeRef.current}>{children}</Provider>;
};

export default StoreProvider;

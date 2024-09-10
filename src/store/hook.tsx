import type { RootState, AppDispatch, AppStore } from './store';
import { useDispatch, useSelector, useStore } from 'react-redux';

/**
 * ANCHOR Use App Dispatch
 * @date 9/11/2024 - 1:34:50 AM
 *
 * @type {*}
 */
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();

/**
 * ANCHOR Use App Selector
 * @date 9/11/2024 - 1:34:55 AM
 *
 * @type {*}
 */
export const useAppSelector = useSelector.withTypes<RootState>();

/**
 * ANCHOR Use App Store
 * @date 9/11/2024 - 1:35:00 AM
 *
 * @type {*}
 */
export const useAppStore = useStore.withTypes<AppStore>();

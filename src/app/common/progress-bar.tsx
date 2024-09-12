'use client';

import { AppProgressBar } from 'next-nprogress-bar';

/**
 * ANCHOR Progress Bar
 * @date 9/12/2024 - 7:11:35 AM
 *
 * @returns {*}
 */
const ProgressBar = () => {
    return (
        <AppProgressBar
            color="#FF038F"
            height="2px"
            shallowRouting={true}
            options={{
                showSpinner: false,
            }}
        />
    );
};

export default ProgressBar;

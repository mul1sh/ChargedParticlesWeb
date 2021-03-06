// Frameworks
import React, { useContext } from 'react';
import { navigate } from '@reach/router';
import * as _ from 'lodash';

// Material UI
import { makeStyles } from '@material-ui/core/styles';
import Hidden from '@material-ui/core/Hidden';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

// Rimble UI
import { Blockie } from 'rimble-ui';

// App Components
import { ConnectionDot } from './ConnectionDot';
import { Helpers } from '../../utils/helpers';

// Data Context for State
import { WalletContext } from '../stores/wallet.store';

// Common
import { GLOBALS } from '../../utils/globals';


// Custom Styles
const useCustomStyles = makeStyles(theme => ({
    walletButton: {
        marginLeft: 'auto',
        color: theme.colors.grey,
        textTransform: 'none',
    },
    rounded: {
        width: '32px',
        height: '32px',
        marginLeft: '10px',
        border: '1px solid #999',
        borderRadius: '5px',
        overflow: 'hidden',
    },
    progress: {
        background: theme.colors.grey,
    },
    progressCircle: {
        marginTop: '6px',
    },
}));


let _lastConnectedAddress = '';

function WalletButton() {
    const customClasses = useCustomStyles();
    const [walletState] = useContext(WalletContext);

    const _connectWallet = () => {
        navigate(`${GLOBALS.ACCELERATOR_ROOT}/connect`);
    };

    //
    // Not Logged In - Connect Wallet Button
    //
    if (_.isEmpty(_lastConnectedAddress) && _.isEmpty(walletState.connectedAddress)) {
        return (
            <Button
                className={customClasses.walletButton}
                aria-label="Connect Wallet"
                onClick={_connectWallet}
            >
                <ConnectionDot connected={false} />
                Connect
                <Hidden xsDown implementation="css">&nbsp;Wallet</Hidden>
            </Button>
        );
    }
    _lastConnectedAddress = walletState.connectedAddress;

    //
    // Logged In - Wallet Button
    //
    const _getBlockie = () => {
        const blockieOptions = Helpers.getBlockieOptions(walletState);
        let blockie = (<div className={customClasses.progress}>
            <CircularProgress
                color="primary"
                variant="indeterminate"
                className={customClasses.progressCircle}
                size={18}
            />
        </div>);
        if (!_.isEmpty(walletState.connectedAddress)) {
            blockie = (<Blockie opts={blockieOptions} />);
        }
        return blockie;
    };

    return (
        <Button
            className={customClasses.walletButton}
            aria-label="Connect Wallet"
            onClick={_connectWallet}
        >
            <Hidden xsDown implementation="css">
                {walletState.connectedName}
            </Hidden>
            <div className={customClasses.rounded}>
                {_getBlockie()}
            </div>
        </Button>
    );
}

export { WalletButton };

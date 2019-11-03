import React from 'react';
import Button from '@material-ui/core/Button';
import TopBar from '../components/TopBar';
import {gs} from '../styles';
// themes
import {defaultTheme as theme} from '../themes';


export const STV: React.FC = () => {
    const classes = gs();
    return (
        <div className={classes.container}>
            <TopBar name="What is STV?" />
            <div className={classes.content}>
                <p className={classes.par}>
                    STV stands for Single Transferable Voting. It's p good, far superior to first past the poll.
                </p>
                
            </div>
        </div>
    );
}


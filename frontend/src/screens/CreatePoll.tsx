import React from 'react';
import TopBar from '../components/TopBar';
import { makeStyles } from '@material-ui/core/styles';
// themes
import {defaultTheme as theme} from '../themes';

export const CreatePoll: React.FC = () => {

    return (
        <div>
            <TopBar name="New Poll" />
        </div>
    );
}


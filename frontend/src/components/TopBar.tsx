import React from 'react';
import {BrowserRouter, Link} from "react-router-dom";
import styled from "styled-components";
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
// theme
import {defaultTheme as theme} from '../themes';
const useStyles = makeStyles({
    bar: {
        backgroundColor: theme.colors.primary,
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        maxHeight: "2cm",
    },
    title: {
        color: theme.colors.text,
        fontSize: 'larger',
    },
    rightButtonContainer: {
        margin: "2em",
    },
    leftButtonContainer: {
        margin: "2em",
    },
    button: {
        color: theme.colors.background,         
        backgroundColor: theme.colors.secondary,
        fontSize: "smaller",
    }
});

interface TopBarProps {
    name: string
}
const TopBar: React.FC<TopBarProps> = (props) => {
    const classes = useStyles();
    return (
        <div className={classes.bar}>
            <div className={classes.leftButtonContainer}>
                <Link to="/">
                    <Button variant="contained" size="small" className={classes.button}>
                        What is STV?
                    </Button>
                </Link>
            </div>

            <p className={classes.title}>
                {props.name}
            </p>
            <div className={classes.rightButtonContainer}>
                <Link to="/create-poll">
                    <Button variant="contained" size="small" className={classes.button}>
                        New Poll
                    </Button>
                </Link>
            </div>
        </div>
    );
}

export default TopBar;

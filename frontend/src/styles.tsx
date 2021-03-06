import styled from "styled-components";
import {defaultTheme as theme} from './themes';
import { makeStyles } from '@material-ui/core/styles';

export const gs = makeStyles({
    container: {
        display: "flex",
        flexDirection: "column",
    },
    content: {
        backgroundColor: theme.colors.background,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        color: theme.colors.text,
        padding: "1em",
    },
    par: {
        color: theme.colors.text,
    },
    button: {
        backgroundColor: theme.colors.secondary,
        color: theme.colors.background,
        textAlign: "center",
        marginBottom: "1em",
        marginLeft: "auto",
        marginRight: "auto",
        float: "left",
        position: "relative",
        left: "50%",
    },
    submitButton: {
        backgroundColor: theme.colors.secondary,
        color: theme.colors.background,
        textAlign: "center",
        margin: "1em",
    },
    floatingLabelFocusStyle: {
        color: "white",
        backgroundColor: theme.colors.text,
        margin: "1em",
    }
    
});

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
        height: "92.3vh",
    },
    par:{
        textAlign: "center",
        color: theme.colors.text,
    }
});

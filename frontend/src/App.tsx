import React from 'react';
import { BrowserRouter, Switch, Route, Link, Redirect} from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
// theme
import {defaultTheme as theme} from './themes';

// screens
import {STV} from "./screens/STV";
import {CreatePoll} from "./screens/CreatePoll";
import {Vote} from "./screens/Vote";

const App: React.FC = () => {
    
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/STV" component={STV} />
                <Route exact path="/create-poll" component={CreatePoll}/>
                <Route path="/vote/:accessor" children={<Vote />} />
                <Route exact path="/" render={() => (<Redirect to="/STV" />)} />
                <Route exact path="/vote" render={() => (<Redirect to="/STV" />)} />
            </Switch>
        </BrowserRouter>
    );
}

export default App;

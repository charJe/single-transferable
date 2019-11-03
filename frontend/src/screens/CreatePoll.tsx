import React, {useState} from 'react';
import TopBar from '../components/TopBar';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import TextField from '@material-ui/core/TextField';

import {gs} from "../styles";
// themes
import {defaultTheme as theme} from '../themes';
interface Choice {
    name: string,
    info: string,
}
export const CreatePoll = () => {
    const [choices, setChoices] = useState([]);
    const [name, setName] = useState("");
    const [prompt, setPrompt] = useState("");
    const [numWin, setNumWin] = useState(1);
    const [choiceName, setChoiceName] =useState("");
    const [choiceInfo, setChoiceInfo] =useState("");
    const classes = gs();
    let choicesDisplay = [];
    for(let choice of choices) {
        choicesDisplay.push(<button className={classes.button}>
            {(choice as Choice).name}
        </button>);
    }
    return (
        <div className={classes.container}>
            <TopBar name="New Poll" />
            <div className={classes.content}>
                <Card>
                    <CardContent>
                        <TextField
                            id="outlined-basic"
                            label="Name"
                            margin="normal"
                            variant="outlined"
                            onInput={(e) => {setName((e.target as HTMLTextAreaElement).value)}}/>
                        <br />
                        <TextField
                            id="outlined-basic"
                            label="Prompt"
                            margin="normal"
                            variant="outlined"/>
                        <br />
                        <TextField
                            id="standard-number"
                            label="Number of Winners"
                            type="number"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            margin="normal"
                            variant="outlined"/>
                        
                        <p>Add Poll Choices</p>
                        <TextField
                            id="outlined-basic"
                            label="Choice Name"
                            margin="normal"
                            variant="outlined"/>
                        <br />
                        <TextField
                            id="outlined-basic"
                            label="Choice Description"

                            margin="normal"
                            variant="outlined"/>
                        <br />
                        <Button className={classes.button}>
                            +
                        </Button>
                        {choicesDisplay}
                    </CardContent>
                </Card>
                <Button variant="contained"
                        className={classes.submitButton}
                        onClick={()=>{console.log(name)} }>
                    Submit Vote
                </Button>
            </div>
        </div>
    );
}

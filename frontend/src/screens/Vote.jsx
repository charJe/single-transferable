import React, {useState} from 'react';
import {TextField, Input, FilledInput, InputLabel, OutlinedInput, FormHelperText } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import {useParams} from 'react-router-dom';
import {Poll, getPoll} from "../BackendService";
import {defaultTheme as theme} from "../themes";
import {gs} from "../styles";
import TopBar from "../components/TopBar";

import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
export const Vote = () => {
    let { accessor: string } = useParams();
    const reorder = (list, startIndex, endIndex) => {
        const result = Array.from(list);
        const [removed] = result.splice(startIndex, 1);
        result.splice(endIndex, 0, removed);

        return result;
    };
    function onDragEnd(result) {
        // dropped outside the list
        if (!result.destination) {
            return;
        }
        const newOrder = reorder(
            order,
            result.source.index,
            result.destination.index
        );
        setOrder(newOrder);
    }

    const poll 
    = {
        name: "Class President",
        prompt: "Who should be our class president?",
        choices: [
            {
                name: "Joe Sansily",
                info: "This dude hot"
            },
            {
                name: "Frank dittle",
                info: "This dude wise"
            },
            {
                name: "Josaia Soulthfrad",
                info: "This dude the dude"
            }
        ]
    };
    const [order, setOrder] = useState(poll.choices);
    const grid = 8;
    const getListStyle = isDraggingOver => ({
        background: isDraggingOver ? "lightblue" : "lightgrey",
        padding: grid,
        width: "20em",
    });
    const getItemStyle = (isDragging, draggableStyle) => ({
        // some basic styles to make the items look a bit nicer
        userSelect: "none",
        padding: grid * 2,
        margin: `0 0 ${grid}px 0`,

        // change background colour if dragging
        background: isDragging ? theme.colors.accent : theme.colors.primary,

        // styles we need to apply on draggables
        ...draggableStyle
    });

    const classes = gs();
    return (
        <div className={classes.container}>
            <TopBar name={poll.name} />
            <div className={classes.content} >
                <h1 className={classes.par}>
                    {poll.prompt}
                </h1>
                <DragDropContext onDragEnd={onDragEnd}>
                    <Droppable droppableId="droppable">
                        {(provided, snapshot) => (
                            <div ref={provided.innerRef}
                                 style={getListStyle(snapshot.isDraggingOver)}>
                                {order.map((item, index) => (
                                    <Draggable key={item.name+index} draggableId={item.name+index} index={index}>
                                        {(provided, snapshot) => (
                                            <div
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}
                                                style={getItemStyle(
                                                    snapshot.isDragging,
                                                    provided.draggableProps.style
                                                )}
                                            >
                                                <h4>{"#"+(index+1)+": "+item.name}</h4>
                                                <p>{item.info}</p>
                                            </div>
                                        )}
                                    </Draggable>
                                ))}
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
                </DragDropContext>
                <p className={classes.par}>Put your Email if you want to be reminded when vote closes.</p>
                <TextField id="outlined-basic"
                           className={classes.floatingLabelFocusStyle}
                           label="Email"
                           variant="filled" />
                <Button variant="contained" className={classes.button}>
                    Submit Vote
                </Button>
            </div>
        </div>
    );
}



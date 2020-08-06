import React from 'react';
import {Route} from "react-router-dom";

import TasksFeed from "./TasksFeed";
import TaskDetail from "./TaskDetail";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        alignItems: 'flex-start'
    },
    tasks: {
        flex: 'auto'
    }
}));

const Tasks = ({ match }) => {
    const css = useStyles();

    return (
        <div className={css.root}>
            <div className={css.tasks}>
                <TasksFeed match={match} />
            </div>
            <Route
                path={`${match.path}/:name`}
                render={({ match }) => <TaskDetail match={match}/>}
            >
            </Route>
        </div>
    )
}

export default Tasks;
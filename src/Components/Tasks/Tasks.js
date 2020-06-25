import React from 'react';
import {Route} from "react-router-dom";

import styles from "./Task.module.scss"

import TasksFeed from "./TasksFeed";
import TaskDetail from "./TaskDetail";

const Tasks = ({ match }) => {
    return (
        <div className={styles.taskWrapper}>
            <div className={styles.tasks}>
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
import React from 'react';
import {useHistory} from "react-router-dom";
import {useQuery} from "@apollo/client";

import {TASK_DETAIL} from "./TaskGQL";

import styles from "./Task.module.scss"

const TaskDetail = ({ match }) => {

    let history = useHistory();

    const { loading, error, data } = useQuery(TASK_DETAIL, {
        variables: { where: {id: match.params.name} }
    });

    if (loading) return null;
    // if (error) return <p>Error :(</p>

    const handleClick = () => {
        history.push("/tasks");
    }

    return (
        <div className={styles.taskDetail}>
            <button type="button" onClick={handleClick}>
                Close
            </button>
            {match.params.name}
            {JSON.stringify(data.task)}
        </div>
    )
}

export default TaskDetail;
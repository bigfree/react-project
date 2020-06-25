import React from 'react';
import {Link} from "react-router-dom";
import { useQuery, gql } from '@apollo/client';

import styles from "./Task.module.scss"

export const TASKS_FEED = gql`
    query TasksFeed {
        tasks {
            id
            name
            content
        }
    }
`;

const TasksFeed = ({ match }) => {
    const { loading, error, data } = useQuery(TASKS_FEED);

    if (loading) return <p>Loading...</p>
    if (error) return <p>Error :(</p>

    return data.tasks.map(({id, name, content}) => (
       <div className={styles.tasksItem} key={id}>
           <Link to={`${match.url}/${id}`}>
                {name}
           </Link>
       </div>
    ));
}

export default TasksFeed;
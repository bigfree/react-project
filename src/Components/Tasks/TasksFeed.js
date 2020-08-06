import React from 'react';
import {Link} from "react-router-dom";
import { useQuery, gql } from '@apollo/client';

import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import Checkbox from "@material-ui/core/Checkbox";

import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import {makeStyles} from "@material-ui/core/styles";

export const TASKS_FEED = gql`
    query TasksFeed {
        tasks {
            id
            name
            content
        }
    }
`;

const useStyles = makeStyles((theme) => ({
    heading: {
        fontWeight: theme.typography.fontWeightRegular,
    },
    taskLink: {
        flexGrow: '1',
        margin: '-12px 0'
    }
}));

const TasksFeed = ({ match }) => {
    const css = useStyles();
    const { loading, error, data } = useQuery(TASKS_FEED);

    if (loading) return <p>Loading...</p>
    if (error) return <p>Error :(</p>

    return data.tasks.map(({id, name, content}) => (
        <Accordion key={id}>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-label="Expand"
                aria-controls="additional-actions1-content"
                id="additional-actions1-header"
            >
                <FormControlLabel
                    aria-label="Acknowledge"
                    onClick={(event) => event.stopPropagation()}
                    onFocus={(event) => event.stopPropagation()}
                    control={<Checkbox />}
                    label=""
                />
                <Link className={css.taskLink} onClick={(event) => event.stopPropagation()} to={`${match.url}/${id}`}>
                    <Typography className={css.heading}>{name}</Typography>
                </Link>
            </AccordionSummary>
            <AccordionDetails>
                <Typography color="textSecondary">
                    The click event of the nested action will propagate up and expand the accordion unless
                    you explicitly stop it.
                </Typography>
            </AccordionDetails>
        </Accordion>
       // <div className={styles.tasksItem} key={id}>
       //     <Link to={`${match.url}/${id}`}>
       //          {name}
       //     </Link>
       // </div>
    ));
}

export default TasksFeed;
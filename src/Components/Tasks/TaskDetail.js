import React from 'react';
import {useHistory} from "react-router-dom";
import {useMutation, useQuery} from "@apollo/client";
import {Controller, useForm} from "react-hook-form";
import {makeStyles} from '@material-ui/core/styles';

import {TASK_DETAIL, TASK_UPDATE, TASKS_FEED} from "./TaskGQL";

import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import Avatar from "@material-ui/core/Avatar";
import red from "@material-ui/core/colors/red";
import CardContent from "@material-ui/core/CardContent";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from '@material-ui/icons/Close';
import TextField from "@material-ui/core/TextField";

const useStyles = makeStyles((theme) => ({
    root: {
        width: "40vw",
        marginLeft: theme.spacing(3)
    },
    cardHeader: {
        borderBottom: "1px solid #ededed"
    },
    avatar: {
        backgroundColor: red[500],
    },
    form: {
        '& > *': {
            width: "100%",
            marginBottom: theme.spacing(2)
        },
        '& > *:last-child': {
            marginBottom: 0
        }
    }
}));

const TaskDetail = ({match}) => {

    const css = useStyles();

    const {loading, error, data} = useQuery(TASK_DETAIL, {
        variables: {where: {id: match.params.name}}
    });

    const [updateTask] = useMutation(TASK_UPDATE, {
        update(cache, {data: {updateTask}}) {

            // Todo: modifikovanie ulohy v cache
            cache.modify({
                id: cache.identify(updateTask),
            });


            const {tasks} = cache.readQuery({query: TASKS_FEED});

            console.log(cache, data, tasks.concat([updateTask]));
            cache.writeQuery({
                query: TASKS_FEED,
                data: {tasks: tasks.concat([updateTask])}
            });
        }
    });

    let history = useHistory();

    const {handleSubmit, control, errors} = useForm();

    if (loading) return null;
    if (error) return null;

    /**
     * Close detail of task
     */
    const handleClick = () => {
        history.push("/tasks");
    }

    /**
     * Update task
     * @param value
     */
    const onSubmit = value => {
        updateTask({
            variables: {
                data: value,
                where: {
                    id: match.params.name
                }
            }
        }).then(r => console.log(r));
    }

    /**
     * Trigger form submit onBlur elements
     * @returns {Promise<void>}
     */
    const onBlur = () => handleSubmit(onSubmit)();


    return (
        <Card className={css.root}>
            <CardHeader
                className={css.cardHeader}
                avatar={
                    <Avatar aria-label="recipe" className={css.avatar}>
                        R
                    </Avatar>
                }
                action={
                    <IconButton aria-label="close" onClick={handleClick}>
                        <CloseIcon/>
                    </IconButton>
                }
                title={data.task.name}
                subheader={new Intl.DateTimeFormat("sk-SK", {
                    year: 'numeric', month: 'numeric', day: 'numeric',
                    hour: 'numeric', minute: 'numeric', second: 'numeric',
                    hour12: false,
                }).format(new Date(data.task.createdAt))}
            />
            <CardContent>
                <form className={css.form} onSubmit={handleSubmit(onSubmit)} autoComplete="off">
                    <Controller
                        as={TextField}
                        name="name"
                        onBlur={onBlur}
                        control={control}
                        label="Name"
                        variant="outlined"
                        defaultValue={data.task.name}
                        size="small"
                        rules={{required: true}}
                        error={errors.name?.type === "required"}
                    />
                    <Controller
                        as={TextField}
                        name="content"
                        onBlur={onBlur}
                        control={control}
                        label="Content"
                        variant="outlined"
                        defaultValue={data.task.content}
                        size="small"
                        multiline
                        rows={4}
                        rules={{required: true}}
                        error={errors.content?.type === "required"}
                    />
                </form>
            </CardContent>
        </Card>
    );
}

export default TaskDetail;
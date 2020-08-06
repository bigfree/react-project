import {gql} from "@apollo/client";

export const TASKS_FEED = gql`
    query TasksFeed {
        tasks {
            id
            name
            content
        }
    }
`;

export const TASK_DETAIL = gql`
    query TaskDetail($where:TaskWhereUniqueInput!) {
        task(where:$where) {
            name
            content
            createdAt
            deletedAt
            labels {
                id
                name
                createdAt
            }
            userId
        }
    }
`;

export const TASK_UPDATE = gql`
    mutation UpdateTask($data:TaskUpdateInput!, $where:TaskWhereUniqueInput!) {
        updateTask(data:$data,where:$where) {
            name
            content
            createdAt
            deletedAt
        }
    }
`;
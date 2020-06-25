import {gql} from "@apollo/client";

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
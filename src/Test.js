import React from 'react';
import { useQuery, gql } from '@apollo/client';

export const USERS = gql`
query UserFeed {
    users(orderBy: {createdAt: desc}) {
        id
        name
        email
    }
}
`;

function Test() {
    const { loading, error, data } = useQuery(USERS);

    if (loading) return <p>Loading...</p>
    if (error) return <p>Error :(</p>

    return data.users.map(({id, name, email}) => (
        <div key={id}>
            <p>{id}</p>
            <p>{name}</p>
            <p>{email}</p>
            <hr/>
        </div>
    ));
}

export default Test;
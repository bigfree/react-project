import React from 'react';
import {useForm} from "react-hook-form";
import {gql, useMutation} from '@apollo/client';
import {USERS} from "../Test";

const CREATE_USER = gql`
    mutation CreateUser($data:UserCreateInput!) {
        createUser(data: $data) {
            id
            name
        }
    }
`;

const Form = () => {

    const [createUser, {data}] = useMutation(CREATE_USER, {
        update(cache, {data: {createUser}}) {
            const {users} = cache.readQuery({query: USERS});
            cache.writeQuery({
                query: USERS,
                data: {users: users.concat([createUser])},
            });
        }
    });

    const {register, handleSubmit} = useForm();

    const onSubmit = (value) => {
        console.log(value);
        createUser({variables: {data: value}});
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <input
                type="email"
                placeholder="email"
                name="email"
                ref={register({required: true})}
            />
            <input
                type="password"
                placeholder="password"
                name="password"
                ref={register({required: true})}
            />
            <button type="Submit">Create</button>
        </form>
    )
}

export default Form;
import React from 'react';
import { ApolloClient, HttpLink, InMemoryCache, ApolloProvider } from '@apollo/client';
import {Route, Switch} from "react-router-dom";

import './App.scss';

import Form from "./Components/Form";
import Header from "./Components/Header/Header";
import Tasks from "./Components/Tasks/Tasks";
import Home from "./Components/Home/Home";

const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: new HttpLink({
        uri: 'http://localhost:4000'
    })
});

function App() {
    return (
        <ApolloProvider client={client}>
            <div className="App">
                <Header />
                <div className="container-fluid">
                    <Switch>
                        <Route exact={true} path="/" component={Home} />
                        <Route path="/tasks" component={Tasks} />
                    </Switch>
                    {/*<Form />*/}
                </div>
            </div>
        </ApolloProvider>
    );
}

export default App;

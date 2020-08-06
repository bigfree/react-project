import React from 'react';
import { ApolloClient, HttpLink, InMemoryCache, ApolloProvider } from '@apollo/client';
import {Route, Switch} from "react-router-dom";

// Material class
import {makeStyles} from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";

// Stylesheets
import 'fontsource-roboto';
import './App.scss';

// Components
import Form from "./Components/Form";
import Header from "./Components/Header/Header";
import Tasks from "./Components/Tasks/Tasks";
import Home from "./Components/Home/Home";
import AppHeaderBar from "./AppHeaderBar";
import AsideDrawer from "./AsideDrawer";
import Main from "./Main";

const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: new HttpLink({
        uri: 'http://localhost:4000'
    })
});

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
}));

function App() {
    const classes = useStyles();

    return (
        <ApolloProvider client={client}>
            <div className={classes.root}>
                <CssBaseline />
                <AppHeaderBar />
                <AsideDrawer />
                <Main />
                {/*<Header />*/}
                {/*<div className="container-fluid">*/}
                {/*    <Switch>*/}
                {/*        <Route exact={true} path="/" component={Home} />*/}
                {/*        <Route path="/tasks" component={Tasks} />*/}
                {/*    </Switch>*/}
                {/*    /!*<Form />*!/*/}
                {/*</div>*/}
            </div>
        </ApolloProvider>
    );
}

export default App;

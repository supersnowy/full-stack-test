import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux';
import store from './store';
import Navbar from "./components/layout/Navbar";
import 'react-notifications/lib/notifications.css';
import { NotificationContainer } from 'react-notifications';
import { Web3ReactProvider } from '@web3-react/core'
import { ChakraProvider } from "@chakra-ui/react";
import { ethers } from "ethers";

function getLibrary(provider) {
    const library = new ethers.providers.Web3Provider(provider);
    library.pollingInterval = 8000; // frequency provider is polling
    return library;
}

ReactDOM.render((
    <Provider store={store}>
        <ChakraProvider>
            <Web3ReactProvider getLibrary={getLibrary}>
                <BrowserRouter>
                    <NotificationContainer />
                    <Navbar />
                    <App />
                </BrowserRouter>
            </Web3ReactProvider>
        </ChakraProvider>
    </Provider>
), document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();

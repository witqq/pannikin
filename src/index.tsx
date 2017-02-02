import * as React from "react";
import {render} from "react-dom";
import {App} from "./App";
import Component = React.Component;
import ComponentClass = React.ComponentClass;
import ComponentState = React.ComponentState;
import {ConsoleErrorAppContainer} from "./ConsoleErrorAppContainer";


// Tell Typescript that there is a global variable called module - see below
declare let module: { hot: any };

// Get the root element from the HTML
const rootEl = document.getElementById('root');

// And render our App into it, inside the HMR App ontainer which handles the hot reloading
render(
    <ConsoleErrorAppContainer>
        <App />
    </ConsoleErrorAppContainer>,
    rootEl
);

// Handle hot reloading requests from Webpack
if (module.hot) {
    module.hot.accept('./App', () => {
        // If we receive a HMR request for our App container, then reload it using require (we can't do this dynamically with import)
        const NextApp = require('./App').App;

        // And render it into the root element again
        render(
            <ConsoleErrorAppContainer>
                <NextApp />
            </ConsoleErrorAppContainer>,
            rootEl
        );
    })
}
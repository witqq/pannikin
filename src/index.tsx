import * as React from "react";
import {render} from "react-dom";
import {ConsoleErrorAppContainer} from "./console-error-app-container";
import {Entry} from "./entry";
import Component = React.Component;
import ComponentClass = React.ComponentClass;
import ComponentState = React.ComponentState;

// Tell Typescript that there is a global variable called module - see below
declare let module: {hot: any};

// Get the root element from the HTML
const rootEl = document.getElementById('root');

// And render our App into it, inside the HMR App ontainer which handles the hot reloading
render(
    <ConsoleErrorAppContainer>
      <Entry/>
    </ConsoleErrorAppContainer>,
    rootEl
);

// Handle hot reloading requests from Webpack
if (module.hot) {
  module.hot.accept('./entry', () => {
    // If we receive a HMR request for our App container, then reload it using require (we can't do this dynamically with import)
    const NextApp = require('./entry').Entry;

    // And render it into the root element again
    render(
        <ConsoleErrorAppContainer>
          <NextApp />
        </ConsoleErrorAppContainer>,
        rootEl
    );
  })
}
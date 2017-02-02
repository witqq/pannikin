import * as React from "react";
import Component = React.Component;
const {AppContainer} = require('react-hot-loader') as {AppContainer: AppContainerClass};



interface AppContainerComp extends Component<any,any> {
    unstable_handleError(error): void;
}

interface AppContainerClass {
    new (props?, context?: any): AppContainerComp;
}

// extend AppContainer to show errors in console
export class ConsoleErrorAppContainer extends AppContainer {
    unstable_handleError(error) {
        super.unstable_handleError(error);
        console.error(error);
    }
}
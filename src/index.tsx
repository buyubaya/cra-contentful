import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
// import * as serviceWorker from "./serviceWorker";
import { init, locations, EditorExtensionSDK } from "contentful-ui-extensions-sdk";

console.log("INDEX", process.env.REACT_APP_TEST, process.env.REACT_APP_TEST_VAR);

init((sdk: EditorExtensionSDK) => {
  if (sdk.location.is(locations.LOCATION_ENTRY_EDITOR)) {
    ReactDOM.render(
      <React.StrictMode>
        <App sdk={sdk} />
      </React.StrictMode>,
      document.getElementById("root"),
    );
  }
});

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();

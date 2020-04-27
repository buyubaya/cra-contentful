import React from "react";
import "./App.scss";
import { EditorExtensionSDK } from "contentful-ui-extensions-sdk";
import TitleListingSection from "components/TitleListingSection";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

interface AppProps {
  sdk: EditorExtensionSDK;
}

function App({ sdk }: AppProps) {
  return (
    <Router>
      <h1>
        HELLO - {process.env.REACT_APP_TEST} - {process.env.REACT_APP_TEST_VAR}
      </h1>
      <Switch>
        <Route exact path="/title">
          <div>
            <h1>TITLE EXTENSION AAAAA</h1>
            <TitleListingSection sdk={sdk} />
          </div>
        </Route>
        <Route exact path="/">
          <h1>HOME EXTENSION</h1>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;

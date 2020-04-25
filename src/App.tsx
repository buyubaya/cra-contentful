import React from "react";
import "./App.scss";
import { EditorExtensionSDK } from "contentful-ui-extensions-sdk";
import TitleListingSection from "components/TitleListingSection";

interface AppProps {
  sdk: EditorExtensionSDK;
}

function App({ sdk }: AppProps) {
  return (
    <div>
      <h1>HELLO {process.env.REACT_APP_TEST_VAR}</h1>
      <TitleListingSection sdk={sdk} />
    </div>
  );
}

export default App;

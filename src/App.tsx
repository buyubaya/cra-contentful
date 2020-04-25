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
      <TitleListingSection sdk={sdk} />
    </div>
  );
}

export default App;

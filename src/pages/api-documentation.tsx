import React, { useEffect, useState } from "react";
import Documentation from "@open-rpc/docs-react";
import $RefParser from "json-schema-ref-parser";
import { useStaticQuery, graphql } from "gatsby";
import useDarkMode from "use-dark-mode";

const ApiDocumentation: React.FC = () => {
  const darkmode = useDarkMode();
  useEffect(() => {
    setReactJsonOptions({
      ...reactJsonOptions,
      theme: darkmode.value ? "summerfruit" : "summerfruit:inverted",
    });
  }, [darkmode.value]);
  const [reactJsonOptions, setReactJsonOptions] = useState({
    theme: "summerfruit:inverted",
    collapseStringsAfterLength: 25,
    displayDataTypes: false,
    displayObjectSize: false,
    indentWidth: 2,
    name: false,
  });
  const openrpcQueryData = useStaticQuery(graphql`
    query {
      openrpcDocument {
        id
        openrpcDocument
      }
    }
  `);

  return (
    <Documentation
      reactJsonOptions={reactJsonOptions}
      schema={JSON.parse(openrpcQueryData.openrpcDocument.openrpcDocument)}
    />
  );

};

export default ApiDocumentation;

import React, { useEffect, useState } from "react";
import Documentation from "@open-rpc/docs-react";
import $RefParser from "json-schema-ref-parser";
import { useStaticQuery, graphql } from "gatsby";

const ApiDocumentation: React.FC = () => {
  const openrpcQueryData = useStaticQuery(graphql`
    query {
      openrpcDocument {
        id
        openrpcDocument
      }
    }
  `);

  return (
    <Documentation schema={JSON.parse(openrpcQueryData.openrpcDocument.openrpcDocument)} />
  );

};

export default ApiDocumentation;

/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */
const $RefParser = require("json-schema-ref-parser");
const fetch = require(`node-fetch`);

const version = "1.3.5";
const EthereumJSONRPCSpecURL = `https://raw.githubusercontent.com/etclabscore/ethereum-json-rpc-specification/${version}/openrpc.json`;

exports.sourceNodes = async ({
  actions: { createNode },
  createContentDigest,
}) => {
  // get OpenRPC Document at build time
  const result = await fetch(EthereumJSONRPCSpecURL);
  const resultData = await result.json();
  // deref doc
  const openrpcDocument = await $RefParser.dereference(resultData);
  // create node for build time openrpc document on the site
  createNode({
    openrpcDocument: JSON.stringify(openrpcDocument),
    // required fields
    id: `openrpcDocument`,
    parent: null,
    children: [],
    internal: {
      type: `OpenrpcDocument`,
      contentDigest: createContentDigest(openrpcDocument),
    },
  })
}

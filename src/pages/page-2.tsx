import React from "react";
import { Link as GatsbyLink } from "gatsby";
import Link from "@material-ui/core/Link";

import SEO from "../components/seo";
import { Typography } from "@material-ui/core";

const SecondPage = () => (
  <div style={{paddingBottom: "30%"}}>
    <SEO title="Page two" />
    <Typography variant="h1">Hi from the second page</Typography>
    <br />
    <Typography variant="body1">Welcome to page 2</Typography>
    <br />
    <Link
      component={(props: { children: any }) => (
        <GatsbyLink to={"/"}>
          {props.children}
        </GatsbyLink>
      )}>
      <Typography color="textSecondary" variant="body1">
        Go back to the homepage
      </Typography>
    </Link>
    <br />
    <Typography>OR</Typography>
    <br />
    <Link
      component={(props: { children: any }) => (
        <GatsbyLink to={"/page-3"}>
          {props.children}
        </GatsbyLink>
      )}>
      <Typography color="textSecondary" variant="body1">
        Go to the page-3
      </Typography>
    </Link>
  </div>
);

export default SecondPage;

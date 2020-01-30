import React, { useEffect } from "react";
import { Grid, Typography, Box, Button } from "@material-ui/core";
import { Link as GatsbyLink } from "gatsby";
import Link from "@material-ui/core/Link";
import { grey } from "@material-ui/core/colors";

const MyApp: React.FC = () => {
  return (
    <>
      <Grid container alignContent="center" alignItems="center" justify="center" direction="column">
        <img className="logo" alt="logo" src={"https://user-images.githubusercontent.com/10556209/73300896-69fa3200-41d7-11ea-8da1-0d5b62f18e82.png"} style={{ paddingTop: "10%" }} />
        <br/>
        <Typography variant="h1">Multi-Geth client</Typography>
        <Typography gutterBottom style={{ paddingTop: "100px", paddingBottom: "20px" }} variant="inherit">
        Multi-Geth is a swiss-army-knife client allowing users to run Ethereum Classic, Ethereum, and related testnets.
        </Typography>
        <br/>
        <Button variant="contained" color="primary" href="https://github.com/etclabscore/multi-geth/releases/latest">
        Releases
        </Button>
        <br />
        <br />
        <br />
      </Grid>
    </>
  );
};

export default MyApp;

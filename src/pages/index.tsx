import React, { useEffect } from "react";
import { Grid, Typography, Box, Button } from "@material-ui/core";
import { Link as GatsbyLink } from "gatsby";
import Link from "@material-ui/core/Link";

const MyApp: React.FC = () => {
  return (
    <>
      <Grid container alignContent="center" alignItems="center" justify="center" direction="column">
        <img className="logo" alt="logo" src={"https://user-images.githubusercontent.com/10556209/75510635-429eac80-59b1-11ea-8d58-ad79452bef0e.png"} style={{ paddingTop: "10%" }} />
        <br />
        <Typography variant="h1">Core-Geth</Typography>
        <Typography gutterBottom style={{ paddingTop: "100px", paddingBottom: "20px" }} variant="inherit">
          Core-Geth is a distribution of go-etheruem with many flavors allowing users to run Ethereum, Ethereum Classic, and related TestNet nodes.
        </Typography>
        <br />
        <Grid container
          direction="row"
          justify="center"
          alignItems="center"
          spacing={2}>
          <Grid item>
            <Button variant="contained" color="primary" href="https://github.com/etclabscore/core-geth/releases/latest">
            Releases
            </Button>
        </Grid>
          <Grid item>
            <Button variant="contained" color="primary" href="https://hub.docker.com/r/etclabscore/core-geth">
            Docker
            </Button>
          </Grid>
          <Grid item>
            <Button variant="outlined" color="primary" href="overview">
            Get Started
            </Button>
          </Grid>
        </Grid>
        <br />
        <br />
        <br />
        <br />
      </Grid>
    </>
  );
};

export default MyApp;

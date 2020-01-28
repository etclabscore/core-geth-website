import React, { useState } from "react";
import useDarkMode from "use-dark-mode";
import { Grid, Typography } from "@material-ui/core";
import { Link as GatsbyLink } from "gatsby";
import Link from "@material-ui/core/Link";

const MyApp: React.FC = () => {
  const darkMode = useDarkMode();

  return (
    <>
      <Grid container alignContent="center" alignItems="center" justify="center" direction="column">
        <Link
          component={(props: { children: any }) => (
            <GatsbyLink to={"/page-2"}>
              {props.children}
            </GatsbyLink>
          )}>
          <Typography color="textSecondary" variant="body1">
            Go To Page 2
          </Typography>
        </Link>
        <img className="logo" alt="logo" src={darkMode.value
          ? "https://github.com/etclabscore/pristine-media-assets/blob/master/pristine-logo-dark/pristine-logo-dark%20(PNG)/256x256.png?raw=true" //tslint:disable-line
          : "https://github.com/etclabscore/pristine-media-assets/blob/master/pristine-logo/pristine-logo%20(PNG)/256x256.png?raw=true" //tslint:disable-line
        } style={{ paddingTop: "10%", paddingBottom: "30%" }} />
      </Grid>
    </>
  );
};

export default MyApp;

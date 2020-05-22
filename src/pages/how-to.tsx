import React, { useEffect } from "react"
import {
  Grid,
  Typography,
  Box,
  Button,
  List,
  ListItem,
} from "@material-ui/core"
import { Link } from "gatsby"

const MyApp: React.FC = () => {
  return (
    <Grid container direction="column">
      <Grid>
        <Typography variant="h1">How-to guides</Typography>
        <Typography>
          Here you’ll find short answers to “How do I….?” types of questions.
          These how-to guides don’t cover topics in depth – you’ll find that
          material in the Using Core-geth and the{" "}
          <Link to="/api-documentation">API reference</Link>. However, these
          guides will help you quickly accomplish common tasks.
        </Typography>
      </Grid>
      <Grid>
        <List>
          <ListItem>
            {" "}
            <Typography>
              <Link
                to="contribute-to-mordor-testnet"
                style={{ color: "#651fff" }}
              >
                How to contribute to Mordor testnet
              </Link>
            </Typography>
          </ListItem>
          <ListItem>
            {" "}
            <Typography>
              <Link
                to="setup-on-digital-ocean"
                style={{ color: "#651fff" }}
              >
                How to setup an Ethereum node on Digital Ocean
              </Link>
            </Typography>
          </ListItem>
        </List>
      </Grid>
      <br />
      <br />
      <br />
    </Grid>
  )
}

export default MyApp

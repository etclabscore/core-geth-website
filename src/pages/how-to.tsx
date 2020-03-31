import React, { useEffect } from "react"
import {
  Grid,
  Typography,
  Box,
  Button,
  List,
  ListItem,
} from "@material-ui/core"
import { Link as GatsbyLink } from "gatsby"
import Link from "@material-ui/core/Link"
import { grey } from "@material-ui/core/colors"

const MyApp: React.FC = () => {
  return (
    <Grid container direction="column">
      <Grid>
        <Typography variant="h1">How-to guides</Typography>
        <Typography>
          Here you’ll find short answers to “How do I….?” types of questions.
          These how-to guides don’t cover topics in depth – you’ll find that
          material in the Using Core-geth and the
          <Link href="https://core-geth.org/api-documentation">
            API reference
          </Link>
          . However, these guides will help you quickly accomplish common tasks.
        </Typography>
      </Grid>
      <Grid>
        <List>
          <ListItem>
            <Link href="how-to-contribute-to-mordor-testnet">
              <Typography>How to contribute to Mordor testnet</Typography>
            </Link>
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

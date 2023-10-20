import { Box, Link, Typography } from "@mui/material";
import { } from "@mui/system";
import { routes } from "../../src/routes";
import Layout from "./layout";

export default function Admin() {
  return (
    <Layout>
      <Box textAlign='center' pt={20}>
        <Typography variant='h3'>Welcome back</Typography>
        <Typography variant='subtitle1'>
          You can manage your app by choosing a tab or you can go back to the{' '}
          <Link href={routes.home}>
            homepage
          </Link>
        </Typography>
      </Box>
    </Layout>
  )
}
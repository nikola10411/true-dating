import { Box, Breadcrumbs, Container, Grid, Link, Typography } from "@mui/material";
import { COLORS } from "../../src/theme";
import BlogList from "../../src/components/BlogList";
import { memo } from "react";
import RecentBlogs from "../../src/components/RecentBlogs";
import Head from "next/head";

function Blog() {
  return (
    <Box py={3} bgcolor={COLORS.lightGrey} minHeight='inherit'>
      <Head>
        <title>Relationship & Dating Blog | True Dating</title>
        <meta name="description" content="Check out True Dating's blog to find the most interesting topics. From helpful guidance to tips, and mistakes to avoid. Explore more on the website!" />
        <meta name='keywords' content='Blog' />
      </Head>
      <Container>
        <Breadcrumbs aria-label="breadcrumb"
          sx={(theme) => ({
            backgroundColor: COLORS.lightGrey,
            color: COLORS.shark,
            paddingTop: 4,
            [theme.breakpoints.down('sm')]: {
              maxWidth: 300,
            },
            '& a': {
              color: 'grey',
              textDecoration: 'none',
            },
            '& a:hover': {
              textDecoration: 'underline',
            }
          })}
        >
          <Link underline="hover" color="inherit" href="/">
            Home
          </Link>
          <Typography color="text.primary">Blogs</Typography>
        </Breadcrumbs>
        <Grid className={'emptyEventBody'} container spacing={2}>
          <Grid item md={8} xs={12}>
            <BlogList />
          </Grid>
          <Grid item md={4} display={{xs: 'none', md: 'block'}}>
            <RecentBlogs />
          </Grid>
        </Grid>
      </Container>
    </Box>
  )
}

export default memo(Blog)
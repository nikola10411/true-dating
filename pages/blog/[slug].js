import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";
import { routes } from "../../src/routes";
import { getBlogBySlug } from "../../src/services/blog";
import PageSpinner from "../../src/components/PageSpinner";
import { Box, Breadcrumbs, Container, Grid, Link, Typography } from "@mui/material";
import DraftEditor from "../../src/components/DraftEditor";
import { getDescription } from "../../src/utils/description";
import { COLORS } from "../../src/theme";
import { IMG_PLACEHOLDER } from "../../src/constants";
import RecentBlogs from "../../src/components/RecentBlogs";
import Head from "next/head";

export default function BlogDetails() {
  const router = useRouter();
  const slug = router.query.slug;

  const [blog, setBlog] = useState({});
  const [syncing, setSyncing] = useState(true);

  useEffect(() => {
    let isMounted = true;
    if (!slug) {
      return router.push(routes.blog)
    }

    getBlogBySlug(slug).then((blogData) => {
      if (blogData) {
        setBlog(blogData)
      } else {
        console.error('Blog does not exist!');
        router.replace(routes.blog);
      }
      setSyncing(false)
    })

    return () => {
      isMounted = false;
    }
  }, [slug])

  const pageSEOTitle = useMemo(() => {
    if (slug) {
      const title = slug.split('-').join(' ')
      return title[0].toUpperCase() + title.slice(1)
    }

    return ''
  }, [slug])

  if (syncing) {
    return (
      <>
        <PageSpinner />
        <Typography variant='h1' style={{ color: 'transparent' }}>{pageSEOTitle}</Typography>
      </>
    )
  }

  return (
    <Box py={2} bgcolor={COLORS.lightGrey} minHeight='inherit'>
      <Head>
        <title>{blog.title} | True Dating</title>
      </Head>
      <Container>
        <Grid container spacing={2}>
          <Grid item md={8} xs={12}>
            <Container>
              <Breadcrumbs aria-label="breadcrumb" sx={(theme) => ({
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
              })}>
                <Link underline="hover" color="inherit" href={routes.home}>
                  Home
                </Link>
                <Link underline="hover" color="inherit" href={routes.blog}>
                  Blogs
                </Link>
                <Typography color="text.primary">{blog.title}</Typography>
              </Breadcrumbs>
              <Box sx={(theme) => ({
                padding: theme.spacing(6, 0),
                backgroundColor: COLORS.lightGrey,
              })}>
                <Box
                  id='blog-img'
                  sx={(theme) => ({
                    width: '100%',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    height: '100%',
                    maxHeight: 500,
                    minHeight: 400,
                    borderRadius: theme.shape.borderRadius,
                    [theme.breakpoints.down('xs')]: {
                      minHeight: 220,
                    },
                    backgroundImage: `url(${blog.imgURL || IMG_PLACEHOLDER})`,
                  })}
                />
                <Typography variant='h4' sx={(theme) => ({
                  paddingTop: theme.spacing(4),
                  paddingBottom: theme.spacing(2),
                  fontSize: 30,
                  fontWeight: theme.typography.fontWeightBold,
                  [theme.breakpoints.down('xs')]: {
                    fontSize: 30,
                  },
                })}>{blog.title}</Typography>
                <Box pb={2}>
                  <DraftEditor
                    readOnly
                    toolbarHidden
                    description={getDescription(blog.description)}
                  />
                </Box>
              </Box>
            </Container>
          </Grid>
          <Grid item md={4} display={{ xs: 'none', md: 'block'}}>
            <RecentBlogs />
          </Grid>
        </Grid>
      </Container>
    </Box>
  )
}
import { useEffect } from "react";
import { useBlogs } from "../contexts/BlogsProvider";
import PageSpinner from "./PageSpinner";
import { Box, Grid, Typography } from "@mui/material";
import BlogCard from "./Blogcard";

export default function BlogList () {
  const { blogsLoaded, loadBlogs, blogs = [], loading } = useBlogs()

  useEffect(() => {
    console.log(blogsLoaded, loading)
    if (!blogsLoaded && !loading) {
      loadBlogs();
    }
  }, [blogsLoaded, loadBlogs, loading])

  if (loading) {
    return <PageSpinner />
  }

  return (
    <>
    {
      blogs.length > 0 && (
        <>
          <Typography variant="h1" sx={(theme) => ({
            textTransform: 'capitalize',
            textAlign: 'center',
            paddingTop: theme.spacing(4),
            fontSize: '32px',
            paddingBottom: theme.spacing(2),
            '& .blog-span': {
              color: theme.palette.primary.main,
            },
            [theme.breakpoints.down('xs')]: {
              fontSize: 30,
            },
          })}>Dating Blog Posts</Typography>
          <Grid container spacing={2}>
            {
              blogs.map((blog, index) => (
                <Grid key={index} item md={6} xs={12}>
                  <BlogCard
                    {...blog}
                  />
                </Grid>
              ))
            }
          </Grid>
        </>
      )
    }
    {
      blogs.length === 0 && (
        <Box textAlign='center' pt={10}>
          <Typography variant="h6">Blog Posts</Typography>
        </Box>
      )
    }
    </>
  )
}
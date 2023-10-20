import { useEffect } from "react";
import { Box, Link, Typography } from "@mui/material";
import { useBlogs } from "../contexts/BlogsProvider";
import { routes } from "../routes";
import { Favorite } from "@mui/icons-material";
import PageSpinner from "./PageSpinner";

export default function RecentBlogs() {
  const { blogsLoaded, loadBlogs, blogs = [], loading } = useBlogs();

  useEffect(() => {
    if (!blogsLoaded && !loading) {
      loadBlogs();
    }
  }, [blogsLoaded, loadBlogs, loading]);

  if (loading) {
    return <PageSpinner />;
  }

  return (
    <>
      {
        blogs.length > 0 && (
          <>
            <Typography variant='h4' sx={(theme) => ({
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
            })}>Recent Posts</Typography>
            {
              blogs.slice(0, 5).map((blog, index) => (
                <Box key={index} display={'flex'} alignItems={'center'}>
                  <Favorite color="primary" />
                  <Link
                    variant="h6"
                    href={`${routes.blog}/${blog.seoTitle}`}
                    underline="none"
                    sx={{
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {blog.title}
                  </Link>
                </Box>
              ))
            }
          </>
        )
      }
    </>
  )
}
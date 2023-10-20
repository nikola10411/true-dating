import { useCallback, useEffect, useState } from "react";
import { useBlogs } from "../../../src/contexts/BlogsProvider";
import { BLOGS_IMAGES_PATH } from "../../../src/constants";
import { scrollTop } from "../../../src/utils/scroll";
import PageSpinner from "../../../src/components/PageSpinner";
import Layout from "../layout";
import { Alert, Box, Button, Grid, TextField } from "@mui/material";
import ImageUpload from "../../../src/components/ImageUpload";
import DraftEditor from "../../../src/components/DraftEditor";
import { getDescription } from "../../../src/utils/description";
import { isFileImage } from "../../../src/utils/file";
import { addBlog, getBlog } from "../../../src/services/blog";
import { useRouter } from "next/router";
import { routes } from "../../../src/routes";
import { uploadFile } from "../../../src/services/storage";

export default function AdminBlogAdd() {
  const router = useRouter();
  const { blogs, setBlogs } = useBlogs()
  const [blog, setBlog] = useState({
    id: '',
    title: '',
    seoTitle: '',
    description: null,
    imgURL: null,
    slug: ''
  })

  const [error, setError] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [tempBlog, setTempBlog] = useState(blog);
  const [syncing, setSyncing] = useState(false);

  const handleFieldChange = useCallback(
    ({ target: { name, value, type } }) => {
      if (type === 'number' && value) {
        value = Number(value);
        if (value < 0) return;
      }
      setBlog({ ...blog, [name]: value });
    },
    [blog]
  );

  const handleImageUpload = useCallback(
    ({ target: { files } }) => {
      if (files && files.length) {
        const file = files[0];
        if (!isFileImage(file)) {
          setBlog((blog) => ({ ...blog, imgURL: null }));
          setImageFile(null);
          scrollTop();
          return setError('Invalid image file type!');
        }
        if (error) setError(null);
        setImageFile(file);
        setBlog((blog) => ({ ...blog, imgURL: URL.createObjectURL(file) }));
      }
    },
    [error]
  );

  const handleDeleteImage = useCallback(
    (e) => {
      e.preventDefault();
      URL.revokeObjectURL(imageFile);
      document.querySelector('#file-input').value = '';
      setBlog((blog) => ({ ...blog, imgURL: null }));
      setImageFile(null);
    },
    [imageFile]
  );

  const handleCreateBlog = useCallback(
    async (e) => {
      e.preventDefault();

      if (error) setError(null);

      setSubmitting(true);
      try {
        const imgURL = imageFile
          ? await (await uploadFile(imageFile, BLOGS_IMAGES_PATH))
          : null;

        const newBlogId = (
          await addBlog({
            ...blog,
            imgURL,
          })
        ).id;

        const newBlog = { ...(await getBlog(newBlogId)), id: newBlogId };
        setBlogs([...blogs, newBlog]);

        return router.replace(routes.adminBlogs);
      } catch (error) {
        setError(error.message);
        scrollTop();
      }
      setSubmitting(false);
    },
    [error, blog, blogs, imageFile, setBlogs]
  );

  const handleDescriptionChange = useCallback((editorState) => {
    setBlog((blog) => ({ ...blog, description: editorState }));
  }, []);

  return (
    <Layout>
      {(submitting || syncing) && <PageSpinner />}
      {!syncing && (
        <>
          <h2>Create Blog</h2>
          <Box mt={2} mb={2}>
            <form onSubmit={handleCreateBlog}>
              {error && (
                <Box py={2}>
                  <Alert severity='error'>{error}</Alert>
                </Box>
              )}
              <Box py={2}>
                <TextField
                  defaultValue={blog.title}
                  name='title'
                  fullWidth
                  variant='outlined'
                  label='Blog Title'
                  required
                  onBlur={handleFieldChange}
                />
              </Box>
              <Box py={2}>
                <TextField
                  defaultValue={blog.seoTitle}
                  name='seoTitle'
                  fullWidth
                  variant='outlined'
                  label='Blog seo Title (use - between words and all lowercase)'
                  required
                  onBlur={handleFieldChange}
                />
              </Box>
              <Box py={2}>
                <ImageUpload
                  id='file-input'
                  onDelete={handleDeleteImage}
                  onUpload={handleImageUpload}
                  imgURL={blog.imgURL}
                />
              </Box>
              <Box pb={2}>
                <Box py={2}>
                  <h4>Blog Description</h4>
                </Box>
                <DraftEditor
                  description={getDescription(blog.description)}
                  onChange={handleDescriptionChange}
                // readOnly
                // toolbarHidden
                />
              </Box>
              <Box pb={4}>
                <Grid container spacing={2} justifyContent='flex-end'>
                  <Grid item xs={6} sm={4} md={3}>
                    <Button
                      fullWidth
                      onClick={() => history.push(routes.adminBlogs)}
                      type='button'
                      color='secondary'
                      variant='contained'
                    >
                      {'Cancel'}
                    </Button>
                  </Grid>
                  <Grid item xs={6} sm={4} md={3}>
                    <Button
                      fullWidth
                      disabled={submitting || syncing}
                      type='submit'
                      color='primary'
                      variant='contained'
                    >
                      Create Blog
                    </Button>
                  </Grid>
                </Grid>
              </Box>
            </form>
          </Box>
        </>
      )}
    </Layout>
  )
}
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
import { useRouter } from "next/router";
import { getBlog, updateBlog } from "../../../src/services/blog";
import { routes } from "../../../src/routes";
import { isFileImage } from "../../../src/utils/file";
import { uploadFile } from "../../../src/services/storage";

export default function AdminBlogEdit() {
  const router = useRouter()
  const id = router.query.id
  const { blogs, setBlogs } = useBlogs()
  const [blog, setBlog] = useState({
    id: '',
    title: '',
    seoTitle: '',
    description: null,
    imgURL: null,
    slug: ''
  })

  useEffect(() => {
    let isMounted = true;
    if (id) {
      getBlog(id)
        .then((data) => {
          if (!data) {
            throw new Error('Blog does not exist!');
          }
          if (isMounted) {
            setBlog((blog) => ({
              ...blog,
              ...data,
              id,
            }));
            setTempBlog(data);
            setSyncing(false);
          }
        })
        .catch((err) => {
          router.replace(routes.adminBlogs);
        });
    }
    return () => {
      isMounted = false;
    };
  }, [blogs, id]);
  

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

  const handleUpdateBlog = useCallback(
    async (e) => {
      e.preventDefault();
      if (error) setError(null);

      setSubmitting(true);
      try {
        const imageFileChanged = blog.imgURL !== tempBlog.imgURL;
        const imgURL = imageFileChanged
          ? imageFile
            ? await (await uploadFile(imageFile, BLOGS_IMAGES_PATH))
            : null
          : blog.imgURL;

        const newBlog = {
          ...blog,
          imgURL,
        };

        await updateBlog(newBlog);

        if (imageFileChanged && tempBlog.imgURL) {
          try {
            await deleteFileFromURL(tempBlog.imgURL);
          } catch (error) {
            console.log(error.message);
          }
        }

        const newBlogsArray = blogs.map((blog) => {
          if (blog.id === id) {
            return newBlog;
          }
          return blog;
        });

        setBlogs(newBlogsArray);

        return router.replace(routes.adminBlogs);
      } catch (error) {
        setError(error.message);
        scrollTop();
      }
      setSubmitting(false);
    },
    [
      error,
      blog,
      blogs,
      id,
      imageFile,
      setBlogs,
      tempBlog.imgURL,
    ]
  );

  const handleDescriptionChange = useCallback((editorState) => {
    setBlog((blog) => ({ ...blog, description: editorState }));
  }, []);

  return (
    <Layout>
      {(submitting || syncing) && <PageSpinner />}
      {!syncing && (
        <>
          <h2>Blog Details</h2>
          <Box mt={2} mb={2}>
            <form onSubmit={handleUpdateBlog}>
              {error && (
                <Box py={2}>
                  <Alert severity='error'>{error}</Alert>
                </Box>
              )}
              <Box py={2}>
                <TextField
                  value={id}
                  name='id'
                  fullWidth
                  variant='outlined'
                  label='Blog ID'
                  disabled
                />
              </Box>
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
                      onClick={() => router.push(routes.adminBlogs)}
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
                      Save
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
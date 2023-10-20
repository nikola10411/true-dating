import { createContext, useCallback, useContext, useState } from 'react';
import { getAllBlogs } from '../services/blog';

const BlogsContext = createContext();
export const useBlogs = () => useContext(BlogsContext);

export default function BlogsProvider({ children }) {

  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [blogsLoaded, setBlogsLoaded] = useState(false);

  const loadBlogs = useCallback(async () => {
    console.log('called blog')
    setLoading(true);
    try {
      const blogs = await getAllBlogs();
      if (blogs.length) {
        setBlogs(blogs);
      }
      setBlogsLoaded(true);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  }, []);

  return (
    <BlogsContext.Provider value={{ blogs, loading, setBlogs, blogsLoaded, loadBlogs }}>
      {children}
    </BlogsContext.Provider>
  );
}

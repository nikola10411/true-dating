import { memo, useCallback, useEffect, useState } from "react";
import { useBlogs } from "../../../src/contexts/BlogsProvider";
import { deleteBlogs } from "../../../src/services/blog";
import { Box, Button, IconButton } from "@mui/material";
import { Add, DeleteForever, Edit } from "@mui/icons-material";
import { useRouter } from "next/router";
import { routes } from "../../../src/routes";
import { DataGrid } from "@mui/x-data-grid";
import Layout from "../layout";
import { getUKDateTime } from "../../../src/utils/date";
import { useAuth } from "../../../src/contexts/AuthProvider";

const columns = [
  { field: 'id', headerName: 'ID', width: 200, sortable: false },
  { field: 'title', headerName: 'Title', width: 250 },
  {
    field: 'createdAt',
    headerName: 'Created At',
    width: 140,
    valueGetter: ({ row }) => getUKDateTime(row.createdAt),
  },
  {
    field: 'hidden',
    headerName: '',
    disableClickBlogBubbling: true,
    sortable: false,
    renderCell: ({ row }) => (
      <IconButton
        component='a'
        title='Edit Blog Details'
        href={`${routes.adminBlogs}/${row.id}`}
      >
        <Edit />
      </IconButton>
    ),
  },
];

function AdminBlogs() {
  
  const [selectedRows, setSelectedRows] = useState([]);
  const { user, userSyncing } = useAuth();
  const { blogs, loading, blogsLoaded, loadBlogs, setBlogs } = useBlogs();
  const [syncing, setSyncing] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (user && !userSyncing) {
      if (!user.isAdmin) {
        router.replace(routes.home);
      }
    }  
  }, []);

  useEffect(() => {
    if (!blogsLoaded && !loading) {
      loadBlogs();
    }
  }, [blogsLoaded, loadBlogs, loading]);

  const handleSelectedRows = useCallback((newSelectedRows) => {
    setSelectedRows(newSelectedRows);
  }, []);

  const handleDeleteBlogs = async () => {
    setSyncing(true);
    try {
      await deleteBlogs(blogs.filter((blog) => selectedRows.includes(blog.id)));
      setBlogs(blogs.filter((blog) => !selectedRows.includes(blog.id)));
      setSelectedRows([]);
    } catch (error) {
      console.log(error.message);
    }
    setSyncing(false);
  };

  if (userSyncing ) {
    return <Box/>
  }

  return (
    <Layout>
      <Box width={'100%'}>
        <Box mb={2} display='flex' justifyContent='space-between'>
          <Button
            onClick={() => router.push(routes.adminBlogs + '/add')}
            startIcon={<Add />}
            color='primary'
            variant='contained'
          >
            Create Blog
          </Button>
          <Box display={'flex'}>
            {selectedRows.length > 0 && (
              <Button
                onClick={handleDeleteBlogs}
                startIcon={<DeleteForever color='primary' />}
                color='secondary'
                variant='contained'
              >
                Delete ({selectedRows.length})
              </Button>
            )}
          </Box>
        </Box>
        <DataGrid
          autoHeight
          // autoPageSize
          loading={syncing || loading}
          sx={{
            '& [role="columnheader"][data-field="hidden"]': {
              display: 'none',
            },
          }}
          disableSelectionOnClick
          rows={blogs}
          columns={columns}
          checkboxSelection
          onRowSelectionModelChange={handleSelectedRows}
        />
      </Box>
    </Layout>
  )
}

export default memo(AdminBlogs)
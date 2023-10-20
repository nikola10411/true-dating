import { Check, Clear } from "@mui/icons-material";
import { Link } from "@mui/material";
import { getUKDateTime } from "../../../src/utils/date";
import { useUsers } from "../../../src/contexts/UsersProvider";
import { memo, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useAuth } from "../../../src/contexts/AuthProvider";
import { routes } from "../../../src/routes";
import { useRouter } from "next/router";

const columns = [
  { field: 'id', headerName: 'UID', width: 270, sortable: false },
  { field: 'firstName', headerName: 'First Name', width: 150 },
  { field: 'lastName', headerName: 'Last Name', width: 150 },
  {
    field: 'email',
    headerName: 'Email',
    width: 200,
  },
  {
    field: 'gender',
    headerName: 'Gender',
    width: 130,
  },
  {
    field: 'phoneNumber',
    headerName: 'Phone',
    width: 170,
  },
  {
    field: 'photoURL',
    headerName: 'Photo URL',
    width: 200,
    renderCell: ({ row }) => (
      <Link
        target='_blank'
        style={{ overflow: 'hidden', textOverflow: 'ellipsis' }}
        href={row.photoURL}
      >
        {row.photoURL || ''}
      </Link>
    ),
  },
  {
    field: 'isAdmin',
    headerName: 'Is Admin',
    width: 110,
    renderCell: ({ row }) =>
      row.isAdmin ? <Check fontSize='small' /> : <Clear fontSize='small' />,
  },
  {
    field: 'createdAt',
    headerName: 'Created At',
    width: 170,
    valueGetter: ({ row }) => getUKDateTime(row.createdAt),
  },
];

function Users() {
  const router = useRouter();
  const { user, userSyncing } = useAuth();
  const { users, usersLoaded, loading, loadUsers } = useUsers();

  useEffect(() => {
    if (user && !userSyncing) {
      if (!user.isAdmin) {
        router.replace(routes.home);
      }
    }  
  }, []);

  useEffect(() => {
    if (!usersLoaded && !loading) {
      loadUsers();
    }
  }, [loadUsers, loading, usersLoaded]);

  if (userSyncing ) {
    return <Box/>
  }

  return (
    <DataGrid
      autoHeight
      loading={loading}
      disableSelectionOnClick
      rows={users}
      columns={columns}
    />
  );
}

export default memo(Users);
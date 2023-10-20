import { DataGrid } from '@mui/x-data-grid';
import { useSubscribers } from '../../../src/contexts/SubscribersProvider';
import { getUKDateTime } from "../../../src/utils/date";
import { memo, useEffect } from 'react';
import Layout from '../layout';

const columns = [
  { field: 'id', headerName: 'UID', width: 270, sortable: false },
  {
    field: 'email',
    headerName: 'Email',
    width: 200,
  },
  {
    field: 'createdAt',
    headerName: 'Created At',
    width: 170,
    valueGetter: ({ row }) => getUKDateTime(row.createdAt),
  },
];

function Subscribers() {
  const { subscribers, subscribersLoaded, loading, loadSubscribers } = useSubscribers();
  useEffect(() => {
    if (!subscribersLoaded && !loading) {
      loadSubscribers();
    }
  }, [loadSubscribers, loading, subscribersLoaded]);

  return (
    <Layout>
      <DataGrid
        autoHeight
        loading={loading}
        disableSelectionOnClick
        rows={subscribers}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
      />
    </Layout>
  );
}

export default memo(Subscribers);
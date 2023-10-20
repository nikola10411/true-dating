import { useCallback, useEffect, useState } from "react";
import { Box, Button, IconButton } from "@mui/material";
import { Add, Archive, DeleteForever, Edit } from "@mui/icons-material";
import { useRouter } from "next/router";

import { routes } from "../../../src/routes";
import { POUND_SYMBOL } from "../../../src/constants";
import { getUKDateTime } from "../../../src/utils/date";
import { useEvents } from "../../../src/contexts/EventsProvider";
import { archiveEvents, deleteEvents, unarchiveEvents } from "../../../src/services/event";
import Layout from "../layout";
import { DataGrid } from "@mui/x-data-grid";
import { useAuth } from "../../../src/contexts/AuthProvider";

const columns = [
  { field: 'id', headerName: 'ID', width: 200, sortable: false },
  { field: 'designMyNightId', headerName: 'Design My Night ID', width: 200, sortable: false },
  { field: 'title', headerName: 'Title', width: 250 },
  {
    field: 'dateTime',
    headerName: 'Time of the Event',
    width: 170,
    valueGetter: ({ row }) => getUKDateTime(row.dateTime),
  },
  {
    field: 'venue',
    headerName: 'Venue',
    width: 200,
  },
  {
    field: 'ticketPrice',
    headerName: 'Ticket Price',
    width: 130,
    renderCell: ({ row }) => `${POUND_SYMBOL}${row.ticketPrice}`,
  },
  {
    field: 'createdAt',
    headerName: 'Created At',
    width: 140,
    valueGetter: ({ row }) => getUKDateTime(row.createdAt),
  },
  {
    field: 'hidden',
    headerName: '',
    disableClickEventBubbling: true,
    sortable: false,
    renderCell: ({ row }) => (
      <IconButton
        title='Edit Event Details'
        component='a'
        href={`${routes.adminEvents}/${row.id}`}
      >
        <Edit />
      </IconButton>
    ),
  },
];

export default function AdminEvents() {
  const { user, userSyncing } = useAuth();
  const [selectedRows, setSelectedRows] = useState([])
  const [selectedArchivedRows, setSelectedArchivedRows] = useState([]);
  const { events, loading, eventsLoaded, loadEvents, setEvents } = useEvents();
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
    if (!eventsLoaded) {
      loadEvents()
    }
  }, [eventsLoaded])


  const handleSelectedRows = useCallback((newSelectedRows) => {
    setSelectedRows(newSelectedRows);
  }, []);

  const handleSelectedArchivedRows = useCallback((newSelectedRows) => {
    setSelectedArchivedRows(newSelectedRows);
  }, []);

  const handleDeleteEvents = async () => {
    setSyncing(true);
    try {
      await deleteEvents(events.filter((event) => selectedArchivedRows.includes(event.id)));
      setEvents(events.filter((event) => !selectedArchivedRows.includes(event.id)));
      setSelectedArchivedRows([]);
    } catch (error) {
      console.log(error.message);
    }
    setSyncing(false);
  };

  const handleArchiveEvents = async () => {
    setSyncing(true);
    try {
      await archiveEvents(events.filter((event) => selectedRows.includes(event.id)));
      setSelectedRows([]);
    } catch (error) {
      console.log(error.message);
    }
    setSyncing(false);
  };

  const handleUnarchiveEvents = async () => {
    setSyncing(true);
    try {
      await unarchiveEvents(events.filter((event) => selectedArchivedRows.includes(event.id)));
      setSelectedArchivedRows([]);
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
      <Box width='100%'>
        <Box mb={2} display='flex' justifyContent='space-between'>
          <Button
            onClick={() => router.push(routes.adminEvents + '/add')}
            startIcon={<Add />}
            color='primary'
            variant='contained'
          >
            Create Event
          </Button>
          {selectedRows.length > 0 && (
            <Button
              onClick={handleArchiveEvents}
              startIcon={<Archive color='primary' />}
              color='inherit'
              variant='contained'
            >
              Archive ({selectedRows.length})
            </Button>
          )}
        </Box>
        <DataGrid
          autoHeight
          // autoPageSize
          loading={syncing || loading}
          // className={classes.dataGrid}
          sx={{
            '& [role="columnheader"][data-field="hidden"]': {
              display: 'none',
            },
          }}
          disableSelectionOnClick
          pageSize={5}
          rowsPerPageOptions={[5]}
          rows={events.filter((event) => !event.archived)}
          columns={columns}
          checkboxSelection
          onRowSelectionModelChange={handleSelectedRows}
        />
        <Box my={2} display='flex' justifyContent='flex-end'>
          <Button
            onClick={handleUnarchiveEvents}
            startIcon={<Archive />}
            color='primary'
            variant='contained'
            disabled={selectedArchivedRows.length === 0}
            style={{ marginRight: '2rem' }}
          >
            Unarchive ({selectedArchivedRows.length})
          </Button>

          <Button
            onClick={handleDeleteEvents}
            startIcon={<DeleteForever color='primary' />}
            color='secondary'
            variant='contained'
            disabled={selectedArchivedRows.length === 0}
          >
            Delete ({selectedArchivedRows.length})
          </Button>
        </Box>
        <DataGrid
          autoHeight
          //autoPageSize
          loading={syncing || loading}
          // className={classes.dataGrid}
          sx={{
            '& [role="columnheader"][data-field="hidden"]': {
              display: 'none',
            },
          }}
          disableSelectionOnClick
          rows={events.filter((event) => event.archived)}
          columns={columns}
          checkboxSelection
          onRowSelectionModelChange={handleSelectedArchivedRows}
        />
      </Box>
    </Layout>
  )
}
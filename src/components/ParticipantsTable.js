import { Delete } from "@mui/icons-material";
import { Checkbox, IconButton } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { memo, useMemo } from "react";

function ParticipantsTable ({ onChange, participants, onDelete }) {
  const columns = useMemo(
    () => [
      { field: 'firstName', headerName: 'Fist Name', width: 150 },
      { field: 'lastName', headerName: 'Last Name', width: 150 },
      { field: 'email', headerName: 'Email', width: 250 },
      { field: 'gender', headerName: 'Gender', width: 130 },
      { field: 'phoneNumber', headerName: 'Phone', width: 170 },
      { field: 'invitation', headerName: 'Invitation', width: 150 },
      {
        field: 'attended',
        headerName: 'Attended',
        width: 140,
        renderCell: ({ row }) => {
          return (
            <Checkbox
              color='primary'
              checked={row.attended}
              onChange={(_, checked) => {
                onChange(
                  participants.map((p) => {
                    if (p.email === row.email) {
                      return { ...p, attended: checked };
                    }
                    return p;
                  })
                );
              }}
            />
          );
        },
      },
      {
        field: 'hidden',
        headerName: '',
        disableClickEventBubbling: true,
        sortable: false,
        renderCell: ({ row }) => (
          <IconButton title='Edit Event Details' onClick={() => onDelete(row)}>
            <Delete />
          </IconButton>
        ),
      },
    ],
    [onDelete, onChange, participants]
  );

  return (
    <DataGrid
      autoHeight
      // autoPageSize
      disableSelectionOnClick
      sx={{
        '& [role="columnheader"][data-field="hidden"]': {
          display: 'none',
        },
      }}
      rows={participants.map((p, i) => ({
        id: `participant_${i}`,
        ...p,
      }))}
      columns={columns}
      pageSize={5}
      rowsPerPageOptions={[5]}
      // checkboxSelection
      // onSelectionModelChange={handleSelectedRows}
    />
  )
}

export default memo(ParticipantsTable);
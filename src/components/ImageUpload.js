import { memo } from 'react';

import { Delete, PhotoCamera } from "@mui/icons-material";
import { Box, Grid, IconButton } from "@mui/material";
import { alpha } from '@mui/system';

function ImageUpload ({ imgURL, onUpload, onDelete, id }) {
  return (
    <Box
      id='event-img'
      sx={(theme) => ({
        backgroundImage: imgURL ? `url(${imgURL})` : 'none',
        display: 'grid',
        placeItems: 'center',
        width: '100%',
        backgroundColor: theme.palette.grey[100],
        height: '100%',
        minHeight: theme.spacing(30),
        boxShadow: theme.shadows[2],
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        borderRadius: theme.shape.borderRadius,
        '& input[type=file]': {
          display: 'none',
        },
        '& .MuiButtonBase-root': {
          backgroundColor: alpha(theme.palette.secondary.main, 0.5),
          color: theme.palette.common.white,
        },
        '& #delete-photo': {
          marginLeft: theme.spacing(2),
        },
      })}
    >
      <Grid>
        <input onChange={onUpload} accept="image/*" id={id} name='imageFile' type='file' />
        <label htmlFor={id}>
          <IconButton
            title={imgURL ? 'Change Event Photo' : 'Add Event Photo'}
            aria-label='upload picture'
            component='span'
          >
            <PhotoCamera />
          </IconButton>
        </label>
        {imgURL && (
          <IconButton
            id='delete-photo'
            title='Delete Event Photo'
            aria-label='upload picture'
            component='span'
            onClick={onDelete}
          >
            <Delete />
          </IconButton>
        )}
      </Grid>
    </Box>
  )
}

export default memo(ImageUpload);
import { Box, Grid, Typography } from '@mui/material';
import { getDescription } from '../utils/description';
import { isFileImage } from '../utils/event';
import { scrollTop } from '../utils/scroll';
import ImageUpload from './ImageUpload';
import DraftEditor from './DraftEditor';
import { memo } from 'react';

function HowItWorks({ howItWorks, onChange, setError, error }) {
  const { col1, col2, col3, finalNotes } = howItWorks;

  const handleImageUpload = ({ target: { files } }, col) => {
    const columnData = howItWorks[col];
    if (files && files.length) {
      const file = files[0];
      if (!isFileImage(file)) {
        onChange({ ...howItWorks, [col]: { ...columnData, imgURL: null } });
        scrollTop();
        return setError('Invalid image file type!');
      }
      if (error) setError(null);
      onChange({ ...howItWorks, [col]: { ...columnData, imgURL: URL.createObjectURL(file) } });
    }
  };

  const handleDeleteImage = (e, col) => {
    e.preventDefault();
    document.querySelector(`#${col}-img`).value = '';
    const columnData = howItWorks[col];
    onChange({ ...howItWorks, [col]: { ...columnData, imgURL: null } });
  };

  return (
    <Grid>
      <Box textAlign='center' pb={4}>
        <Typography variant='h4'>How It Works</Typography>
      </Box>
      <Grid container spacing={4}>
        <Grid item xs={12} sm={6} md={4}>
          <Box>
            <ImageUpload
              id='col1-img'
              onDelete={(e) => handleDeleteImage(e, 'col1')}
              onUpload={(e) => handleImageUpload(e, 'col1')}
              imgURL={col1.imgURL}
            />
            <Box py={0.2} />
            <DraftEditor
              placeholder='On The Day of The Event'
              description={getDescription(col1.description)}
              onChange={(description) =>
                onChange({
                  ...howItWorks,
                  col1: {
                    ...col1,
                    description,
                  },
                })
              }
            />
          </Box>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Box>
            <ImageUpload
              id='col2-img'
              onDelete={(e) => handleDeleteImage(e, 'col2')}
              onUpload={(e) => handleImageUpload(e, 'col2')}
              imgURL={col2.imgURL}
            />
            <Box py={0.2} />
            <DraftEditor
              placeholder='During The Event'
              description={getDescription(col2.description)}
              onChange={(description) =>
                onChange({
                  ...howItWorks,
                  col2: {
                    ...col2,
                    description,
                  },
                })
              }
              // readOnly
              // toolbarHidden
            />
          </Box>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Box>
            <ImageUpload
              id='col3-img'
              onDelete={(e) => handleDeleteImage(e, 'col3')}
              onUpload={(e) => handleImageUpload(e, 'col3')}
              imgURL={col3.imgURL}
            />
            <Box py={0.2} />
            <DraftEditor
              placeholder='After The Event'
              description={getDescription(col3.description)}
              onChange={(description) =>
                onChange({
                  ...howItWorks,
                  col3: {
                    ...col3,
                    description,
                  },
                })
              }
              // readOnly
              // toolbarHidden
            />
          </Box>
        </Grid>
        <Grid item container justifyContent='center' xs={12}>
          <Box maxWidth={800}>
            <DraftEditor
              description={getDescription(finalNotes)}
              placeholder='Final Notes'
              onChange={(finalNotes) =>
                onChange({
                  ...howItWorks,
                  finalNotes,
                })
              }
              // readOnly
              // toolbarHidden
            />
          </Box>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default memo(HowItWorks);
import { useState } from "react";
import {
  Box,
  Button,
  CircularProgress,
  Container,
  Grid,
  InputAdornment,
  MenuItem,
  TextField,
  Tooltip
} from "@mui/material";
import { useAuth } from '../src/contexts/AuthProvider';
import { PermIdentity, Email, Info, Wc, Phone, Save, OfflineBolt} from '@mui/icons-material';

import ImageUpload from "../src/components/ImageUpload";
import { isFileImage } from "../src/utils/file";
import { scrollTop } from '../src/utils/scroll';
//import { useStyles } from './style';
import { COLORS } from "../src/theme";
import { deleteFileFromURL, uploadFile } from '../src/services/storage';
import { MEMBERSHIP_1_MONTH, MEMBERSHIP_3_MONTHS, MEMBERSHIP_6_MONTHS, USERS_IMAGES_PATH } from '../src/constants';
import { updateUserDocument } from '../src/services/user';

//  className={classes.form}

// className={classes.imageUploadWrapper}

export default function Account() {
  const { user, setUser } = useAuth();
  const [userData, setUserData] = useState(user);
  const [error, setError] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const membershipDisplayText = () => {
    if (user && user.membershipType) {
      switch (user.membershipType) {
        case MEMBERSHIP_1_MONTH: {
          return 'One Month'
        }
        case MEMBERSHIP_3_MONTHS: {
          return '3 Months'
        }
        case MEMBERSHIP_6_MONTHS: {
          return '6 Months'
        }        
      }
    }

    return 'None'
  }

  const handleImageUpload = ({ target: { files } }) => {
    if (files && files.length) {
      const file = files[0];
      if (!isFileImage(file)) {
        setUserData({ ...userData, photoURL: null });
        scrollTop();
        return setError('Invalid image file type!');
      }
      if (error) setError(null);
      setImageFile(file);
      setUserData({ ...userData, photoURL: URL.createObjectURL(file) });
    }
  };

  const handleDeleteImage = (e) => {
    e.preventDefault();
    document.querySelector(`#user-img`).value = '';
    setUserData({ ...userData, photoURL: null });
    setImageFile(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      let photoURL = userData.photoURL;
      if (photoURL !== user.photoURL) {
        if (photoURL) {
          photoURL = await (await uploadFile(imageFile, USERS_IMAGES_PATH))
        }

        if (user.photoURL) {
          await deleteFileFromURL(user.photoURL);
        }
      }
      const newUserData = { ...userData, photoURL };
      await updateUserDocument(newUserData);
      setUser(newUserData);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  const handleInputChange = ({ target: { name, value } }) =>
    setUserData({ ...userData, [name]: value });

  return (
    <Box bgcolor={COLORS.lightGrey} py={4}>
      <Container>
        <Grid container justifyContent='center'>
          <Box sx={(theme) => ({
                 width: 400,
                 height: 400,
                 margin: theme.spacing(2, 0, 6, 0),
                 '& div': {
                   borderRadius: '50%',
                 },
                 [theme.breakpoints.down('xs')]: {
                   width: 300,
                   height: 300,
                 },
              })}>
            <ImageUpload
              id='user-img'
              imgURL={userData.photoURL}
              onUpload={handleImageUpload}
              onDelete={handleDeleteImage}
            />
          </Box>
        </Grid>
        <form onSubmit={handleSubmit} onChange={handleInputChange} sx={(theme) => ({
                paddingBottom: theme.spacing(10),
        })}>
          <Grid container direction='column' alignItems='center' spacing={2}>
            <Grid item container sm={12} md={6} wrap='nowrap' alignItems='center'>
              <Box pr={2}>
                <PermIdentity color='primary' fontSize='large' />
              </Box>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    name='firstName'
                    defaultValue={user.firstName}
                    variant='outlined'
                    label='First Name'
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    name='lastName'
                    defaultValue={user.lastName}
                    variant='outlined'
                    label='Last Name'
                    fullWidth
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position='end'>
                          <Tooltip title='Only your first name will be visible to other members.'>
                            <Info color='action' style={{ cursor: 'default' }} />
                          </Tooltip>
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid item container sm={12} md={6} wrap='nowrap' alignItems='center'>
              <Box pr={2}>
                <Email color='primary' fontSize='large' />
              </Box>
              <TextField
                variant='outlined'
                label='Email Address'
                value={user.email}
                disabled
                fullWidth
              />
            </Grid>
            <Grid item container wrap='nowrap' sm={12} md={6} alignItems='center'>
              <Box pr={2}>
                <Wc color='primary' fontSize='large' />
              </Box>
              <TextField
                variant='outlined'
                fullWidth
                label='Gender'
                select
                value={user.gender}
                disabled
              >
                <MenuItem value='M'>Man</MenuItem>
                <MenuItem value='F'>Woman</MenuItem>
              </TextField>
            </Grid>
            <Grid item container wrap='nowrap' sm={12} md={6} alignItems='center'>
              <Box pr={2}>
                <Phone color='primary' fontSize='large' />
              </Box>
              <TextField
                type='tel'
                name='phoneNumber'
                defaultValue={user.phoneNumber || ''}
                variant='outlined'
                label='Phone Number'
                fullWidth
              />
            </Grid>
            <Grid item container wrap='nowrap' sm={12} md={6} alignItems='center'>
              <Box pr={2}>
                <OfflineBolt color='primary' fontSize='large' />
              </Box>
              <TextField                
                value={membershipDisplayText()}
                variant='outlined'
                label='Membership'
                disabled
                fullWidth
              />
            </Grid>
            <Grid item container justifyContent='flex-end' xs={12} md={6}>
              <Button
                disabled={loading}
                variant='contained'
                color='primary'
                type='submit'
                startIcon={loading ? <CircularProgress size={16} /> : <Save />}
              >
                Save Changes
              </Button>
            </Grid>
          </Grid>
        </form>
      </Container>
    </Box>
  );
}
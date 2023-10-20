import { useCallback, useState } from "react";
import { useEvents } from "../../../src/contexts/EventsProvider";
import Layout from "../layout";
import { Alert, Box, Button, FormControlLabel, Grid, InputAdornment, Switch, TextField, Typography } from "@mui/material";
import { DateTimePicker } from "@mui/x-date-pickers";
import { Add, ArrowRightAlt } from "@mui/icons-material";
import { makeid } from '../../../src/utils/cuuid';
import ImageUpload from "../../../src/components/ImageUpload";
import { uploadFile } from '../../../src/services/storage'
import DraftEditor from "../../../src/components/DraftEditor";
import { getDescription } from "../../../src/utils/description";
import { useRouter } from "next/router";
import HowItWorks from "../../../src/components/HowItWorks";
import Participants from "../../../src/components/Participants";
import PageSpinner from "../../../src/components/PageSpinner";
import { isFileImage } from "../../../src/utils/file";
import { scrollTop } from '../../../src/utils/scroll'
import { addEvent, getEvent } from "../../../src/services/event";
import { routes } from "../../../src/routes";
import { EVENTS_IMAGES_PATH, HOW_IT_WORKS_IMAGES_PATH } from "../../../src/constants";

export default function AdminEventsAdd() {
  const router = useRouter()
  const { events, setEvents } = useEvents();
  const [event, setEvent] = useState({
    id: '',
    designMyNightId: '',
    title: '',
    description: null,
    dateTime: null,
    venue: '',
    venueAddress: '',
    venueDescription: '',
    ticketPrice: '',
    menAvailableTickets: '',
    womenAvailableTickets: '',
    ageRangeFrom: '',
    ageRangeTo: '',
    featured: false,
    archived: false,
    showBanner: false,
    banner: '',
    imgURL: null,
    imgMobileUrl: null,
    participants: [],
    discountCodes: [
      {
        percent: 10,
        code: makeid()
      },
      {
        percent: 15,
        code: makeid()
      },
      {
        percent: 20,
        code: makeid()
      }
    ],
    howItWorks: {
      col1: {
        imgURL: null,
        description: null,
      },
      col2: {
        imgURL: null,
        description: null,
      },
      col3: {
        imgURL: null,
        description: null,
      },
      finalNotes: null,
    },
  });

  const [error, setError] = useState(null);
  const [imageDesktopFile, setImageDesktopFile] = useState(null);
  const [imageMobileFile, setImageMobileFile] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [tempEvent, setTempEvent] = useState(event);
  const [syncing, setSyncing] = useState(false);

  const handleDateTimeChange = useCallback(
    (value) => {
      setEvent({ ...event, dateTime: value ? new Date(value) : null });
    },
    [event]
  );

  const handleFeaturedChange = useCallback(
    (_, checked) => setEvent((event) => ({ ...event, featured: checked })),
    []
  );

  const handleisSameGenderChange = useCallback(
    (_, checked) => setEvent((event) => ({ ...event, isSameGender: checked })),
    []
  );

  const handleArchivedChange = useCallback(
    (_, checked) => setEvent((event) => ({ ...event, archived: checked })),
    []
  );

  const handleShowBannerChange = useCallback(
    (_, checked) => setEvent((event) => ({ ...event, showBanner: checked })),
    []
  );

  const handleFieldChange = useCallback(
    ({ target: { name, value, type } }) => {
      if (type === 'number' && value) {
        value = Number(value);
        if (value < 0) return;
      }
      setEvent({ ...event, [name]: value });
    },
    [event]
  );

  const handleImageUpload = useCallback(
    ({ target: { files } }) => {
      if (files && files.length) {
        const file = files[0];
        if (!isFileImage(file)) {
          setEvent((event) => ({ ...event, imgURL: null }));
          setImageDesktopFile(null);
          scrollTop();
          return setError('Invalid image file type!');
        }
        if (error) setError(null);
        setImageDesktopFile(file);
        setEvent((event) => ({ ...event, imgURL: URL.createObjectURL(file) }));
      }
    },
    [error]
  );

  const handleImageMobileUpload = useCallback(
    ({ target: { files } }) => {
      if (files && files.length) {
        const file = files[0];
        if (!isFileImage(file)) {
          setEvent((event) => ({ ...event, imgMobileUrl: null }));
          setImageMobileFile(null);
          scrollTop();
          return setError('Invalid image file type!');
        }
        if (error) setError(null);
        setImageMobileFile(file);
        setEvent((event) => ({ ...event, imgMobileUrl: URL.createObjectURL(file) }));
      }
    },
    [error]
  );

  const handleDeleteImage = useCallback(
    (e) => {
      e.preventDefault();
      URL.revokeObjectURL(imageDesktopFile);
      document.querySelector('#file-input-desktop').value = '';
      setEvent((event) => ({ ...event, imgURL: null }));
      setImageDesktopFile(null);
    },
    [imageDesktopFile]
  );

  const handleDeleteMobileImage = useCallback(
    (e) => {
      e.preventDefault();
      URL.revokeObjectURL(imageMobileFile);
      document.querySelector('#file-input-mobile').value = '';
      setEvent((event) => ({ ...event, imgMobileUrl: null }));
      setImageMobileFile(null);
    },
    [imageMobileFile]
  );

  const prepareHowItWorksImages = useCallback(async () => {
    const col1 = event.howItWorks.col1;
    if (col1.imgURL && col1.imgURL !== tempEvent.howItWorks.col1.imgURL) {
      const blob = await fetch(col1.imgURL).then((r) => r.blob());
      const file = new File([blob], 'untitled', { type: blob.type });
      col1.imgURL = await (await uploadFile(file, HOW_IT_WORKS_IMAGES_PATH));
    }
    const col2 = event.howItWorks.col2;
    if (col2.imgURL && col2.imgURL !== tempEvent.howItWorks.col2.imgURL) {
      const blob = await fetch(col2.imgURL).then((r) => r.blob());
      const file = new File([blob], 'untitled', { type: blob.type });
      col2.imgURL = await (await uploadFile(file, HOW_IT_WORKS_IMAGES_PATH));
    }
    const col3 = event.howItWorks.col3;
    if (col3.imgURL && col3.imgURL !== tempEvent.howItWorks.col3.imgURL) {
      const blob = await fetch(col3.imgURL).then((r) => r.blob());
      const file = new File([blob], 'untitled', { type: blob.type });
      col3.imgURL = await (await uploadFile(file, HOW_IT_WORKS_IMAGES_PATH));
    }
  }, [event.howItWorks, tempEvent.howItWorks]);

  const handleCreateEvent = useCallback(
    async (e) => {
      e.preventDefault();

      if (error) setError(null);

      setSubmitting(true);
      try {
        await prepareHowItWorksImages();
        const imgURL = imageDesktopFile
          ? await (await uploadFile(imageDesktopFile, EVENTS_IMAGES_PATH))
          : null;

        const imgMobileUrl = imageMobileFile
          ? await (await uploadFile(imageMobileFile, EVENTS_IMAGES_PATH))
          : null;


        const newEventId = (
          await addEvent({
            ...event,
            lowercaseTitle: event.title.toLowerCase(),
            imgURL,
            imgMobileUrl
          })
        ).id;

        const newEvent = { ...(await getEvent(newEventId)), id: newEventId };
        setEvents([...events, newEvent]);

        return router.replace(routes.adminEvents);
      } catch (error) {
        setError(error.message);
        scrollTop();
      }
      setSubmitting(false);
    },
    [error, event, events, imageDesktopFile, prepareHowItWorksImages, setEvents]
  );

  const handleDescriptionChange = useCallback((editorState) => {
    setEvent((event) => ({ ...event, description: editorState }));
  }, []);

  const handleVenueDescriptionChange = useCallback((editorState) => {
    setEvent((event) => ({ ...event, venueDescription: editorState }));
  }, []);

  const handleParticipantsChange = useCallback(
    (participants) => {
      setEvent({ ...event, participants });
    },
    [event]
  );

  const handleHowItWorksChange = useCallback(
    (howItWorks) => setEvent({ ...event, howItWorks }),
    [event]
  );

  return (
    <Layout>
      {(submitting || syncing) && <PageSpinner />}
      {!syncing && (
        <>
          <h2>Create Event</h2>
          <Box mt={2} mb={2}>
            <form onSubmit={handleCreateEvent}>
              <Grid container justifyContent='space-between' spacing={2}>
                <Grid item container direction={'column'} sm={6} spacing={2}>
                  {error && (
                    <Grid item>
                      <Alert severity="error">{error}</Alert>
                    </Grid>
                  )}
                  <Grid item>
                    <TextField
                      defaultValue={event.title}
                      name='title'
                      fullWidth
                      variant='outlined'
                      label='Event Title'
                      required
                      onBlur={handleFieldChange}
                    />
                  </Grid>
                  <Grid item>
                    <DateTimePicker
                      name='dateTime'
                      fullWidth
                      value={event.dateTime}
                      // disablePast
                      onChange={handleDateTimeChange}
                      label='Event Date and Time'
                      clearable
                      inputVariant='outlined'
                      required
                    />
                  </Grid>
                  <Grid item>
                    <TextField
                      defaultValue={event.designMyNightId}
                      name='designMyNightId'
                      fullWidth
                      variant='outlined'
                      label='Design My Night Event ID'
                      onBlur={handleFieldChange}
                    />
                  </Grid>
                  <Grid item>
                    <TextField
                      InputProps={{
                        startAdornment: <InputAdornment position='start'>£</InputAdornment>,
                        inputProps: { min: 0 },
                      }}
                      name='ticketPrice'
                      type='number'
                      fullWidth
                      variant='outlined'
                      label='Ticket Price'
                      defaultValue={event.ticketPrice}
                      onBlur={handleFieldChange}
                    />
                  </Grid>

                  <Grid item>
                    <TextField
                      InputProps={{
                        startAdornment: <InputAdornment position='start'>£</InputAdornment>,
                        inputProps: { min: 0 },
                      }}
                      name='ticketPriceWithoutDiscount'
                      type='number'
                      fullWidth
                      variant='outlined'
                      label='Ticket Price Without Discount'
                      defaultValue={event.ticketPriceWithoutDiscount}
                      onBlur={handleFieldChange}
                    />
                  </Grid>

                  <Grid item >
                    <Box display='flex' alignItems='center'>
                      <Typography tag="h4">Same Gender event?</Typography>
                      <Box ml={4}>
                        <FormControlLabel
                          name='isSameGender'
                          label={event.isSameGender ? 'YES' : 'NO'}
                          labelPlacement='end'
                          checked={event.isSameGender}
                          control={<Switch color='primary' title='Same Gender' />}
                          onChange={handleisSameGenderChange}
                        />
                      </Box>
                    </Box>
                  </Grid>

                  <Grid item>
                    <h4>Available Tickets</h4>
                  </Grid>
                  <Grid item container>
                    <Grid item xs={5}>
                      <TextField
                        name='menAvailableTickets'
                        fullWidth
                        variant='outlined'
                        label='Men'
                        type='number'
                        defaultValue={event.menAvailableTickets}
                        required
                        onBlur={handleFieldChange}
                      />
                    </Grid>
                    <Grid item container alignItems='center' justifyContent='center' xs={2}>
                      <h4>
                        <Add />
                      </h4>
                    </Grid>
                    <Grid item xs={5}>
                      <TextField
                        name='womenAvailableTickets'
                        fullWidth
                        variant='outlined'
                        label='Women'
                        type='number'
                        defaultValue={event.womenAvailableTickets}
                        required
                        onBlur={handleFieldChange}
                      />
                    </Grid>
                  </Grid>

                  <Grid item>
                    <h4>Age Range</h4>
                  </Grid>
                  <Grid item container>
                    <Grid item xs={5}>
                      <TextField
                        name='ageRangeFrom'
                        fullWidth
                        variant='outlined'
                        label='From'
                        type='number'
                        defaultValue={event.ageRangeFrom}
                        onBlur={handleFieldChange}
                      />
                    </Grid>
                    <Grid item container alignItems='center' justifyContent='center' xs={2}>
                      <ArrowRightAlt />
                    </Grid>
                    <Grid item xs={5}>
                      <TextField
                        name='ageRangeTo'
                        fullWidth
                        variant='outlined'
                        label='To'
                        type='number'
                        defaultValue={event.ageRangeTo}
                        onBlur={handleFieldChange}
                      />
                    </Grid>
                  </Grid>

                  <Grid item display={{ sm: 'none', xs: 'block' }}>
                    <ImageUpload
                      id='file-input'
                      onDelete={handleDeleteImage}
                      onUpload={handleImageUpload}
                      imgURL={event.imgURL}
                    />
                  </Grid>

                </Grid>
                <Grid item sm={6} display={{ sm: 'block', xs: 'none' }}>
                  <Box>
                    <h4 style={{ marginBottom: '4px' }}>Desktop Image (min 900 px width)</h4>
                    <ImageUpload
                      id='file-input-desktop'
                      onDelete={handleDeleteImage}
                      onUpload={handleImageUpload}
                      imgURL={event.imgURL}
                    />
                  </Box>
                  <Box
                    style={{ marginTop: '20px' }}>
                    <h4 style={{ marginBottom: '4px' }}>Mobile Image (max 440 px width)</h4>
                    <ImageUpload
                      id='file-input-mobile'
                      onDelete={handleDeleteMobileImage}
                      onUpload={handleImageMobileUpload}
                      imgURL={event.imgMobileUrl}
                    />
                  </Box>
                </Grid>
              </Grid>

              <Box my={4}>
                <Grid container spacing={4}>
                  <Grid item md={6}>
                    <Box>
                      <TextField
                        name='venue'
                        fullWidth
                        variant='outlined'
                        label='Venue'
                        defaultValue={event.venue}
                        required
                        onBlur={handleFieldChange}
                      />
                    </Box>
                    <Box mt={3}>
                      <TextField
                        name='venueAddress'
                        fullWidth
                        variant='outlined'
                        label='Venue Address'
                        defaultValue={event.venueAddress}
                        onBlur={handleFieldChange}
                      />
                    </Box>
                  </Grid>
                  <Grid item md={6}>
                    <Box py={2}>
                      <h4>Venue Description</h4>
                    </Box>
                    <DraftEditor
                      description={getDescription(event.venueDescription)}
                      onChange={handleVenueDescriptionChange}
                      placeholder='Venue Description'
                    />
                  </Grid>
                </Grid>
              </Box>

              <Box my={4}>
                <Grid container alignItems='center'>
                  <Grid item sm={4}>
                    <Box display='flex' alignItems='center'>
                      <Typography tag="h4">Featured Event?</Typography>
                      <Box ml={4}>
                        <FormControlLabel
                          name='featured'
                          label={event.featured ? 'YES' : 'NO'}
                          labelPlacement='end'
                          checked={event.featured}
                          control={<Switch color='primary' title='Featured Event' />}
                          onChange={handleFeaturedChange}
                        />
                      </Box>
                    </Box>
                  </Grid>
                  <Grid item sm={4}>
                    <Box display='flex' alignItems='center'>
                      <Typography tag="h4" color="primary">Archived Event?</Typography>
                      <Box ml={4}>
                        <FormControlLabel
                          name='archived'
                          label={event.archived ? 'YES' : 'NO'}
                          labelPlacement='end'
                          checked={event.archived}
                          control={<Switch color='primary' title='Archived Event' />}
                          onChange={handleArchivedChange}
                        />
                      </Box>
                    </Box>
                  </Grid>
                  <Grid item sm={4}>
                    <Box display='flex' alignItems='center'>
                      <Typography tag="h4" color="primary">Discounts</Typography>
                      <Box ml={2}>
                        {
                          event.discountCodes.map((discountCode, index) => (
                            <Box mt={1} key={index}>
                              <TextField
                                name='discountCode'
                                fullWidth
                                variant='outlined'
                                label={`Discount Code(${discountCode.percent} %)`}
                                defaultValue={discountCode.code}
                                onBlur={(e) => handleDiscountChange(e.target.value, index)}
                              />
                            </Box>
                          ))
                        }
                      </Box>
                    </Box>
                  </Grid>
                </Grid>
              </Box>

              <Box my={4}>
                <Grid container alignItems='center'>
                  <Grid item sm={4}>
                    <Box display='flex' alignItems='center'>
                      <Typography tag="h4">Show Banner?</Typography>
                      <Box ml={4}>
                        <FormControlLabel
                          name='showBanner'
                          label={event.showBanner ? 'YES' : 'NO'}
                          labelPlacement='end'
                          checked={event.showBanner}
                          control={<Switch color='primary' title='Show Banner' />}
                          onChange={handleShowBannerChange}
                        />
                      </Box>
                    </Box>
                  </Grid>
                  <Grid item sm={8}>
                    <TextField
                      name='banner'
                      fullWidth
                      variant='outlined'
                      label='Banner'
                      type='text'
                      defaultValue={event.banner}
                      onBlur={handleFieldChange}
                    />
                  </Grid>
                </Grid>
              </Box>

              <Box my={4}>
                <Box py={2}>
                  <h4>Event Description</h4>
                </Box>
                <DraftEditor
                  description={getDescription(event.description)}
                  onChange={handleDescriptionChange}
                // readOnly
                // toolbarHidden
                />
              </Box>

              <Box my={4}>
                <HowItWorks
                  howItWorks={event.howItWorks}
                  onChange={handleHowItWorksChange}
                  setError={setError}
                  error={error}
                />
              </Box>

              <Box my={4}>
                <Participants
                  participants={event.participants}
                  onChange={handleParticipantsChange}
                  disabled={true}
                />
              </Box>

              <Box my={4}>
                <Grid container spacing={2} justifyContent='flex-end'>
                  <Grid item xs={6} sm={4} md={3}>
                    <Button
                      fullWidth
                      onClick={() => router.push(routes.adminEvents)}
                      type='button'
                      color='secondary'
                      variant='contained'
                    >
                      Cancel
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
                      Create Event
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
import { useState } from "react";

import { useRouter } from "next/router";
import { useSearchParams } from "next/navigation";

import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { ArrowRightAlt } from "@mui/icons-material";
import dayjs from "dayjs";

import {
  Autocomplete,
  Box,
  Button,
  Grid,
  MenuItem,
  TextField,
} from "@mui/material";

export default function EventSearchForm({locations, ages, title}) {
  const searchParams = useSearchParams();

  const initialAge =
    searchParams.get("ageFrom") && searchParams.get("ageTo")
      ? `${searchParams.get("ageFrom")} - ${searchParams.get("ageTo")}`
      : null;

  const [date, setDate] = useState(
    searchParams.get("date") ? dayjs(searchParams.get("date")) : null
  );
  const [location, setLocation] = useState(searchParams.get("location"));
  const [eventTypeSearch, setEventTypeSearch] = useState(
    searchParams.get("type")
  );
  const [ageRange, setAgeRange] = useState(initialAge);

  const router = useRouter();
  const handleSearch = (e) => {
    e.preventDefault();
    const queries = {
      ...router.query,
      location,
      type: eventTypeSearch,
      ageFrom: ageRange ? ageRange.split(" - ")[0].trim() : "",
      ageTo: ageRange ? ageRange.split(" - ")[1].trim() : "",
      date:
        date && date.year()
          ? `${date.year()}-${date.month() + 1}-${date.date()}`
          : "",
    };

    if (!location) delete queries.location;
    if (!eventTypeSearch) delete queries.type;
    if (!ageRange) delete queries.ageFrom;
    if (!ageRange) delete queries.ageTo;
    if (!date) delete queries.date;
    if (date && (!date.year() || !date.month() || !date.date()))
      delete queries.date;
    router.replace(
      {
        query: queries,
      },
      null,
      { scroll: false }
    );
  };

  return (
    <form onSubmit={handleSearch}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={12} md>
          <Autocomplete
            fullWidth
            options={locations}
            getOptionLabel={(option) => option}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Location"
                variant="outlined"
              />
            )}
            onChange={(_, newValue) => {
              setLocation(newValue);
            }}
            value={location}
            sx={(theme) => ({
              backgroundColor: theme.palette.grey[200],
            })}
          />
        </Grid>

        <Grid item xs={6} sm>
          <TextField
            fullWidth
            label="Event Type"
            select
            variant="outlined"
            defaultValue=""
            value={eventTypeSearch ?? ""}
            onChange={(e) => {
              setEventTypeSearch(e.target.value);
            }}
            sx={(theme) => ({
              backgroundColor: theme.palette.grey[200],
            })}
          >
            <MenuItem value={""}>All</MenuItem>
            <MenuItem value={"Speed"}>Speed Dating</MenuItem>
            <MenuItem value={"Single"}>Singles Party</MenuItem>
            <MenuItem value={"Christian"}>
              Christian Speed Dating
            </MenuItem>
            <MenuItem value={"Gay"}>Gay Singles Party</MenuItem>
          </TextField>
        </Grid>

        <Grid item xs={6} sm>
          <TextField
            fullWidth
            onChange={(e) => setAgeRange(e.target.value)}
            label="Age"
            select
            variant="outlined"
            value={ageRange ?? ""}
            defaultValue=""
            sx={(theme) => ({
              backgroundColor: theme.palette.grey[200],
            })}
          >
            <MenuItem key={`ageRange_None`} value={""}>
              <em>None</em>
            </MenuItem>
            {ages.map((range, i) => {
              return (
                <MenuItem key={`ageRange_${i}`} value={range}>
                  {range}
                </MenuItem>
              );
            })}
          </TextField>
        </Grid>
        <Grid item xs={6} sm>
          <DatePicker
            autoOk
            disableToolbar
            label="Date"
            format="DD/MM/YYYY"
            value={date}
            onChange={(date) => setDate(date)}
            sx={(theme) => ({
              backgroundColor: theme.palette.grey[200],
              width: "100%",
            })}
            clearable={true}
          />
        </Grid>
        <Grid item>
          <Box height="100%" display="flex" alignItems="center">
            <Button
              size={title ? "large" : "medium"}
              fullWidth
              variant="contained"
              color="primary"
              endIcon={<ArrowRightAlt />}
              type="submit"
            >
              Search
            </Button>
          </Box>
        </Grid>
      </Grid>
    </form>
  )
}
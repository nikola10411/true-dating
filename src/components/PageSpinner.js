import { Box, CircularProgress } from "@mui/material";

export default function PageSpinner(props) {
  return (
    <Box
      position='fixed'
      top='0'
      right='0'
      bottom='0'
      left='0'
      display='flex'
      alignItems='center'
      justifyContent='center'
      zIndex='999'
    >
      <CircularProgress {...props} />
    </Box>
  );
}
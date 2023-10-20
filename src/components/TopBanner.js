import { Box, Typography } from "@mui/material"

import {COLORS} from '../theme';

export default function TopBanner() {
  return (
    <Box sx={{
      width: '100%',
      backgroundColor: COLORS.radicalRed,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '44px',
      fontSize: '32px',
      color: 'white'
    }}>
      <Typography sx={{fontSize: '18px'}}>
        <span style={{fontSize: '26px'}}>10%</span> OFF ALL EVENTS Use Code: OFFER<span style={{fontSize: '22px'}}>10</span>
      </Typography>
    </Box>
  )
}
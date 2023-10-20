import { useEffect, useState } from "react";

import { getTopBanner, updateTopBanner } from '../../../src/services/offers';
import { Box, Switch, Typography } from "@mui/material";

export default function Offers() {
    const [isTopBannerEnabled, setIsTopBannerEnabled] = useState(false);

    const getTopBannerEnabled = async () => {
        const topBanner = await getTopBanner()
        setIsTopBannerEnabled(topBanner.enabled)
    }

    useEffect(() => {
        getTopBannerEnabled()
    }, [])

    const onSwitchChanged = (event) => {
        updateTopBanner(event.target.checked)
        setIsTopBannerEnabled(event.target.checked);
    }

    return (
        <Box sx={{
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: '140px',
        }}>
            <Typography>
                Home Top Banner Discount
            </Typography>
            <Switch 
              onChange={onSwitchChanged}
              checked={isTopBannerEnabled}
              color='primary'
              defaultChecked
              sx={{ marginLeft: '12px' }}
            />
        </Box>
    )
}
import { Box } from "@mui/material";

export default function DividerWithText({ text }) {
  return <Box sx={(theme) => ({ 
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    '&:before, &:after': {
      content: '""',
      display: 'block',
      flexGrow: 0.45,
      borderBottom: `1px solid ${theme.palette.divider}`,
    },
  })}>
    {text}
</Box>;
}
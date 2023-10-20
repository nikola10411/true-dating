import { useRouter } from "next/router";
import { routes } from "../routes";
import { Box, Button, Card, CardActionArea, CardContent, CardMedia, Typography } from "@mui/material";
import { IMG_PLACEHOLDER } from "../constants";
import { ArrowRightAlt } from "@mui/icons-material";

export default function BlogCard({
  imgURL,
  seoTitle,
  title,
}) {
  const router = useRouter();

  const redirect = () => {
    router.push(`${routes.blog}/${seoTitle}`)
  }

  return (
    <Card sx={{
      width: '100%',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      '& .MuiCardContent-root': {
        padding: 0,
        height: 'inherit',
      },
      '& .MuiCardActions-root': {
        display: 'initial',
        padding: 0,
      },
    }}>
      <CardActionArea onClick={redirect}>
        <CardMedia sx={{ height: 250 }} image={imgURL || IMG_PLACEHOLDER} title={title} />
        <Box p={1} textAlign='center' maxWidth='100%' sx={{
          backgroundColor: 'primary.main',
          color: 'primary.contrastText',
        }}>
          <Typography variant="h6">{title}</Typography>
        </Box>
        <CardContent>
          <Box p={2}>
            <Button
              fullWidth
              variant='contained'
              color='primary'
              endIcon={<ArrowRightAlt />}
              onClick={redirect}
            >
              Read More
            </Button>
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  )
}
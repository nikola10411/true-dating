import { AppBar, Tab, Tabs } from "@mui/material";
import { useRouter } from "next/router";
import { routes } from "../../src/routes";
import { Box, Container } from "@mui/system";
import {
  Description,
  EmailOutlined,
  Event,
  PeopleAlt,
  Star,
} from "@mui/icons-material";
import { useMemo, useState } from "react";

const EVENTS = "Events";
const BLOGS = "Blogs";
const USERS = "Users";
const SUBSCRIBERS = "Subscribers";
const OFFERS = "Offers";

function LinkTab({ to, ...props }) {
  return <Tab component="a" href={to} {...props} />;
}

export default function Layout({ children }) {
  const router = useRouter();

  const initialTabValue = useMemo(() => {
    switch (true) {
      case router.pathname.includes(routes.adminEvents): {
        return 0;
      }

      case router.pathname.includes(routes.adminBlogs): {
        return 1;
      }

      case router.pathname.includes(routes.adminUsers): {
        return 2;
      }

      // case location.pathname.includes(routes.adminRefund): {
      //   return 2;
      // }

      default: {
        return false;
      }
    }
  }, [router.pathname]);

  const [value, setValue] = useState(initialTabValue);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box
      sx={{
        flexGrow: 1,
        width: "100%",
      }}
    >
      <AppBar position="static" color="default">
        <Tabs
          value={value}
          onChange={handleChange}
          // variant='scrollable'
          // scrollButtons='on'
          indicatorColor="primary"
          textColor="primary"
          aria-label="scrollable force tabs example"
          centered
        >
          <LinkTab
            className={"mobileTab"}
            sx={{
              width: "100px",
              "&:not(.Mui-selected)": {
                color: "secondary.main",
              },
            }}
            label={EVENTS}
            icon={<Event />}
            to={routes.adminEvents}
          />
          <LinkTab
            className={"mobileTab"}
            sx={{
              "&:not(.Mui-selected)": {
                color: "secondary.main",
              },
            }}
            label={BLOGS}
            icon={<Description />}
            to={routes.adminBlogs}
          />
          <LinkTab
            className={"mobileTab"}
            sx={{
              "&:not(.Mui-selected)": {
                color: "secondary.main",
              },
            }}
            label={USERS}
            icon={<PeopleAlt />}
            to={routes.adminUsers}
          />
          <LinkTab
            className={"mobileTab"}
            sx={{
              "&:not(.Mui-selected)": {
                color: "secondary.main",
              },
            }}
            label={SUBSCRIBERS}
            icon={<EmailOutlined />}
            to={routes.adminSubscribers}
          />
          <LinkTab
            className={"mobileTab"}
            sx={{
              "&:not(.Mui-selected)": {
                color: "secondary.main",
              },
            }}
            label={OFFERS}
            icon={<Star />}
            to={routes.offers}
          />
        </Tabs>
      </AppBar>
      <Container id="TAB_CONTENT">
        <Box py={2}>{children}</Box>
      </Container>
    </Box>
  );
}

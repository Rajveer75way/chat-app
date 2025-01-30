import { Box, Theme, useTheme } from "@mui/material";
import { Outlet } from "react-router-dom";
import { createStyles } from "@mui/styles";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

const useStyle = (theme: Theme) => createStyles({
  root: {
    backgroundColor: "lightgrey",
    height: '100vh',
    width: '100vw',
    [theme.breakpoints.up('md')]: {
      backgroundColor: 'white',
    },
  },
});

const Basic = () => {
  const theme = useTheme();
  const styles = useStyle(theme);
  return (
    <Box sx={styles.root}>
      <Navbar />
      <Outlet />
      {/* <Footer /> */}
    </Box>
  );
};

export default Basic;

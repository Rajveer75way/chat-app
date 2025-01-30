import { Box, Container, Grid, Link, Typography, IconButton } from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
const Footer = () => {
  return (
    <Box
      sx={{
        backgroundColor: "#222222",
        color: "#fff",
        py: 4,
        mt: 5,
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {/* Column 1: About */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" gutterBottom>
              About Us
            </Typography>
            <Typography variant="body2">
              We are committed to providing the best user experience with our platform. Learn more about our mission and values.
            </Typography>
          </Grid>

          {/* Column 2: Links */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" gutterBottom>
              Useful Links
            </Typography>
            <ul style={{ paddingLeft: 0, listStyleType: "none" }}>
              <li>
                <Link href="/" color="inherit">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" color="inherit">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/services" color="inherit">
                  Services
                </Link>
              </li>
              <li>
                <Link href="/contact" color="inherit">
                  Contact
                </Link>
              </li>
            </ul>
          </Grid>

          {/* Column 3: Social Links */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" gutterBottom>
              Follow Us
            </Typography>
            <Box>
              <IconButton
                component="a"
                href="https://facebook.com"
                target="_blank"
                color="inherit"
              >
                <FacebookIcon />
              </IconButton>
              <IconButton
                component="a"
                href="https://twitter.com"
                target="_blank"
                color="inherit"
              >
                <TwitterIcon />
              </IconButton>
              <IconButton
                component="a"
                href="https://instagram.com"
                target="_blank"
                color="inherit"
              >
                <InstagramIcon />
              </IconButton>
              <IconButton
                component="a"
                href="https://linkedin.com"
                target="_blank"
                color="inherit"
              >
                <LinkedInIcon />
              </IconButton>
            </Box>
          </Grid>

          {/* Column 4: Contact */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" gutterBottom>
              Contact Info
            </Typography>
            <Typography variant="body2">
              Email: support@example.com
            </Typography>
            <Typography variant="body2">
              Phone: +123 456 7890
            </Typography>
          </Grid>
        </Grid>

        {/* Footer Bottom */}
        <Box
          sx={{
            mt: 4,
            textAlign: "center",
            borderTop: "1px solid #444",
            pt: 2,
          }}
        >
          <Typography variant="body2" color="inherit">
            © 2025 Your Company. All Rights Reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;

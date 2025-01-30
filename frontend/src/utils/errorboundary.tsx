import React, { Component, ReactNode } from "react";
import { Button, Card, CardContent, Typography, Box } from "@mui/material";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    console.error("Error caught by ErrorBoundary:", error, info);
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      return (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="100vh"
          bgcolor="background.default"
        >
          <Card sx={{ maxWidth: 400, padding: 3, textAlign: "center" }}>
            <CardContent>
              <Typography variant="h5" color="error" gutterBottom>
                Something went wrong!
              </Typography>
              <Typography variant="body1" sx={{ marginBottom: 2 }}>
                {this.state.error?.message || "An unexpected error occurred."}
              </Typography>
              <Button
                variant="contained"
                color="primary"
                onClick={this.handleRetry}
              >
                Retry
              </Button>
            </CardContent>
          </Card>
        </Box>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;

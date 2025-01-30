import React, { Suspense, ComponentType, LazyExoticComponent, FC } from "react";
import Skeleton from "@mui/material/Skeleton";
import { Box, Grid } from "@mui/material";

function withLazyLoad<T extends ComponentType<any>>(
  importFunc: () => Promise<{ default: T }>,
  SkeletonLoader?: JSX.Element // Optional skeleton loader fallback
): FC<any> {
  const LazyComponent = React.lazy(importFunc);

  const LazyComponentWithProps: FC<any> = (props) => (
    <Suspense
      fallback={
        SkeletonLoader || (
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            flexDirection="column"
            width="100%"
            height="100vh"
          >
            {/* Full page skeleton layout */}
            <Grid container spacing={3} padding={2} direction="column">
              {[...Array(6)].map((_, index) => (
                <Grid item xs={12} sm={6} md={4} key={index}>
                  <Box>
                    <Skeleton variant="rectangular" width="100%" height={200} />
                    <Skeleton variant="text" width="80%" height={30} sx={{ marginTop: 1 }} />
                    <Skeleton variant="text" width="50%" height={20} />
                    <Skeleton variant="text" width="40%" height={20} />
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Box>
        )
      }
    >
      <LazyComponent {...props} />
    </Suspense>
  );

  return LazyComponentWithProps;
}

export default withLazyLoad;


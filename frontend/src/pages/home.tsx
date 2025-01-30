import withLazyLoad from "../utils/lazyloading"; // Assuming you have the lazy load utility from before

// Utility to simulate a delay

// Lazy-loaded Home component with delay
const LazyHome = withLazyLoad(async () => {
  return import("../components/Dashboard");
});

const HomePage = () => {
  return (
    <div>
      <LazyHome />
      
    </div>
  );
};

export default HomePage;

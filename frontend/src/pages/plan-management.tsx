import withLazyLoad from "../utils/lazyloading";

const LazyHome = withLazyLoad(async () => {
    return import("../components/PlanManagement");
  });
const plan = () => {
  return (
    <LazyHome />
)
}

export default plan
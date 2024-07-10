import { Suspense, createResource, type Component } from "solid-js";
import { Route, Router } from "@solidjs/router";
import { routes } from "routes";
import { Layout } from "./components/Layout/Layout";
import { useFetchData } from "hooks";

export const App: Component = () => {
  const { data: getNetworkData } = useFetchData();

  return (
    <Suspense fallback={<p>Loading...</p>}>
      {Boolean(getNetworkData()) && (
        <Router>
          {routes.map(({ path, component }) => (
            <Route path="/" component={Layout}>
              <Route path={path} component={component} />
            </Route>
          ))}
        </Router>
      )}
    </Suspense>
  );
};

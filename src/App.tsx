import type { Component } from "solid-js";
import { Route, Router } from "@solidjs/router";
import { Layout } from "./components/Layout/Layout";
import { Home } from "./pages/Home";

export const App: Component = () => {
  return (
    <Router>
      <Route path="/" component={Layout}>
        <Route path="/" component={Home} />
      </Route>
    </Router>
  );
};

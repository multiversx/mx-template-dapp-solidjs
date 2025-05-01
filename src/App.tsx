import { Route, Router } from '@solidjs/router';
import { Suspense, type Component } from 'solid-js';
import { routes } from 'routes';
import { Layout } from './components/Layout/Layout';

export const App: Component = () => {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <Router>
        {routes.map(({ path, component }) => (
          <Route path='/' component={Layout}>
            <Route path={path} component={component} />
          </Route>
        ))}
      </Router>
    </Suspense>
  );
};

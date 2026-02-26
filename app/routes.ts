import { type RouteConfig, index } from '@react-router/dev/routes';

// Routes live in app/routes/ following React Router framework-mode convention.
// _index.tsx = the index route for "/"
export default [index('routes/_index.tsx')] satisfies RouteConfig;

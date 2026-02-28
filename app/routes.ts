import { type RouteConfig, index, layout, route } from '@react-router/dev/routes';

export default [
  layout('routes/layout.tsx', [
    index('routes/_index.tsx'),
    route('about', 'routes/about.tsx'),
    route('skills', 'routes/skills.tsx'),
    route('projects', 'routes/projects.tsx'),
    route('contact', 'routes/contact.tsx'),
    route('prices', 'routes/prices.tsx'),
    route('*', 'routes/$.tsx'),
  ]),
] satisfies RouteConfig;

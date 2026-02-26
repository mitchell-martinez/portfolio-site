import { Links, Meta, Outlet, Scripts, ScrollRestoration } from 'react-router';
import type { LinksFunction } from 'react-router';
import globalStyles from '~/styles/global.scss?url';

export const links: LinksFunction = () => [
  { rel: 'stylesheet', href: globalStyles },
  { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
];

// Inline script that runs synchronously before any CSS is applied.
// Reads the user's saved theme from localStorage and sets data-theme on <html>
// so there is never a flash of the wrong theme on load.
const themeScript = `(function(){try{var t=localStorage.getItem('portfolio-theme');if(t==='light'||t==='dark'){document.documentElement.setAttribute('data-theme',t);}else if(window.matchMedia('(prefers-color-scheme: light)').matches){document.documentElement.setAttribute('data-theme','light');}}catch(e){}})();`;

export default function App() {
  return (
    // data-theme="dark" is the server-rendered default.
    // suppressHydrationWarning prevents React hydration warnings when the
    // inline script has already updated the attribute on the client.
    <html lang="en" data-theme="dark" suppressHydrationWarning>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
        {/* Anti-FOUC: must run before any CSS renders */}
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>
        <Outlet />
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

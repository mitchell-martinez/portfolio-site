import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import { isbot } from "isbot";
import { renderToPipeableStream } from "react-dom/server";
import { ServerRouter, UNSAFE_withComponentProps, Meta, Links, Outlet, ScrollRestoration, Scripts } from "react-router";
import { PassThrough } from "node:stream";
import { memo, useState, useCallback, useEffect, useRef, lazy, Suspense } from "react";
const streamTimeout = 5e3;
function handleRequest(request, responseStatusCode, responseHeaders, routerContext) {
  return new Promise((resolve, reject) => {
    const userAgent = request.headers.get("user-agent");
    const callbackName = isbot(userAgent ?? "") ? "onAllReady" : "onShellReady";
    const { pipe, abort } = renderToPipeableStream(
      /* @__PURE__ */ jsx(ServerRouter, { context: routerContext, url: request.url }),
      {
        [callbackName]() {
          const body = new PassThrough();
          responseHeaders.set("Content-Type", "text/html");
          resolve(
            new Response(body, {
              headers: responseHeaders,
              status: responseStatusCode
            })
          );
          pipe(body);
        },
        onShellError(error) {
          reject(error);
        },
        onError(error) {
          responseStatusCode = 500;
          console.error(error);
        }
      }
    );
    setTimeout(abort, streamTimeout + 1e3);
  });
}
const entryServer = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: handleRequest,
  streamTimeout
}, Symbol.toStringTag, { value: "Module" }));
const globalStyles = "/assets/global-DWTvsfav.css";
const links$1 = () => [{
  rel: "stylesheet",
  href: globalStyles
}, {
  rel: "preconnect",
  href: "https://fonts.googleapis.com"
}];
const root = UNSAFE_withComponentProps(function App() {
  return /* @__PURE__ */ jsxs("html", {
    lang: "en",
    children: [/* @__PURE__ */ jsxs("head", {
      children: [/* @__PURE__ */ jsx("meta", {
        charSet: "utf-8"
      }), /* @__PURE__ */ jsx("meta", {
        name: "viewport",
        content: "width=device-width, initial-scale=1"
      }), /* @__PURE__ */ jsx(Meta, {}), /* @__PURE__ */ jsx(Links, {})]
    }), /* @__PURE__ */ jsxs("body", {
      children: [/* @__PURE__ */ jsx(Outlet, {}), /* @__PURE__ */ jsx(ScrollRestoration, {}), /* @__PURE__ */ jsx(Scripts, {})]
    })]
  });
});
const route0 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: root,
  links: links$1
}, Symbol.toStringTag, { value: "Module" }));
const header = "_header_id5hf_1";
const scrolled = "_scrolled_id5hf_11";
const container$1 = "_container_id5hf_19";
const logo$1 = "_logo_id5hf_34";
const logoText = "_logoText_id5hf_45";
const nav = "_nav_id5hf_56";
const navList = "_navList_id5hf_65";
const navLink = "_navLink_id5hf_71";
const ctaButton = "_ctaButton_id5hf_89";
const mobileMenuButton = "_mobileMenuButton_id5hf_119";
const hamburger = "_hamburger_id5hf_138";
const open = "_open_id5hf_161";
const mobileMenu = "_mobileMenu_id5hf_119";
const mobileMenuOpen = "_mobileMenuOpen_id5hf_177";
const mobileNavList = "_mobileNavList_id5hf_182";
const mobileNavLink = "_mobileNavLink_id5hf_189";
const styles$2 = {
  header,
  scrolled,
  container: container$1,
  logo: logo$1,
  logoText,
  nav,
  navList,
  navLink,
  ctaButton,
  mobileMenuButton,
  hamburger,
  open,
  mobileMenu,
  mobileMenuOpen,
  mobileNavList,
  mobileNavLink
};
const navItems = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" }
];
const Header = memo(() => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const handleScroll = useCallback(() => {
    setIsScrolled(window.scrollY > 20);
  }, []);
  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);
  const toggleMobileMenu = useCallback(() => {
    setIsMobileMenuOpen((prev) => !prev);
  }, []);
  const handleNavClick = useCallback(() => {
    setIsMobileMenuOpen(false);
  }, []);
  return /* @__PURE__ */ jsxs(
    "header",
    {
      className: `${styles$2.header} ${isScrolled ? styles$2.scrolled : ""}`,
      role: "banner",
      children: [
        /* @__PURE__ */ jsxs("div", { className: styles$2.container, children: [
          /* @__PURE__ */ jsx("a", { href: "#", className: styles$2.logo, "aria-label": "Mitchell Martinez - Home", children: /* @__PURE__ */ jsx("span", { className: styles$2.logoText, children: "MM" }) }),
          /* @__PURE__ */ jsx("nav", { className: styles$2.nav, "aria-label": "Main navigation", children: /* @__PURE__ */ jsx("ul", { className: styles$2.navList, role: "list", children: navItems.map((item) => /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(
            "a",
            {
              href: item.href,
              className: styles$2.navLink,
              onClick: handleNavClick,
              children: item.label
            }
          ) }, item.href)) }) }),
          /* @__PURE__ */ jsx(
            "a",
            {
              href: "mailto:mitchell@mitchellmartinez.tech",
              className: styles$2.ctaButton,
              "aria-label": "Contact Mitchell via email",
              children: "Get in Touch"
            }
          ),
          /* @__PURE__ */ jsx(
            "button",
            {
              className: styles$2.mobileMenuButton,
              onClick: toggleMobileMenu,
              "aria-expanded": isMobileMenuOpen,
              "aria-label": isMobileMenuOpen ? "Close menu" : "Open menu",
              "aria-controls": "mobile-menu",
              children: /* @__PURE__ */ jsx("span", { className: `${styles$2.hamburger} ${isMobileMenuOpen ? styles$2.open : ""}`, "aria-hidden": "true" })
            }
          )
        ] }),
        /* @__PURE__ */ jsx(
          "div",
          {
            id: "mobile-menu",
            className: `${styles$2.mobileMenu} ${isMobileMenuOpen ? styles$2.mobileMenuOpen : ""}`,
            "aria-hidden": !isMobileMenuOpen,
            children: /* @__PURE__ */ jsx("nav", { "aria-label": "Mobile navigation", children: /* @__PURE__ */ jsx("ul", { className: styles$2.mobileNavList, role: "list", children: navItems.map((item) => /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(
              "a",
              {
                href: item.href,
                className: styles$2.mobileNavLink,
                onClick: handleNavClick,
                tabIndex: isMobileMenuOpen ? 0 : -1,
                children: item.label
              }
            ) }, item.href)) }) })
          }
        )
      ]
    }
  );
});
Header.displayName = "Header";
const useIntersectionObserver = ({
  threshold = 0.1,
  rootMargin = "0px",
  triggerOnce = true
} = {}) => {
  const ref = useRef(null);
  const [isIntersecting, setIsIntersecting] = useState(false);
  const handleIntersection = useCallback(
    (entries) => {
      const [entry2] = entries;
      if (entry2.isIntersecting) {
        setIsIntersecting(true);
      } else if (!triggerOnce) {
        setIsIntersecting(false);
      }
    },
    [triggerOnce]
  );
  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    const observer = new IntersectionObserver(handleIntersection, {
      threshold,
      rootMargin
    });
    observer.observe(element);
    return () => {
      observer.disconnect();
    };
  }, [handleIntersection, threshold, rootMargin]);
  return { ref, isIntersecting };
};
const hero = "_hero_14sis_1";
const background = "_background_14sis_16";
const gradientOrb1 = "_gradientOrb1_14sis_22";
const gradientOrb2 = "_gradientOrb2_14sis_23";
const gradientOrb3 = "_gradientOrb3_14sis_24";
const grid = "_grid_14sis_58";
const content$1 = "_content_14sis_77";
const visible = "_visible_14sis_86";
const eyebrow = "_eyebrow_14sis_91";
const name = "_name_14sis_100";
const firstName = "_firstName_14sis_109";
const lastName = "_lastName_14sis_113";
const tagline$1 = "_tagline_14sis_121";
const taglineHighlight = "_taglineHighlight_14sis_129";
const description = "_description_14sis_134";
const ctaGroup = "_ctaGroup_14sis_142";
const ctaPrimary = "_ctaPrimary_14sis_150";
const ctaSecondary = "_ctaSecondary_14sis_176";
const scrollIndicator = "_scrollIndicator_14sis_204";
const scrollDot = "_scrollDot_14sis_215";
const styles$1 = {
  hero,
  background,
  gradientOrb1,
  gradientOrb2,
  gradientOrb3,
  grid,
  content: content$1,
  visible,
  eyebrow,
  name,
  firstName,
  lastName,
  tagline: tagline$1,
  taglineHighlight,
  description,
  ctaGroup,
  ctaPrimary,
  ctaSecondary,
  scrollIndicator,
  scrollDot
};
const Hero = memo(() => {
  const { ref, isIntersecting } = useIntersectionObserver({ threshold: 0.1, triggerOnce: true });
  return /* @__PURE__ */ jsxs(
    "section",
    {
      ref,
      className: `${styles$1.hero} ${isIntersecting ? styles$1.visible : ""}`,
      "aria-label": "Hero section",
      id: "hero",
      children: [
        /* @__PURE__ */ jsxs("div", { className: styles$1.background, "aria-hidden": "true", children: [
          /* @__PURE__ */ jsx("div", { className: styles$1.gradientOrb1 }),
          /* @__PURE__ */ jsx("div", { className: styles$1.gradientOrb2 }),
          /* @__PURE__ */ jsx("div", { className: styles$1.gradientOrb3 }),
          /* @__PURE__ */ jsx("div", { className: styles$1.grid })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: styles$1.content, children: [
          /* @__PURE__ */ jsx("p", { className: styles$1.eyebrow, children: "Hello, I'm" }),
          /* @__PURE__ */ jsxs("h1", { className: styles$1.name, children: [
            /* @__PURE__ */ jsx("span", { className: styles$1.firstName, children: "Mitchell" }),
            /* @__PURE__ */ jsx("span", { className: styles$1.lastName, children: " Martinez" })
          ] }),
          /* @__PURE__ */ jsxs("p", { className: styles$1.tagline, children: [
            "Frontend Engineer.",
            " ",
            /* @__PURE__ */ jsx("span", { className: styles$1.taglineHighlight, children: "Building beautiful digital experiences." })
          ] }),
          /* @__PURE__ */ jsx("p", { className: styles$1.description, children: "Specializing in React, TypeScript, and modern web technologies to craft performant, accessible, and visually stunning applications." }),
          /* @__PURE__ */ jsxs("div", { className: styles$1.ctaGroup, role: "group", "aria-label": "Primary actions", children: [
            /* @__PURE__ */ jsx(
              "a",
              {
                href: "mailto:mitchell@mitchellmartinez.tech",
                className: styles$1.ctaPrimary,
                "aria-label": "Send Mitchell an email",
                children: "Get in Touch"
              }
            ),
            /* @__PURE__ */ jsxs(
              "a",
              {
                href: "https://linkedin.com/in/mitchellmartinezadl",
                className: styles$1.ctaSecondary,
                target: "_blank",
                rel: "noopener noreferrer",
                "aria-label": "Visit Mitchell's LinkedIn profile (opens in new tab)",
                children: [
                  "LinkedIn",
                  /* @__PURE__ */ jsx("svg", { width: "16", height: "16", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", "aria-hidden": "true", children: /* @__PURE__ */ jsx("path", { d: "M7 17L17 7M17 7H7M17 7v10" }) })
                ]
              }
            )
          ] }),
          /* @__PURE__ */ jsx("div", { className: styles$1.scrollIndicator, "aria-hidden": "true", children: /* @__PURE__ */ jsx("div", { className: styles$1.scrollDot }) })
        ] })
      ]
    }
  );
});
Hero.displayName = "Hero";
const footer = "_footer_ipyxl_1";
const container = "_container_ipyxl_11";
const content = "_content_ipyxl_19";
const brand = "_brand_ipyxl_33";
const logo = "_logo_ipyxl_39";
const tagline = "_tagline_ipyxl_49";
const links = "_links_ipyxl_54";
const link = "_link_ipyxl_54";
const bottom = "_bottom_ipyxl_77";
const copyright = "_copyright_ipyxl_92";
const madeWith = "_madeWith_ipyxl_97";
const styles = {
  footer,
  container,
  content,
  brand,
  logo,
  tagline,
  links,
  link,
  bottom,
  copyright,
  madeWith
};
const Footer = memo(() => {
  const currentYear = (/* @__PURE__ */ new Date()).getFullYear();
  return /* @__PURE__ */ jsx("footer", { className: styles.footer, role: "contentinfo", children: /* @__PURE__ */ jsxs("div", { className: styles.container, children: [
    /* @__PURE__ */ jsxs("div", { className: styles.content, children: [
      /* @__PURE__ */ jsxs("div", { className: styles.brand, children: [
        /* @__PURE__ */ jsx("span", { className: styles.logo, children: "MM" }),
        /* @__PURE__ */ jsx("p", { className: styles.tagline, children: "Building beautiful digital experiences." })
      ] }),
      /* @__PURE__ */ jsxs("nav", { className: styles.links, "aria-label": "Footer navigation", children: [
        /* @__PURE__ */ jsx(
          "a",
          {
            href: "mailto:mitchell@mitchellmartinez.tech",
            className: styles.link,
            "aria-label": "Email Mitchell",
            children: "Email"
          }
        ),
        /* @__PURE__ */ jsx(
          "a",
          {
            href: "https://linkedin.com/in/mitchellmartinezadl",
            className: styles.link,
            target: "_blank",
            rel: "noopener noreferrer",
            "aria-label": "Mitchell's LinkedIn profile (opens in new tab)",
            children: "LinkedIn"
          }
        ),
        /* @__PURE__ */ jsx(
          "a",
          {
            href: "https://budgeto.app",
            className: styles.link,
            target: "_blank",
            rel: "noopener noreferrer",
            "aria-label": "Budgeto app (opens in new tab)",
            children: "Budgeto"
          }
        ),
        /* @__PURE__ */ jsx(
          "a",
          {
            href: "https://fogsv.org.au",
            className: styles.link,
            target: "_blank",
            rel: "noopener noreferrer",
            "aria-label": "FOG SV website (opens in new tab)",
            children: "FOG SV"
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: styles.bottom, children: [
      /* @__PURE__ */ jsxs("p", { className: styles.copyright, children: [
        "© ",
        currentYear,
        " Mitchell Martinez. All rights reserved."
      ] }),
      /* @__PURE__ */ jsx("p", { className: styles.madeWith, children: "Made with React & TypeScript" })
    ] })
  ] }) });
});
Footer.displayName = "Footer";
const About = lazy(() => import("./About-By1WbBzP.js").then((m) => ({
  default: m.About
})));
const Skills = lazy(() => import("./Skills-Lcs2cjBp.js").then((m) => ({
  default: m.Skills
})));
const Projects = lazy(() => import("./Projects-BmxWyvRL.js").then((m) => ({
  default: m.Projects
})));
const Contact = lazy(() => import("./Contact-JjOv118Z.js").then((m) => ({
  default: m.Contact
})));
const meta = () => [{
  title: "Mitchell Martinez — Frontend Engineer"
}, {
  name: "description",
  content: "Frontend Engineer specializing in beautiful digital experiences. Building modern web applications with React, TypeScript, and cutting-edge technologies."
}, {
  name: "og:title",
  content: "Mitchell Martinez — Frontend Engineer"
}, {
  name: "og:description",
  content: "Frontend Engineer specializing in beautiful digital experiences."
}];
const SectionFallback = () => /* @__PURE__ */ jsx("div", {
  style: {
    minHeight: "50vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  children: /* @__PURE__ */ jsx("div", {
    style: {
      width: 40,
      height: 40,
      borderRadius: "50%",
      border: "3px solid #0071e3",
      borderTopColor: "transparent",
      animation: "spin 0.8s linear infinite"
    }
  })
});
const _index = UNSAFE_withComponentProps(function Index() {
  return /* @__PURE__ */ jsxs(Fragment, {
    children: [/* @__PURE__ */ jsx(Header, {}), /* @__PURE__ */ jsxs("main", {
      id: "main-content",
      children: [/* @__PURE__ */ jsx(Hero, {}), /* @__PURE__ */ jsx(Suspense, {
        fallback: /* @__PURE__ */ jsx(SectionFallback, {}),
        children: /* @__PURE__ */ jsx(About, {})
      }), /* @__PURE__ */ jsx(Suspense, {
        fallback: /* @__PURE__ */ jsx(SectionFallback, {}),
        children: /* @__PURE__ */ jsx(Skills, {})
      }), /* @__PURE__ */ jsx(Suspense, {
        fallback: /* @__PURE__ */ jsx(SectionFallback, {}),
        children: /* @__PURE__ */ jsx(Projects, {})
      }), /* @__PURE__ */ jsx(Suspense, {
        fallback: /* @__PURE__ */ jsx(SectionFallback, {}),
        children: /* @__PURE__ */ jsx(Contact, {})
      })]
    }), /* @__PURE__ */ jsx(Footer, {})]
  });
});
const route1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _index,
  meta
}, Symbol.toStringTag, { value: "Module" }));
const serverManifest = { "entry": { "module": "/assets/entry.client-Cppb41GL.js", "imports": ["/assets/chunk-LFPYN7LY-DDLDGQ8l.js"], "css": [] }, "routes": { "root": { "id": "root", "parentId": void 0, "path": "", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasDefaultExport": true, "hasErrorBoundary": false, "module": "/assets/root-DLws1HOs.js", "imports": ["/assets/chunk-LFPYN7LY-DDLDGQ8l.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/_index": { "id": "routes/_index", "parentId": "root", "path": void 0, "index": true, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasDefaultExport": true, "hasErrorBoundary": false, "module": "/assets/_index-BQOY7ZJQ.js", "imports": ["/assets/_index-zS8cXPx7.js", "/assets/chunk-LFPYN7LY-DDLDGQ8l.js"], "css": ["/assets/_index-CM9YXWlk.css"], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 } }, "url": "/assets/manifest-fb84e090.js", "version": "fb84e090", "sri": void 0 };
const assetsBuildDirectory = "build/client";
const basename = "/";
const future = { "unstable_optimizeDeps": false, "unstable_subResourceIntegrity": false, "unstable_trailingSlashAwareDataRequests": false, "unstable_previewServerPrerendering": false, "v8_middleware": false, "v8_splitRouteModules": false, "v8_viteEnvironmentApi": false };
const ssr = true;
const isSpaMode = false;
const prerender = [];
const routeDiscovery = { "mode": "lazy", "manifestPath": "/__manifest" };
const publicPath = "/";
const entry = { module: entryServer };
const routes = {
  "root": {
    id: "root",
    parentId: void 0,
    path: "",
    index: void 0,
    caseSensitive: void 0,
    module: route0
  },
  "routes/_index": {
    id: "routes/_index",
    parentId: "root",
    path: void 0,
    index: true,
    caseSensitive: void 0,
    module: route1
  }
};
const allowedActionOrigins = false;
export {
  allowedActionOrigins as a,
  assetsBuildDirectory as b,
  basename as c,
  publicPath as d,
  entry as e,
  future as f,
  routes as g,
  ssr as h,
  isSpaMode as i,
  prerender as p,
  routeDiscovery as r,
  serverManifest as s,
  useIntersectionObserver as u
};

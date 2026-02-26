import { jsx, jsxs } from "react/jsx-runtime";
import { memo, useMemo } from "react";
import { u as useIntersectionObserver } from "./server-build-KKbd9e6T.js";
import "isbot";
import "react-dom/server";
import "react-router";
import "node:stream";
const projects = "_projects_getg0_1";
const container = "_container_getg0_10";
const header = "_header_getg0_15";
const visible = "_visible_getg0_22";
const eyebrow = "_eyebrow_getg0_27";
const heading = "_heading_getg0_36";
const subheading = "_subheading_getg0_44";
const grid = "_grid_getg0_52";
const card = "_card_getg0_68";
const cardGlow = "_cardGlow_getg0_77";
const projectLink = "_projectLink_getg0_80";
const cardInner = "_cardInner_getg0_85";
const cardTop = "_cardTop_getg0_106";
const cardBottom = "_cardBottom_getg0_112";
const projectMeta = "_projectMeta_getg0_127";
const projectDot = "_projectDot_getg0_133";
const projectType = "_projectType_getg0_141";
const projectName = "_projectName_getg0_147";
const projectDescription = "_projectDescription_getg0_154";
const tags = "_tags_getg0_160";
const tag = "_tag_getg0_160";
const styles = {
  projects,
  container,
  header,
  visible,
  eyebrow,
  heading,
  subheading,
  grid,
  card,
  cardGlow,
  projectLink,
  cardInner,
  cardTop,
  cardBottom,
  projectMeta,
  projectDot,
  projectType,
  projectName,
  projectDescription,
  tags,
  tag
};
const projectsData = [
  {
    id: "budgeto",
    name: "Budgeto",
    url: "https://budgeto.app",
    description: "Personal finance management app",
    longDescription: "A beautifully designed personal finance management application that helps users track spending, set budgets, and achieve financial goals. Built with a focus on simplicity and delightful UX.",
    tags: ["React", "TypeScript", "Node.js", "Finance"],
    highlight: "budgeto.app"
  },
  {
    id: "fogsv",
    name: "FOG SV",
    url: "https://fogsv.org.au",
    description: "Friends of Grasslands community platform",
    longDescription: "A community platform for Friends of Grasslands in the Southern Valleys region of Australia. Supporting conservation efforts through modern web technology, events management, and community engagement features.",
    tags: ["React", "TypeScript", "Community", "Conservation"],
    highlight: "fogsv.org.au"
  }
];
const Projects = memo(() => {
  const { ref, isIntersecting } = useIntersectionObserver({ threshold: 0.05, triggerOnce: true });
  const projects2 = useMemo(() => projectsData, []);
  return /* @__PURE__ */ jsx(
    "section",
    {
      ref,
      className: `${styles.projects} ${isIntersecting ? styles.visible : ""}`,
      id: "projects",
      "aria-labelledby": "projects-heading",
      children: /* @__PURE__ */ jsxs("div", { className: styles.container, children: [
        /* @__PURE__ */ jsxs("div", { className: styles.header, children: [
          /* @__PURE__ */ jsx("p", { className: styles.eyebrow, children: "My Work" }),
          /* @__PURE__ */ jsx("h2", { id: "projects-heading", className: styles.heading, children: "Featured Projects" }),
          /* @__PURE__ */ jsx("p", { className: styles.subheading, children: "A selection of projects I've built — combining technical depth with thoughtful design." })
        ] }),
        /* @__PURE__ */ jsx("ul", { className: styles.grid, role: "list", "aria-label": "Featured projects", children: projects2.map((project, index) => /* @__PURE__ */ jsxs(
          "li",
          {
            className: styles.card,
            style: { transitionDelay: `${index * 0.15}s` },
            children: [
              /* @__PURE__ */ jsxs("div", { className: styles.cardInner, children: [
                /* @__PURE__ */ jsxs("div", { className: styles.cardTop, children: [
                  /* @__PURE__ */ jsxs("div", { className: styles.projectMeta, children: [
                    /* @__PURE__ */ jsx("div", { className: styles.projectDot, "aria-hidden": "true" }),
                    /* @__PURE__ */ jsx("span", { className: styles.projectType, children: project.description })
                  ] }),
                  /* @__PURE__ */ jsx("h3", { className: styles.projectName, children: project.name }),
                  /* @__PURE__ */ jsx("p", { className: styles.projectDescription, children: project.longDescription })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: styles.cardBottom, children: [
                  /* @__PURE__ */ jsx("ul", { className: styles.tags, role: "list", "aria-label": `Technologies used in ${project.name}`, children: project.tags.map((tag2) => /* @__PURE__ */ jsx("li", { className: styles.tag, children: tag2 }, tag2)) }),
                  /* @__PURE__ */ jsxs(
                    "a",
                    {
                      href: project.url,
                      className: styles.projectLink,
                      target: "_blank",
                      rel: "noopener noreferrer",
                      "aria-label": `Visit ${project.name} at ${project.highlight} (opens in new tab)`,
                      children: [
                        /* @__PURE__ */ jsx("span", { children: project.highlight }),
                        /* @__PURE__ */ jsx("svg", { width: "16", height: "16", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", "aria-hidden": "true", children: /* @__PURE__ */ jsx("path", { d: "M7 17L17 7M17 7H7M17 7v10" }) })
                      ]
                    }
                  )
                ] })
              ] }),
              /* @__PURE__ */ jsx("div", { className: styles.cardGlow, "aria-hidden": "true" })
            ]
          },
          project.id
        )) })
      ] })
    }
  );
});
Projects.displayName = "Projects";
export {
  Projects
};

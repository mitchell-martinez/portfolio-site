import { jsx, jsxs } from "react/jsx-runtime";
import { memo, useMemo } from "react";
import { u as useIntersectionObserver } from "./server-build-KKbd9e6T.js";
import "isbot";
import "react-dom/server";
import "react-router";
import "node:stream";
const skills = "_skills_hydcr_1";
const container = "_container_hydcr_11";
const header = "_header_hydcr_16";
const visible = "_visible_hydcr_23";
const eyebrow = "_eyebrow_hydcr_28";
const heading = "_heading_hydcr_37";
const subheading = "_subheading_hydcr_45";
const grid = "_grid_hydcr_53";
const card = "_card_hydcr_65";
const cardHeader = "_cardHeader_hydcr_84";
const icon = "_icon_hydcr_90";
const level = "_level_hydcr_95";
const expert = "_expert_hydcr_103";
const advanced = "_advanced_hydcr_108";
const intermediate = "_intermediate_hydcr_113";
const skillName = "_skillName_hydcr_119";
const skillDescription = "_skillDescription_hydcr_126";
const styles = {
  skills,
  container,
  header,
  visible,
  eyebrow,
  heading,
  subheading,
  grid,
  card,
  cardHeader,
  icon,
  level,
  expert,
  advanced,
  intermediate,
  skillName,
  skillDescription
};
const skillsData = [
  { name: "React", level: "expert", icon: "⚛️", description: "Hooks, Context, Suspense, Server Components" },
  { name: "TypeScript", level: "expert", icon: "📘", description: "Strict typing, generics, advanced patterns" },
  { name: "CSS / SCSS", level: "expert", icon: "🎨", description: "Animations, Grid, Flexbox, Design Systems" },
  { name: "Node.js", level: "advanced", icon: "🟢", description: "APIs, Express, serverless functions" },
  { name: "Vite", level: "advanced", icon: "⚡", description: "Build tooling, HMR, optimization" },
  { name: "Testing", level: "advanced", icon: "🧪", description: "Vitest, RTL, Playwright, TDD" },
  { name: "Performance", level: "advanced", icon: "🚀", description: "Core Web Vitals, lazy loading, caching" },
  { name: "Accessibility", level: "advanced", icon: "♿", description: "WCAG 2.1 AA, ARIA, keyboard nav" },
  { name: "Git / CI/CD", level: "intermediate", icon: "🔧", description: "GitHub Actions, branching strategies" }
];
const levelOrder = { expert: 0, advanced: 1, intermediate: 2 };
const Skills = memo(() => {
  const { ref, isIntersecting } = useIntersectionObserver({ threshold: 0.05, triggerOnce: true });
  const sortedSkills = useMemo(
    () => [...skillsData].sort((a, b) => levelOrder[a.level] - levelOrder[b.level]),
    []
  );
  return /* @__PURE__ */ jsx(
    "section",
    {
      ref,
      className: `${styles.skills} ${isIntersecting ? styles.visible : ""}`,
      id: "skills",
      "aria-labelledby": "skills-heading",
      children: /* @__PURE__ */ jsxs("div", { className: styles.container, children: [
        /* @__PURE__ */ jsxs("div", { className: styles.header, children: [
          /* @__PURE__ */ jsx("p", { className: styles.eyebrow, children: "What I Do" }),
          /* @__PURE__ */ jsx("h2", { id: "skills-heading", className: styles.heading, children: "Skills & Expertise" }),
          /* @__PURE__ */ jsx("p", { className: styles.subheading, children: "A curated toolkit of technologies I use to build exceptional digital products." })
        ] }),
        /* @__PURE__ */ jsx("ul", { className: styles.grid, role: "list", "aria-label": "Skills list", children: sortedSkills.map((skill, index) => /* @__PURE__ */ jsxs(
          "li",
          {
            className: styles.card,
            style: { animationDelay: `${index * 0.05}s` },
            children: [
              /* @__PURE__ */ jsxs("div", { className: styles.cardHeader, children: [
                /* @__PURE__ */ jsx("span", { className: styles.icon, "aria-hidden": "true", children: skill.icon }),
                /* @__PURE__ */ jsx("span", { className: `${styles.level} ${styles[skill.level]}`, children: skill.level })
              ] }),
              /* @__PURE__ */ jsx("h3", { className: styles.skillName, children: skill.name }),
              /* @__PURE__ */ jsx("p", { className: styles.skillDescription, children: skill.description })
            ]
          },
          skill.name
        )) })
      ] })
    }
  );
});
Skills.displayName = "Skills";
export {
  Skills
};

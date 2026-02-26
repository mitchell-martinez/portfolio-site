import { jsx, jsxs } from "react/jsx-runtime";
import { memo } from "react";
import { u as useIntersectionObserver } from "./server-build-KKbd9e6T.js";
import "isbot";
import "react-dom/server";
import "react-router";
import "node:stream";
const about = "_about_1uq39_1";
const visible = "_visible_1uq39_12";
const container = "_container_1uq39_17";
const grid = "_grid_1uq39_22";
const imageWrapper = "_imageWrapper_1uq39_34";
const avatar = "_avatar_1uq39_45";
const initials = "_initials_1uq39_64";
const avatarDecoration = "_avatarDecoration_1uq39_74";
const content = "_content_1uq39_83";
const eyebrow = "_eyebrow_1uq39_89";
const heading = "_heading_1uq39_97";
const body = "_body_1uq39_105";
const stats = "_stats_1uq39_116";
const stat = "_stat_1uq39_116";
const statNumber = "_statNumber_1uq39_130";
const statLabel = "_statLabel_1uq39_137";
const styles = {
  about,
  visible,
  container,
  grid,
  imageWrapper,
  avatar,
  initials,
  avatarDecoration,
  content,
  eyebrow,
  heading,
  body,
  stats,
  stat,
  statNumber,
  statLabel
};
const About = memo(() => {
  const { ref, isIntersecting } = useIntersectionObserver({ threshold: 0.1, triggerOnce: true });
  return /* @__PURE__ */ jsx(
    "section",
    {
      ref,
      className: `${styles.about} ${isIntersecting ? styles.visible : ""}`,
      id: "about",
      "aria-labelledby": "about-heading",
      children: /* @__PURE__ */ jsx("div", { className: styles.container, children: /* @__PURE__ */ jsxs("div", { className: styles.grid, children: [
        /* @__PURE__ */ jsxs("div", { className: styles.imageWrapper, children: [
          /* @__PURE__ */ jsx("div", { className: styles.avatar, "aria-label": "Mitchell Martinez initials avatar", role: "img", children: /* @__PURE__ */ jsx("span", { className: styles.initials, children: "MM" }) }),
          /* @__PURE__ */ jsx("div", { className: styles.avatarDecoration, "aria-hidden": "true" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: styles.content, children: [
          /* @__PURE__ */ jsx("p", { className: styles.eyebrow, children: "About Me" }),
          /* @__PURE__ */ jsx("h2", { id: "about-heading", className: styles.heading, children: "Crafting digital experiences that matter" }),
          /* @__PURE__ */ jsxs("div", { className: styles.body, children: [
            /* @__PURE__ */ jsx("p", { children: "I'm Mitchell, a frontend engineer with a passion for building beautiful, performant web applications that users love. I specialize in React and TypeScript, bringing together technical excellence and thoughtful design." }),
            /* @__PURE__ */ jsx("p", { children: "My approach combines clean architecture with meticulous attention to detail — from pixel-perfect animations to accessible, inclusive interfaces that work for everyone." }),
            /* @__PURE__ */ jsx("p", { children: "When I'm not pushing pixels, I'm exploring the intersection of design and engineering, building side projects, and staying at the cutting edge of frontend technology." })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: styles.stats, role: "list", "aria-label": "Career highlights", children: [
            /* @__PURE__ */ jsxs("div", { className: styles.stat, role: "listitem", children: [
              /* @__PURE__ */ jsx("span", { className: styles.statNumber, children: "5+" }),
              /* @__PURE__ */ jsx("span", { className: styles.statLabel, children: "Years Experience" })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: styles.stat, role: "listitem", children: [
              /* @__PURE__ */ jsx("span", { className: styles.statNumber, children: "20+" }),
              /* @__PURE__ */ jsx("span", { className: styles.statLabel, children: "Projects Built" })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: styles.stat, role: "listitem", children: [
              /* @__PURE__ */ jsx("span", { className: styles.statNumber, children: "∞" }),
              /* @__PURE__ */ jsx("span", { className: styles.statLabel, children: "Lines of Code" })
            ] })
          ] })
        ] })
      ] }) })
    }
  );
});
About.displayName = "About";
export {
  About
};

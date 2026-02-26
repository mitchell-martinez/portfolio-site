import { jsx, jsxs } from "react/jsx-runtime";
import { memo } from "react";
import { u as useIntersectionObserver } from "./server-build-KKbd9e6T.js";
import "isbot";
import "react-dom/server";
import "react-router";
import "node:stream";
const contact = "_contact_zb95h_1";
const visible = "_visible_zb95h_13";
const container = "_container_zb95h_18";
const card = "_card_zb95h_23";
const content = "_content_zb95h_42";
const eyebrow = "_eyebrow_zb95h_48";
const heading = "_heading_zb95h_57";
const headingAccent = "_headingAccent_zb95h_66";
const description = "_description_zb95h_73";
const ctaGroup = "_ctaGroup_zb95h_80";
const ctaPrimary = "_ctaPrimary_zb95h_86";
const ctaSecondary = "_ctaSecondary_zb95h_113";
const decoration = "_decoration_zb95h_141";
const decorCircle1 = "_decorCircle1_zb95h_148";
const decorCircle2 = "_decorCircle2_zb95h_159";
const styles = {
  contact,
  visible,
  container,
  card,
  content,
  eyebrow,
  heading,
  headingAccent,
  description,
  ctaGroup,
  ctaPrimary,
  ctaSecondary,
  decoration,
  decorCircle1,
  decorCircle2
};
const Contact = memo(() => {
  const { ref, isIntersecting } = useIntersectionObserver({ threshold: 0.1, triggerOnce: true });
  return /* @__PURE__ */ jsx(
    "section",
    {
      ref,
      className: `${styles.contact} ${isIntersecting ? styles.visible : ""}`,
      id: "contact",
      "aria-labelledby": "contact-heading",
      children: /* @__PURE__ */ jsx("div", { className: styles.container, children: /* @__PURE__ */ jsxs("div", { className: styles.card, children: [
        /* @__PURE__ */ jsxs("div", { className: styles.content, children: [
          /* @__PURE__ */ jsx("p", { className: styles.eyebrow, children: "Get In Touch" }),
          /* @__PURE__ */ jsxs("h2", { id: "contact-heading", className: styles.heading, children: [
            "Let's build something",
            " ",
            /* @__PURE__ */ jsx("span", { className: styles.headingAccent, children: "remarkable" })
          ] }),
          /* @__PURE__ */ jsx("p", { className: styles.description, children: "Whether you have a project in mind, want to collaborate, or just want to say hello — my inbox is always open. I'll get back to you as soon as possible." }),
          /* @__PURE__ */ jsxs("div", { className: styles.ctaGroup, role: "group", "aria-label": "Contact options", children: [
            /* @__PURE__ */ jsxs(
              "a",
              {
                href: "mailto:mitchell@mitchellmartinez.tech",
                className: styles.ctaPrimary,
                "aria-label": "Send Mitchell an email at mitchell@mitchellmartinez.tech",
                children: [
                  /* @__PURE__ */ jsxs("svg", { width: "20", height: "20", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", "aria-hidden": "true", children: [
                    /* @__PURE__ */ jsx("rect", { width: "20", height: "16", x: "2", y: "4", rx: "2" }),
                    /* @__PURE__ */ jsx("path", { d: "m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" })
                  ] }),
                  "Send an Email"
                ]
              }
            ),
            /* @__PURE__ */ jsxs(
              "a",
              {
                href: "https://linkedin.com/in/mitchellmartinezadl",
                className: styles.ctaSecondary,
                target: "_blank",
                rel: "noopener noreferrer",
                "aria-label": "Connect with Mitchell on LinkedIn (opens in new tab)",
                children: [
                  /* @__PURE__ */ jsxs("svg", { width: "20", height: "20", viewBox: "0 0 24 24", fill: "currentColor", "aria-hidden": "true", children: [
                    /* @__PURE__ */ jsx("path", { d: "M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z" }),
                    /* @__PURE__ */ jsx("circle", { cx: "4", cy: "4", r: "2" })
                  ] }),
                  "Connect on LinkedIn"
                ]
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: styles.decoration, "aria-hidden": "true", children: [
          /* @__PURE__ */ jsx("div", { className: styles.decorCircle1 }),
          /* @__PURE__ */ jsx("div", { className: styles.decorCircle2 })
        ] })
      ] }) })
    }
  );
});
Contact.displayName = "Contact";
export {
  Contact
};

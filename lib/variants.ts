/* Two presentations are live at once while the client chooses between them:
   the Vercel preview shows the redesigns, staging keeps the pictures. Chosen
   at build time — scripts/build-staging.sh sets the picture versions — so
   each page is still fully static.

   compare       "table": the HTML comparison table (default)
                 "image": Adam's comparison chart PNG
   featuresHero  "interactive": the layered, switchable product screens (default)
                 "render": the Top Pick / Best Choice three-monitor picture */
export const VARIANT = {
  compare: process.env.NEXT_PUBLIC_COMPARE === "image" ? "image" : "table",
  featuresHero: process.env.NEXT_PUBLIC_FEATURES_HERO === "render" ? "render" : "interactive",
} as const;

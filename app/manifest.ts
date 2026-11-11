import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Community Working Group on Health",
    short_name: "CWGH",
    description: "People's Health. Our Priority.",
    start_url: "/",
    display: "standalone",
    background_color: "#fbf7f0",
    theme_color: "#f47b20",
    icons: [{ src: "https://www.cwgh.co.zw/wp-content/uploads/2016/02/cropped-cwghlogo.png", sizes: "any", type: "image/png" }]
  };
}

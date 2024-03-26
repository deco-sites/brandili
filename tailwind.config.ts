import daisyui from "daisyui";

export default {
  plugins: [daisyui],
  daisyui: { themes: [], logs: false },
  content: ["./**/*.tsx"],
  theme: {
    container: { center: true },
    extend: {
      animation: {
        sliding: "sliding 30s linear infinite",
      },
      keyframes: {
        sliding: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
    },
    screens: {
      sm: "480px",
      md: "768px",
      lg: "976px",
      xl: "1440px",
      // Intervals
      "dv-full-desktop": { max: "1920px", min: "1600px" },
      "dv-lg-desktop": { max: "1599px", min: "1441px" },
      "dv-sm-desktop": { max: "1440px", min: "1367px" },
      "dv-lg-laptop": { max: "1366px", min: "1281px" },
      "dv-sm-laptop": { max: "1280px", min: "1200px" },
      "dv-full-tablet": { max: "1199px", min: "1078px" },
      "dv-lg-tablet": { max: "1077px", min: "1025px" },
      "dv-md-tablet": { max: "1024px", min: "821px" },
      "dv-sm-tablet": { max: "820px", min: "769px" },
      "dv-xsm-tablet": { max: "768px", min: "639px" },
      "dv-full-phone": { max: "638px", min: "431px" },
      "dv-lg-phone": { max: "430px", min: "391px" },
      "dv-md-phone": { max: "390px", min: "376px" },
      "dv-sm-phone": { max: "375px", min: "361px" },
      "dv-xsm-phone": { max: "360px", min: "321px" },

      // Max widths
      "full-desktop": { max: "1920px" },
      "lg-desktop": { max: "1599px" },
      "sm-desktop": { max: "1440px" },
      "lg-laptop": { max: "1366px" },
      "sm-laptop": { max: "1280px" },
      "full-tablet": { max: "1199px" },
      "lg-tablet": { max: "1077px" },
      "md-tablet": { max: "1024px" },
      "sm-tablet": { max: "820px" },
      "xsm-tablet": { max: "768px" },
      "full-phone": { max: "638px" },
      "lg-phone": { max: "430px" },
      "md-phone": { max: "390px" },
      "sm-phone": { max: "375px" },
      "xsm-phone": { max: "360px" },
      "xxsm-phone": { max: "320px" },
    },
    colors: {
      "bwhite": "#FFFFFF",
      "bred": "#F7313F",
      "bblue": "#OCB92E",
      "byellow": "#FFD72E",
      "bgold": "#CFC07F",
      "gray-1": "#2D2D2C",
    },
    fontFamily: {
      sans: ["Graphik", "sans-serif"],
      serif: ["Merriweather", "serif"],
    },
    boxShadow: {
      "blg": "0px 5px 15px 0px rgb(45 45 44 / 0.15)",
    },
  },
};

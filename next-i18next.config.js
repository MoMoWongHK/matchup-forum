module.exports = {
  i18n: {
    defaultLocale: "default",
    localeDetection: false,
    locales: ["en", "zh"],
    domains: [
      {
        domain: "example/zh",
        defaultLocale: "zh",
      },
      {
        domain: "example/en",
        defaultLocale: "en",
      },
    ],
  },
};

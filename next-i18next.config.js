module.exports = {
  i18n: {
    defaultLocale: "en",
    localeDetection: true,
    locales: ["en", "hk"],
    domains: [
      {
        domain: "example/hk",
        defaultLocale: "hk",
      },
      {
        domain: "example/en",
        defaultLocale: "en",
      },
    ],
  },
};

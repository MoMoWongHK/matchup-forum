module.exports = {
  i18n: {
    defaultLocale: "hk",
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

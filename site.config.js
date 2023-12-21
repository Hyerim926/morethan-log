const CONFIG = {
  // profile setting (required)
  profile: {
    name: "Hwang Hyerim",
    image: "/avatar.svg", // If you want to create your own notion avatar, check out https://notion-avatar.vercel.app
    role: "backend developer",
    bio: "Code my life.",
    email: "ekfrhsk96@gmail.com",
    linkedin: "hyerimhwang",
    github: "Hyerim926",
    instagram: "",
  },
  projects: [{
    name: "",
    href: "",
  },],
  // blog setting (required)
  blog: {
    title: "hey-log",
    description: "welcome to hey-log!",
  },

  // CONFIG configration (required)
  link: "https://hey-log.vercel.app/",
  since: 2023, // If leave this empty, current year will be used.
  lang: "ko-KR", // ['en-US', 'zh-CN', 'zh-HK', 'zh-TW', 'ja-JP', 'es-ES', 'ko-KR']
  ogImageGenerateURL: "https://og-image-korean.vercel.app", // The link to generate OG image, don't end with a slash

  // notion configuration (required)
  notionConfig: {
    pageId: process.env.NOTION_PAGE_ID || '79d76ca7cc2e482e8620ebea4a3bfdd1|48d9bf1cec71412bbf35e19c9a08b9de',
  },

  // plugin configuration (optional)
  googleAnalytics: {
    enable: true,
    config: {
      measurementId: process.env.NEXT_PUBLIC_GOOGLE_MEASUREMENT_ID || "",
    },
  },
  googleSearchConsole: {
    enable: true,
    config: {
      siteVerification: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || "",
    },
  },
  utterances: {
    enable: true,
    config: {
      repo: process.env.NEXT_PUBLIC_UTTERANCES_REPO || "",
      "issue-term": "og:title",
      label: "💬 Utterances",
    },
  },
  cusdis: {
    enable: false,
    config: {
      host: "https://cusdis.com",
      appid: "", // Embed Code -> data-app-id value
    },
  },
  isProd: process.env.VERCEL_ENV === "production", // distinguish between development and production environment (ref: https://vercel.com/docs/environment-variables#system-environment-variables)
  revalidateTime: 1000, // revalidate time for [slug], index
}

module.exports = { CONFIG }

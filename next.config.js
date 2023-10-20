const advancedHeaders = [
  {
    key: "X-DNS-Prefetch-Control",
    value: "on",
  },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  {
    key: "X-XSS-Protection",
    value: "1; mode=block",
  },
  {
    key: "X-Frame-Options",
    value: "SAMEORIGIN",
  },
  {
    key: "X-Content-Type-Options",
    value: "nosniff",
  },
  {
    key: "Referrer-Policy",
    value: "origin-when-cross-origin",
  },
  {
    key: 'Cache-Control',
    value: 'public, max-age=31536000, immutable',
  },
];

module.exports = {
  reactStrictMode: true,
  experimental: {
    scrollRestoration: true,
    optimizeCss: true,
  },
  transpilePackages: ["@mui/system", "@mui/material", "@mui/icons-material", "firebase", 'draft-js'],
  modularizeImports: {
    "@mui/material/?(((\\w*)?/?)*)": {
      transform: "@mui/material/{{ matches.[1] }}/{{member}}",
    },
    "@mui/icons-material/?(((\\w*)?/?)*)": {
      transform: "@mui/icons-material/{{ matches.[1] }}/{{member}}",
    },
  },
  productionBrowserSourceMaps: true,
  compress: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'firebasestorage.googleapis.com',
      },
      {
        protocol: 'https',
        hostname: 'i.stack.imgur.com',
        
      }
    ],
  },
  async headers() {
    return [
      {
        headers: advancedHeaders,
        source: '/:path*',
      },
      {
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],

        source: '/:path(.+\\.(?:ico|png|svg|jpg|jpeg|gif|webp|json|js|css|mp3|mp4|ttf|ttc|otf|woff|woff2)$)',
      },
    ]
  }
};

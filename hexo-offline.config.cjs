// offline config passed to workbox-build.
module.exports = {
  globPatterns: ['**/*.{js,html,css,png,jpg,gif,svg,webp,eot,ttf,woff,woff2}'],
  // 静态文件合集，如果你的站点使用了例如 webp 格式的文件，请将文件类型添加进去。
  globDirectory: 'public',
  swDest: 'public/service-worker.js',
  maximumFileSizeToCacheInBytes: 10485760, // 缓存的最大文件大小，以字节为单位。
  skipWaiting: true,
  clientsClaim: true
};

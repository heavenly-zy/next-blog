/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    // 强制使用 SWC 进行转换，文档：https://nextjs.org/docs/messages/swc-disabled
    forceSwcTransforms: true,
    // 消除控制台大量的警告
    serverComponentsExternalPackages: ["typeorm"]
  }
}

module.exports = nextConfig

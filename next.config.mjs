/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: "http",
            hostname: "192.168.100.40",
            port: "2000", // Port mavjud bo'lsa ko'rsating, aks holda bo'sh qoldiring
            pathname: "/**", // Rasm manzili uchun o'zgaruvchi pathni ko'rsatish
          },
        ],
      },
};

export default nextConfig;

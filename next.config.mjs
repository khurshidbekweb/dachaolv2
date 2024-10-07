/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: "https",
            hostname: "api.dachaol.uz",
            port: "", // Port mavjud bo'lsa ko'rsating, aks holda bo'sh qoldiring
            pathname: "/**", // Rasm manzili uchun o'zgaruvchi pathni ko'rsatish
          },
        ],
      },
};

export default nextConfig;

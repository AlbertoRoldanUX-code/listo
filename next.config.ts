import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      { source: "/empleos", destination: "/jobs", permanent: true },
      { source: "/empleos/:id", destination: "/jobs/:id", permanent: true },
      { source: "/perfil", destination: "/profile", permanent: true },
      {
        source: "/postulaciones",
        destination: "/applications",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;

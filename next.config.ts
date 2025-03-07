import type {NextConfig} from 'next';

const nextConfig: NextConfig = {
    images: {
        remotePatterns: [
            {hostname: '*.cloudfront.net'}
        ]
    }
};

export default nextConfig;

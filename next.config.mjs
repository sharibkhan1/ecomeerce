/** @type {import('next').NextConfig} */
const nextConfig = {
    images:{
        domains:[
            "res.cloudinary.com",
            'lh3.googleusercontent.com',
            "localhost"  // ✅ Add this line
        ]
    }
};

export default nextConfig;

// tailwind.config.js
export default {
    content: [
      "./index.html",
      "./src/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
      extend: {
        keyframes: {
          fadeInLeft: {
            '0%': { opacity: '0', transform: 'translateX(-50px)' },
            '100%': { opacity: '1', transform: 'translateX(0)' },
          },
          fadeInRight: {
            '0%': { opacity: '0', transform: 'translateX(50px)' },
            '100%': { opacity: '1', transform: 'translateX(0)' },
          },
          fadeInUp: {
            '0%': { opacity: '0', transform: 'translateY(20px)' },
            '100%': { opacity: '1', transform: 'translateY(0)' },
          },
        },
        animation: {
          fadeInLeft: 'fadeInLeft 0.8s ease-out forwards',
          fadeInRight: 'fadeInRight 0.8s ease-out forwards',
          fadeInUp: 'fadeInUp 0.8s ease-out forwards',
        },
      },
    },
    plugins: [],
  }
  
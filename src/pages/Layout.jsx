import React from "react";



export default function Layout({ children }) {

  return (
    <div className="min-h-screen bg-white text-gray-900">
      {children}

      <style>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .animate-fade-in {
          animation: fade-in 0.8s ease-out forwards;
        }
        
        .delay-150 {
          animation-delay: 150ms;
        }
        
        .delay-300 {
          animation-delay: 300ms;
        }
        
        /* Custom styling for Tab components */
        .data-[state=active]:bg-blue-600 {
          background-color: #2563eb;
        }
        
        .data-[state=active]:text-white {
          color: white;
        }
        
        /* Contador animado */
        @keyframes countUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .animate-count-up {
          animation: countUp 0.5s ease-out forwards;
        }
        
        /* Grid pattern */
        .bg-grid-white\\/\\[0\\.05\\] {
          background-image: url("data:image/svg+xml,%3Csvg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0H1V24H0V0Z' fill='white' fill-opacity='0.05'/%3E%3Cpath d='M0 0V1H24V0H0Z' fill='white' fill-opacity='0.05'/%3E%3C/svg%3E");
        }

        /* Optimize touch targets for mobile */
        @media (max-width: 768px) {
          button, a {
            min-height: 44px;
            min-width: 44px;
          }
          
          .touch-action-none {
            touch-action: none;
          }
        }
        
        /* Prevent text size adjustment on orientation change */
        html {
          -webkit-text-size-adjust: 100%;
        }
        
        /* Smooth scrolling for iOS */
        .smooth-scroll {
          -webkit-overflow-scrolling: touch;
        }
      `}</style>
    </div>
  );
}


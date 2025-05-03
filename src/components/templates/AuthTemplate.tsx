import React from "react";
import { Link } from "react-router-dom";
import { useDarkMode } from "../../hooks/useDarkMode";
import { Moon, Sun } from 'lucide-react';

type AuthTemplateProps = {
  title: string;
  text: string;
  children: React.ReactNode;
  type: "Sign-Up" | "Sign-In";
};

const footerLinks: Record<string, { text: string; link: string; linkText: string }> = {
  "Sign-In": { text: "Don't have an account?", link: "/register", linkText: "Sign Up" },
  "Sign-Up": { text: "Already have an account?", link: "/login", linkText: "Sign In" },
};

const AuthTemplate: React.FC<AuthTemplateProps> = ({ title, text, children, type }) => {
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  return (
    <div className={`flex justify-center items-center min-h-screen px-4
                  bg-gradient-to-br from-neutral-100 to-neutral-200
                  ${isDarkMode ? 'dark:from-neutral-900 dark:to-neutral-800' : ''}
                  transition-colors duration-300`}
    >
      <div className={`relative p-8 rounded-2xl shadow-lg w-full max-w-md animate-fade-in border
                    ${isDarkMode ? 'bg-black border-black' : 'bg-white border-neutral-200'}
                    transition-colors duration-300`}
      >
        <button className={`absolute right-4 top-4 p-2 rounded-full
                        ${isDarkMode ? 'bg-neutral-800 hover:bg-white' : 'bg-neutral-50 hover:bg-neutral-300'}
                        transition-colors duration-200`}
          onClick={toggleDarkMode}
          aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
        >
          {isDarkMode ? (
            <Sun className="h-5 w-5 text-yellow-400" />
          ) : (
            <Moon className="h-5 w-5 text-blue-600" />
          )}
        </button>

        <div className="mb-8 animate-slide-up">
          <h1 className="text-3xl font-bold mb-3 text-blue-600">
            {title}
          </h1>
          <p className={`${isDarkMode ? 'text-white' : 'text-black'}`}>
            {text}
          </p>
        </div>

        <div className="space-y-6 animate-slide-up delay-[0.1s]">
          {children}
        </div>

        {footerLinks[type] && (
          <div className={`mt-8 text-center text-sm ${isDarkMode ? 'text-white' : 'text-black'} animate-slide-up delay-[0.2s]`}>
            {footerLinks[type].text}{" "}
            <Link 
              to={footerLinks[type].link}
              className={`font-medium ${isDarkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-500'} transition-colors`}
            >
              {footerLinks[type].linkText}
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default AuthTemplate;
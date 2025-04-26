import React from "react";
import { Link } from "react-router-dom"; // client side-routing

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
  return (
    <div className="flex justify-center items-center bg-neutral-200 min-h-screen px-4">
      <div className="w-full max-w-md bg-neutral-100 p-8 rounded-2xl shadow-lg">
        <h1 className="text-3xl font-bold mb-4 text-blue-600">{ title }</h1>
        <p className="text-xl mb-6">{ text }</p>
        <div className="flex flex-col gap-4">{ children }</div>

        {footerLinks[ type ] && (
          <p className="text-center text-sm mt-5">
            {footerLinks[ type ].text}
            <Link to={footerLinks[ type ].link} className="font-bold text-blue-500 px-1">
              {footerLinks[ type ].linkText}
            </Link>
          </p>
        )}

      </div>
    </div>
  );
};

export default AuthTemplate;
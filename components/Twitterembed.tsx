"use client";

import { useEffect } from "react";

interface TwitterEmbedProps {
  description: string;
}

const TwitterEmbed: React.FC<TwitterEmbedProps> = ({ description }) => {
  useEffect(() => {
    // Load Twitter widget script
    const script = document.createElement("script");
    script.src = "https://platform.twitter.com/widgets.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div
      className="text-left mallu"
      dangerouslySetInnerHTML={{
        __html: description,
      }}
    />
  );
};

export default TwitterEmbed;

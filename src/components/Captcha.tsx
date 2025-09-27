import React, { useEffect } from "react";

type CaptchaProps = {
  onVerify: (token: string) => void;
};

const Captcha: React.FC<CaptchaProps> = ({ onVerify }) => {
  useEffect(() => {
    // Exemple : intégration Altcha
    // Remplace ceci par le vrai script Altcha
    const script = document.createElement("script");
    script.src = "https://captcha.altcha.com/embed.js";
    script.async = true;
    document.body.appendChild(script);

    // Dummy callback pour l’exemple
    window["AltchaCallback"] = (token: string) => {
      onVerify(token);
    };

    return () => {
      document.body.removeChild(script);
    };
  }, [onVerify]);

  return <div id="altcha-captcha"></div>;
};

export default Captcha;

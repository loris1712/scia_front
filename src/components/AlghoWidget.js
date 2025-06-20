"use client";

import { useEffect, useState } from "react";
import { useUser } from "@/context/UserContext";
import { usePathname } from "next/navigation";

export default function AlghoWidget() {
  const { user } = useUser();
  const pathname = usePathname();
  const [botId, setBotId] = useState(null);

  // Pagine dove il bot NON deve comparire
  const hiddenPaths = [
    "/login",
    "/login-pin",
    "/forgot-password",
    "/reset-password",
  ];

  const isHidden = hiddenPaths.includes(pathname);

  useEffect(() => {
    if (isHidden) return;

    const lang = typeof window !== "undefined" ? localStorage.getItem("language") : null;

    if (user && lang) {
      const bot =
        lang === "it"
          ? user.bot_id_ita
          : lang === "es"
          ? user.bot_id_esp
          : user.bot_id_ing;

      setBotId(bot);
    }
  }, [user, pathname]);

  useEffect(() => {
    if (isHidden || !botId) return;

    if (document.getElementById("algho-viewer-module")) return;

    const tag = document.createElement("algho-viewer");
    tag.setAttribute("bot-id", botId);
    tag.setAttribute("widget", "true");
    tag.setAttribute("audio", "true");
    tag.setAttribute("voice", "true");
    tag.setAttribute("open", "false");
    tag.setAttribute("z-index", "9999");
    document.body.appendChild(tag);

    const script = document.createElement("script");
    script.setAttribute("id", "algho-viewer-module");
    script.setAttribute("type", "text/javascript");
    script.setAttribute("defer", "defer");
    script.setAttribute("charset", "UTF-8");
    script.setAttribute("src", "https://virtualassistant.alghoncloud.com/algho-viewer.min.js");
    document.body.appendChild(script);
  }, [botId, isHidden]);

  return null;
}


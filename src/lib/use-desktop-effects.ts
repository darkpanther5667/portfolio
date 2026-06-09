"use client";

import { useEffect, useState } from "react";

const desktopQuery =
  "(min-width: 1024px) and (hover: hover) and (pointer: fine)";

export function useDesktopEffects() {
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(desktopQuery);
    const update = () => setIsDesktop(media.matches);

    update();
    media.addEventListener("change", update);

    return () => media.removeEventListener("change", update);
  }, []);

  return isDesktop;
}

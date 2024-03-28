import Image from "apps/website/components/Image.tsx";
import { navbarHeight } from "./constants.ts";
import { Logo } from "../../components/header/Header.tsx";

// Make it sure to render it on the server only. DO NOT render it on an island
function TopBar({
  logoBrandili,
  logoMundi,
  bgColor,
  device,
}: {
  logoBrandili?: Logo;
  logoMundi?: Logo;
  device: "mobile" | "desktop" | "tablet";
  bgColor?: "bg-bred" | "bg-bgold-2";
}) {
  // Mobile header
  if (device === "mobile") {
    return (
      <div
        class={`${
          bgColor ?? "bg-bred"
        } lg:hidden grid grid-cols-3 justify-between items-center w-full gap-2`}
      >
        {logoBrandili && (
          <a
            href="/"
            aria-label="Brandili logo"
            className={`block px-2.5 py-1.5 rounded-tl ${
              bgColor === "bg-bred" ? "bg-bwhite" : "opacity-50 "
            }`}
          >
            <Image
              src={logoBrandili.src}
              alt={logoBrandili.alt}
              width={logoBrandili.width || 100}
              height={logoBrandili.height || 13}
            />
          </a>
        )}
        {logoMundi && (
          <a
            href="/mundi"
            aria-label="Mundi logo"
            className={`block  px-2.5 py-1.5  ${
              bgColor === "bg-bgold-2" ? "bg-bwhite" : "opacity-50 "
            }`}
          >
            <Image
              src={logoMundi.src}
              alt={logoMundi.alt}
              width={logoMundi.width || 100}
              height={logoMundi.height || 13}
            />
          </a>
        )}
      </div>
    );
  }

  // Desktop header
  return (
    <div className={`${bgColor ?? "bg-bred"} flex items-center w-full`}>
      <div className="flex">
        {logoBrandili && (
          <a
            href="/"
            aria-label="Brandili logo"
            className={`block px-2.5 py-1.5 rounded-tl ${
              bgColor === "bg-bred" ? "bg-bwhite" : "opacity-50 "
            }`}
          >
            <Image
              src={logoBrandili.src}
              alt={logoBrandili.alt}
              width={logoBrandili.width || 100}
              height={logoBrandili.height || 13}
            />
          </a>
        )}
        {logoMundi && (
          <a
            href="/mundi"
            aria-label="Mundi logo"
            className={`block  px-2.5 py-1.5  ${
              bgColor === "bg-bgold-2" ? "bg-bwhite" : "opacity-50 "
            }`}
          >
            <Image
              src={logoMundi.src}
              alt={logoMundi.alt}
              width={logoMundi.width || 100}
              height={logoMundi.height || 13}
            />
          </a>
        )}
      </div>
    </div>
  );
}

export default TopBar;

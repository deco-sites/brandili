import { AppContext } from "../../apps/site.ts";
import type { Props as SearchbarProps } from "../../components/search/Searchbar.tsx";
import Drawers from "../../islands/Header/Drawers.tsx";
import { usePlatform } from "../../sdk/usePlatform.tsx";
import type { ImageWidget } from "apps/admin/widgets.ts";
import type { SiteNavigationElement } from "apps/commerce/types.ts";
import type { SectionProps } from "deco/types.ts";
import Navbar from "./Navbar.tsx ";
import TopBar from "./TopBar.tsx ";
import { headerHeight } from "./constants.ts";

export interface Logo {
  src: ImageWidget;
  alt: string;
  width?: number;
  height?: number;
}
export interface Buttons {
  hideSearchButton?: boolean;
  hideAccountButton?: boolean;
  hideWishlistButton?: boolean;
  hideCartButton?: boolean;
}

export interface Props {
  /** @title Top Bar */
  topBar?: {
    /** @title Logo Brandili */
    logoBrandili?: Logo;
    /** @title Logo Mundi */
    logoMundi?: Logo;
    /** @title Background Color */
    bgColor?: "bg-bred" | "bg-bgold-2";
  };

  /** @title Search Bar */
  searchbar?: Omit<SearchbarProps, "platform">;

  /**
   * @title Navigation items
   * @description Navigation items used both on mobile and desktop menus
   */
  navItems?: SiteNavigationElement[] | null;

  /** @title Logo */
  logo?: Logo;

  logoPosition?: "left" | "center";

  buttons?: Buttons;
}

function Header({
  searchbar,
  navItems = [
    {
      "@type": "SiteNavigationElement",
      name: "Feminino",
      url: "/",
    },
    {
      "@type": "SiteNavigationElement",
      name: "Masculino",
      url: "/",
    },
    {
      "@type": "SiteNavigationElement",
      name: "Sale",
      url: "/",
    },
    {
      "@type": "SiteNavigationElement",
      name: "Linktree",
      url: "/",
    },
  ],
  topBar = {
    logoMundi: {
      src: "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/2291/986b61d4-3847-4867-93c8-b550cb459cc7",
      width: 100,
      height: 16,
      alt: "Logo",
    },
    logoBrandili: {
      src: "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/2291/986b61d4-3847-4867-93c8-b550cb459cc7",
      width: 100,
      height: 16,
      alt: "Logo",
    },
    bgColor: "bg-bred",
  },
  logo = {
    src: "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/2291/986b61d4-3847-4867-93c8-b550cb459cc7",
    width: 100,
    height: 16,
    alt: "Logo",
  },
  logoPosition = "center",
  buttons,
  device,
}: SectionProps<typeof loader>) {
  const platform = usePlatform();
  const items = navItems ?? [];

  return (
    <>
      <header style={{ height: headerHeight }}>
        <div class="bg-base-100 fixed w-full z-50 rounded-b-2xl shadow-blg">
          <Drawers menu={{ items }} searchbar={searchbar} platform={platform} />
          <div>
            <TopBar
              device={device}
              logoBrandili={topBar?.logoBrandili}
              logoMundi={topBar?.logoMundi}
              bgColor={topBar?.bgColor}
            />
            <Navbar
              device={device}
              items={items}
              searchbar={searchbar && { ...searchbar, platform }}
              logo={logo}
              logoPosition={logoPosition}
              buttons={buttons}
            />
          </div>
        </div>
      </header>
    </>
  );
}

export const loader = (props: Props, _req: Request, ctx: AppContext) => {
  return { ...props, device: ctx.device };
};

export default Header;

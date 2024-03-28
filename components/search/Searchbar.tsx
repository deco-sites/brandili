/**
 * We use a custom route at /s?q= to perform the search. This component
 * redirects the user to /s?q={term} when the user either clicks on the
 * button or submits the form. Make sure this page exists in deco.cx/admin
 * of yout site. If not, create a new page on this route and add the appropriate
 * loader.
 *
 * Note that this is the most performatic way to perform a search, since
 * no JavaScript is shipped to the browser!
 */

import ProductCardSearchBar from "../../components/product/ProductCardSearchBar.tsx";
import Button from "../../components/ui/Button.tsx";
import Icon from "../../components/ui/Icon.tsx";
import Slider from "../../components/ui/Slider.tsx";
import { sendEvent } from "../../sdk/analytics.tsx";
import { useId } from "../../sdk/useId.ts";
import { useSuggestions } from "../../sdk/useSuggestions.ts";
import { useUI } from "../../sdk/useUI.ts";
import { Suggestion } from "apps/commerce/types.ts";
import { Resolved } from "deco/engine/core/resolver.ts";
import { useEffect, useRef, useState } from "preact/compat";
import type { Platform } from "../../apps/site.ts";

// Editable props
export interface Props {
  /**
   * @title Placeholder
   * @description Search bar default placeholder message
   * @default What are you looking for?
   */
  placeholder?: string;
  /**
   * @title Page path
   * @description When user clicks on the search button, navigate it to
   * @default /s
   */
  action?: string;
  /**
   * @title Term name
   * @description Querystring param used when navigating the user
   * @default q
   */
  name?: string;

  /**
   * @title Suggestions Integration
   * @todo: improve this typings ({query: string, count: number}) => Suggestions
   */
  loader: Resolved<Suggestion | null>;

  platform?: Platform;
}

function Searchbar({
  placeholder = "What are you looking for?",
  action = "/s",
  name = "q",
  loader,
  platform,
}: Props) {
  const id = useId();
  const { displaySearchPopup } = useUI();
  const searchInputRef = useRef<HTMLInputElement>(null);
  const [inputValue, setInputValue] = useState("");
  const { setQuery, payload, loading } = useSuggestions(loader);
  const { products = [], searches = [] } = payload.value ?? {};
  const hasProducts = Boolean(products.length);
  const hasTerms = Boolean(searches.length);
  console.log(
    "hasProducts",
    hasProducts,
    "hasTerms",
    hasTerms,
    "inputValue",
    inputValue,
    inputValue?.length,
  );

  useEffect(() => {
    if (!searchInputRef.current) {
      return;
    }
  }, []);

  return (
    <div
      class="w-full flex flex-col align items-center px-4 overflow-y-hidden"
      style={{ gridTemplateRows: "min-content auto" }}
    >
      <form id={id} action={action} class="join">
        <Button
          type="submit"
          class="join-item btn-square"
          aria-label="Search"
          for={id}
          tabIndex={-1}
        >
          {loading.value
            ? <span class="loading loading-spinner loading-xs" />
            : <Icon id="MagnifyingGlass" size={24} strokeWidth={0.01} />}
        </Button>
        <input
          ref={searchInputRef}
          id="search-input"
          class="input input-bordered join-item flex-grow"
          name={name}
          onInput={(e) => {
            const value = e.currentTarget.value;

            if (value) {
              sendEvent({
                name: "search",
                params: { search_term: value },
              });
            }

            setQuery(value);
            setInputValue(value);
          }}
          placeholder={placeholder}
          role="combobox"
          aria-controls="search-suggestion"
          aria-haspopup="listbox"
          aria-expanded={displaySearchPopup.value}
          autocomplete="off"
        />
        <Button
          type="button"
          class="join-item btn-ghost btn-square hidden sm:inline-flex"
          onClick={() => {
            const input = document.querySelector(
              "#search-input",
            ) as HTMLInputElement;
            input.value = "";
            document.querySelector("#intelSearch-list")?.classList.add(
              "hidden",
            );
          }}
          ariaLabel={displaySearchPopup.value ? "open search" : "search closed"}
        >
          <Icon id="XMark" size={20} strokeWidth={2} />
        </Button>
      </form>

      <div
        id="intelSearch-list"
        class={`overflow-y-scroll absolute top-24 ${
          (!hasProducts && !hasTerms && !inputValue.length) ||
            (!inputValue.length && hasProducts) ||
            (!inputValue.length && hasTerms)
            ? "hidden"
            : ""
        }`}
      >
        <div class="gap-4 grid grid-cols-1 sm:grid-rows-1 sm:grid-cols-1fr bg-bwhite">
          <div class="flex flex-col gap-6">
            <span class="font-medium text-xl" role="heading" aria-level={3}>
              Sugestões
            </span>
            <ul id="search-suggestion" class="flex flex-col gap-6">
              {searches.map(({ term }) => (
                <li>
                  <a href={`/s?q=${term}`} class="flex gap-4 items-center">
                    <span>
                      <Icon id="MagnifyingGlass" size={24} strokeWidth={0.01} />
                    </span>
                    <span dangerouslySetInnerHTML={{ __html: term }} />
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div class="flex flex-col pt-6 md:pt-0 gap-6 overflow-x-hidden">
            <span class="font-medium text-xl" role="heading" aria-level={3}>
              Produtos sugeridos
            </span>
            <Slider class="carousel flex-col">
              {products.map((product, index) => (
                <Slider.Item
                  index={index}
                  class="ml-2 min-w-[300px] max-w-[300px]"
                >
                  <ProductCardSearchBar
                    product={product}
                    index={index}
                    itemListName="Suggeestions"
                  />
                </Slider.Item>
              ))}
            </Slider>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Searchbar;

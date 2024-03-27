import Searchbar, {
  Props as SearchbarProps,
} from "../../components/search/Searchbar.tsx";

export interface Props {
  searchbar?: SearchbarProps;
}

function SearchbarModal({ searchbar }: Props) {
  if (!searchbar) {
    return null;
  }

  return (
    <div loading="lazy">
      <Searchbar {...searchbar} />
    </div>
  );
}

export default SearchbarModal;

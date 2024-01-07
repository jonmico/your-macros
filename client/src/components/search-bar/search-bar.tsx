import { FaSearch } from 'react-icons/fa';
import styles from './search-bar.module.css';

interface SearchBarProps {
  searchInput: string;
  setSearchInput: (value: string) => void;
  setSearchedFoodsError?: (value: string) => void;
}

export default function SearchBar(props: SearchBarProps) {
  function handleOnChange(value: string) {
    props.setSearchInput(value);

    if (props.setSearchedFoodsError) props.setSearchedFoodsError('');
  }
  return (
    <div className={styles.searchContainer}>
      <FaSearch />
      <input
        className={styles.searchInput}
        placeholder={'Search for foods'}
        type='text'
        value={props.searchInput}
        onChange={(evt) => {
          handleOnChange(evt.target.value);
        }}
      />
    </div>
  );
}

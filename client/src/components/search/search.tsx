import { useState } from 'react';
import { FaSearch } from 'react-icons/fa';

import { getFoodByText } from '../../services/food-api';

export default function Search() {
  const [searchInput, setSearchInput] = useState('');

  async function handleSubmit(evt: React.FormEvent<HTMLFormElement>) {
    evt.preventDefault();
    console.log(searchInput);

    let formattedSearchInput = searchInput;

    if (searchInput.includes(' ')) {
      formattedSearchInput = searchInput.split(' ').join('+');
    }

    console.log(formattedSearchInput);

    const data = await getFoodByText(formattedSearchInput);
    console.log(data);
  }

  return (
    <search>
      <form onSubmit={handleSubmit}>
        <input
          type='text'
          value={searchInput}
          onChange={(evt) => setSearchInput(evt.target.value)}
        />
      </form>
    </search>
  );
}

import { useState } from 'react';

import { getFoodByText } from '../../services/food-api';

export default function Search() {
  const [searchInput, setSearchInput] = useState('');

  async function handleSubmit(evt: React.FormEvent<HTMLFormElement>) {
    evt.preventDefault();
    console.log(searchInput);

    const data = await getFoodByText(searchInput);
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

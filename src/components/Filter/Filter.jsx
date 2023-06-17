import { Label, Input } from './Filter.styled';

import { useContacts } from 'redux/contacts/useContacts';

export const Filter = () => {
  const { filter, handleFilter } = useContacts();

  return (
    <Label>
      Filter contacts by name
      <Input type="text" onChange={handleFilter} value={filter} />
    </Label>
  );
};

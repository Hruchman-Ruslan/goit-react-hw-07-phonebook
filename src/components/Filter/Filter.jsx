import { useDispatch, useSelector } from 'react-redux';
import { Label, Input } from './Filter.styled';

import { filterContact } from 'redux/contacts/filterSlice';

import { selectFilter } from 'redux/contacts/selectors';

export const Filter = () => {
  const filter = useSelector(selectFilter);
  const dispatch = useDispatch();

  const handleFilter = e => {
    dispatch(filterContact(e.target.value));
  };

  return (
    <Label>
      Filter contacts by name
      <Input type="text" onChange={handleFilter} value={filter} />
    </Label>
  );
};

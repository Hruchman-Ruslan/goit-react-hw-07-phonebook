import PropTypes from 'prop-types';

import { List, Item, Text, Button } from './Contacts.styled';

import { useDispatch, useSelector } from 'react-redux';
import { deleteContact } from 'redux/contacts/operations';
import { selectContacts, selectFilter } from 'redux/contacts/selectors';

export const ContactList = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(selectContacts);
  const filter = useSelector(selectFilter);

  const handleDelete = id => dispatch(deleteContact(id));

  const getFilterName = () => {
    const normalisedFilter = filter.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalisedFilter)
    );
  };

  const list = getFilterName();

  return (
    <List>
      {list.map(({ id, name, phone }) => (
        <Item key={id}>
          <Text>
            {name}: {phone}
          </Text>
          <Button type="button" onClick={() => handleDelete(id)}>
            Delete
          </Button>
        </Item>
      ))}
    </List>
  );
};

ContactList.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    }).isRequired
  ),
};

import PropTypes from 'prop-types';

import { List, Item, Text, Button } from './Contacts.styled';

import { useContacts } from 'redux/contacts/useContacts';

export const ContactList = () => {
  const { handleDelete, contactsFilterName } = useContacts();

  return (
    <List>
      {contactsFilterName.map(({ id, name, phone }) => (
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
      phone: PropTypes.string.isRequired,
    }).isRequired
  ),
};

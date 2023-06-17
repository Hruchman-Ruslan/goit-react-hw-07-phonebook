//=============== Before ========================

// import { useDispatch, useSelector } from 'react-redux';
// import { selectContacts, selectFilter } from './selectors';

// import * as actions from './contactsSlice';

// export const useContacts = () => {
//   const dispath = useDispatch();
//   const contacts = useSelector(selectContacts);
//   const filter = useSelector(selectFilter);

//   const addContact = newContact => {
//     dispath(actions.addContact(newContact));
//   };
//   const deleteContact = id => {
//     dispath(actions.deleteContact(id));
//   };
//   const changeFilter = e => {
//     dispath(actions.changeFilter(e.target.value));
//   };

//   return { addContact, deleteContact, changeFilter, contacts, filter };
// };

//=============== After ========================

import { useDispatch, useSelector } from 'react-redux';
import {
  selectContacts,
  selectError,
  selectFilter,
  selectFilterName,
  selectIsLoading,
} from './selectors';
import { addContact, deleteContact } from './operations';
import { filterContact } from './filterSlice';

export const useContacts = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(selectContacts);
  const filter = useSelector(selectFilter);
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);

  const handleDelete = id => dispatch(deleteContact(id));

  const contactsFilterName = useSelector(selectFilterName);

  const handleFilter = e => {
    dispatch(filterContact(e.target.value));
  };

  const handleNotificationForm = values => {
    const existingContact = contacts.find(
      contact => contact.number === values.number
    );
    if (existingContact) {
      alert(
        `Sorry ${values.name}, this number is already registered, please enter another one.`
      );
      return;
    }
    dispatch(addContact({ ...values }));
  };

  return {
    contacts,
    filter,
    isLoading,
    error,
    dispatch,
    handleDelete,
    contactsFilterName,
    handleFilter,
    handleNotificationForm,
  };
};

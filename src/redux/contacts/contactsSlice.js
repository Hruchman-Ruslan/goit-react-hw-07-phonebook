//=============== Before ========================

// import { createSlice, nanoid } from '@reduxjs/toolkit';
// import persistReducer from 'redux-persist/es/persistReducer';
// import storage from 'redux-persist/lib/storage';

// import contactDefault from '../../data/contacts.json';

// const contactsSlice = createSlice({
//   name: 'contacts',
//   initialState: {
//     items: contactDefault,
//     filter: '',
//   },
//   reducers: {
//     addContact: {
//       reducer: (state, { payload }) => {
//         state.items.push(payload);
//       },
//       prepare: newContact => {
//         return {
//           payload: { ...newContact, id: nanoid() },
//         };
//       },
//     },
//     deleteContact: (state, { payload }) => {
//       state.items = state.items.filter(contactId => contactId.id !== payload);
//     },
//     changeFilter: (state, { payload }) => {
//       state.filter = payload;
//     },
//   },
// });

// const persistedContactsSlice = persistReducer(
//   { key: 'contacts', storage, whitelist: ['items'] },
//   contactsSlice.reducer
// );

// export const { addContact, deleteContact, changeFilter } =
//   contactsSlice.actions;

// export default persistedContactsSlice;

//=============== After ========================

// import { createSlice, isAnyOf } from '@reduxjs/toolkit';

// import { addContact, deleteContact, fetchContacts } from './operations';

// const contactsSlice = createSlice({
//   name: 'contacts',
//   initialState: {
//     items: [],
//     isLoading: false,
//     error: null,
//   },
//   extraReducers: builder =>
//     builder
//       //=============== fulfilled ========================
//       .addCase(fetchContacts.fulfilled, (state, { payload }) => {
//         state.items = payload;
//       })
//       .addCase(addContact.fulfilled, (state, { payload }) => {
//         state.items.push(payload);
//       })
//       .addCase(deleteContact.fulfilled, (state, { payload }) => {
//         const index = state.items.findIndex(
//           contact => contact.id === payload.id
//         );
//         state.items.splice(index, 1);
//       })
//       .addMatcher(
//         isAnyOf(
//           fetchContacts.fulfilled,
//           addContact.fulfilled,
//           deleteContact.fulfilled
//         ),
//         state => {
//           state.isLoading = false;
//           state.error = null;
//         }
//       )
//       //=============== pending ========================
//       .addMatcher(
//         isAnyOf(
//           fetchContacts.pending,
//           addContact.pending,
//           deleteContact.pending
//         ),
//         state => {
//           state.isLoading = true;
//         }
//       )
//       //=============== rejected ========================
//       .addMatcher(
//         isAnyOf(
//           fetchContacts.rejected,
//           addContact.rejected,
//           deleteContact.rejected
//         ),
//         (state, { payload }) => {
//           state.isLoading = false;
//           state.error = payload;
//         }
//       ),
// });

// export const contactReducer = contactsSlice.reducer;

//=============== After javascript 😈 ninja style ========================

import { createSlice, isAnyOf } from '@reduxjs/toolkit';
import { addContact, fetchContacts, deleteContact } from './operations';

const ninjaActions = [addContact, deleteContact, fetchContacts];

const contactsSlice = createSlice({
  name: 'contacts',
  initialState: {
    items: [],
    isLoading: false,
    error: null,
  },
  extraReducers: builder =>
    builder
      //=============== fulfilled ========================
      .addCase(fetchContacts.fulfilled, (state, { payload }) => {
        state.items = payload;
      })
      .addCase(addContact.fulfilled, (state, { payload }) => {
        state.items.push(payload);
      })
      .addCase(deleteContact.fulfilled, (state, { payload }) => {
        const index = state.items.findIndex(
          contact => contact.id === payload.id
        );
        state.items.splice(index, 1);
      })
      .addMatcher(
        isAnyOf(...ninjaActions.map(action => action.fulfilled)),
        state => {
          state.isLoading = false;
          state.error = null;
        }
      )
      //=============== pending ========================
      .addMatcher(
        isAnyOf(...ninjaActions.map(action => action.pending)),
        state => {
          state.isLoading = true;
        }
      )
      //=============== rejected ========================
      .addMatcher(
        isAnyOf(...ninjaActions.map(action => action.rejected)),
        (state, { payload }) => {
          state.isLoading = false;
          state.error = payload;
        }
      ),
});

export const contactReducer = contactsSlice.reducer;

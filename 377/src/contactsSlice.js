// contactsSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchContacts = createAsyncThunk(
  'contacts/fetchContacts',
  async () => {
    const response = await fetch('https://jsonplaceholder.typicode.com/users');
    const data = await response.json();
    return data;
  }
);

const contactsSlice = createSlice({
  name: 'contacts',
  initialState: { entities: [], loading: 'idle' },
  reducers: {
    addContact: (state, action) => {
      state.entities.push(action.payload);
    },
    deleteContact: (state, action) => {
      const id = action.payload;
      state.entities = state.entities.filter((contact) => contact.id !== id);
    },
    editContact: (state, action) => {
      const editedContact = action.payload;
      const index = state.entities.findIndex((contact) => contact.id === editedContact.id);
      if (index >= 0) {
        state.entities[index] = editedContact;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchContacts.pending, (state) => {
        state.loading = 'loading';
      })
      .addCase(fetchContacts.fulfilled, (state, action) => {
        state.entities = action.payload;
        state.loading = 'loaded';
      })
      .addCase(fetchContacts.rejected, (state, action) => {
        state.loading = 'error';
        state.error = action.error.message;
      });
  },
});

export const { addContact, deleteContact, editContact } = contactsSlice.actions;
export default contactsSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";
import {
  fetchContacts,
  addContact,
  delContact,
  toggleCompleted,
} from "./operations";

const handlePending = (state) => {
  state.isLoading = true;
};

const handleRejected = (state, action) => {
  state.isLoading = false;
  state.error = action.payload;
};

export const contactsSlice = createSlice({
  name: "contacts",
  initialState: {
    items: [],
    isLoading: false,
    error: null,
    filter: "",
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchContacts.pending, handlePending)
      .addCase(fetchContacts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.items = action.payload;
      })
      .addCase(fetchContacts.rejected, handleRejected)
      .addCase(addContact.pending, handlePending)
      .addCase(addContact.fulfilled, (state, action) => {
        console.log("add", state, action);
        state.isLoading = false;
        state.error = null;
        state.items.push(action.payload);
      })
      .addCase(addContact.rejected, handleRejected)
      .addCase(delContact.pending, handlePending)
      .addCase(delContact.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        const index = state.items.findIndex(
          (contact) => contact.id === action.payload.id,
        );
        state.items.splice(index, 1);
      })
      .addCase(delContact.rejected, handleRejected)
      .addCase(toggleCompleted.pending, handlePending)
      .addCase(toggleCompleted.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        const index = state.items.findIndex(
          (contact) => contact.id === action.payload.id,
        );
        state.items.splice(index, 1, action.payload);
      })
      .addCase(toggleCompleted.rejected, handleRejected);
  },
});

export const contactsReducer = contactsSlice.reducer;

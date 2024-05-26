// @ts-nocheck
import { createReducer } from '@reduxjs/toolkit';
import { ContactGetAllMessage, ContactGetAllUserData } from './contactThunk';
import { updateNewMessage, updateSelectedContactID } from './contactAction';

const initialState = {
  msgData: [],
  dataLoadingState: "idle",
  error: null,
  allContactData: [],
  contactData: [],
  selectedContactID: ''
};

const contactStore = createReducer(initialState, (builder) => {
  builder
    .addCase(updateSelectedContactID, (state, action) => {
      state.selectedContactID = action.payload;
    })
    .addCase(updateNewMessage, (state, action) => {
      state.msgData.push(action.payload);

      const uniqueContacts = UpdateContactData(state.msgData);

      state.contactData = [...uniqueContacts];

      console.log(state.contactData);
    })

    .addCase(ContactGetAllMessage.pending, (state, action) => {
      state.dataLoadingState = "loading";
    })
    .addCase(ContactGetAllMessage.fulfilled, (state, action) => {
      state.dataLoadingState = "succeeded";
      state.msgData = action.payload.data;
      
      const uniqueContacts = UpdateContactData(state.msgData);

      state.contactData = [...uniqueContacts];

      console.log(state.contactData);
    })
    .addCase(ContactGetAllMessage.rejected, (state, action) => {
      state.dataLoadingState = "failed";
      state.error = action.error.message;
    })

    .addCase(ContactGetAllUserData.pending, (state, action) => {
      state.dataLoadingState = "loading";
    })
    .addCase(ContactGetAllUserData.fulfilled, (state, action) => {
      state.dataLoadingState = "succeeded";
      state.allContactData = action.payload.data;
    })
    .addCase(ContactGetAllUserData.rejected, (state, action) => {
      state.dataLoadingState = "failed";
      state.error = action.error.message;
    })
});

const UpdateContactData = (msgData) => {
  const uniqueContacts = [];

  msgData?.forEach(msg => {
    const { senderID, recvID, sendTime, content } = msg;
    
    // Xác định cặp unique ID
    const pairID = [senderID, recvID].sort().join('-');
    const existingContactIndex = uniqueContacts.findIndex(contact => contact.pairID === pairID);

    if (existingContactIndex > -1) {
      // Nếu đã tồn tại cặp này, kiểm tra và cập nhật lastestMsg nếu cần
      if (new Date(uniqueContacts[existingContactIndex].sendTime) < new Date(sendTime)) {
        uniqueContacts[existingContactIndex].lastestMsg = content;
        uniqueContacts[existingContactIndex].sendTime = sendTime;
      }
    } else {
      // Nếu chưa tồn tại cặp này, thêm mới vào uniqueContacts
      uniqueContacts.push({ pairID, senderID, recvID, lastestMsg: content, sendTime });
    }
  });

  // Sắp xếp uniqueContacts theo sendTime giảm dần
  uniqueContacts.sort((a, b) => new Date(b.sendTime) - new Date(a.sendTime));

  return uniqueContacts;
};


export default contactStore;

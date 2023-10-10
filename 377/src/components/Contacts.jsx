// Contacts.js
import React, { useEffect, useState } from 'react';
import Modal from "./Modal";
import { useAppDispatch, useAppSelector } from '../hooks';
import { deleteContact, fetchContacts } from '../contactsSlice';
import { useNavigate } from 'react-router-dom';
import Nav from './Nav';

const Contacts = () => {
  const dispatch = useAppDispatch();
  const contacts = useAppSelector((state) => state.contacts.entities);
  const loading = useAppSelector((state) => state.contacts.loading);
  const error = useAppSelector((state) => state.contacts.error);
  const [showModal, setShowModal] = useState(false);
  const [selectedContact, setSelectedContact] = useState(null);
  const navigate = useNavigate();



  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  const openModal = (id) => {
    console.log(contacts)
    setSelectedContact(id);
    setShowModal(true);
  };


  const navigateToEdit = (id) => {
    navigate(`/edit/${id}`);
  };


  const handleDeleteContact = (id) => {
    dispatch(deleteContact(id));
  };

  const closeModal = () => setShowModal(false);

  const confirmDelete = () => {
    if(selectedContact !== null) {
      dispatch(deleteContact(selectedContact)); 
      setSelectedContact(null);
      closeModal();
    }
  };

  if (loading === 'pending') {
    return <p>Loading contacts...</p>;
  }

  if (error) {
    return <p>There was an error loading your contacts: {error}</p>;
  }

  return (
    <div>
      <Nav />
      <Modal show={showModal} onClose={closeModal} onConfirm={confirmDelete} />
      <h1>Contacts</h1>
      {contacts.map((contact) => (
        <div key={contact.id}>
          <p>{contact.name}</p>
          <p>{contact.username}</p>
          <p>{contact.phone}</p>
          <button onClick={() => openModal(contact.id)}>Delete</button>
          <button onClick={() => navigateToEdit(contact.id)}>Редагувати</button>
        </div>
      ))}
    </div>
  );
};

export default Contacts;

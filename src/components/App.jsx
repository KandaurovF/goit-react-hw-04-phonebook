import React, { useState, useEffect } from 'react';
import ContactForm from './ContactForm';
import ContactList from './ContactList';
import Filter from './Filter';
import IconButton from './IconButton';
import Modal from './Modal';
import { ImUserPlus } from 'react-icons/im';
import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

export const App = () => {
  const [contacts, setContacts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    const contacts = localStorage.getItem('contacts');
    const parsedContacts = JSON.parse(contacts) ?? [];

    if (parsedContacts) {
      setContacts(parsedContacts);
    }
  }, []);

  useEffect(() => {
    if (contacts === []) {
      return;
    }

    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const addContact = formData => {
    const { name } = formData;
    const existingContact = contacts.find(
      contact => contact.name.toLowerCase() === name.toLowerCase()
    );

    if (existingContact) {
      // alert('This contact already exists!');
      toast.warning('This contact already exists!');
    } else {
      setContacts(contacts => [formData, ...contacts]);
      toggleModal();
    }
  };

  const handleSearch = event => {
    const { value } = event.target;
    setFilter(value);
  };

  const deleteContact = contactId => {
    setContacts(contacts.filter(contact => contact.id !== contactId));
  };

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className="wrapper">
      <h1 className="main__heading">Phonebook</h1>
      <div className="container">
        {showModal && (
          <Modal onClose={toggleModal}>
            <ContactForm onFormSubmit={addContact} />
          </Modal>
        )}

        <div className="contacts__header">
          <h2 className="secondary__heading">Contacts</h2>
          <IconButton onClick={toggleModal} aria-label="Add contact">
            <ImUserPlus size={20} fill="#000" />
          </IconButton>
        </div>

        <Filter value={filter} onChange={handleSearch} contacts={contacts} />

        {filter === '' ? (
          <ContactList contacts={contacts} onDeleteContact={deleteContact} />
        ) : (
          <ContactList
            contacts={filteredContacts}
            onDeleteContact={deleteContact}
          />
        )}
        <ToastContainer autoClose={3000} />
      </div>
    </div>
  );
};

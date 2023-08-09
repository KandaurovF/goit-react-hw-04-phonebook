import { Component } from 'react';
import ContactForm from './ContactForm';
import ContactList from './ContactList';
import Filter from './Filter';
import IconButton from './IconButton';
import Modal from './Modal';

import { ImUserPlus } from 'react-icons/im';
export class App extends Component {
  state = {
    contacts: [
      // { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      // { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      // { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      // { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    showModal: false,
    filter: '',
  };

  componentDidMount() {
    const contacts = localStorage.getItem('contacts');
    const parsedContacts = JSON.parse(contacts);

    if (parsedContacts) {
      this.setState({ contacts: parsedContacts });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.contacts !== prevState.contats) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

  addContact = formData => {
    const { name } = formData;
    const existingContact = this.state.contacts.find(
      contact => contact.name.toLowerCase() === name.toLowerCase()
    );

    if (existingContact) {
      alert('This contact already exists!');
    } else {
      this.setState(prevState => ({
        contacts: [formData, ...prevState.contacts],
      }));
      this.toggleModal();
    }
  };

  handleSearch = event => {
    const { value } = event.target;
    this.setState({ filter: value });
  };

  deleteContact = contactId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== contactId),
    }));
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({ showModal: !showModal }));
  };

  render() {
    const { contacts, filter, showModal } = this.state;

    const filteredContacts = contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );

    return (
      <div className="wrapper">
        <h1 className="main__heading">Phonebook</h1>
        <div className="container">
          {showModal && (
            <Modal onClose={this.toggleModal}>
              <ContactForm onFormSubmit={this.addContact} />
            </Modal>
          )}

          <div className="contacts__header">
            <h2 className="secondary__heading">Contacts</h2>
            <IconButton onClick={this.toggleModal}>
              <ImUserPlus size={20} fill="#000" />
            </IconButton>
          </div>

          <Filter
            value={filter}
            onChange={this.handleSearch}
            contacts={contacts}
          />

          {filter === '' ? (
            <ContactList
              contacts={contacts}
              onDeleteContact={this.deleteContact}
            />
          ) : (
            <ContactList
              contacts={filteredContacts}
              onDeleteContact={this.deleteContact}
            />
          )}
        </div>
      </div>
    );
  }
}

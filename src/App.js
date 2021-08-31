import './App.css';
import { useState } from 'react';
import useLocalStorage from '../src/hooks/useLocalStorage';
import shortid from 'shortid';
// import toast, { Toaster } from 'react-hot-toast';

import Container from './components/Container/';
import ContactForm from './components/ContactForm/ContactForm';
import Filter from './components/Filter';
import ContactList from './components/ContactsList';

import defaultContacts from './db/contacts.json';

export default function App() {
  const [contacts, setContacts] = useLocalStorage('contacts', defaultContacts);
  const [filter, setFilter] = useState('');

  function addContact({ name, phone }) {
    const contact = {
      id: shortid.generate(),
      name,
      phone,
    };

    contacts.find(
      contact => contact.name.toLowerCase() === name.toLowerCase(),
    ) ||
    contacts.find(
      contact => contact.phone.toLowerCase() === phone.toLowerCase(),
    )
      ? alert(`${name} or ${phone} is already added.`)
      : setContacts(prevContacts => [contact, ...prevContacts]);
  }

  function deleteContact(contactId) {
    setContacts(() => contacts.filter(contact => contact.id !== contactId));
  }

  function changeFilter(event) {
    setFilter(event.currentTarget.value);
  }

  function getVisibleContacts() {
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase()),
    );
  }

  return (
    <Container>
      <h1 className="title">My phonebook</h1>
      <ContactForm onSubmit={addContact} />

      <Filter value={filter} onChange={changeFilter} />

      <h2 className="subtitle">My contacts:</h2>
      <ContactList
        contacts={getVisibleContacts()}
        onDeleteContact={deleteContact}
      />
    </Container>
  );
}

// class App extends Component {
//   state = {
//     contacts: defaultContacts,
//     name: '',
//     filter: '',
//   };

//   addContact = ({ name, number }) => {
//     const contact = {
//       id: shortid.generate(),
//       name,
//       number,
//     };

//     const { contacts } = this.state;
//     contacts.find(
//       ({ name }) => name.toLowerCase() === contact.name.toLowerCase(),
//     )
//       ? toast.error(`${name} is already added.`)
//       : this.setState(({ contacts }) => ({ contacts: [...contacts, contact] }));
//   };

//   deleteContact = contactId => {
//     this.setState(prevState => ({
//       contacts: prevState.contacts.filter(contact => contact.id !== contactId),
//     }));
//   };

//   changeInput = e => {
//     this.setState({ filter: e.target.value });
//   };

//   getVisibleContacts = () => {
//     const { filter, contacts } = this.state;
//     const normalizedFilter = filter.toLowerCase();

//     return contacts.filter(contact =>
//       contact.name.toLowerCase().includes(normalizedFilter),
//     );
//   };

//   componentDidMount() {
//     const contacts = localStorage.getItem('contacts');
//     const parsedContacts = JSON.parse(contacts);

//     if (parsedContacts) {
//       this.setState({ contacts: parsedContacts });
//     }

// if (contacts === '[]') {
//   this.setState({ contacts: defaultContacts });
// }
//   }

//   componentDidUpdate(_, prevState) {
//     if (prevState.contacts !== this.setState.contacts) {
//       localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
//     }
//   }

//   render() {
//     const { filter } = this.state;

//     return (
//       <>
//         <div>
//           <h2>My phonebook</h2>
//           <Toaster />

//           <ContactForm onSubmit={this.addContact} />
//           <Filter value={filter} onChange={this.changeInput} />

//           <h2>My contacts:</h2>

//           <ContactList
//             contacts={this.getVisibleContacts()}
//             onDelete={this.deleteContact}
//           />
//         </div>
//       </>
//     );
//   }
// }

// export default App;

import React from 'react';
import s from './ContactsList.module.css';

const ContactsList = ({ contacts, onDeleteContact }) => {
  return (
    <ul className={s.contactsList}>
      {contacts.map(({ id, name, phone }) => (
        <li key={id} className={s.item}>
          <span className={s.name}>{name}</span>: {phone}
          <button
            type="button"
            className={s.closeBtn}
            onClick={() => onDeleteContact(id)}
          >
            X
          </button>
        </li>
      ))}
    </ul>
  );
};

export default ContactsList;

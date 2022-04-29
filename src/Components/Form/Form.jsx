import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { nanoid } from 'nanoid';
import toast from 'react-hot-toast';

import { setContactsAction, getContactsArrive } from '../../Redux/contactsSlice';

export default function Form() {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const dispatch = useDispatch();

  const handleChange = evt => {
    switch (evt.target.name) {
      case 'name':
        setName(evt.target.value);
        break;
      case 'number':
        setNumber(evt.target.value);
        break;

      default:
        return;
    }
  };

  const handleSubmit = evt => {
    evt.preventDefault();
    formSubmitHandler({ name, number });
    resetState();
  };

  const contacts = useSelector(getContactsArrive);
  // add new contact
  const formSubmitHandler = ({ name, number }) => {
    // checking name for matches
    const normalizedName = name.toLowerCase();
    const isFoundName = contacts.some(
      contact => contact.name.toLowerCase() === normalizedName
    );
    // if already exist - show message
    if (isFoundName) {
      toast.error(`${name} is already in contacts!`);
      return;
    }
    // if not found, add new contact
    const newData = { id: nanoid(5), name, number };
    dispatch(setContactsAction(newData));
    toast.success('Successfully added!');
  };

  const resetState = () => {
    setName('');
    setNumber('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        <p>Name</p>
        <input
          type="text"
          name="name"
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          value={name}
          onChange={handleChange}
          required
        />
      </label>
      <label>
        <p>Number</p>
        <input
          type="tel"
          name="number"
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          value={number}
          onChange={handleChange}
          required
        />
      </label>
      <p>
        <button type="submit">Add contact</button>
      </p>
    </form>
  );
}
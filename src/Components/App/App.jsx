import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import toast, { Toaster } from 'react-hot-toast';

import Form from '../Form';
import Contacts from '../Contacts';
import Filter from '../Filter';

import { getContactsArrive } from '../../Redux/contactsSlice';


function App() {
  const contacts = useSelector(getContactsArrive);

  useEffect(() => {
    if (contacts.length === 0) {
      toast.error('Phonebook is empty!');
    }
  }, [contacts]);

  return (
    <main>
      <Toaster
        toastOptions={{
          style: {
            border: '1px solid #713200',
            padding: '16px',
          },
        }}
      />
      <h1>Phonebook</h1>
      <Form />
      <h2>Contacts</h2>
      <Filter />
      <Contacts />
    </main>
  );
}

export default App;
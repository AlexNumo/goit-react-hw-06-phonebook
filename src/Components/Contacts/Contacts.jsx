import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import { delContactsAction, getContactsArrive } from '../../Redux/contactsSlice';
import { getFilterValue } from '../../Redux/filterSlice';

export default function Contacts() {
  const contacts = useSelector(getContactsArrive);
  const filter = useSelector(getFilterValue);
  const dispatch = useDispatch();

  // for filter
  const normalizedFilter = filter.toLowerCase();
  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(normalizedFilter)
  );

  const deleteContact = id => {
    dispatch(delContactsAction(id));
    toast.success('Successfully deleted!');
  };

  return (
    <ul>
      {filteredContacts.map(({ name, number, id }) => (
        <li key={id}>
          <p>
            <span>{name}: </span>
            {number}
          </p>
          <button onClick={() => deleteContact(id)}>delete</button>
        </li>
      ))}
    </ul>
  );
}
import React, { useContext } from 'react';
import ContactContext from '../../context/contact/contactContext';

const ContactItem = ({ contact }) => {
  const contactContext = useContext(ContactContext);
  const { setCurrent, clearCurrent, deleteContact } = contactContext;

  const { id, name, email, phone, type } = contact;

  const onEdit = () => {
    setCurrent(contact);
  };

  const onDelete = () => {
    deleteContact(id);
    clearCurrent();
  };

  return (
    <div className='card bg-light'>
      <h3 className='text-primary text-left'>
        {name}{' '}
        <span
          style={{ float: 'right' }}
          className={
            'badge ' +
            (type === 'professional' ? 'badge-success' : 'badge-primary')
          }
        >
          {type.charAt(0).toUpperCase() + type.slice(1)}
        </span>
      </h3>
      <ul className='list'>
        {email && (
          <li>
            <i className='fa fa-envelope-open' /> {email}
          </li>
        )}
        {phone && (
          <li>
            <i className='fa fa-phone' /> {phone}
          </li>
        )}
        <p>
          <button className='btn btn-dark btn-sm' onClick={onEdit}>
            Edit
          </button>
          <button className='btn btn-danger btn-sm' onClick={onDelete}>
            Delete
          </button>
        </p>
      </ul>
    </div>
  );
};

export default ContactItem;

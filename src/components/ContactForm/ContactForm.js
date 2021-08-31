import { useState } from 'react';
import shortid from 'shortid';
import s from './ContactForm.module.css';

// import PropTypes from 'prop-types';

export default function ContactForm({ onSubmit }) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  const contact = { name, phone };

  const nameInputId = shortid.generate();
  const phoneInputId = shortid.generate();

  const handleChange = event => {
    const { name, value } = event.target;

    switch (name) {
      case 'name':
        setName(value);
        break;
      case 'phone':
        setPhone(value);
        break;
      default:
        return;
    }
  };

  const handleSubmit = event => {
    event.preventDefault();
    onSubmit(contact);

    setName('');
    setPhone('');
  };

  return (
    <>
      <form className={s.newContacsForm} onSubmit={handleSubmit}>
        <h2 className={s.title}>Add new contacts:</h2>
        <label className={s.label}>
          <span className={s.labelTitle}>Name:</span>

          <input
            type="text"
            name="name"
            value={name}
            onChange={handleChange}
            id={nameInputId}
            placeholder="input name"
            required
          />
        </label>

        <label className={s.label}>
          <span className={s.labelTitle}>Phone:</span>

          <input
            type="text"
            name="phone"
            value={phone}
            onChange={handleChange}
            id={phoneInputId}
            placeholder="input number"
            required
          />
        </label>

        <button className={s.button} type="submit">
          Add contact
        </button>
      </form>
    </>
  );
}

// class ContactForm extends Component {
//   state = {
//     name: '',
//     number: '',
//   };

//   handleChange = e => {
//     const { name, value } = e.target;
//     this.setState({ [name]: value });
//   };

//   handleSubmit = e => {
//     e.preventDefault();

//     this.props.onSubmit(this.state);
//     this.reset();
//   };

//   reset = () => {
//     this.setState({
//       name: '',
//       number: '',
//     });
//   };

//   render() {
//     const { name, number } = this.state;

//     return (
//       <>
//         <form className={s.newContacsForm} onSubmit={this.handleSubmit}>
//           <h2 className={s.title}>Add new contacts:</h2>
//           <label className={s.label}>
//             <span className={s.labelTitle}>Name:</span>

//             <input
//               type="text"
//               onChange={this.handleChange}
//               value={name}
//               name="name"
//               placeholder="input name"
//               required
//             />
//           </label>

//           <label className={s.label}>
//             <span className={s.labelTitle}>Phone:</span>

//             <input
//               type="text"
//               onChange={this.handleChange}
//               value={number}
//               name="number"
//               placeholder="input number"
//               required
//             />
//           </label>

//           <button className={s.button} type="submit">
//             Add contact
//           </button>
//         </form>
//       </>
//     );
//   }
// }

// export default ContactForm;

// ContactForm.propTypes = {
//   name: PropTypes.string,
//   number: PropTypes.number,
// };

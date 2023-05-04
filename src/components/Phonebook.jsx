import { Component } from 'react';
import { nanoid } from 'nanoid';

export class Phonebook extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    name: '',
    number: '',
    filter: '',
  };

  handleChange = e => {
    this.setState({ [e.currentTarget.name]: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    const contact = {
      id: nanoid(),
      name: this.state.name,
      number: this.state.number,
    };

    // this.state.contacts.map(contact => {
    //   if (contact.name === this.state.name) {
    //     return alert('oooo');
    //   }
    // });

    this.setState(prevState => ({
      contacts: [contact, ...prevState.contacts],
    }));
    [...e.currentTarget].map(item => item.nodeName === 'INPUT' && item.blur());
    this.reset();
  };

  filterHandler = e => {
    this.setState({ filter: e.currentTarget.value });
  };

  reset = () => {
    this.setState({ name: '', number: '' });
  };

  deleteConact = e => {
    this.setState({
      contacts: [
        ...this.state.contacts.filter(
          contact => contact.id !== e.currentTarget.id
        ),
      ],
    });
  };

  render() {
    const filterToLowerCase = this.state.filter.toLowerCase();
    const visibleContacts = this.state.contacts.filter(contact =>
      contact.name.toLowerCase().includes(filterToLowerCase)
    );

    return (
      <>
        <form onSubmit={this.handleSubmit}>
          <label>
            name
            <input
              type="text"
              name="name"
              pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
              title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
              required
              onChange={this.handleChange}
              value={this.state.name}
            />
          </label>
          <label>
            number
            <input
              type="tel"
              name="number"
              pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
              title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
              required
              onChange={this.handleChange}
              value={this.state.number}
            />
          </label>
          <button type="submit">add contact</button>
        </form>
        <h2>contacts</h2>
        <label>
          find by name
          <input
            type="text"
            name="filter"
            value={this.state.filter}
            onChange={this.filterHandler}
          ></input>
        </label>
        <ul>
          {visibleContacts.map(contact => (
            <li key={contact.id}>
              {contact.name}:{contact.number}
              <button id={contact.id} type="button" onClick={this.deleteConact}>
                delete
              </button>
            </li>
          ))}
        </ul>
      </>
    );
  }
}

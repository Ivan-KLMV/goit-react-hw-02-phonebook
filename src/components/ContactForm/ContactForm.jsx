import { Component } from 'react';
import { nanoid } from 'nanoid';
import { FormStyled } from './ContactForm.styled';

export class ContactForm extends Component {
  state = {
    name: '',
    number: '',
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

    if (
      this.props.contactsProp
        .map(contact => contact.name)
        .includes(contact.name)
    ) {
      return alert(`${contact.name} is already in contacts`);
    }

    this.props.onSubmitProp(contact);
    [...e.currentTarget].map(item => item.nodeName === 'INPUT' && item.blur());
    this.reset();
  };

  reset = () => {
    this.setState({ name: '', number: '' });
  };

  render() {
    return (
      <FormStyled onSubmit={this.handleSubmit}>
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
      </FormStyled>
    );
  }
}

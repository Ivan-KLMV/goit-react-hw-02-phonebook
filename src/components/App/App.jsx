import { Component } from 'react';
import { ContactForm, ContactList, Filter } from '../index';
import { AppContainer } from './App.styled';

export class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  addContact = contact => {
    this.setState(prevState => ({
      contacts: [contact, ...prevState.contacts],
    }));
  };

  filterHandler = e => {
    this.setState({ filter: e.currentTarget.value });
  };

  handleFilterContact = () => {
    const filterToLowerCase = this.state.filter.toLowerCase();

    return this.state.contacts.filter(contact =>
      contact.name.toLowerCase().includes(filterToLowerCase)
    );
  };

  deleteConact = id => {
    this.setState({
      contacts: [...this.state.contacts.filter(contact => contact.id !== id)],
    });
  };

  render() {
    const visibleContacts = this.handleFilterContact();

    return (
      <AppContainer>
        <h1>phonebook</h1>
        <ContactForm
          onSubmitProp={this.addContact}
          contactsProp={this.state.contacts}
        />
        <h2>contacts</h2>
        <Filter filterValue={this.state.filter} onChange={this.filterHandler} />
        <ContactList contacts={visibleContacts} onClick={this.deleteConact} />
      </AppContainer>
    );
  }
}

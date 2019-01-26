import React, { Component } from 'react';
import Input from '../page_components/Input';

//Stylesheet
import '../../styles/Contact.css';

class Contact extends Component {
  render() {
    return (
      <div id="contact-container" className="container">
        <h1 className="light">CONTACT</h1>
        <form id="contact-form">
          <div className="flex-box space-between">
            <Input type="text" label="FULL NAME" />
            <Input type="text" label="EMAIL" />
          </div>
          <Input type="textarea" label="MESSAGE" />

          <input type="button" className="button heavy" id="contact-send" value="SEND" />
        </form>
      </div>
    );
  }
}

export default Contact;

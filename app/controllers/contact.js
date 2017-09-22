import Ember from 'ember';

export default Ember.Controller.extend({
  isDisabled: true,
  emailAddress: '',
  message: '',
  isValidEmail: Ember.computed.match('emailAddress', /^.+@.+\..+$/),
  isValidMessage: Ember.computed.gte('message.length', 5),

  collect: Ember.computed.and('isValidEmail','isValidMessage'),
  isDisabled: Ember.computed.not('collect'),
  responseMessage:'',


  emailAddressChanged: Ember.observer('emailAddress', function() { 
    console.log('Email observer is called', this.get('emailAddress')); 
    console.log(this.get('isValidEmail'),this.get('isDisabled')); 
  }),
  messageChanged: Ember.observer('message', function() { 
    console.log('message observer is called', this.get('message')); 
    console.log(this.get('isValidMessage'),this.get('isDisabled')); 
  }),


  // isDisabled: Ember.computed.empty('emailAddress'),
  actions: {

     saveMessage() {
      //  alert(`Saving of the following email address is in progress: ${this.get('emailAddress')}`);
      //  this.set('responseMessage', `Thank you! We've just saved your email address: ${this.get('emailAddress')}`);


       const email = this.get('emailAddress');
       const message = this.get('message');
       const newMessage = this.store.createRecord('contact', { email: email,message : message });

       newMessage.save().then((response) => {
          this.set('responseMessage', `We got your message and we’ll get in touch soon to your id: ${response.get('id')}`);
          this.set('emailAddress', '');
          this.set('message', '');

          // reset property
          var self = this;
          Ember.run.later((function() {
             self.set('responseMessage', '');
          }), 5000);
       });


     }
   }
});

import Ember from 'ember';

export default Ember.Controller.extend({
  isDisabled: true,
  emailAddress: '',
  isValid: Ember.computed.match('emailAddress', /^.+@.+\..+$/),
  isDisabled: Ember.computed.not('isValid'),
  isValidMessage: Ember.computed.gte('message', 5),


  emailAddressChanged: Ember.observer('emailAddress', function() { 
    console.log('observer is called', this.get('emailAddress')); 
  }),
  isDisabled: Ember.computed('emailAddress', function() {
    return this.get('emailAddress') === '';
  }),
  // isDisabled: Ember.computed.empty('emailAddress'),
  actions: {

     saveInvitation() {
       alert(`Saving of the following email address is in progress: ${this.get('emailAddress')}`);
       this.set('responseMessage', `Thank you! We've just saved your email address: ${this.get('emailAddress')}`);
       this.set('emailAddress', '');
     }
   }
});

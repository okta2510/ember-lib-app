import Ember from 'ember';

export default Ember.Controller.extend({
  headerMessage: 'Coming Soon',
  responseMessage: '',
  emailAddress: '',

  isDisabled: true,
  isValid: Ember.computed.match('emailAddress', /^.+@.+\..+$/),
  isDisabled: Ember.computed.not('isValid'),


  // actualEmailAddress: Ember.computed('emailAddress', function() { 
  //   console.log('actualEmailAddress function is called: ', this.get('emailAddress'));
  // }),

  emailAddressChanged: Ember.observer('emailAddress', function() { 
    console.log('observer is called', this.get('emailAddress'),this.get('isValid'),this.get('isDisabled')); 
  }),

  // isDisabled: Ember.computed('emailAddress', function() {
  //   return this.get('emailAddress') === '';
  // }),

  // isDisabled: Ember.computed.empty('emailAddress'),
  actions: {

    //  saveInvitation() {
    //    alert(`Saving of the following email address is in progress: ${this.get('emailAddress')}`);
    //    this.set('responseMessage', `Thank you! We've just saved your email
     //
    //    address: ${this.get('emailAddress')}`);
    //    this.set('emailAddress', '');
    //  },
    saveInvitation() {
      const email = this.get('emailAddress');
      const newInvitation = this.store.createRecord('invitation', { email: email });

      newInvitation.save().then((response) => {
          this.set('responseMessage', `Thank you! We saved your email address with the following id: ${response.get('id')}`);
          this.set('emailAddress', '');
          var self = this;

          Ember.run.later((function() {
              self.set('responseMessage', '');
          }), 5000);
      });
    }
   }
});

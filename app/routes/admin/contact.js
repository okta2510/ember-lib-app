import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    return this.store.findAll('contact');
  },
  actions: {
    deleteInvitation(message){
      console.log(message);
      let confirmation = confirm("Are you sure want to delete this message?");

      if(confirmation){
        message.destroyRecord();
      }
    }
  }
});

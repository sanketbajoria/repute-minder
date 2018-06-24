var Freshdesk = require('./client');
var Promise = require('bluebird');
var asyncFreshdesk = Promise.promisifyAll(
  new Freshdesk('https://sanketpb.freshdesk.com', 'lZBLY7fgwhAKeOA2LVW')
);

module.exports = {
  createTicket: function(ticket) {
    return asyncFreshdesk.createTicketAsync(ticket);s
  },

  /**
   * Create Admin agent
   * name and email
   */
  createAdminAgent: function(name, email, groupId, companyId) {
    //create contact
    return asyncFreshdesk.createContactAsync({name: name, email: email, company_id: companyId}).then((c) => {
      return asyncFreshdesk.makeAgentAsync(c.id);
    }).then((c) => {
      return asyncFreshdesk.updateAgentAsync(c.agent.id, {
        ticket_scope: 2,
        group_ids: [groupId]
      });
    })
  },

  isExists: function(name, email){
    return Promise.all([asyncFreshdesk.listAllCompaniesAsync().then(c => c.filter(i => i.name.toLowerCase() == name.toLowerCase()).length>0), asyncFreshdesk.listAllGroupsAsync().then(c => c.filter(i => i.name.toLowerCase() == name.toLowerCase()).length>0),
      asyncFreshdesk.listAllContactsAsync({email: email}).then((c) => c.length>0), 
      asyncFreshdesk.listAllAgentsAsync({email: email}).then((c) => c.length>0)]);
  },

  //Create company
  //name and description
  createCompany: function(company) {
    return asyncFreshdesk.createCompanyAsync(company)
  },

  updateCompany: function(company){
      return asyncFreshdesk.updateCompanyAsync(company.id, company);
  },

  deleteCompany: function(id){
      return asyncFreshdesk.deleteCompanyAsync(id);
  },

  getCompanies: function(){
      return asyncFreshdesk.listAllCompaniesAsync();
  },

  createGroup: function(company) {
    return asyncFreshdesk.createGroupAsync(company);
  },

 /*  onboardCompany: function(company, adminAgent) {
    return this.createCompany(company).then(() => this.createGroup(company))
      .then((group) => this.createAdminAgent(adminAgent, group.id));
  }, */
  cleanUp: function(){
    return Promise.all([asyncFreshdesk.listAllAgentsAsync({}).then(c => { 
        return Promise.all(c.filter(i => i.contact.email && i.contact.email != 'bajoriasanket@gmail.com' && i.contact.email.indexOf("sanket") >=0).map(i => {
                    return asyncFreshdesk.deleteAgentAsync(i.id).then(() => {
                      return asyncFreshdesk.listAllContactsAsync({}).then(c => {
                        return Promise.all(c.filter(i => i.email && i.email != 'bajoriasanket@gmail.com'  && i.email.indexOf("sanket") >=0).map(i => {
                                return asyncFreshdesk.deleteContactAsync(i.id)
                        }))
                      })
                    })
        }))
    }), asyncFreshdesk.listAllGroupsAsync().then(c => Promise.all(c.map(i => asyncFreshdesk.deleteGroupAsync(i.id)))
    ), asyncFreshdesk.listAllCompaniesAsync().then(c => Promise.all(c.map(i => asyncFreshdesk.deleteCompanyAsync(i.id)))
    )]);
  }

}
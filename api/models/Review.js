/**
* Review.js
*
* @description :: Server-side logic for a product review
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

	description: [
        'A Review'
    ].join(' '),

    //Global Permissions override all local permissions
    permissions: {
        'registered': {
            'create': {action: false, relation: false},
            'read'  : {action: true,  relation: false},
            'update': {action: false, relation: false},
            'delete': {action: false, relation: false}    
        },
        'public': {
            'create': {action: false, relation: false},
            'read'  : {action: true,  relation: false},
            'update': {action: false, relation: false},
            'delete': {action: false, relation: false}
        }
    },

	attributes: {
		experiment_name: {
			type: 'string'
		},
		product: {
			model: 'Product'
		},
		verified: {
			type: 'string',
			enum: ['pending', 'complete']
		},
		status: {
			type: 'string',
			enum: ['incomplete', 'complete']
		},
		progress: {
			type: 'integer',
			defaultsTo: 0
		},
		user: {
			model: 'User'
		},
		score: {
			type: 'integer',
			defaultsTo: 0
		}
		
	},

	afterCreate: [

      function webhookBroadcast (review, next){
         sails.log('Review.afterCreate.webhookBroadcast', review);
         
         next();
      }
   ]
};


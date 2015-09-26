/**
* Cart.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {
	description: [
        'A Cart'
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
		
		user: {
			model: 'User',
		},

		lab: {
			model: 'Lab'
		},

		products: {
			collection: 'Product',
			via: 'carts',
			dominant: true
		}
	},
	afterCreate: [

    	function webhookBroadcast (cart, next){
        	sails.log('Cart.afterCreate.webhookBroadcast', cart);
         
        	next();
    	}

	]

};


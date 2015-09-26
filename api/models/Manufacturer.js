/**
* Manufacturer.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

	description: [
        'A Manufacturer'
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
		name: {
			type: 'string'
		},
		address_one: {
			type: 'string'
		},
		address_two: {
			type: 'string'
		},
		address_three: {
			type: 'string'
		},
		city: {
			type: 'string'
		},
		state: {
			type: 'string'
		},
		postal_code: {
			type: 'string'
		},
		country: {
			type: 'string'
		},
		phone: {
			type: 'string'
		},
		website: {
			type: 'string'
		},
		note: {
			type: 'string'
		},
		content: {
			type: 'string'
		}
	},

	afterCreate: [

    	function webhookBroadcast (manufacturer, next){
        	sails.log('Manufacturer.afterCreate.webhookBroadcast', manufacturer);
         
        	next();
    	}
	]
};


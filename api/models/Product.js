/**
* Product.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

	description: [
        'A Product'
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
		product_name: {
			type: 'string'
		},
		catelog_num: {
			type: 'string'
		},
		sub_catalog_num: {
			type: 'string'
		},
		category: {
			model: 'Category'
		},
		subcategory: {
			model: 'Subcategory'
		},
		reviews: {
			collection: 'Review',
			via: 'product'
		},
		manufacturer: {
			model: 'Manufacturer'
		},
		carts: {
			collection: 'Cart',
			via: 'products'
		},
		score: {
			type: 'integer',
			defaultsTo: 0
		},
		inventory: {
			collection: 'Inventory',
			via: 'product'
		}
	},

	afterCreate: [

    	function webhookBroadcast (product, next){
        	sails.log('Product.afterCreate.webhookBroadcast', product);
         
        	next();
    	}
	]
  
};


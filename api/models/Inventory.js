/**
* Inventory.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

	attributes: {
		
		catelog_num: {
			type: 'string'
		},
		sub_catalog_num: {
			type: 'string'
		},
		price: {
			type: 'number'
		},
		size: {
			type: 'number'
		},
		product: {
			model: 'Product'
		},
		stock: {
			type: 'number'
		}

	},

	afterCreate: [

    	function webhookBroadcast (inventory, next){
        	sails.log('Inventory.afterCreate.webhookBroadcast', inventory);
         
        	next();
    	}
	],
};


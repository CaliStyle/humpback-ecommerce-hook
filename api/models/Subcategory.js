/**
* Subcategory.js
*
* @description :: Sever-side logic for a product Sub Category.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

String.prototype.slug = function() {
    var title = this;
    return title
        .toLowerCase()
        .replace(/[^\w ]+/g,'')
        .replace(/ +/g,'-');
};

module.exports = {

	description: [
        'Product Sub Category'
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
		//Sub Category Human Readable Name
		name: {
        	type: 'string'
      	},

      	//Url Slug
      	slug: {
      		type: 'string',
      		unique: true,
            index: true
      	},

      	//Sub Category Byline
    	tagline: {
        	type: 'string'
    	},

    	//Sub Category Master Category
    	category: {
    		model: 'Category'
    	},

    	//Collection of Products in this Sub Category
    	products: {
        	collection: 'Product',
        	via: 'subcategory' 
    	}
	},
	
	beforeValidate: [
		function handleSlug(values, next){
			sails.log.silly('Subcategory.beforeValidate.handleSlug');
            if(values.name){
                values.slug  = values.name.slug();
            }
            next(null, values);
		}
	],

    beforeCreate: [
        function handleSlug(values, next){
            sails.log.silly('Subcategory.beforeCreate.handleSlug');
            if(!values.slug){
                return next(null, values);
            }

            Subcategory.find({slug: {like: values.slug+'%'}})
            .exec(function(err, subcategories){
                if(subcategories.length > 0){
                    values.slug = values.slug+'-'+subcategories.length;
                }
                next(err, values);
            });
        }
    ],

    beforeUpdate: [
        function handleSlug(values, next){
            sails.log.silly('Subcategory.beforeUpdate.handleSlug');
            if(!values.slug){
                return next(null, values);
            }

            Subcategory.find({id: {'!': values.id }, slug: {like: values.slug+'%'} })
            .exec(function(err, subcategories){
                if(subcategories.length > 0){
                    values.slug = values.slug+'-'+subcategories.length;
                }
                next(err, values);
            });
        }
    ],

    afterCreate: [

    	function webhookBroadcast (subcategory, next){
        	sails.log('Subcategory.afterCreate.webhookBroadcast', subcategory);
         
        	next();
    	}
	]
};


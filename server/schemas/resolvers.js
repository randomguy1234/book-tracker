const {User, Book}= require('../models');
//need authocation to be added here, both from util and apollo-server package 

const resolvers= {
    Query: {
        me: async (parent, {username}) => 
        {
            return User.findOne({username})
                .select('-__v -password')
                .populate('books');
        },

        users: async () =>
        {
            return User.find()
                .select('-__v -password')
                .populate('books');
        }
    }
};

module.exports= resolvers;
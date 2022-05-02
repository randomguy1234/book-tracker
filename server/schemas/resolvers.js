const {User, Book}= require('../models');
const {AuthenticationError}= require('apollo-server-express');
const {signToken}= require('../utils/auth');
//need authocation to be added here, both from util and apollo-server package 

const resolvers= {
    Query: {
        me: async (parent, args, context) => 
        {
            if (context.user)
            {
                return User.findOne({_id: context.user._id})
                .select('-__v -password')
                .populate('books');
            }

            throw new AuthenticationError('Not logged in');
        },

        users: async () =>
        {
            return User.find()
                .select('-__v -password')
                .populate('books');
        },

        user: async (parent, {username}) =>
        {
            return User.findOne({username})
            .select('-__v -password')
            .populate('books');
        }
    },

    Mutation: {
        login: async (parent, {email, password}) =>
        {
            const user= await User.findOne({email});
            if (!user) 
            {
                throw new AuthenticationError('Something went wrong! Please Try again.');
            }

            const currentPW= await User.isCorrectPassword(password);
            if (!currentPW) 
            {
                throw new AuthenticationError('Something went wrong! Please Try again.');
            }

            const token= signToken(user);
            //return auth here
            return {token, user};
        },

        addUser: async (parent, args) =>
        {
            const user= await User.create(args);
            const token= signToken(user);
            
            //return auth here
            return {token, user};
        },

        saveBook: async () =>
        {

        },

        removeBook: async () =>
        {

        }
    }
};

module.exports= resolvers;
const mongoCollections = require('../config/mongoCollections');
const mongo = require('mongodb');
const {ObjectId} = require('mongodb');
const users = mongoCollections.users;

let exportedMethods = {
    async get() {
        const userCollection = await users();
        const userList = await userCollection.find({}).toArray();
        if (!userList) throw 'No users in system!';
        return userList;
    },
    async getById(id){
        if (!id) throw 'You must provide an id to search for';
        if (typeof id != "string") throw 'Id must be of type string';
        let uid;
        try {
            uid = ObjectId(id);
        }
        catch(e){
            throw 'Id must be of type ObjectId'
        }
        
        const userCollection = await users();
        const foundUser = await userCollection.findOne({_id: uid});
        if (!foundUser ) throw 'User not found';
        return foundUser;    
    },
    async create(firstName, lastName, email, username, userRole, address, password){
        
        if (!firstName) throw 'You must provide a name!';
        if (!lastName) throw 'You must provide a last name!';
        if (!email) throw 'You must provide an email!';
        if (!username) throw 'You must provide an username!';
        if (!userRole) throw 'You must provide a role!';
        if (!address) throw 'You must provide an address!';
        if (!password) throw 'You must provide a password!';
   

        if (typeof firstName != "string") throw 'You must provide a string for the first name';
        if (typeof lastName != "string") throw 'You must provide a string for the last name';
        if (typeof email != "string") throw 'You must provide a string for the email';
        if (typeof username != "string") throw 'You must provide a string for the username';
        if (typeof userRole != "string") throw 'You must provide a string for the address ';
        if (typeof address != "string") throw 'You must provide a string for the last name';
        if (typeof password != "string") throw 'You must provide a string for the password';



        let newUser = {
            firstName: firstName,
            lastName: lastName,
            email: email,
            username: username,
            userRole: userRole,
            address: address,
            hashedPassword: hashedPassword
        }
        const userCollection = await users();
        const insertInfo = await userCollection.insertOne(newUser);
        if (insertInfo.insertedCount === 0) throw 'Could not add user';
    
        const newId = insertInfo.insertedId;
        const user = await this.getById(newId.toString());
        return user;    
    },
    async update(id,user){
        if (!id) throw 'An id is required';
    
        if (typeof id != "string"){
            throw 'Provided id must be of type string';
        }
        let uid;
        try {
            uid = ObjectId(id);
        }
        catch(e){
            throw 'Id must be of type ObjectId'
        }
        const oldUser = await this.getById(id);
        const updatedUser = {
            firstName: user.firstName,
            lastName: user.lastName,
            email: email.lastName,
            username: user.lastName,
            hashedPassword: user.hashedPassword,
            userRole: user.userRole,
            address: user.address

        }
        const userCollection = await users();
        const updatedInfo = await userCollection.updateOne(
            {_id:uid},
            { $set: updatedUser }
        );
        const foundUser = await userCollection.findOne({_id: uid});
        return foundUser;
    },
    async delete(id){
        if (!id) throw 'An id is required';
    
        if (typeof id != "string"){
            throw 'Provided id must be of type string';
        }
        let uid;
        try {
            uid = ObjectId(id);
        }
        catch(e){
            throw 'Id must be of type ObjectId'
        }
        const userCollection = await users();
        const foundUser = await userCollection.findOne({_id:uid});
        if (!foundUser) throw 'User not found with that id';
        const deletionInfo = await userCollection.deleteOne({_id:uid});
        const result = {
            userId: id,
            deleted: true
        }
        return result;
    }

}

module.exports = exportedMethods;

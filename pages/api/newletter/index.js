// This page will create a path that requests can be sent to.
// i.e {domain}/api/events
// Obviously you do not export a react component here

import {} from '.';
import fs from 'fs';
import path from 'path';

import { connectDatabase, insertDocument } from '../../../helpers/db-util'

import { MongoClient } from 'mongodb';


// parameters: request and response objects 
async function handler(req, res){

    // allows us to execute any server-side code
    // Code in here will NEVER be exposed to the clients-side/front end

    if(req.method === 'POST'){
        // extract the data from the request 
        const email = req.body.email;
        console.log('email= ', email)

        // server-side validation
        if(!email || !email.includes('a')){
            // invalid input 
            res.status(422).json({message: 'Invalid email address.'});
            return;
        }

        let client;
        try{
            client = await connectDatabase();
        } catch (error){
            // failed to connect to the database 
            res.status(500).json({message: 'Connecting to the database failed!'});
            return;
        }

        try{
            await insertDocument(client, 'newsletter', {email: email});
            // disconnects from the client 
            client.close();
        } catch(error){
            // failed to insert data into to the database 
            res.status(500).json({message: 'Failed to store registartion email in the database!'});
            return;

        }
        // send back a success response 
        res.status(202).json({
            message: 'Success!',
            email: email
        })
    } else {
        // sets a success status code of 200 and send back some json data as a response 
        res.status(200).json({
            message: 'Great job!'
        });
    }
}

export default handler;
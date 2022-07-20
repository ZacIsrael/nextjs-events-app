
import { MongoClient } from 'mongodb';

export async function connectDatabase(){

    // connecting to a collection in our MongoDB cluster
    const client = await MongoClient.connect('mongodb+srv://db-user:Ramblers2018!@cluster0.gdf3b.mongodb.net/events?retryWrites=true&w=majority');

    return client;
}

export async function insertDocument(client, collection, document){

   // can only talk to the databse once the connection has been established
       // Get access to the databse by calling client.db({optional anme parameter})
       // You can pass the databse's name as a parameter or just get it from the url. It will always be after ".net/" and before "?"
       const db = client.db();

       // get acces to a collection in the databse, db
       // enter the object in the collection of the events databse
       const result = await db.collection(collection).insertOne(document);

       return result;
}

export async function getAllDocuments(client, collection, sort){
    // retrieve comments for the event with id = eventId
    const db = client.db();

    // retrieves all of the items in the collection 
    const documents = await db.collection(collection)
    .find()
    .sort(sort)
    .toArray();

    return documents;
}

export async function getDocumentsWithEventID(client, collection, sort, filter = {}){
    // retrieve comments for the event with id = eventId
    const db = client.db();

    // retrieves all of the items in the collection with an eventId = eventId and sorts them in descending order
    const documents = await db.collection(collection)
    .find(filter)
    .sort(sort)
    .toArray();

    return documents;
}


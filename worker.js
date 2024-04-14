//modules
import {parentPort } from "worker_threads"
import xml2js from "xml2js"

import configureDB from "./dbConnection.js" 
import * as dbModels from "./modals/index.js"

async function insertData(fileData) {
    try {
        configureDB()
        let list = await parseToJson(fileData)
        let result = await dbModels.Contact.insertMany(list)
        return result
       
    } catch(error) {
        console.log(error)
    }
}

const parseToJson = async(uploadData) => {
    return new Promise((resolve, reject) => {
      /*here the connversion of `Uint8Array` t0 xml string and parsing
        of xml string is reference from chatgpt */
      const xmlString = Buffer.from(uploadData).toString('utf-8');
      xml2js.parseString(xmlString, (err, result) => {
        if (err) {
            console.error('Error parsing XML:', err);
            reject(err);
        }

        const jsonArray = result.contacts.contact.map((c)=>{
            return {
                name : c.name[0],
                lastName : c.lastName[0],
                phone : c.phone[0]
            }
        })
        resolve(jsonArray)
    });
    });
};

parentPort.on('message', async (data) => {
    try {
        await insertData(data)
        parentPort.postMessage("data stored");
    } catch (error) {
        parentPort.postMessage(error.message);
    }
});

// const fs = require('fs').promises;
// const path = require('path');

import { trace } from 'node:console'
import fs from 'node:fs/promises'
import path from 'node:path'
import { nanoid } from 'nanoid'

// import {contact} from './db/contacts.json'


const contactsPath = path.join('db', 'contacts.json')

//Функція повуртає повертає в консолі масив контактів.
export async function  listContacts() {
    try {
        // Зчитуємо файл із контактами та консолимо його
        const contactsResult = await fs.readFile(contactsPath)
        const json = JSON.parse(contactsResult)
        console.log(json)
        return json


    } catch (error) {
        console.log(error.messenge)
    }
    
  }
  
   // ...твій код. Повертає об'єкт контакту з таким id. Повертає null, якщо контакт з таким id не знайдений.

  export async function getContactById(contactId) {
    try {
        console.log(`${contactId}`)
        const contactsResultGet= await listContacts()
        const idContact = await contactsResultGet.filter(contact => contact.id === contactId)
        console.log(idContact)
        return 
    } catch (error) {
        console.log(error.messenge)
    }
    
  }   
  

  //Повертає об'єкт видаленого контакту. Повертає null, якщо контакт з таким id не знайдений.
  export async function removeContact(contactId) {
    try {
        const contactsResult = await listContacts()

        //Пошук контакту за ID
        const findContact = contactsResult.filter(contact => contact.id === contactId)

        //перевіряємо наявність об'єкту контакту в масиві
        if(findContact[0]){
          //повертаємо масив обєктів, він включає в себе лише ті які не містить переданий id 
          const newContactList = contactsResult.filter(contact => contact.id !== contactId)
          await fs.writeFile(contactsPath, JSON.stringify(newContactList));
          console.log(findContact)
          console.log("Контакт знайдено")

          return
        } else {
          console.log("Контакт не знайдено")
          return
        }

    } catch (error) {
      console.log(error.messenge)
    }
    
    
  }
  

   // ...твій код. Повертає об'єкт доданого контакту. 
  export async function addContact(name, email, phone) {
    try {
      const newContact = {
        id: nanoid(3),
        name,
        email,
        phone,
      }
  
      const contactsResult= await listContacts()
      contactsResult.push(newContact)
      await fs.writeFile(contactsPath, JSON.stringify(contactsResult));
      
      return console.log(newContact)

    } catch (error) {
        console.log(error.messenge)
    }    
  }
/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

const {onRequest} = require("firebase-functions/v2/https");
const admin = require("firebase-admin");
const cors = require("cors")({ origin: true });

admin.initializeApp();

exports.countBooks = onRequest((req, res) => {
  cors(req, res, async () => {
    try {
      const booksCollection = admin.firestore().collection("books");
      const snapshot = await booksCollection.get();
      const count = snapshot.size;

      res.status(200).send({ count });
    } catch (error) {
      console.error("Error counting books:", error.message);
      res.status(500).send("Error counting books");
    }
  });
});
exports.addBook = onRequest((req, res) => {
    cors(req, res, async () => {
      try {
        const { isbn, name } = req.body;
  
        if (!isbn || !name) {
          console.log('Invalid input:', req.body);
          return res.status(400).send('ISBN and name are required.');
        }
  
        const isbnNum = Number(isbn);
        if (isNaN(isbnNum)) {
          console.log('Invalid ISBN:', isbn);
          return res.status(400).send('ISBN must be a valid number.');
        }
  
        console.log('Adding book with ISBN:', isbnNum, 'and name:', name);
  
        const booksCollection = admin.firestore().collection("books");
  
        await booksCollection.add({
          isbn: isbnNum,
          name: name,
        });
  
        res.status(200).send('Book added successfully!');
      } catch (error) {
        console.error('Error adding book:', error.message);
        res.status(500).send('Error adding book');
      }
    });
  });


// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

// exports.helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

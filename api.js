/*
*
*
*       Complete the API routing below
*       
*       
*/

'use strict';
const BooksModel = require('../model').Books;
module.exports = function (app) {

  app.route('/api/books')
    .get(async function (req, res) {
      const getBooks = await BooksModel.find({})
      res.json(getBooks)
      //response will be array of book objects
      //json res format: [{"_id": bookid, "title": book_title, "commentcount": num_of_comments },...]

    })

    .post(function (req, res) {
      let title = req.body.title;
      //response will contain new book object including atleast _id and title
      if (!title) {
        res.send("missing required field title");
        return;
      }
      const booksModel = new BooksModel({
        title: title,
        commentcount: 0,
        comments: []
      });
      booksModel.save();
      res.json(booksModel);
    })

    .delete(async function (req, res) {
      //if successful response will be 'complete delete successful'

      res.json("complete delete successful");
    });



  app.route('/api/books/:id')
    .get(async function (req, res) {
      let bookid = req.params.id;
      const thisBook = await BooksModel.findById(bookid);
      if (!thisBook) {
        res.send('no book exists');
      } else {
        res.json(thisBook);
      }

      //json res format: {"_id": bookid, "title": book_title, "comments": [comment,comment,...]}      
    })

    .post(async function (req, res) {
      let bookid = req.params.id;
      let comment = req.body.comment;
      if(!comment) {
        res.send("missing required field comment");
        return;
      }
      const thisBook = await BooksModel.findById(bookid);
      if (!thisBook) {
        res.send('no book exists');
        return;
      } 
        thisBook.comments = [...thisBook.comments, comment];
        thisBook.commentcount = thisBook.comments.length;
        thisBook.save();
        res.json(thisBook);
    })

    .delete(async function (req, res) {
      let bookid = req.params.id;
      const thisBook = await BooksModel.findById(bookid);
      if (!thisBook) {
        res.send('no book exists');
        return;
      };
      res.json("delete successful");
      //if successful response will be 'delete successful'
    });

};

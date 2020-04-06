const express = require('express');
const app = express();
const twig = require('twig');
const bodyParser = require('body-parser');

// IMPORT DB CONNECTION
const connection = require('./config/database');

// SET VIEW ENGINE
app.set('view engine','html');
app.engine('html', twig.__express);
app.set('views','views');

// USE BODY-PARSER MIDDLEWARE
app.use(bodyParser.urlencoded ({extended:false}));

app.get('/', (req, res) => {
    // FETCH ALL THE POSTS FROM DATABASE
    connection.query('SELECT * FROM `posts`', (err, results) => {
        if (err) throw err;
        // RENDERING INDEX.HTML FILE WITH ALL POSTS
        res.render('index',{
            posts:results
        });
    });
    
});

// INSERTING POST INserting data using node MySQL.
app.post('/', (req, res) => {
    const title = req.body.title;
    const content = req.body.content;
    const author_name = req.body.author_name;
    const post = {
        title: title,
        content: content,
        author: author_name,
        created_at: new Date()
    }
    connection.query('INSERT INTO `posts` SET ?', post, (err) => {
        if (err) throw err;
        console.log('Data inserted');
        return res.redirect('/');
    });
});

// EDIT PAGE Edit Selected data using node MySQL.
app.get('/edit/:id', (req, res) => {
    const edit_postId = req.params.id;
    // FIND POST BY ID
    connection.query('SELECT * FROM `posts` WHERE id=1',[edit_postId] , (err, results) => {
        if (err) throw err;
        res.render('edit',{
            post:results[0]
        });
    });
});

// POST UPDATING data using node MySQL.

app.post('/edit/:id', (req, res) => {
    const update_title = req.body.title;
    const update_content = req.body.content;
    const update_author_name = req.body.author_name;
    const userId = req.params.id;
    connection.query('UPDATE `posts` SET title = "testing data", content = "Testing Desc..", author = "Zakir" WHERE id = 1', [update_title, update_content, update_author_name, userId], (err, results) => {
        if (err) throw err;
        if(results.changedRows === 1){
            console.log('Post Updated');
            return res.redirect('/');
        }
    });
});

// POST DELETING data using node MySQL.
app.get('/delete/:id', (req, res) => {
    connection.query('DELETE FROM `posts` WHERE id = 1', [req.params.id], (err, results) => {
        if (err) throw err;
        res.redirect('/');
    });
});
// SET 404 PAGE
app.use('/',(req,res) => {
    res.status(404).send('<h1>404 Page Not Found!</h1>');
});
// IF DATABASE CONNECTION IS SUCCESSFUL
connection.connect((err) => {
    if (err) throw err;
    app.listen(3000);
});
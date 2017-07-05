const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;

var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

app.use( (req, res, next) => {
	var now = new Date().toString();

	var log = `${now}: ${req.method} ${req.url}`;
	
	console.log(`${now}: ${req.method} ${req.url}`);
	fs.appendFile('server.log', log + '\n', (err) => {
		if(err) {
			console.log('Unable to write to server.log!');
		}
	});

	next();
} );

// app.use( (req, res, next) => {
// 	res.render('maintenance.hbs');
// } );

// app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => {
	return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
	return text.toUpperCase();
});

app.get('/', (req, res) => {
	// res.send('<h1>Hello Express!</h1>');
	// res.send({
	// 	name: 'Jonas',
	// 	age: 29,
	// 	likes: [
	// 		'Gym',
	// 		'Coding',
	// 		'Stuff'
	// 	]
	// });
	res.render('home.hbs', {
		pageTitle: 'Home Page Title Here',
		welcomeText: 'This is our home page. It does not contain any very useful information at this point. This is for testing purposes only.'
	})
});

app.get('/about', (req, res) => {
	res.render('about.hbs', {
		pageTitle: 'About Page'
	});
});

app.get('/projects', (req, res) => {
	res.render('projects.hbs', {
		pageTitle: 'Project listing'
	});
} );

// For bad requests
app.get('/bad', (req, res) => {
	res.send({
		errorMessage: 'Unable to fulfill request!'
	});
})

app.listen(port, () => {
	console.log(`Server is up on port ${port}`);
});
// import Firebase from 'firebase';
import page from 'page';
import index from './routes/index.js';

// const myRootRef = new Firebase('https://resplendent-inferno-8697.firebaseio.com');

//define routes and handlers
page('/', index);

// start router
page();
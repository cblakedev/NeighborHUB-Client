/* Allows the code base to recognize if app is running locally or through Heroku */

let APIURL = '';

switch (window.location.hostname) {

    case 'localhost' || '127.0.0.1':
        APIURL = 'http://localhost:8000/';
        break;

    default :
        APIURL = 'https://neighborhub-server.herokuapp.com/'
}

export default APIURL;
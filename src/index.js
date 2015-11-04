const React = require('react');
const { render } = require('react-dom');
const ChatApp = require('./ChatApp');

require('./main.css');


render(<ChatApp />, document.getElementById('root'));

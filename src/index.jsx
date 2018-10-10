//index.js文件内容
import React from 'react';
import ReactDOM from 'react-dom'
import './style/global.css'
import './style/reset.css'
import './style/index.less'
import App from './components/App'

console.log(process.env.NODE_ENV)

console.log(__NODE_ENV__)

ReactDOM.render(
    <App></App>,
    document.getElementById('root')
);

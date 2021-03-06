import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './Components/App';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter } from 'react-router-dom';
ReactDOM.render(
<BrowserRouter>    
    <App />
</BrowserRouter>, document.getElementById('root'));

if(module.hot){
    module.hot.accept();
}
registerServiceWorker();

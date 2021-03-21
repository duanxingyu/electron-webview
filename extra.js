/*
 * @Author: duanxingyu
 * @Date: 2021-01-10 15:20:46
 * @LastEditors: duanxingyu
 * @LastEditTime: 2021-01-10 22:50:40
 * @Description: 
 */
const ipc = require('electron').ipcRenderer;
const wb = document.querySelector('webview')
    wb.addEventListener("did-stop-loading",()=>{
       wb.insertCSS(`html,body{background:red}`)
     })
     console.log('222222:',wb.shadowRoot)
//      var style = document.createElement( 'style' )
// style.innerHTML = 'iframe{ height:100%}'
// wb.shadowRoot.appendChild( style )
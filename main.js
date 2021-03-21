/*
 * @Author: duanxingyu
 * @Date: 2021-01-10 14:27:05
 * @LastEditors: duanxingyu
 * @LastEditTime: 2021-03-20 14:15:24
 * @Description: 
 */
const {
  app,
  BrowserWindow,
  BrowserView,
  globalShortcut,
} = require('electron')
const isMac = process.platform === 'darwin'
const path = require('path')
var mainWindow = null // 声明要打开的主窗口
const {
  Menu
} = require('electron')

app.on('ready', () => {
  // 设置窗口的高度和宽度
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    // frame: false, // 是否有边框
    webPreferences: {
      webviewTag:true,
      nodeIntegration: true, // 设置开启nodejs环境
      enableRemoteModule: true // enableRemoteModule保证renderer.js可以可以正常require('electron').remote，此选项默认关闭且网上很多资料没有提到
    }
  })
  // 加载 指定路径的页面
  mainWindow.loadFile('./index.html')
  var menuTemplate = [...(isMac ? [{
    label: app.name,
    submenu: [
      { role: 'about',label:'关于'},
      { type: 'separator' },
      { role: 'quit',label:'退出' }
    ]
  }] : [])]
  // 根据配置信息创建 menu 对象
  var menuObj = Menu.buildFromTemplate(menuTemplate)
  // 将对象作用当当前应用中
  Menu.setApplicationMenu(menuObj)

  // 创建一个 BrowserView 对象
  const view = new BrowserView()
  // 设置 BrowserView 作用的窗口
  mainWindow.setBrowserView(view)
  view.setBounds({
    x: 0, // 窗口x轴的起始位置
    y: 0, // 窗口y轴的起始位置
    width: 800, // BrowserView 的宽度
    height: 580 // BrowserView 的高度，如果是和窗口大小一致，一般获取窗口的宽度和高度
  })
  // 这段代码可以设置browserView视图宽度随窗口变化
  view.setAutoResize({
    width: true,
    height: true
  })
  // BrowserView 嵌套网页
  view.webContents.loadURL('https://www.jd.com/')

  // 开启渲染进程中的调试模式
  mainWindow.webContents.openDevTools()
  // 监听窗口关闭 销毁引用
  mainWindow.on('closed', () => {
    mainWindow = null
  })
})
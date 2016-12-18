'use strict'

const wd = require('wd')
const CONFIG = {
  SERVER: {
    host: 'localhost',
    port: 4723,
  },
  DEVICE: {
    browserName: '',
    'appium-version': '1.6',
    platformName: 'iOS',
    platformVersion: '10.2',
    deviceName: 'iPhone 6',
    app: 'ios/build/Build/Products/Debug-iphonesimulator/appium.app'
  }
}
Object.freeze(CONFIG)

describe('appium', function () {
  this.timeout(300000)
  let driver
  let allArePassed = true

  before(function () {
    driver = wd.promiseChainRemote(CONFIG.SERVER)
    addEventListenersTo(driver)
    return driver.init(CONFIG.DEVICE)
  })

  after(function () {
    driver.quit()
  })

  afterEach(function () {
    allArePassed = allArePassed && this.currentTest.state === 'passed'
  })

  it('simple', function () {
    // TODO
  })
})

function isDevelopment() {
  const NODE_ENV = process.env.NODE_ENV
  return !NODE_ENV || (NODE_ENV && NODE_ENV === 'development')
}
function addEventListenersTo(driver) {
  if (!isDevelopment()) {
    return
  }

  driver.on('status', function (info) {
    console.log(info)
  })
  driver.on('command', function (command, method, data) {
    console.log(command, method, data || '')
  })
  driver.on('http', function (method, path, data) {
    console.log(method, path, data || '')
  })
}

module.exports = {
      express: require('express'),
      fs: require('fs'),
      path: require('path'),
      cookieParser: require('cookie-parser'),
      parser: require('body-parser').json({ limit: '1024mb' }),
      socket: require('socket.io'),
      mocha: require('mocha'),
      morgan: require('morgan'),
      cors: require('cors'),
      shortId: require('short-id'),
      jwt: require('jsonwebtoken'),
      mongodb: require('mongodb'),
      Pusher: require('pusher')
}
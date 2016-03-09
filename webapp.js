var dconf = require('./config');

module.exports = {
  config: {
    debian: {
      changesfile: {
          type: String,
          default: dconf.chroots.changesfile },
      chroothome: {
          type: String,
          default: dconf.chroots.home },
      arch: {
          type: String,
          default: 'all',
          enum: ['all', 'any']},
      useuscan: { type: Boolean, default: true },
      pdebuild: { type: String, default: ''},
      usepiuparts: { type: Boolean, default: true },
      piuparts: { type: String, default: ''},
      environment: { type: String, default: '' },
      prepare: { type: String, default: '' },
      test: { type: String, default: '' },
      deploy: { type: String, default: '' },
      cleanup: { type: String, default: '' }
    }
  }
}

var deb_conf = {};

deb_conf.striderhome = '/var/lib/strider/';
deb_conf.chroots = {};
deb_conf.chroots.amd64 = 'huayra-torbellino-amd64.tgz';
deb_conf.chroots.i386 = 'huayra-torbellino-i386.tgz';
deb_conf.chroots.home  = '/var/lib/strider/chroot/';
deb_conf.chroots.get_pkg_filename = deb_conf.striderhome + '/scripts/get-package-filename';

module.exports = deb_conf;

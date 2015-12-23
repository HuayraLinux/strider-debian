'use strict';

var app = window.app;
var configDefaults = {
  changesfile: '',
  arch: 'all',
  useuscan: true,
  chroothome: '/var/lib/strider/chroot/',
  pdebuild: '',
  piuparts: '',
  environment: '',
  prepare: '',
  test: '',
  deploy: '',
  cleanup: ''
};


app.controller('DebianCtrl', ['$scope', function ($scope) {

  function save(url, scripts, done) {
    $.ajax({
      url: '/debian/script',
      type: 'POST',
      data: {url: url, scripts: scripts},
      dataType: 'json',
      success: function (data, ts, xhr) {
        done(null);
      },
      error: function (xhr, ts, e) {
        if (xhr && xhr.responseText) {
          var data = $.parseJSON(xhr.responseText);
          e = data.errors[0];
        }
        done(e);
      }
    });
  }

  $scope.scripts = $scope.panelData.debian;
  $scope.save = function () {
    $scope.saving = true;
    save($scope.repo.url, $scope.scripts, function (err) {
      $scope.saving = false;
      if (err) {
        $scope.error(err);
      } else {
        $scope.success('Saved debian scripts');
      }
      $scope.$root.$digest();
    });
  };

}]);

(function () {
  'use strict';

  angular.module('app').controller('FooterController', function () {
    var _this = this;

    // enter the start copyright date here
    _this.startDate = 2015;

    // the date that will be displayed.
    // if date above does not match current date, will be a range
    _this.date = '';

    var date = new Date();
    var year = date.getFullYear();
    if (_this.startDate === year) {
      _this.date = year;
    } else {
      _this.date = _this.startDate + '–' + year;
    }
  });
})();

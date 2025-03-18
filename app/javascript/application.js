// Configure your import map in config/importmap.rb. Read more: https://github.com/rails/importmap-rails
import "@hotwired/turbo-rails"
import "controllers"
import "initializers"

import "@fortawesome/fontawesome-free"
import "channels"

import jquery from 'jquery';
import select2 from 'select2';
import dispatcher from "services/dispatcher";

window.jQuery = jquery
window.$ = jquery
window.dispatcher = dispatcher
select2($);

// Dirty patch to remove tag when pressing backspace
// https://github.com/select2/select2/issues/3354#issuecomment-101853485
// https://github.com/select2/select2/issues/3354#issuecomment-132389291
$.fn.select2.amd.require(['select2/selection/search'], function (Search) {
  var oldRemoveChoice = Search.prototype.searchRemoveChoice;

  Search.prototype.searchRemoveChoice = function () {
      oldRemoveChoice.apply(this, arguments);
      this.$search.val('');
  };
});

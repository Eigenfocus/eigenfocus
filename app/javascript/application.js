// Configure your import map in config/importmap.rb. Read more: https://github.com/rails/importmap-rails
import "@hotwired/turbo-rails"
import "controllers"

import "@fortawesome/fontawesome-free"
import "channels"

import jquery from 'jquery';
import select2 from 'select2';

window.jQuery = jquery
window.$ = jquery
select2($);

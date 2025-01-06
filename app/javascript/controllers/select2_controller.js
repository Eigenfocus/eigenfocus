import { Controller } from "@hotwired/stimulus"
import $ from 'jquery';
import select2 from 'select2';

export default class extends Controller {
  initialize() {
    select2($);
    this.select2 = $(this.element).select2({
      placeholder: this.element.getAttribute('placeholder'),
      width: '100%'
    });

    this.select2.on('select2:select', function () {
      let event = new Event('change', { bubbles: true }) // fire a native event
      this.dispatchEvent(event);
    });

    if (!window.__select2binded__) {
      $(document).on('focus', '.select2-selection.select2-selection--single', function (e) {
        $(this).closest(".select2-container").siblings('select:enabled').select2('open');
      });
    }
    window.__select2binded__ = true;
  }
}
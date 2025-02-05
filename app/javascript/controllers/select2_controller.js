import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  initialize() {
    this.select2 = $(this.element).select2({
      placeholder: this.element.getAttribute('placeholder'),
      width: '100%',
      tags: (this.element.dataset.tags == "true")
    });

    this.select2.on('select2:select', function () {
      let event = new Event('change', { bubbles: true }) // fire a native event
      this.dispatchEvent(event);
    });

    this.select2.on('select2:open', function () {
      window.setTimeout(function () {
        // wait for UI render to show the input
        if (document.querySelector('input.select2-search__field')) {
          document.querySelector('input.select2-search__field').focus();
        }
      }, 0);
    });

    if (!window.__select2binded__) {
      $(document).on('focus', '.select2-selection.select2-selection--single', function (e) {
        $(this).closest(".select2-container").siblings('select:enabled').select2('open');
      });
    }
    window.__select2binded__ = true;
  }
}
import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  initialize() {
    this.select2 = $(this.element).select2({
      placeholder: this.element.getAttribute('placeholder'),
      matcher: (params, data) => {
        // If there are no search terms, return all options
        if ($.trim(params.term) === '') {
          return data;
        }

        // Do not show selected options in the search results
        if ($(this.element).val().includes(data.id.toString())) {
          return null;
        }

        // Apply default matching logic
        return $.fn.select2.defaults.defaults.matcher(params, data);
      },
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

    // avoids opening select2
    this.select2.on('select2:unselecting', function() {
      $(this).data('unselecting', true);
    }).on('select2:opening', function(e) {
      if ($(this).data('unselecting')) {
        $(this).removeData('unselecting');
        e.preventDefault();
      }
    });

    if (!window.__select2binded__) {
      $(document).on('focus', '.select2-selection.select2-selection--single', function (e) {
        $(this).closest(".select2-container").siblings('select:enabled').select2('open');
      });
    }
    window.__select2binded__ = true;
  }
}
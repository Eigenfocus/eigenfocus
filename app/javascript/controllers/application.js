import { Application } from "@hotwired/stimulus"

const application = Application.start()

// Import and register all TailwindCSS Components
import {
  Dropdown,
  Modal
} from "tailwindcss-stimulus-components"

class CustomModal extends Modal {
  static targets = [ "content" ]
  connect() {
    this.element[this.identifier] = this

    super.connect()
    if (!this.containerTarget.classList.contains("hidden")) {
      this.insertBackdrop();
    }
  }

  insertBackdrop() {
    // Insert the background
    if (!this.data.get("disable-backdrop")) {
      document.body.insertAdjacentHTML('beforeend', this.backgroundHtml);
      this.background = document.querySelector(`#${this.backgroundId}`);
      this.background.style.backgroundColor = "rgba(0, 0, 0, 0.35)"
    }
  }

  close(e) {
    super.close(e)
    this.dispatch("closed")
  }
}

application.register('modal', CustomModal)
application.register('dropdown', Dropdown)

// import Flatpickr
import Flatpickr from 'stimulus-flatpickr'

const yearDropdownPlugin = function (pluginConfig) {
  var defaultConfig = {
      text: '',
      theme: "light",
      date: new Date(),
      yearStart: 100,
      yearEnd: 2,

  };

  var config = {};

  for (var key in defaultConfig) {
      config[key] = pluginConfig && pluginConfig[key] !== undefined ? pluginConfig[key] : defaultConfig[key];
  }

  var getYear = function (value) {
      var date = value.split("-");
      return parseInt(date[0], 10);
  }

  var currYear = new Date().getFullYear();
  var selectedYear = getYear(config.date);

  var yearDropdown = document.createElement("select");

  var createSelectElement = function (year) {
      var start = new Date().getFullYear() - config.yearStart;
      var end = currYear + config.yearEnd;

      for (var i = end; i >= start; i--) {
          var option = document.createElement("option");
          option.value = i;
          option.text = i;
          yearDropdown.appendChild(option);
      }
      yearDropdown.value = selectedYear;
  };

  return function (fp) {
      fp.yearSelectContainer = fp._createElement(
          "div",
          "flatpickr-year-select-wrapper " + config.theme + "Theme",
          config.text
      );

      fp.yearSelectContainer.tabIndex = -1;
      createSelectElement(selectedYear);
      yearDropdown.addEventListener('change', function (evt) {
          var year = evt.target.options[evt.target.selectedIndex].value;
          fp.changeYear(year);
      });

      fp.yearSelectContainer.append(yearDropdown);

      return {
        onChange: (selectedDates, dateStr, instance) => {
          // Close the Flatpickr instance when a date is selected
          // This also helps integration tests for cases where
          // the calendar picker closes after we fill the date input manually
          instance.close();
        },
        onReady: function onReady() {
            var name = fp.monthNav.className;
            const yearInputCollection = fp.calendarContainer.getElementsByClassName(name);
            const el = yearInputCollection[0];
            el.append(fp.yearSelectContainer);
        }
      };
  };
}

const clearButtonPlugin = function (pluginConfig) {

  return function (fp) {
    const clearButton = document.createElement('button')
    clearButton.innerHTML = '<i class="fa-solid fa-arrow-rotate-left"></i>'
    clearButton.className = 'flatpickr-clear-button cpy-flatpickr-clear-button'

    clearButton.addEventListener('click', (e) => {
      e.stopPropagation()
      fp.clear()
      fp.close()
    })

    return {
      onReady: function onReady() {
        pluginConfig.input.insertAdjacentElement('afterend', clearButton)
      }
    }
  }
}
// create a new Stimulus controller by extending stimulus-flatpickr wrapper controller
class CustomFlatpickr extends Flatpickr {
  initialize() {
    super.initialize()
    // sets your language (you can also set some global setting for all time pickers)

    this.config = {
      allowInput: true,
      plugins: [
        new yearDropdownPlugin({
          date: this.element.value,
          yearStart: 10,
          yearEnd: 10
        }),
        clearButtonPlugin({
          input: this.element
        })
      ],
    }
  }

  clear() {
    this.instance.clear()
    this.element.value = ''
    this.dispatch('clear')
  }
}
// Manually register Flatpickr as a stimulus controller
application.register('flatpickr', CustomFlatpickr)

// Configure Stimulus development experience
application.debug = false
window.Stimulus   = application

export { application }

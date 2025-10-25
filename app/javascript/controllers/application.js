import { Application } from "@hotwired/stimulus"

const application = Application.start()

// Import and register all TailwindCSS Components
import {
  Dropdown,
  Modal,
  Popover,
} from "tailwindcss-stimulus-components"

class CustomModal extends Modal {
  connect() {
    if (this.isDialog) {
      return
    }

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
    if (this.isDialog) {
      this.element.close()
      return
    }
    super.close(e)
    // Removing this one to allow "double modal"
    // for alerts/confirm messages
    // this.dispatch("closed")
  }

  get isDialog() {
    return this.element.tagName === "DIALOG"
  }
}

application.register('modal', CustomModal)
application.register('dropdown', Dropdown)
application.register('popover', Popover)

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

  var getYearFromDate = function (value) {
      var date = value.split("-");
      return parseInt(date[0], 10);
  }

  var currYear = new Date().getFullYear();
  var selectedYear = new Date().getFullYear();

  if (config.date) {
    selectedYear = getYearFromDate(config.date);
  }

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
      onChange:function (){
        if (fp.input.value === '') {
          clearButton.style.display = 'none'
        } else {
          clearButton.style.display = 'block'
        }
      },
      onReady: function onReady() {
        pluginConfig.input.insertAdjacentElement('afterend', clearButton)
      }
    }
  }
}
// create a new Stimulus controller by extending stimulus-flatpickr wrapper controller
class CustomFlatpickr extends Flatpickr {
  initialize() {
    if (!this.element.dataset.flatpickrDateFormat) {
      this.element.dataset.flatpickrDateFormat = "Y-m-d";
    }

    super.initialize()

    const showClearButton = this.element.dataset.showClearButton

    const plugins = [
      new yearDropdownPlugin({
        date: this.element.value,
        yearStart: 10,
        yearEnd: 10
      })
    ]

    if (showClearButton) {
      plugins.push(clearButtonPlugin({
        input: this.element
      }))
    }
    this.config = {
      allowInput: true,
      plugins: plugins,
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

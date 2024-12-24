import { Controller } from "@hotwired/stimulus";

import moment from 'moment';

function minutesToHHMM(totalInMinutes) {
  let minutes = totalInMinutes % 60;
  let hours = (totalInMinutes - minutes)/60;
  minutes = minutes.toString().padStart(2, "0")
  hours = hours.toString().padStart(2, "0")

  return `${hours}:${minutes}`;
}

export default class extends Controller {
  static values = {
    loggedTimeInMinutes: Number,
    startedAt: String
  }

  start() {
    this.timer = window.setInterval(() => {
      this.render();
    }, 1000)
  }

  render() {
    let startDate = moment.parseZone(this.startedAtValue);
    let now = moment.utc();

    let diffInMinutes = now.diff(startDate, 'minutes', true);

    let totalTimeUntilNow = parseInt(diffInMinutes) + this.loggedTimeInMinutesValue;
    this.element.innerHTML = minutesToHHMM(totalTimeUntilNow);
  }

  startedAtValueChanged() {
    if (this.startedAtValue == '') {
      this.stop();
    } else {
      this.start();
    }
  }

  stop() {
    window.clearTimeout(this.timer);
  }

  disconnect() {
    this.stop();
  }
}

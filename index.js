const date = new Date();
const simpleDate = {
  day: date.getDate(),
  month: date.getMonth() + 1, // add +1 because months start at 0 like any array
  year: date.getFullYear()
};

const dateFormatOption = {
  month: "long",
  day: "2-digit"
};

const sliderSettings = {};

function beforeChristParse(value) {
  // If the year seems B.C., return the same but negative value
  if (new RegExp(/BC/).test(value)) {
    return -parseInt(value, 10);
  } else {
    return parseInt(value, 10);
  }
}

document.addEventListener("DOMContentLoaded", function () {
  const options = {};
  const elems = document.querySelectorAll(".collapsible");
  const instances = M.Collapsible.init(elems, options);
});

document.addEventListener("DOMContentLoaded", function () {
  const options = { format: "mmmm dd" };
  const elems = document.querySelectorAll(".datepicker");
  const instances = M.Datepicker.init(elems, options);
});

// Header
const header = new Vue({
  el: "#header",
  data: {
    inputDate: date.toLocaleDateString("en-EN", dateFormatOption)
  },
  methods: {
    changeDate: function () {
      const date = new Date(this.inputDate);

      const newDate = {
        day: date.getDate(),
        month: date.getMonth() + 1
      };

      events.getEventsWithoutSliders(newDate.month, newDate.day);
      births.getBirthsWithoutSliders(newDate.month, newDate.day);
      deaths.getDeathsWithoutSliders(newDate.month, newDate.day);
    }
  }
});

// Events
const events = new Vue({
  el: "#events",
  data() {
    return {
      info: null,
      length: null,
      fullInfo: null
    };
  },
  mounted() {
    this.getEvents(simpleDate.month, simpleDate.day);
  },
  methods: {
    getEvents(month, day) {
      axios
        .get(
          "https://byabbe.se/on-this-day/" + month + "/" + day + "/events.json"
        )
        .then(
          (response) => (
            (this.info = response.data.events),
            (this.fullInfo = response.data.events),
            (this.length = response.data.events.length),
            this.sliderInit()
          )
        );
    },
    getEventsWithoutSliders(month, day) {
      axios
        .get(
          "https://byabbe.se/on-this-day/" + month + "/" + day + "/events.json"
        )
        .then(
          (response) => (
            (this.info = response.data.events),
            (this.fullInfo = response.data.events),
            (this.length = response.data.events.length)
          )
        );
    },
    sliderInit() {
      const value = {
        min: beforeChristParse(this.info[0].year),
        max: beforeChristParse(this.info[this.info.length - 1].year)
      };

      const eventSlider = document.querySelector("#sliderEvent");
      const format = wNumb({
        decimals: 0
      });
      const slider = noUiSlider.create(eventSlider, {
        start: [value.min, value.max],
        connect: true,
        margin: 5,
        tooltips: [format, format],
        pips: {
          mode: "steps",
          density: 5,
          format: format
        },
        range: {
          min: value.min,
          max: value.max
        }
      });

      const update = this.updateData;
      eventSlider.noUiSlider.on("end", function (event) {
        const sliderValue = {
          start: Math.round(event[0]),
          end: Math.round(event[1])
        };
        update(sliderValue);
      });
    },
    updateData(sliderValue) {
      this.info = this.fullInfo.filter(function (event) {
        return (
          beforeChristParse(event.year) >= sliderValue.start &&
          beforeChristParse(event.year) <= sliderValue.end
        );
      });
      this.length = this.info.length;
    }
  }
});

// Births
const births = new Vue({
  el: "#births",
  data() {
    return {
      info: null,
      fullInfo: null,
      length: null
    };
  },
  mounted() {
    this.getBirths(simpleDate.month, simpleDate.day);
  },
  methods: {
    getBirths: function (month, day) {
      axios
        .get(
          "https://byabbe.se/on-this-day/" + month + "/" + day + "/births.json"
        )
        .then(
          (response) => (
            (this.info = response.data.births),
            (this.fullInfo = response.data.births),
            (this.length = response.data.births.length),
            this.sliderInit()
          )
        );
    },
    getBirthsWithoutSliders(month, day) {
      axios
        .get(
          "https://byabbe.se/on-this-day/" + month + "/" + day + "/births.json"
        )
        .then(
          (response) => (
            (this.info = response.data.births),
            (this.fullInfo = response.data.births),
            (this.length = response.data.births.length)
          )
        );
    },
    sliderInit() {
      const value = {
        min: beforeChristParse(this.info[0].year),
        max: beforeChristParse(this.info[this.info.length - 1].year)
      };

      const eventSlider = document.querySelector("#sliderBirths");
      const format = wNumb({
        decimals: 0
      });
      const slider = noUiSlider.create(eventSlider, {
        start: [value.min, value.max],
        connect: true,
        margin: 5,
        tooltips: [format, format],
        pips: {
          mode: "steps",
          density: 5,
          format: format
        },
        range: {
          min: value.min,
          max: value.max
        }
      });

      const update = this.updateData;
      eventSlider.noUiSlider.on("end", function (event) {
        const sliderValue = {
          start: Math.round(event[0]),
          end: Math.round(event[1])
        };
        update(sliderValue);
      });
    },
    updateData(sliderValue) {
      this.info = this.fullInfo.filter(function (event) {
        return (
          beforeChristParse(event.year) >= sliderValue.start &&
          beforeChristParse(event.year) <= sliderValue.end
        );
      });
      this.length = this.info.length;
    }
  }
});

// Deaths
const deaths = new Vue({
  el: "#deaths",
  data() {
    return {
      info: null,
      fullInfo: null,
      length: null
    };
  },
  mounted() {
    this.getDeaths(simpleDate.month, simpleDate.day);
  },
  methods: {
    getDeaths: function (month, day) {
      axios
        .get(
          "https://byabbe.se/on-this-day/" + month + "/" + day + "/deaths.json"
        )
        .then(
          (response) => (
            (this.info = response.data.deaths),
            (this.fullInfo = response.data.deaths),
            (this.length = response.data.deaths.length),
            this.sliderInit()
          )
        );
    },
    getDeathsWithoutSliders(month, day) {
      axios
        .get(
          "https://byabbe.se/on-this-day/" + month + "/" + day + "/deaths.json"
        )
        .then(
          (response) => (
            (this.info = response.data.deaths),
            (this.fullInfo = response.data.deaths),
            (this.length = response.data.deaths.length)
          )
        );
    },
    sliderInit() {
      const value = {
        min: beforeChristParse(this.info[0].year),
        max: beforeChristParse(this.info[this.info.length - 1].year)
      };

      const eventSlider = document.querySelector("#sliderDeaths");
      const format = wNumb({
        decimals: 0
      });
      const slider = noUiSlider.create(eventSlider, {
        start: [value.min, value.max],
        connect: true,
        margin: 5,
        tooltips: [format, format],
        pips: {
          mode: "steps",
          density: 5,
          format: format
        },
        range: {
          min: value.min,
          max: value.max
        }
      });

      const update = this.updateData;
      eventSlider.noUiSlider.on("end", function (event) {
        const sliderValue = {
          start: Math.round(event[0]),
          end: Math.round(event[1])
        };
        update(sliderValue);
      });
    },
    updateData(sliderValue) {
      this.info = this.fullInfo.filter(function (event) {
        return (
          beforeChristParse(event.year) >= sliderValue.start &&
          beforeChristParse(event.year) <= sliderValue.end
        );
      });
      this.length = this.info.length;
    }
  }
});

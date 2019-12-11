const date = new Date();
const simpleDate = {
  day: date.getDate(),
  month: date.getMonth() + 1, // add +1 because months start at 0 like any array
  year: date.getFullYear()
}


function formatDate(integer) {
  if (integer.toString().length < 2) {
    return '0' + integer
  } else {
    return integer
  }
}

const header = new Vue({
  el: '#header',
  data: {
    title: simpleDate.day + '/' + simpleDate.month,
    completeDate: date,
    inputDate: simpleDate.year + '-' + formatDate(simpleDate.month) + '-' + formatDate(simpleDate.day)
  },
  methods: {
    changeDate: function (inputDate) {
      const arrayDate = inputDate.split('-');
      const newDate = {
        day: parseInt(arrayDate[2]),
        month: parseInt(arrayDate[1])
      }
      this.title = newDate.day + '/' + newDate.month;
      events.getEvents(newDate.month, newDate.day);
    },
  }
})

const events = new Vue({
  el: '#events',
  data() {
    return {
      info: null,
      length: null,
      fullInfo: null
    }
  },
  mounted() {
    this.getEvents(simpleDate.month, simpleDate.day);
  },
  methods: {

    getEvents(month, day) {
      axios
        .get('https://byabbe.se/on-this-day/' + month + '/' + day + '/events.json')
        .then(response => (
          this.info = response.data.events,
          this.fullInfo = response.data.events,
          this.length = response.data.events.length,
          this.sliderInit()))

    },
    sliderInit() {
      const value = {
        min: this.info[0].year,
        max: this.info[this.info.length - 1].year
      };

      const eventSlider = document.querySelector('#sliderEvent');
      const format = wNumb({
        decimals: 0
      });
      const slider = noUiSlider.create(eventSlider, {
        start: [parseInt(value.min, 10), parseInt(value.max, 10)],
        connect: true,
        margin: 5,
        tooltips: [format, format],
        pips: {
          mode: 'steps',
          density: 5,
          format: format
        },
        range: {
          min: parseInt(value.min, 10),
          max: parseInt(value.max, 10)
        }
      })

      const update = this.updateData;
      eventSlider.noUiSlider.on('end', function (event) {
        const sliderValue = {
          start: Math.round(event[0]),
          end: Math.round(event[1])
        }
        update(sliderValue);
      });
    },
    updateData(sliderValue) {
      this.info = this.fullInfo.filter(function (event) {
        return event.year >= sliderValue.start && event.year <= sliderValue.end
      })
      this.length = this.info.length;
    },
  }
})



const births = new Vue({
  el: '#births',
  data() {
    return {
      info: null,
      fullInfo: null,
      length: null
    }
  },
  mounted() {
    this.getBirths(simpleDate.month, simpleDate.day);
  },
  methods: {
    getBirths: function (month, day) {
      axios
        .get('https://byabbe.se/on-this-day/' + month + '/' + day + '/births.json')
        .then(response => (
          this.info = response.data.births,
          this.fullInfo = response.data.births,
          this.length = response.data.births.length,
          this.sliderInit()))
    },
    sliderInit() {
      const value = {
        min: this.info[0].year,
        max: this.info[this.info.length - 1].year
      };

      const eventSlider = document.querySelector('#sliderBirths');
      const format = wNumb({
        decimals: 0
      });
      const slider = noUiSlider.create(eventSlider, {
        start: [parseInt(value.min, 10), parseInt(value.max, 10)],
        connect: true,
        margin: 5,
        tooltips: [format, format],
        pips: {
          mode: 'steps',
          density: 5,
          format: format
        },
        range: {
          min: parseInt(value.min, 10),
          max: parseInt(value.max, 10)
        }
      })

      const update = this.updateData;
      eventSlider.noUiSlider.on('end', function (event) {
        const sliderValue = {
          start: Math.round(event[0]),
          end: Math.round(event[1])
        }
        update(sliderValue);
      });
    },
    updateData(sliderValue) {
      this.info = this.fullInfo.filter(function (event) {
        return event.year >= sliderValue.start && event.year <= sliderValue.end
      })
      this.length = this.info.length;
    }
  }
})

const deaths = new Vue({
  el: '#deaths',
  data() {
    return {
      info: null,
      fullInfo:null,
      length: null
    }
  },
  mounted() {
    this.getDeaths(simpleDate.month, simpleDate.day);
  },
  methods: {
    getDeaths: function (month, day) {
      axios
        .get('https://byabbe.se/on-this-day/' + month + '/' + day + '/deaths.json')
        .then(response => (
          this.info = response.data.deaths,
          this.fullInfo = response.data.deaths,
          this.length = response.data.deaths.length,
          this.sliderInit()))
    },
    sliderInit() {
      const value = {
        min: this.info[0].year,
        max: this.info[this.info.length - 1].year
      };

      const eventSlider = document.querySelector('#sliderDeaths');
      const format = wNumb({
        decimals: 0
      });
      const slider = noUiSlider.create(eventSlider, {
        start: [parseInt(value.min, 10), parseInt(value.max, 10)],
        connect: true,
        margin: 5,
        tooltips: [format, format],
        pips: {
          mode: 'steps',
          density: 5,
          format: format
        },
        range: {
          min: parseInt(value.min, 10),
          max: parseInt(value.max, 10)
        }
      })

      const update = this.updateData;
      eventSlider.noUiSlider.on('end', function (event) {
        const sliderValue = {
          start: Math.round(event[0]),
          end: Math.round(event[1])
        }
        update(sliderValue);
      });
    },
    updateData(sliderValue) {
      this.info = this.fullInfo.filter(function (event) {
        return event.year >= sliderValue.start && event.year <= sliderValue.end
      })
      this.length = this.info.length;
    }
  }
})
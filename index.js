const date = new Date();
const simpleDate = {
  day: date.getDate(),
  month: date.getMonth() + 1, // add +1 because months start at 0 like any array
  year: date.getFullYear()
}


function formatDate(integer) {
  if(integer.toString().length < 2) {
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
    }
  }
})

const events = new Vue({
  el: '#events',
  data() {
    return {
      info: null
    }
  },
  mounted() {
    this.getEvents(simpleDate.month, simpleDate.day);
  },
  methods: {
    getEvents: function (month, day) {
      axios
        .get('https://byabbe.se/on-this-day/' + month + '/' + day + '/events.json')
        .then(response => (this.info = response.data.events))
    }
  }
})

const births = new Vue({
  el: '#births',
  data() {
    return {
      info: null
    }
  },
  mounted() {
    this.getBirths(simpleDate.month, simpleDate.day);
  },
  methods: {
    getBirths: function (month, day) {
      axios
        .get('https://byabbe.se/on-this-day/' + month + '/' + day + '/births.json')
        .then(response => (this.info = response.data.births))
    }
  }
})

const deaths = new Vue({
  el: '#deaths',
  data() {
    return {
      info: null
    }
  },
  mounted() {
    this.getDeaths(simpleDate.month, simpleDate.day);
  },
  methods: {
    getDeaths: function (month, day) {
      axios
        .get('https://byabbe.se/on-this-day/' + month + '/' + day + '/deaths.json')
        .then(response => (this.info = response.data.deaths))
    }
  }
})
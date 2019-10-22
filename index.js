const date = new Date();
const simpleDate = {
  day: Number = date.getDate(),
  month: Number = date.getMonth()+1, // add +1 because months start at 0 like any array
}

new Vue({
  el: '#header',
  data: {
    title: simpleDate.month + '/' + simpleDate.day
  }
})

new Vue({
  el: '#events',
  data () {
    return {
      info: null
    }
  },
  mounted () {
    axios
      .get('https://byabbe.se/on-this-day/' + simpleDate.month + '/' + simpleDate.day + '/events.json')
      .then(response => (this.info = response.data.events))
  }
})

new Vue({
  el: '#births',
  data () {
    return {
      info: null
    }
  },
  mounted () {
    axios
      .get('https://byabbe.se/on-this-day/' + simpleDate.month + '/' + simpleDate.day + '/births.json')
      .then(response => (this.info = response.data.births))
  }
})

new Vue({
  el: '#deaths',
  data () {
    return {
      info: null
    }
  },
  mounted () {
    axios
      .get('https://byabbe.se/on-this-day/' + simpleDate.month + '/' + simpleDate.day + '/deaths.json')
      .then(response => (this.info = response.data.deaths))
  }
})





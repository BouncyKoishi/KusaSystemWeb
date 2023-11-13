<template>
  <div>
    <button v-on:click="displaySetting">Settings</button>
    <div v-if="settingShow" class="setting">
      <input type="text" v-model="dataText">
      <button @click="dataExport">Export</button>
      <button @click="dataImport">Import</button>
    </div>
    <div class="dataDisplay">
      <div>
        Kusa: {{kusa}}
        <button @click="kusaGrow">Kusa Grow(*{{field}})</button>
      </div>
      <div>
        Field: {{field}}
        <button v-tool @click="buy('field')">Buy Field(Cost: {{itemPrice('field')}})</button>
        <button v-tool @click="buyMulti('field', 5)">*5(Cost: {{itemPriceMulti('field', 5)}})</button>
        <button v-tool @click="buyMulti('field', 25)">*25(Cost: {{itemPriceMulti('field', 25)}})</button>
      </div>
      <div>
        Machine: {{machine}}
        <button @click="buy('machine')">Buy Machine(Cost: {{itemPrice('machine')}})</button>
        <button @click="buyMulti('machine', 5)">*5(Cost: {{itemPriceMulti('machine', 5)}})</button>
        <button @click="buyMulti('machine', 25)">*25(Cost: {{itemPriceMulti('machine', 25)}})</button>
      </div>
      <div>
        Factory: {{factory}}
        <button @click="buyfactory">Buy Factory(Price: 80 * Machine + 1000)</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Main',
  data () {
    return {
      kusa: 0,
      field: 1,
      machine: 0,
      factory: 0,
      machineTimer: null,
      dataText: null,
      settingShow: false
    }
  },

  mounted () {
    this.machineTimer = setInterval(this.kusaAutoGrow, 1000)
  },

  methods: {
    dataImport () {
      const data = JSON.parse(this.dataText)
      this.kusa = data.kusa
      this.field = data.field
      this.machine = data.machine
      this.factory = data.factory
    },
    dataExport () {
      this.dataText = JSON.stringify({
        kusa: this.kusa,
        field: this.field,
        machine: this.machine,
        factory: this.factory
      })
    },
    kusaGrow () {
      this.kusa += Math.ceil(this.field * Math.random() * 5)
    },
    buy (itemName) {
      var price = this.itemPrice(itemName)
      if (this.kusa >= price) {
        this.kusa -= price
        this[itemName] += 1
      }
    },
    buyMulti (itemName, buyAmount) {
      var price = this.itemPriceMulti(itemName, buyAmount)
      if (this.kusa >= price) {
        this.kusa -= price
        this[itemName] += buyAmount
      }
    },
    buyfactory () {
      var price = 1000
      if (this.kusa >= price && this.machine >= 80) {
        this.kusa -= price
        this.machine -= 80
        this.factory += 1
      }
    },
    kusaAutoGrow () {
      this.kusa += this.machine
      this.kusa += this.factory * 80
    },
    itemPrice (itemName) {
      var item = this.getItemInfo(itemName)
      return Math.floor(item['basePrice'] * Math.pow(item['basePow'], item['amount']))
    },
    itemPriceMulti (itemName, buyAmount) {
      var item = this.getItemInfo(itemName)
      var price = 0
      for (let i = 0; i < buyAmount; i++) {
        price += Math.floor(item['basePrice'] * Math.pow(item['basePow'], item['amount'] + i))
      }
      return price
    },
    getItemInfo (itemName) {
      var items = {
        field: {
          basePrice: 100,
          basePow: 1.05,
          amount: this.field
        },
        machine: {
          basePrice: 25,
          basePow: 1.02,
          amount: this.machine
        }
      }
      return items[itemName]
    },
    displaySetting () {
      this.settingShow = !this.settingShow
    }
  },
  beforeDestroy () {
    clearInterval(this.machineTimer)
  }
}
</script>

<style scoped>
.setting {
  display: flex;
  align-items: center;
}
input {
  width: 100px;
  height: 200px;
  margin-bottom: 10px;
}
.dataDisplay {
  display: block;
  align-items: center;
}
button {
  margin: 5px 10px;
}

</style>

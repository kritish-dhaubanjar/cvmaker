<template>
  <div class="col-12 mb-4 px-0">
    <div class="card shadow-sm">
      <div class="card-body">
        <div class="row no-gutters">
          <div class="col-10">
            <p class="mb-1">
              <b>{{title}}</b>
              <br />
              <i>{{job}}</i>
            </p>
            <ul v-if="work.description.length>0">
              <li v-for="(description,index) in work.description" :key="index">{{description.text}}</li>
            </ul>
          </div>
          <div class="col-2 text-right">
            <a href="#">
              <i class="far fa-edit ml-3" @click="$emit('edit', index)"></i>
            </a>
            <a href="#">
              <i class="far fa-trash-alt ml-3" @click="$emit('remove', index)"></i>
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["work", "index"],
  computed: {
    title() {
      let detail = "";
      this.work.employer !== null && this.work.employer.length > 0
        ? (detail += this.work.employer)
        : null;
      this.work.city !== null && this.work.city.length > 0
        ? (detail += `, ${this.work.city}`)
        : null;
      this.work.state !== null && this.work.state.length > 0
        ? (detail += `, ${this.work.state}`)
        : null;
      this.work.country !== null && this.work.country.length > 0
        ? (detail += `, ${this.work.country}`)
        : null;
      return detail;
    },

    job() {
      let detail = "";
      this.work.title !== null && this.work.title.length > 0
        ? (detail += `${this.work.title}`)
        : null;

      if (this.work.startDate !== null && this.work.startDate.length > 0) {
        detail += ", ";
        let date = this.work.startDate.split("-");
        detail += ` ${this.getMonth(date[1])}`;
        detail += ` ${date[0]}`;
      }

      if (!this.work.isCurrent) {
        if (this.work.endDate !== null && this.work.endDate.length > 0) {
          detail += " -";
          let date = this.work.endDate.split("-");
          detail += ` ${this.getMonth(date[1])}`;
          detail += ` ${date[0]}`;
        }
      } else {
        detail += " - Present";
      }

      return detail;
    }
  },

  methods: {
    getMonth(month) {
      switch (month) {
        case "01":
          return "January";
          break;
        case "02":
          return "Feburary";
          break;
        case "03":
          return "March";
          break;
        case "04":
          return "April";
          break;
        case "05":
          return "May";
          break;
        case "06":
          return "June";
          break;
        case "07":
          return "July";
          break;
        case "08":
          return "August";
          break;
        case "09":
          return "September";
          break;
        case "10":
          return "October";
          break;
        case "11":
          return "November";
          break;
        case "12":
          return "December";
          break;
        default:
          return "";
          break;
      }
    }
  }
};
</script>

<style scoped>
.card {
  cursor: move !important;
}
li {
  font-size: 13px;
}
</style>

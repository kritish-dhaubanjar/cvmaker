<template>
  <div class="col-12 mb-4 px-0">
    <div class="card shadow-sm">
      <div class="card-body">
        <div class="row no-gutters">
          <div class="col-10">
            <p class="mb-1">
              <b>{{title}}</b>
              <br />
              <i>{{education}}</i>
            </p>
            <ul v-if="academic.description.length>0">
              <li>{{academic.description[0].text}}</li>
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
  props: ["academic", "index"],
  computed: {
    title() {
      let detail = "";
      this.academic.name !== null && this.academic.name.length > 0
        ? (detail += this.academic.name)
        : null;
      this.academic.location !== null && this.academic.location.length > 0
        ? (detail += `, ${this.academic.location}`)
        : null;
      return detail;
    },
    education() {
      let detail = "";

      if (
        this.academic.fieldOfStudy !== null &&
        this.academic.fieldOfStudy.length > 0 &&
        this.academic.degree !== null &&
        this.academic.degree.length > 0
      ) {
        detail += `${this.academic.degree} in ${this.academic.fieldOfStudy}`;
      } else if (
        this.academic.degree !== null &&
        this.academic.degree.length > 0
      ) {
        detail += this.academic.degree;
      }

      if (
        this.academic.startDate !== null &&
        this.academic.startDate.length > 0
      ) {
        detail += ", Enrolled ";
        let date = this.academic.startDate.split("-");
        detail += ` ${this.getMonth(date[1])}`;
        detail += ` ${date[0]}`;
      }

      if (
        this.academic.startDate !== null &&
        this.academic.startDate.length > 0 &&
        ((this.academic.endDate !== null && this.academic.endDate.length > 0) ||
          this.academic.isCurrent)
      ) {
        detail += " - ";
      } else if (
        (this.academic.startDate !== null &&
          this.academic.startDate.length > 0 &&
          this.academic.endDate !== null &&
          this.academic.endDate.length > 0) ||
        this.academic.isCurrent
      ) {
        detail += ", ";
      }

      if (!this.academic.isCurrent) {
        if (
          this.academic.endDate !== null &&
          this.academic.endDate.length > 0
        ) {
          detail +=
            this.academic.startDate !== null &&
            this.academic.startDate.length > 0
              ? ""
              : ", ";
          detail += "Graduated";
          let date = this.academic.endDate.split("-");
          detail += ` ${this.getMonth(date[1])}`;
          detail += ` ${date[0]}`;
        }
      } else {
        detail += "Present";
      }
      return detail;
    }
  },

  mounted() {},

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

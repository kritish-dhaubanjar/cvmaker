<template>
  <div id="resume" class="py-5">
    <div class="container">
      <div class="row mb-4">
        <div class="col-12 text-right">
          <div class="dropdown">
            <button
              class="btn btn-danger dropdown-toggle btn-sm"
              type="button"
              data-toggle="dropdown"
            >Select a Section</button>
            <div class="dropdown-menu">
              <a
                href="#"
                class="dropdown-item"
                :class="current == 0 ? 'active': ''"
                @click="current=0"
              >Heading</a>
              <a
                href="#"
                class="dropdown-item"
                :class="current == 1 ? 'active': ''"
                @click="current=1"
              >Work History</a>
              <a
                href="#"
                class="dropdown-item"
                :class="current == 2 ? 'active': ''"
                @click="current=2"
              >Education</a>
              <a
                href="#"
                class="dropdown-item"
                :class="current == 3 ? 'active': ''"
                @click="current=3"
              >Skills</a>
              <a
                href="#"
                class="dropdown-item"
                :class="current == 4 ? 'active': ''"
                @click="current=4"
              >Languages</a>
              <a
                href="#"
                class="dropdown-item"
                :class="current == 5 ? 'active': ''"
                @click="current=5"
              >Strengths</a>
              <a
                href="#"
                class="dropdown-item"
                :class="current == 6 ? 'active': ''"
                @click="current=6"
              >Personal Info</a>
              <a
                href="#"
                class="dropdown-item"
                :class="current == 7 ? 'active': ''"
                @click="current=7"
              >License</a>
              <a
                href="#"
                class="dropdown-item"
                :class="current == 8 ? 'active': ''"
                @click="current=8"
              >Trainings &amp; Courses</a>
              <a
                href="#"
                class="dropdown-item"
                :class="current == 9 ? 'active': ''"
                @click="current=9"
              >Certifications &amp; Awards</a>
              <a
                href="#"
                class="dropdown-item"
                :class="current == 10 ? 'active': ''"
                @click="current=10"
              >Summary</a>
              <a
                href="#"
                class="dropdown-item"
                :class="current == 11 ? 'active': ''"
                @click="current=11"
              >Declaration</a>
              <a
                href="#"
                class="dropdown-item"
                :class="current == 12 ? 'active': ''"
                @click="current=12"
              >References</a>
              <a
                href="#"
                class="dropdown-item"
                :class="current == 13 ? 'active': ''"
                @click="current=13"
              >Additional Sections</a>
              <a
                href="#"
                class="dropdown-item"
                :class="current == 14 ? 'active': ''"
                @click="current=14"
              >Finish</a>
            </div>
          </div>
        </div>
      </div>
    </div>
    <keep-alive>
      <component
        :is="components[current]"
        @next="next"
        @prev="prev"
        :resume="resume"
        :id="id"
        :photo="photo"
        @section="section"
      ></component>
    </keep-alive>
  </div>
</template>

<script>
import Heading from "./sections/Heading";
import WorkHistory from "./sections/WorkHistory";
import Education from "./sections/Education";
import Skills from "./sections/Skills";
import Languages from "./sections/Languages";
import Strengths from "./sections/Strengths";
import Declaration from "./sections/Declaration";
import Summary from "./sections/Summary";
import Personal from "./sections/Personal";
import Training from "./sections/Training";
import Certifications from "./sections/Certifications";
import License from "./sections/License";
import Additional from "./sections/Additional";
import References from "./sections/References";
import Finalize from "./sections/Finalize";

export default {
  props: ["id"],
  data() {
    return {
      components: [
        Heading,
        WorkHistory,
        Education,
        Skills,
        Languages,
        Strengths,
        Personal,
        License,
        Training,
        Certifications,
        Summary,
        Declaration,
        References,
        Additional,
        Finalize
      ],

      // components: [],

      resume: [],
      photo: "",
      current: -1
    };
  },
  mounted() {
    if (this.id != null) {
      fetch(`${this.hostname}/api/clients/${this.id}`)
        .then(res => res.json())
        .then(data => {
          this.resume = data.data;
          this.photo = data.photo;
          this.current = 0;
        })
        .catch(err => {
          console.log(err);
        });
    } else {
      this.current = 0;
    }
  },
  methods: {
    next(data) {
      let index = this.resume.findIndex(section => section.meta === data.meta);
      index === -1 ? this.resume.push(data) : (this.resume[index] = data);
      this.current++;
    },
    prev() {
      this.current--;
    },
    section(meta) {
      switch (meta) {
        case "header":
          this.current = 0;
          break;
        case "workHistory":
          this.current = 1;
          break;
        case "education":
          this.current = 2;
          break;
        case "skills":
          this.current = 3;
          break;
        case "languages":
          this.current = 4;
          break;
        case "strengths":
          this.current = 5;
          break;
        case "info":
          this.current = 6;
          break;
        case "licenses":
          this.current = 7;
          break;
        case "trainings_courses":
          this.current = 8;
          break;
        case "certifications_awards":
          this.current = 9;
          break;
        case "summary":
          this.current = 10;
          break;
        case "declaration":
          this.current = 11;
          break;
        case "references":
          this.current = 12;
          break;
        case "additional":
          this.current = 13;
          break;
      }
    }
  }
};
</script>

<style scoped lang="scss">
@import "./../colors.scss";
.dropdown-toggle {
  color: #fff;
  font-weight: bold;
  border-radius: 10rem;
  padding-left: 1rem;
  padding-right: 1rem;

  &:focus,
  &:hover,
  &:active {
    outline: none;
    box-shadow: none !important;
  }
}

.active {
  background-color: $primary;
  color: #fff !important;
  font-weight: bold;
  border-bottom: 0 !important;
}
</style>

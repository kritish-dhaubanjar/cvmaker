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
            >
              Select a Section
            </button>
            <div class="dropdown-menu">
              <a
                href="#"
                class="dropdown-item"
                :class="current == 0 ? 'active' : ''"
                @click="current = 0"
                >Heading</a
              >
              <a
                href="#"
                class="dropdown-item"
                :class="current == 1 ? 'active' : ''"
                @click="current = 1"
                >Work History</a
              >
              <a
                href="#"
                class="dropdown-item"
                :class="current == 2 ? 'active' : ''"
                @click="current = 2"
                >Education</a
              >
              <a
                href="#"
                class="dropdown-item"
                :class="current == 3 ? 'active' : ''"
                @click="current = 3"
                >Skills</a
              >
              <a
                href="#"
                class="dropdown-item"
                :class="current == 4 ? 'active' : ''"
                @click="current = 4"
                >Languages</a
              >
              <a
                href="#"
                class="dropdown-item"
                :class="current == 5 ? 'active' : ''"
                @click="current = 5"
                >Strengths</a
              >
              <a
                href="#"
                class="dropdown-item"
                :class="current == 6 ? 'active' : ''"
                @click="current = 6"
                >Personal Info</a
              >
              <a
                href="#"
                class="dropdown-item"
                :class="current == 7 ? 'active' : ''"
                @click="current = 7"
                >License</a
              >
              <a
                href="#"
                class="dropdown-item"
                :class="current == 8 ? 'active' : ''"
                @click="current = 8"
                >Trainings &amp; Courses</a
              >
              <a
                href="#"
                class="dropdown-item"
                :class="current == 9 ? 'active' : ''"
                @click="current = 9"
                >Certifications &amp; Awards</a
              >
              <a
                href="#"
                class="dropdown-item"
                :class="current == 10 ? 'active' : ''"
                @click="current = 10"
                >Summary</a
              >
              <a
                href="#"
                class="dropdown-item"
                :class="current == 11 ? 'active' : ''"
                @click="current = 11"
                >Declaration</a
              >
              <a
                href="#"
                class="dropdown-item"
                :class="current == 12 ? 'active' : ''"
                @click="current = 12"
                >References</a
              >
              <a
                href="#"
                class="dropdown-item"
                :class="current == 13 ? 'active' : ''"
                @click="current = 13"
                >Additional Sections</a
              >
              <a
                href="#"
                class="dropdown-item"
                :class="current == 14 ? 'active' : ''"
                @click="current = 14"
                >Finish</a
              >
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
        @saveresume="saveresume"
        @save="save"
      ></component>
    </keep-alive>
    <div
      class="toast"
      role="alert"
      aria-live="assertive"
      aria-atomic="true"
      id="toast"
    >
      <div class="toast-header">
        <strong class="mr-auto">Section Saved</strong>
        <button
          type="button"
          class="ml-2 mb-1 close"
          data-dismiss="toast"
          aria-label="Close"
        >
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="toast-body">The changes were saved successfully!</div>
    </div>
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
          /*this.resume = data.data;*/
          this.photo = data.photo;
          this.current = 0;

          if (data.data.length > 0) {
            let index = data.data.findIndex(
              section => section.meta === "summary"
            );
            if (index > -1) {
              data.data[index].data.addToSuggestion = false;
            }

            index = data.data.findIndex(
              section => section.meta === "strengths"
            );
            if (index > -1) {
              data.data[index].data = data.data[index].data.map(e => {
                e.addToSuggestion = false;
                return e;
              });
            }
            index = data.data.findIndex(section => section.meta === "skills");
            if (index > -1) {
              data.data[index].data = data.data[index].data.map(e => {
                e.addToSuggestion = false;
                return e;
              });
            }

            index = data.data.findIndex(section => section.meta === "info");
            if (index > -1) {
              data.data[index].data = data.data[index].data.map(e => {
                e.addToSuggestion = false;
                return e;
              });
            }

            index = data.data.findIndex(section => section.meta === "licenses");
            if (index > -1) {
              data.data[index].data = data.data[index].data.map(e => {
                e.addToSuggestion = false;
                return e;
              });
            }

            index = data.data.findIndex(
              section => section.meta === "languages"
            );
            if (index > -1) {
              data.data[index].data = data.data[index].data.map(e => {
                e.addToSuggestion = false;
                return e;
              });
            }

            index = data.data.findIndex(
              section => section.meta === "declaration"
            );
            if (index > -1) {
              data.data[index].data.addToSuggestion = false;
            }

            index = data.data.findIndex(
              section => section.meta === "certifications_awards"
            );
            if (index > -1) {
              data.data[index].data.certifications.data = data.data[
                index
              ].data.certifications.data.map(e => {
                e.addToSuggestion = false;
                return e;
              });

              data.data[index].data.awards.data = data.data[
                index
              ].data.awards.data.map(e => {
                e.addToSuggestion = false;
                return e;
              });
            }

            index = data.data.findIndex(
              section => section.meta === "trainings_courses"
            );
            if (index > -1) {
              data.data[index].data.trainings.data = data.data[
                index
              ].data.trainings.data.map(e => {
                e.addToSuggestion = false;
                return e;
              });

              data.data[index].data.courses.data = data.data[
                index
              ].data.courses.data.map(e => {
                e.addToSuggestion = false;
                return e;
              });
            }

            index = data.data.findIndex(section => section.meta == "education");
            if (index > -1) {
              data.data[index].data = data.data[index].data.map(e => {
                e.description = e.description.map(d => {
                  d.addToSuggestion = false;
                  return d;
                });
                return e;
              });
            }

            index = data.data.findIndex(
              section => section.meta == "workHistory"
            );
            if (index > -1) {
              data.data[index].data = data.data[index].data.map(e => {
                e.description = e.description.map(d => {
                  d.addToSuggestion = false;
                  return d;
                });
                return e;
              });
            }

            this.resume = data.data;
          }
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

    saveresume(data) {
      let index = this.resume.findIndex(section => section.meta === data.meta);
      index === -1 ? this.resume.push(data) : (this.resume[index] = data);
      // PUT ON SAVE
      if (this.id != null) {
        fetch(`${this.hostname}/api/clients/${this.id}/update`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
          },
          body: JSON.stringify({ data: this.resume })
        })
          .then(res => {
            return res.json();
          })
          .then(data => {
            if (data.msg == "success") {
              $("#toast").toast("show");
            }
          })
          .catch(err => {
            console.log(err);
          });
      } else {
        $("#toast").toast("show");
      }
    },

    prev() {
      this.current--;
    },
    //Finalize
    save(resume) {
      this.resume = resume;
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

#toast {
  margin: auto;
  position: fixed;
  bottom: 20px;
  z-index: 2;
  left: 0;
  right: 0;
}
</style>

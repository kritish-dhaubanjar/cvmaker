<template>
  <div class="container">
    <h3>What trainings and courses do you want to highlight?</h3>
    <p class="lead">Use our expert recommendations below to get started.</p>
    <br />

    <nav>
      <div class="nav nav-tabs" id="nav-tab" role="tablist">
        <a
          class="nav-item nav-link active"
          id="nav-training-tab"
          data-toggle="tab"
          href="#nav-training"
          role="tab"
          aria-controls="nav-training"
          aria-selected="true"
        >TRAININGS</a>
        <a
          class="nav-item nav-link"
          id="nav-course-tab"
          data-toggle="tab"
          href="#nav-courses"
          role="tab"
          aria-controls="nav-courses"
          aria-selected="false"
        >COURSES</a>
      </div>
    </nav>
    <div class="tab-content" id="nav-tabContent">
      <div
        class="tab-pane fade show active"
        id="nav-training"
        role="tabpanel"
        aria-labelledby="nav-training-tab"
      >
        <!-- TRAININGS -->
        <br />
        <div class="row">
          <div class="col-12 col-sm-12 col-md-12 col-lg-8">
            <ul class="m-0 ml-1">
              <draggable v-model="data.data.trainings.data" v-bind="{delay:400}">
                <li v-for="(item, index) in data.data.trainings.data" :key="index" class="mb-2">
                  <div class="row no-gutters">
                    <div class="col-12 col-sm-12 col-md-8">
                      <textarea type="text" class="form-control mb-1" v-model="item.text" rows="2"></textarea>
                    </div>

                    <div class="col-6 col-sm-6 col-md-1">
                      <button
                        class="btn btn-danger btn-sm ml-1"
                        @click.prevent="removeTraining(item)"
                      >
                        <i class="far fa-trash-alt"></i>
                      </button>
                    </div>
                    <div class="col-6 col-sm-6 col-md-3">
                      <div class="form-group form-check pt-1">
                        <input
                          type="checkbox"
                          class="form-check-input"
                          v-model="item.addToSuggestion"
                        />
                        <label class="form-check-label">Add to suggestions</label>
                      </div>
                    </div>
                  </div>
                  <hr class="d-block d-sm-block d-md-none d-lg-none mt-0 mb-3" />
                </li>
              </draggable>
            </ul>

            <button class="btn btn-success btn-block my-4" @click.prevent="addTraining">ADD ONE MORE</button>
          </div>

          <div class="col-12 col-sm-12 col-md-12 col-lg-4">
            <p class="lead">Showing results for trainings</p>
            <div class="input-group">
              <input
                type="text"
                class="form-control"
                placeholder="Ex. Multimedia and Graphic Designing"
                v-model="training_search"
              />
              <div class="input-group-append">
                <span class="input-group-text">
                  <i class="fas fa-search"></i>
                </span>
              </div>
            </div>

            <br />
            <ul class="suggestions">
              <li
                v-for="(suggestion, index) in uniqueTrainings"
                :key="index"
                @click="addToTraining(index)"
              >
                <div class="card mb-1">
                  <div class="card-body">{{suggestion}}</div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="tab-pane fade" id="nav-courses" role="tabpanel" aria-labelledby="nav-courses-tab">
        <!-- COURSES -->
        <br />
        <div class="row">
          <div class="col-12 col-sm-12 col-md-12 col-lg-8">
            <ul class="m-0 ml-1">
              <draggable v-model="data.data.courses.data" v-bind="{delay:200}">
                <li v-for="(item, index) in data.data.courses.data" :key="index" class="mb-2">
                  <div class="row no-gutters">
                    <div class="col-12 col-sm-12 col-md-8">
                      <textarea type="text" class="form-control mb-1" v-model="item.text" rows="2"></textarea>
                    </div>

                    <div class="col-6 col-sm-6 col-md-1">
                      <button
                        class="btn btn-danger btn-sm ml-1"
                        @click.prevent="removeCourse(item)"
                      >
                        <i class="far fa-trash-alt"></i>
                      </button>
                    </div>
                    <div class="col-6 col-sm-6 col-md-3">
                      <div class="form-group form-check pt-1">
                        <input
                          type="checkbox"
                          class="form-check-input"
                          v-model="item.addToSuggestion"
                        />
                        <label class="form-check-label">Add to suggestions</label>
                      </div>
                    </div>
                  </div>
                  <hr class="d-block d-sm-block d-md-none d-lg-none mt-0 mb-3" />
                </li>
              </draggable>
            </ul>

            <button class="btn btn-success btn-block my-4" @click.prevent="addCourse">ADD ONE MORE</button>
          </div>

          <div class="col-12 col-sm-12 col-md-12 col-lg-4">
            <p class="lead">Showing results for courses</p>
            <div class="input-group">
              <input
                type="text"
                class="form-control"
                placeholder="Ex. Multimedia and Graphic Designing"
                v-model="course_search"
              />
              <div class="input-group-append">
                <span class="input-group-text">
                  <i class="fas fa-search"></i>
                </span>
              </div>
            </div>

            <br />
            <ul class="suggestions">
              <li
                v-for="(suggestion, index) in uniqueCourses"
                :key="index"
                @click="addToCourse(index)"
              >
                <div class="card mb-1">
                  <div class="card-body">{{suggestion}}</div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>

    <div class="row">
      <div class="col-12">
        <br />
        <br />
        <br />
        <button class="btn btn-outline-primary" type="submit" @click="$emit('prev')">BACK</button>
        <button
          class="btn btn-danger ml-auto"
          type="submit"
          style="float:right"
          @click.prevent="$emit('next', data)"
          :disabled="disabled"
        >NEXT: CERTIFICATIONS & AWARDS</button>
      </div>
    </div>
  </div>
</template>

<script>
import draggable from "vuedraggable";

export default {
  props: ["resume"],
  //Excellent, Very Good, Good, Average, Basic
  data() {
    return {
      category: "",
      training_search: "",
      course_search: "",
      trainings_filtered: [],
      courses_filtered: [],
      trainings: [],
      courses: [],
      data: {
        meta: "trainings_courses",
        data: {
          trainings: {
            data: [
              //{ text: "", addToSuggestion: false }
            ]
          },
          courses: {
            data: [
              // { text: "", addToSuggestion: false }
            ]
          }
        }
      }
    };
  },

  watch: {
    training_search() {
      this.trainings_filtered = this.trainings.filter(suggestion =>
        suggestion.toLowerCase().includes(this.training_search.toLowerCase())
      );
    },
    course_search() {
      this.courses_filtered = this.courses.filter(suggestion =>
        suggestion.toLowerCase().includes(this.course_search.toLowerCase())
      );
    }
  },

  computed: {
    disabled() {
      let empty = false;
      this.data.data.trainings.data.forEach(training => {
        if (training.text.length == 0) empty = true;
      });
      this.data.data.courses.data.forEach(course => {
        if (course.text.length == 0) empty = true;
      });
      return empty;
    },

    uniqueTrainings() {
      return Array.from(new Set(this.trainings));
    },

    uniqueCourses() {
      return Array.from(new Set(this.courses));
    }
  },

  activated() {
    if (this.resume.length > 0) {
      let index = this.resume.findIndex(
        section => section.meta === "trainings_courses"
      );
      if (index > -1) {
        this.data = this.resume[index];
      }
    }

    if (this.resume.length > 0) {
      let index = this.resume.findIndex(section => section.meta === "header");
      if (index > -1) {
        let categories = this.resume[index].data.categories;
        categories.forEach(category => {
          if (category.length > 0) {
            fetch(`${this.hostname}/api/training?category=${category}`)
              .then(res => res.json())
              .then(data => {
                this.trainings = [...this.trainings, ...data];
              })
              .catch(err => {
                console.log(err);
              });
          }
        });
      }
    }

    if (this.resume.length > 0) {
      let index = this.resume.findIndex(section => section.meta === "header");
      if (index > -1) {
        let categories = this.resume[index].data.categories;

        categories.forEach(category => {
          if (category.length > 0) {
            fetch(`${this.hostname}/api/course?category=${category}`)
              .then(res => res.json())
              .then(data => {
                this.courses = [...this.courses, ...data];
              })
              .catch(err => {
                console.log(err);
              });
          }
        });
      }
    }
  },

  methods: {
    //TRAINING
    addTraining() {
      this.data.data.trainings.data.push({
        text: "",
        addToSuggestion: false
      });
    },

    removeTraining(item) {
      this.data.data.trainings.data = this.data.data.trainings.data.filter(
        _item => {
          return _item != item;
        }
      );
    },

    addToTraining(index) {
      this.data.data.trainings.data.push({
        text: this.uniqueTrainings[index],
        addToSuggestion: false
      });
    },
    // COURSES
    addCourse() {
      this.data.data.courses.data.push({
        text: "",
        addToSuggestion: false
      });
    },

    removeCourse(item) {
      this.data.data.courses.data = this.data.data.courses.data.filter(
        _item => {
          return _item != item;
        }
      );
    },

    addToCourse(index) {
      this.data.data.courses.data.push({
        text: this.uniqueCourses[index],
        addToSuggestion: false
      });
    }
  },

  components: {
    draggable
  }
};
</script>

<style scoped lang="scss">
@import "./../../colors.scss";
h3,
h5,
a {
  color: $primary;
  font-weight: normal;
}

.fas,
.far {
  cursor: pointer;
}

.fa-minus-circle {
  color: $primary;
}

p {
  color: $secondaryDark;
}

label {
  font-weight: bold;
  font-size: 13px;
}

.btn-block {
  border: 1px dashed;
}

.btn-danger {
  padding-top: 5px;
  padding-bottom: 5px;
}

.suggestions {
  list-style-type: none;
  padding: 0;
  overflow-y: scroll;
  height: 70%;
  cursor: pointer;
  .card {
    background-color: $primaryLight;
    .card-body {
      font-size: 13px;
      padding: 12px 12px;
      font-weight: 500;
    }
  }
}

ul {
  padding-left: 14px;
}
ul .form-control {
  border-left: 0;
  border-right: 0;
  border-top: 0;
  border-bottom: 0;
  font-size: 13px;
  padding: 0;
}

textarea {
  resize: none;
  font-size: 12px;
}

#nav-training,
#nav-courses {
  border-bottom: 0;
}

#nav-course-tab,
#nav-training-tab {
  padding-left: 16px !important;
  padding-right: 16px !important;
  margin-left: 0px !important;
  margin-right: 0px !important;
  font-weight: bold;
  border-radius: 0;
}
</style>

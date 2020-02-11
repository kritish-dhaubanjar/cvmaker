<template>
  <div class="container">
    <h3>Add Another Degree</h3>
    <br />
    <form class="needs-validation">
      <div class="form-row">
        <div class="col-12 col-sm-6 col-md-6 col-lg-6 mb-3">
          <label for="name">School Name</label>
          <input type="text" class="form-control" id="name" required v-model="data.name" />
        </div>
        <div class="col-12 col-sm-6 col-md-6 col-lg-6 mb-3">
          <label for="location">School Location</label>
          <input type="text" class="form-control" id="location" required v-model="data.location" />
        </div>
      </div>

      <div class="form-row">
        <div class="col-12 col-sm-6 col-md-6 col-lg-6 mb-4">
          <label for="degree">Degree</label>
          <input type="text" class="form-control" id="degree" required v-model="data.degree" />
          <span
            class="badge badge-pill badge-info mr-1"
            v-for="(degree, index) in filteredDegrees"
            :key="index"
            @click="fetchSuggestions(degree.title)"
          >{{degree.title}}</span>
        </div>
        <div class="col-12 col-sm-6 col-md-6 col-lg-6 mb-3">
          <label for="fieldOfStudy">Field of Study</label>
          <input type="text" class="form-control" id="fieldOfStudy" v-model="data.fieldOfStudy" />
        </div>
      </div>

      <div class="form-row">
        <div class="col-12 col-sm-6 col-md-6 col-lg-6 mb-3">
          <label for="startDate">Graduation Start Date</label>
          <input type="month" class="form-control" id="startDate" required v-model="data.startDate" />
        </div>
        <div class="col-12 col-sm-6 col-md-6 col-lg-6 mb-3">
          <label for="endDate">Graduation End Date</label>
          <input
            type="month"
            class="form-control"
            id="endDate"
            v-model="data.endDate"
            :disabled="data.isCurrent"
          />
        </div>
      </div>

      <div class="form-group">
        <div class="form-check">
          <input
            class="form-check-input"
            type="checkbox"
            value
            id="isCurrent"
            required
            v-model="data.isCurrent"
          />
          <label class="form-check-label" for="isCurrent">I currently attend here.</label>
        </div>
      </div>

      <br />
      <br />
      <h3>Tell us about your education details.</h3>
      <h6 class="mb-4">Get help writing your bullet points with the pre-written examples below.</h6>

      <div class="row">
        <div class="col-12 col-sm-12 col-md-12 col-lg-8">
          <ul class="pl-4 m-0">
            <draggable v-model="data.description" v-bind="{delay:200}">
              <li v-for="(item, index) in data.description" :key="index" class="mb-2">
                <div class="row no-gutters">
                  <div class="col-12 col-sm-12 col-md-8">
                    <!-- <input type="text" class="form-control" v-model="item.text" /> -->
                    <textarea type="text" class="form-control mb-1" v-model="item.text" rows="2"></textarea>
                  </div>
                  <div class="col-6 col-sm-6 col-md-1">
                    <button class="btn btn-danger btn-sm" @click.prevent="removeDescription(item)">
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

          <button
            class="btn btn-sm btn-success my-4 addMore"
            @click.prevent="addDescription"
          >ADD EDUCATION DETAILS</button>
          <button class="btn btn-sm btn-info my-4 ml-auto float-right" @click.prevent="toggle">
            <i class="far fa-check-square"></i> ALL
          </button>
        </div>

        <div class="col-12 col-sm-12 col-md-12 col-lg-4">
          <p class="lead">Showing results for education details</p>

          <div class="input-group">
            <input
              type="text"
              class="form-control"
              placeholder="Ex. High School Diploma"
              v-model="search"
            />
            <div class="input-group-append">
              <span class="input-group-text">
                <i class="fas fa-search"></i>
              </span>
            </div>
          </div>
          <br />

          <ul class="suggestions">
            <li v-for="(suggestion, index) in filtered" :key="index" @click="addSuggestion(index)">
              <div class="card mb-1">
                <div class="card-body">{{suggestion}}</div>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <br />
    </form>

    <div class="row">
      <div class="col-12">
        <button class="btn btn-outline-primary" type="submit" @click="$emit('back')">BACK</button>
        <button
          class="btn btn-danger ml-auto"
          type="submit"
          style="float:right"
          @click.prevent="$emit('save', data)"
          :disabled="disabled"
        >SAVE &amp; NEXT</button>
      </div>
    </div>
  </div>
</template>

<script>
import draggable from "vuedraggable";

export default {
  props: ["academic", "isEdit"],

  data() {
    return {
      search: "",
      degrees: [
        /* {title: 'SLC'} */
      ],
      filtered: [],

      suggestions: [
        /*"Used initiative and independent judgment within established guidelines to respond appropriately to security situations."*/
      ],
      data: {
        name: "",
        location: "",
        degree: "",
        fieldOfStudy: "",
        startDate: "",
        endDate: "",
        isCurrent: false,
        description: [
          // {
          //   text: "",
          //   addToSuggestion: false
          // }
        ]
      }
    };
  },

  watch: {
    search() {
      this.filtered = this.suggestions.filter(suggestion =>
        suggestion.toLowerCase().includes(this.search.toLowerCase())
      );
    }
  },

  mounted() {
    if (this.isEdit) {
      this.data = this.academic;
    }
    fetch(`${this.hostname}/api/education/degree`)
      .then(res => res.json())
      .then(data => {
        this.degrees = data;
      })
      .catch(err => {
        console.log(err);
      });
    this.filtered = this.suggestions;
  },

  computed: {
    filteredDegrees() {
      if (this.data.degree.length > 0) {
        return this.degrees.filter(degree => {
          return degree.title
            .toLowerCase()
            .includes(this.data.degree.toLowerCase());
        });
      } else {
        return [];
      }
    },

    disabled() {
      return !(
        this.data.name.length > 0 &&
        this.data.location.length > 0 &&
        this.data.degree.length > 0
      );
    }
  },

  methods: {
    addDescription() {
      this.data.description.push({
        text: "",
        addToSuggestion: false
      });
    },
    removeDescription(item) {
      this.data.description = this.data.description.filter(_item => {
        return _item != item;
      });
    },
    addSuggestion(index) {
      this.data.description.push({
        text: this.filtered[index],
        addToSuggestion: false
      });
    },
    fetchSuggestions(degree) {
      this.data.degree = degree;
      fetch(
        `${this.hostname}/api/education/description?degree=${this.data.degree}`
      )
        .then(res => res.json())
        .then(data => {
          this.suggestions = data;
          this.filtered = this.suggestions;
        })
        .catch(err => {
          console.log(err);
        });
    },
    toggle() {
      if (this.data.description.length > 0) {
        this.data.description.forEach(e => {
          e.addToSuggestion = true;
        });
      }
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

h6 {
  color: $secondaryDark;
}

.btn {
  padding-top: 5px;
  padding-bottom: 6px;
}

.custom-select,
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
}

.addMore {
  border: 1px dashed;
}

@media screen and(max-width: 767px) {
  ul .form-control {
    margin-bottom: 4px;
  }
}

.list-group li {
  border-radius: 0;
}

.suggestions {
  list-style-type: none;
  padding: 0;
  overflow-y: scroll;
  height: 90%;
  cursor: pointer;
  .card {
    background-color: $primaryLight;
    .card-body {
      font-size: 13px;
      font-weight: 500;
    }
  }
}

p {
  color: $secondaryDark;
}

label {
  font-weight: bold;
  font-size: 13px;
}

.badge {
  font-size: 15px;
  margin-top: 1rem;
  cursor: pointer;
}
</style>
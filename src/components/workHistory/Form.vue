<template>
  <div class="container">
    <h3>Tell us about another job</h3>
    <br />
    <form class="needs-validation">
      <div class="form-row">
        <div class="col-12 col-sm-6 col-md-6 col-lg-6 mb-3">
          <label for="jobtitle">Job Title</label>
          <input type="text" class="form-control" id="jobtitle" required v-model="data.title" />

          <span
            class="badge badge-pill badge-info mr-1"
            v-for="(title, index) in filteredTitles"
            :key="index"
            @click="fetchSuggestions(title.title)"
          >{{title.title}}</span>
        </div>

        <div class="col-12 col-sm-6 col-md-6 col-lg-6 mb-3">
          <label for="employer">Employer</label>
          <input type="text" class="form-control" id="employer" required v-model="data.employer" />
        </div>
      </div>

      <div class="form-row">
        <div class="col-12 col-sm-4 col-md-4 col-lg-4 mb-4">
          <label for="city">City</label>
          <input type="text" class="form-control" id="city" required v-model="data.city" />
        </div>
        <div class="col-12 col-sm-4 col-md-4 col-lg-4 mb-3">
          <label for="state">State/Province</label>
          <input type="text" class="form-control" id="state" v-model="data.state" />
        </div>
        <div class="col-12 col-sm-4 col-md-4 col-lg-4 mb-3">
          <label for="country">Country</label>
          <input type="text" class="form-control" id="country" required v-model="data.country" />
        </div>
      </div>

      <div class="form-row">
        <div class="col-12 col-sm-4 col-md-4 col-lg-4 mb-3">
          <label for="startDate">Start Date</label>
          <input type="month" class="form-control" id="startDate" required v-model="data.startDate" />
        </div>
        <div class="col-12 col-sm-4 col-md-4 col-lg-4 mb-3">
          <label for="endDate">End Date</label>
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
          <label class="form-check-label" for="isCurrent">I currently work here.</label>
        </div>
      </div>

      <br />
      <br />
      <h3>Tell us about your work details.</h3>
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
            class="btn btn-sm addMore btn-success my-4"
            @click.prevent="addDescription"
          >ADD WORK DETAILS</button>
          <button class="btn btn-sm btn-info my-4 ml-auto float-right" @click.prevent="toggle(true)">
            <i class="far fa-check-square"></i> ALL
          </button>
          <button class="btn btn-sm btn-info my-4 ml-auto float-right mr-1" @click.prevent="toggle(false)">
            <i class="far fa-square"></i> CLEAR
          </button>
          <button
            class="btn btn-outline-info btn-sm"
            @click.prevent="showParser = !showParser"
          >{{showParser? 'Hide Parser':'Show Parser' }}</button>
        </div>

        <div class="col-12 col-sm-12 col-md-12 col-lg-8 mb-5" v-if="showParser">
          <textarea class="parser" v-model="text" rows="10"></textarea>
          <button class="btn btn-outline-secondary btn-sm float-right" @click.prevent="parse">PARSE</button>
        </div>

        <div class="col-12 col-sm-12 col-md-12 col-lg-4">
          <p class="lead">Showing results for work details</p>

          <div class="input-group">
            <input
              type="text"
              class="form-control"
              placeholder="Ex. Perform patrol duties at worksites of supermarkets areas."
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
  props: ["work", "isEdit"],

  data() {
    return {
      text: "",
      showParser: true,
      search: "",
      filtered: [],
      titles: [
        /* {title: 'Security Guard'} */
      ],
      suggestions: [
        /*"Used initiative and independent judgment within established guidelines to respond appropriately to security situations."*/
      ],
      data: {
        title: "",
        employer: "",
        city: "",
        state: "",
        country: "",
        isCurrent: false,
        startDate: "",
        endDate: "",
        description: [
          /*{
            text: "",
            addToSuggestion: false
           }*/
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
      this.data = this.work;
      this.text = this.data.description.map(e=>e.text).join("\n");
    }
    fetch(`${this.hostname}/api/workhistory/jobtitle`)
      .then(res => res.json())
      .then(data => {
        this.titles = data;
      })
      .catch(err => {
        console.log(err);
      });
    this.filtered = this.suggestions;
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

    fetchSuggestions(title) {
      this.data.title = title;
      fetch(
        `${this.hostname}/api/workhistory/description?jobtitle=${encodeURIComponent(this.data.title)}`
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
    toggle(check) {
      if (this.data.description.length > 0) {
        this.data.description.forEach(e => {
          e.addToSuggestion = check;
        });
      }
    },

    parse() {
      let pattern = /[\r\n]+/gm;
      let parsed = this.text.split(pattern);
      this.data.description = [];
      parsed.forEach(p => {
        this.data.description.push({
          text: p,
          addToSuggestion: false
        });
      });
    }
  },

  computed: {
    filteredTitles() {
      if (this.data.title.length > 0) {
        return this.titles.filter(title => {
          return title.title
            .toLowerCase()
            .includes(this.data.title.toLowerCase());
        });
      } else {
        return [];
      }
    },

    disabled() {
      return !(this.data.title.length > 0 && this.data.employer.length);
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

.badge {
  font-size: 15px;
  margin-top: 1rem;
  cursor: pointer;
}

p {
  color: $secondaryDark;
}

label {
  font-weight: bold;
  font-size: 13px;
}

.parser {
  width: 100%;
  font-size: 12px;
}
</style>
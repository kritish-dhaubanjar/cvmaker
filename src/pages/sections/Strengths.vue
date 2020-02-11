<template>
  <div class="container">
    <h3>What personal strengths do you want to highlight?</h3>
    <p class="lead">Use our expert recommendations below to get started.</p>
    <br />
    <div class="row">
      <div class="col-12 col-sm-12 col-md-12 col-lg-8">
        <ul class="m-0">
          <draggable v-model="data.data" v-bind="{delay:200}">
            <li v-for="(item, index) in data.data" :key="index" class="mb-2">
              <div class="row no-gutters">
                <div class="col-12 col-sm-12 col-md-8">
                  <!-- <input type="text" class="form-control" v-model="item.strength" /> -->
                  <textarea type="text" class="form-control mb-1" v-model="item.strength" rows="2"></textarea>
                </div>

                <div class="col-6 col-sm-6 col-md-1">
                  <button class="btn btn-danger btn-sm ml-1" @click.prevent="removeStrength(item)">
                    <i class="far fa-trash-alt"></i>
                  </button>
                </div>
                <div class="col-6 col-sm-6 col-md-3">
                  <div class="form-group form-check pt-1">
                    <input type="checkbox" class="form-check-input" v-model="item.addToSuggestion" />
                    <label class="form-check-label">Add to suggestions</label>
                  </div>
                </div>
              </div>
              <hr class="d-block d-sm-block d-md-none d-lg-none mt-0 mb-3" />
            </li>
          </draggable>
        </ul>

        <button class="btn btn-success addMore my-4" @click.prevent="addStrength">ADD ONE MORE</button>
        <button class="btn btn-info my-4 ml-auto float-right" @click.prevent="toggle">
          <i class="far fa-check-square"></i> ALL
        </button>
      </div>

      <div class="col-12 col-sm-12 col-md-12 col-lg-4">
        <p class="lead">Showing results for Personal Strength</p>
        <div class="input-group">
          <input
            type="text"
            class="form-control"
            placeholder="Ex. Quick learner, Adaptability Dependable and Reliable."
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
          <li v-for="(suggestion, index) in filtered" :key="index" @click="addToStrength(index)">
            <div class="card mb-1">
              <div class="card-body">{{suggestion}}</div>
            </div>
          </li>
        </ul>
      </div>
    </div>

    <div class="row">
      <div class="col-12">
        <br />
        <br />
        <br />
        <button class="btn btn-outline-primary btn-sm" type="submit" @click="$emit('prev')">BACK</button>
        <button
          class="btn btn-danger ml-auto btn-sm py-1"
          type="submit"
          style="float:right"
          @click.prevent="$emit('next', data)"
          :disabled="disabled"
        >SAVE & NEXT: PERSONAL INFO</button>
        <button
          class="btn btn-info ml-auto mr-1 btn-sm"
          type="submit"
          style="float:right"
          :disabled="disabled"
          @click.prevent="$emit('saveresume', data)"
        >
          <i class="far fa-save"></i> SAVE
        </button>
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
      search: "",
      filtered: [],
      suggestions: [],
      data: {
        meta: "strengths",
        data: []
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

  computed: {
    disabled() {
      let empty = false;
      // this.data.data.forEach(strength => {
      //   if (strength.strength.length == 0) empty = true;
      // });
      return empty;
    }
  },

  mounted() {
    if (this.resume.length > 0) {
      let index = this.resume.findIndex(
        section => section.meta === "strengths"
      );
      if (index > -1) {
        this.data = this.resume[index];
      }
    }

    fetch(`${this.hostname}/api/strength`)
      .then(res => res.json())
      .then(data => {
        this.suggestions = data;
        this.filtered = this.suggestions;
      })
      .catch(err => {
        console.log(err);
      });
  },

  methods: {
    addStrength() {
      this.data.data.push({
        strength: "",
        addToSuggestion: false
      });
    },

    removeStrength(item) {
      this.data.data = this.data.data.filter(_item => {
        return _item != item;
      });
    },

    addToStrength(index) {
      this.data.data.push({
        strength: this.filtered[index],
        addToSuggestion: false
      });
    },

    toggle() {
      if (this.data.data.length > 0) {
        this.data.data.forEach(e => {
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

.addMore {
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
</style>

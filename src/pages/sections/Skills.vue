<template>
  <div class="container">
    <h3>What skills do you want to highlight?</h3>
    <p class="lead">Use our expert recommendations below to get started.</p>
    <br />
    <div class="row">
      <div class="col-12 col-sm-12 col-md-12 col-lg-8">
        <ul class="m-0">
          <draggable v-model="data.data" v-bind="{delay:200}">
            <li v-for="(item, index) in data.data" :key="index" class="mb-2">
              <div class="row no-gutters">
                <div class="col-5 col-sm-3 col-md-2 col-lg-3 pt-1">
                  <i class="fas fa-minus-circle" @click="item.level = 0"></i>
                  <i
                    class="far fa-star"
                    :class="i <= item.level ? 'fas':'far'"
                    v-for="i in 5"
                    :key="i"
                    @click="item.level=i"
                  ></i>
                </div>

                <div class="col-7 col-sm-9 col-md-6 col-lg-5">
                  <input type="text" class="form-control" v-model="item.skill" />
                  <!-- <textarea type="text" class="form-control mb-1" v-model="item.text" rows="2"></textarea> -->
                </div>
                <br class="d-block d-sm-block d-md-none" />
                <br class="d-block d-sm-block d-md-none" />
                <div class="col-6 col-sm-6 col-md-1">
                  <button class="btn btn-danger btn-sm ml-1" @click.prevent="removeSkill(item)">
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

        <button class="btn btn-success btn-block my-4" @click.prevent="addSkill">ADD ONE MORE</button>
      </div>

      <div class="col-12 col-sm-12 col-md-12 col-lg-4">
        <p class="lead">Showing results for skills</p>
        <div class="input-group">
          <input type="text" class="form-control" placeholder="Ex. Cashier" v-model="search" />
          <div class="input-group-append">
            <span class="input-group-text">
              <i class="fas fa-search"></i>
            </span>
          </div>
        </div>

        <br />
        <ul class="suggestions">
          <li v-for="(suggestion, index) in filtered" :key="index" @click="addToSkill(index)">
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
        >SAVE & NEXT: LANGUAGES</button>
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
        meta: "skills",
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
      // this.data.data.forEach(skill => {
      //   if (skill.skill.length == 0) empty = true;
      // });
      return empty;
    }
  },

  mounted() {
    if (this.resume.length > 0) {
      let index = this.resume.findIndex(section => section.meta === "skills");
      if (index > -1) {
        this.data = this.resume[index];
      }
    }

    fetch(`${this.hostname}/api/skill`)
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
    addSkill() {
      this.data.data.push({
        skill: "",
        level: 0,
        addToSuggestion: false
      });
    },

    removeSkill(item) {
      this.data.data = this.data.data.filter(_item => {
        return _item != item;
      });
    },

    addToSkill(index) {
      this.data.data.push({
        skill: this.filtered[index],
        level: 0,
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
  list-style-type: none;
  padding-left: 0;
  input {
    font-size: 12px;
  }
}
</style>

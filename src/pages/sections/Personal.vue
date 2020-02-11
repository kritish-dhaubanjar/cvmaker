<template>
  <div class="container">
    <h3>What personal information do you want to highlight?</h3>
    <p class="lead">Use our expert recommendations below to get started.</p>
    <br />
    <div class="row">
      <div class="col-12 col-sm-12 col-md-12 col-lg-8">
        <ul class="m-0">
          <draggable v-model="data.data" v-bind="{delay:200}">
            <li v-for="(item, index) in data.data" :key="index" class="mb-2">
              <div class="row no-gutters">
                <div class="col-6 col-sm-6 col-md-4 pr-1">
                  <label class="mb-1">Key</label>
                  <input
                    type="text"
                    class="form-control mb-1"
                    v-model="item.key"
                    placeholder="Ex. Date of Birth"
                  />
                </div>

                <div class="col-6 col-sm-6 col-md-4">
                  <label class="mb-1">Value</label>
                  <input type="text" class="form-control mb-1" v-model="item.value" />
                  <!-- <textarea type="text" class="form-control mb-1" v-model="item.text" rows="2"></textarea> -->
                </div>
                <br class="d-block d-sm-block d-md-none" />
                <br class="d-block d-sm-block d-md-none" />
                <div class="col-6 col-sm-6 col-md-1">
                  <button class="btn btn-danger btn-sm ml-1" @click.prevent="removeInfo(item)">
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

        <button class="btn btn-success addMore my-4" @click.prevent="addInfo">ADD ONE MORE</button>
        <button class="btn btn-info my-4 ml-auto float-right" @click.prevent="toggle">
          <i class="far fa-check-square"></i> ALL
        </button>
      </div>

      <div class="col-12 col-sm-12 col-md-12 col-lg-4">
        <p class="lead">Showing results for personal information</p>
        <div class="input-group">
          <input type="text" class="form-control" placeholder="Ex. Date of Birth" v-model="search" />
          <div class="input-group-append">
            <span class="input-group-text">
              <i class="fas fa-search"></i>
            </span>
          </div>
        </div>

        <br />
        <ul class="suggestions">
          <li v-for="(suggestion, index) in filtered" :key="index" @click="addToInfo(index)">
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
        >SAVE & NEXT: DRIVING LICENSE</button>
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
  //Native, Fluent, Proficient, Conversational
  data() {
    return {
      search: "",
      filtered: [],
      suggestions: [],
      data: {
        meta: "info",
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
      // this.data.data.forEach(info => {
      //   if (info.key.length == 0 || info.value.length == 0) {
      //     empty = true;
      //   }
      // });
      return empty;
    }
  },

  mounted() {
    if (this.resume.length > 0) {
      let index = this.resume.findIndex(section => section.meta === "info");
      if (index > -1) {
        this.data = this.resume[index];
      }
    }
    fetch(`${this.hostname}/api/info`)
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
    addInfo() {
      this.data.data.push({
        key: "",
        value: "",
        addToSuggestion: false
      });
    },

    removeInfo(item) {
      this.data.data = this.data.data.filter(_item => {
        return _item != item;
      });
    },

    addToInfo(index) {
      this.data.data.push({
        key: this.filtered[index],
        value: "",
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
  list-style-type: none;
  padding-left: 0;
  input {
    font-size: 13px;
  }
  @media screen and(min-width: 768px) {
    .btn-danger,
    .form-check {
      position: absolute;
      bottom: 5px;
    }

    .form-check {
      margin-bottom: 6px;
    }
  }

  @media screen and(max-width: 767px) {
    .btn-danger {
      margin-left: 0 !important;
      margin-top: 2px;
    }
  }
}
</style>


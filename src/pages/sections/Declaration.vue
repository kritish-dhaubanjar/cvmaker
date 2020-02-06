<template>
  <div class="container">
    <h3>Declaration</h3>
    <p class="lead">Use our expert recommendations below to get started.</p>
    <br />
    <div class="row">
      <div class="col-12 col-sm-12 col-md-12 col-lg-8">
        <div class="row no-gutters">
          <div class="col-12">
            <!-- <input type="text" class="form-control" v-model="item.strength" /> -->
            <textarea
              type="text"
              class="textarea form-control mb-1"
              v-model="data.data.text"
              rows="4"
            ></textarea>
          </div>

          <div class="col-12">
            <div class="form-group form-check pt-1">
              <input type="checkbox" class="form-check-input" v-model="data.data.addToSuggestion" />
              <label class="form-check-label">Add to suggestions</label>
            </div>
          </div>
        </div>
        <hr class="d-block d-sm-block d-md-none d-lg-none mt-0 mb-3" />
      </div>

      <div class="col-12 col-sm-12 col-md-12 col-lg-4">
        <p class="lead">Showing results for declaration</p>
        <div class="input-group">
          <input
            type="text"
            class="form-control"
            placeholder="Ex. I hereby declare that all the above-mentioned"
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
          <li
            v-for="(suggestion, index) in filtered"
            :key="index"
            @click="data.data.text = suggestion"
          >
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
        >SAVE & NEXT: REFERENCES</button>
        <button
          class="btn btn-info ml-auto mr-1 btn-sm"
          type="submit"
          style="float:right"
          @click.prevent="$emit('saveresume', data)"
        >
          <i class="far fa-save"></i> SAVE
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["resume"],
  //Excellent, Very Good, Good, Average, Basic
  data() {
    return {
      search: "",
      filtered: [],
      suggestions: [],
      data: {
        meta: "declaration",
        data: {
          text: "",
          addToSuggestion: false
        }
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
    if (this.resume.length > 0) {
      let index = this.resume.findIndex(
        section => section.meta === "declaration"
      );
      if (index > -1) {
        this.data = this.resume[index];
      }
    }
    fetch(`${this.hostname}/api/declaration`)
      .then(res => res.json())
      .then(data => {
        this.suggestions = data;
        this.filtered = this.suggestions;
      })
      .catch(err => {
        console.log(err);
      });
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

p {
  color: $secondaryDark;
}

label {
  font-weight: bold;
  font-size: 13px;
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

.textarea {
  border-left: 0;
  border-right: 0;
  border-top: 0;
  font-size: 13px;
  padding: 0;
}

textarea {
  resize: none;
  font-size: 12px;
}
</style>

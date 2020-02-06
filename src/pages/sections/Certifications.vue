<template>
  <div class="container">
    <h3>What certifications and awards do you want to highlight?</h3>
    <p class="lead">Use our expert recommendations below to get started.</p>
    <br />

    <nav>
      <div class="nav nav-tabs" id="nav-tab" role="tablist">
        <a
          class="nav-item nav-link active"
          id="nav-certification-tab"
          data-toggle="tab"
          href="#nav-certification"
          role="tab"
          aria-controls="nav-certification"
          aria-selected="true"
        >CERTIFICATIONS</a>
        <a
          class="nav-item nav-link"
          id="nav-award-tab"
          data-toggle="tab"
          href="#nav-awards"
          role="tab"
          aria-controls="nav-awards"
          aria-selected="false"
        >AWARDS</a>
      </div>
    </nav>
    <div class="tab-content" id="nav-tabContent">
      <div
        class="tab-pane fade show active"
        id="nav-certification"
        role="tabpanel"
        aria-labelledby="nav-certification-tab"
      >
        <!-- certifications -->
        <br />
        <div class="row">
          <div class="col-12 col-sm-12 col-md-12 col-lg-8">
            <ul class="m-0 ml-1">
              <draggable v-model="data.data.certifications.data" v-bind="{delay:200}">
                <li
                  v-for="(item, index) in data.data.certifications.data"
                  :key="index"
                  class="mb-2"
                >
                  <div class="row no-gutters">
                    <div class="col-12 col-sm-12 col-md-8">
                      <textarea type="text" class="form-control mb-1" v-model="item.text" rows="2"></textarea>
                    </div>

                    <div class="col-6 col-sm-6 col-md-1">
                      <button
                        class="btn btn-danger btn-sm ml-1"
                        @click.prevent="removeCertification(item)"
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

            <button
              class="btn btn-success btn-block my-4"
              @click.prevent="addCertification"
            >ADD ONE MORE</button>
          </div>

          <div class="col-12 col-sm-12 col-md-12 col-lg-4">
            <p class="lead">Showing results for certifications</p>
            <div class="input-group">
              <input
                type="text"
                class="form-control"
                placeholder="Ex. Worked as a Graphic Designer"
                v-model="certification_search"
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
                v-for="(suggestion, index) in uniqueCertifications"
                :key="index"
                @click="addToCertification(index)"
              >
                <div class="card mb-1">
                  <div class="card-body">{{suggestion}}</div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="tab-pane fade" id="nav-awards" role="tabpanel" aria-labelledby="nav-awards-tab">
        <!-- awards -->
        <br />
        <div class="row">
          <div class="col-12 col-sm-12 col-md-12 col-lg-8">
            <ul class="m-0 ml-1">
              <draggable v-model="data.data.awards.data" v-bind="{delay:200}">
                <li v-for="(item, index) in data.data.awards.data" :key="index" class="mb-2">
                  <div class="row no-gutters">
                    <div class="col-12 col-sm-12 col-md-8">
                      <textarea type="text" class="form-control mb-1" v-model="item.text" rows="2"></textarea>
                    </div>

                    <div class="col-6 col-sm-6 col-md-1">
                      <button class="btn btn-danger btn-sm ml-1" @click.prevent="removeAward(item)">
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

            <button class="btn btn-success btn-block my-4" @click.prevent="addAward">ADD ONE MORE</button>
          </div>

          <div class="col-12 col-sm-12 col-md-12 col-lg-4">
            <p class="lead">Showing results for awards</p>
            <div class="input-group">
              <input
                type="text"
                class="form-control"
                placeholder="Ex. Worked as a Graphic Designer"
                v-model="award_search"
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
                v-for="(suggestion, index) in uniqueAwards"
                :key="index"
                @click="addToAward(index)"
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
        <button class="btn btn-outline-primary btn-sm" type="submit" @click="$emit('prev')">BACK</button>
        <button
          class="btn btn-danger ml-auto btn-sm py-1"
          type="submit"
          style="float:right"
          @click.prevent="$emit('next', data)"
          :disabled="disabled"
        >SAVE & NEXT: SUMMARY</button>
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
      category: "",
      certification_search: "",
      award_search: "",
      certifications_filtered: [],
      awards_filter: [],
      certifications: [],
      awards: [],
      data: {
        meta: "certifications_awards",
        data: {
          certifications: {
            data: [
              //{ text: "", addToSuggestion: false }
            ]
          },
          awards: {
            data: [
              // { text: "", addToSuggestion: false }
            ]
          }
        }
      }
    };
  },

  watch: {
    certification_search() {
      this.certifications_filtered = this.certifications.filter(suggestion =>
        suggestion
          .toLowerCase()
          .includes(this.certification_search.toLowerCase())
      );
    },
    award_search() {
      this.awards_filter = this.awards.filter(suggestion =>
        suggestion.toLowerCase().includes(this.award_search.toLowerCase())
      );
    }
  },

  computed: {
    disabled() {
      let empty = false;
      // this.data.data.certifications.data.forEach(certification => {
      //   if (certification.text.length == 0) empty = true;
      // });
      // this.data.data.awards.data.forEach(award => {
      //   if (award.text.length == 0) empty = true;
      // });
      return empty;
    },

    uniqueCertifications() {
      return Array.from(new Set(this.certifications_filtered));
    },

    uniqueAwards() {
      return Array.from(new Set(this.awards_filter));
    }
  },

  activated() {
    if (this.resume.length > 0) {
      let index = this.resume.findIndex(
        section => section.meta === "certifications_awards"
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
            fetch(`${this.hostname}/api/certification?category=${category}`)
              .then(res => res.json())
              .then(data => {
                this.certifications = [...this.certifications, ...data];
                this.certifications_filtered = this.certifications;
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
            fetch(`${this.hostname}/api/award?category=${category}`)
              .then(res => res.json())
              .then(data => {
                this.awards = [...this.awards, ...data];
                this.awards_filter = this.awards;
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
    //certification
    addCertification() {
      this.data.data.certifications.data.push({
        text: "",
        addToSuggestion: false
      });
    },

    removeCertification(item) {
      this.data.data.certifications.data = this.data.data.certifications.data.filter(
        _item => {
          return _item != item;
        }
      );
    },

    addToCertification(index) {
      this.data.data.certifications.data.push({
        text: this.uniqueCertifications[index],
        addToSuggestion: false
      });
    },
    // awards
    addAward() {
      this.data.data.awards.data.push({
        text: "",
        addToSuggestion: false
      });
    },

    removeAward(item) {
      this.data.data.awards.data = this.data.data.awards.data.filter(_item => {
        return _item != item;
      });
    },

    addToAward(index) {
      this.data.data.awards.data.push({
        text: this.uniqueAwards[index],
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

#nav-certification,
#nav-awards {
  border-bottom: 0;
}

#nav-award-tab,
#nav-certification-tab {
  padding-left: 16px !important;
  padding-right: 16px !important;
  margin-left: 0px !important;
  margin-right: 0px !important;
  font-weight: bold;
  border-radius: 0;
}
</style>

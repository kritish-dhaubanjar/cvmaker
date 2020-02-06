<template>
  <div class="container">
    <h3>What additional fields do you want to highlight?</h3>
    <br />
    <br />
    <draggable v-model="data.data" v-bind="{delay:200}">
      <div v-for="(item, index) in data.data" :key="index">
        <label>Header</label>
        <input class="additional form-control" type="text" v-model="item.meta" />
        <br />
        <div class="row">
          <div class="col-12 col-sm-12 col-md-12 col-lg-12">
            <ul class="m-0">
              <draggable v-model="item.data" v-bind="{delay:200}">
                <li v-for="(_item, index) in item.data" :key="index" class="mb-2">
                  <div class="row no-gutters">
                    <div class="col-10 col-md-10">
                      <input type="text" class="form-control mb-1" v-model="_item.text" />
                    </div>

                    <div class="col-2 col-md-2">
                      <button
                        class="btn btn-danger btn-sm ml-1"
                        @click.prevent="removeText(item, _item)"
                      >
                        <i class="far fa-trash-alt"></i>
                      </button>
                    </div>
                  </div>
                </li>
              </draggable>
            </ul>
            <button class="btn btn-info" @click.prevent="addNewText(item)">
              <i class="fas fa-plus-circle"></i>
            </button>
            <button class="btn btn-danger" @click.prevent="removeNew(item)">
              <i class="far fa-trash-alt"></i>
            </button>
            <br />
            <br />
            <br />
          </div>

          <!-- <button class="btn btn-success btn-block my-4" @click.prevent="addNew">ADD ONE MORE</button> -->
        </div>
      </div>
    </draggable>

    <button class="btn btn-success btn-block my-4" @click.prevent="addNew">ADD ONE MORE</button>

    <div class="row">
      <div class="col-12">
        <br />
        <br />
        <br />
        <button
          class="btn btn-outline-primary btn-sm py-1"
          type="submit"
          @click="$emit('prev')"
        >BACK</button>
        <button
          class="btn btn-danger ml-auto btn-sm py-1"
          type="submit"
          style="float:right"
          @click.prevent="$emit('next', data)"
        >SAVE & NEXT</button>
        <button
          class="btn btn-info ml-auto mr-1 btn-sm py-1"
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
import draggable from "vuedraggable";

export default {
  props: ["resume"],
  //Excellent, Very Good, Good, Average, Basic
  data() {
    return {
      data: {
        meta: "additional",
        data: [
          // {
          //   meta: "Tornado of Souls",
          //   data: [
          //     { text: "This morning I made the call" },
          //     { text: "The one that ends it all" },
          //     { text: "Hanging up, I wanted to cry" }
          //   ]
          // }
        ]
      }
    };
  },

  mounted() {
    if (this.resume.length > 0) {
      let index = this.resume.findIndex(
        section => section.meta === "additional"
      );
      if (index > -1) {
        this.data = this.resume[index];
      }
    }
  },

  methods: {
    addNew() {
      this.data.data.push({
        meta: "",
        data: []
      });
    },
    removeNew(item) {
      this.data.data = this.data.data.filter(_item => {
        return _item != item;
      });
    },

    addNewText(item) {
      let index = this.data.data.indexOf(item);
      this.data.data[index].data.push({ text: "" });
    },

    removeText(item, _item) {
      let index = this.data.data.indexOf(item);
      this.data.data[index].data = this.data.data[index].data.filter(text => {
        return text != _item;
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

.btn-info,
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

.additional {
  border-top: 0;
  border-left: 0;
  border-right: 0;
  padding-left: 0;
  font-weight: bold;
}
</style>

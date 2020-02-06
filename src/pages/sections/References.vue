<template>
  <div class="container">
    <h3>Tell us about your references</h3>
    <br />
    <draggable v-model="data.data" v-bind="{delay:200}">
      <form class="needs-validation" v-for="(reference, index) in data.data" :key="index">
        <div class="form-row">
          <div class="col-12 col-sm-4 col-md-4 col-lg-4 mb-3">
            <label for="name">Name</label>
            <input type="text" class="form-control" id="name" required v-model="reference.name" />
          </div>

          <div class="col-12 col-sm-4 col-md-4 col-lg-4 mb-3">
            <label for="title">Title</label>
            <input type="text" class="form-control" id="title" required v-model="reference.title" />
          </div>

          <div class="col-12 col-sm-4 col-md-4 col-lg-4 mb-3">
            <label for="employer">Employer</label>
            <input
              type="text"
              class="form-control"
              id="employer"
              required
              v-model="reference.employer"
            />
          </div>
        </div>

        <div class="form-row">
          <div class="col-12 col-sm-6 col-md-6 col-lg-6 mb-3">
            <label for="phone">Phone</label>
            <input type="text" class="form-control" id="phone" required v-model="reference.phone" />
          </div>

          <div class="col-12 col-sm-6 col-md-6 col-lg-6 mb-3">
            <label for="email">Email</label>
            <input type="email" class="form-control" id="email" required v-model="reference.email" />
          </div>
        </div>

        <div class="form-row">
          <div class="col-12 col-sm-4 col-md-4 col-lg-4 mb-4">
            <label for="city">City</label>
            <input type="text" class="form-control" id="city" required v-model="reference.city" />
          </div>
          <div class="col-12 col-sm-4 col-md-4 col-lg-4 mb-3">
            <label for="state">State/Province</label>
            <input type="text" class="form-control" id="state" v-model="reference.state" />
          </div>
          <div class="col-12 col-sm-4 col-md-4 col-lg-4 mb-3">
            <label for="country">Country</label>
            <input
              type="text"
              class="form-control"
              id="country"
              required
              v-model="reference.country"
            />
          </div>
        </div>

        <div class="form-row">
          <div class="col-12">
            <button class="btn btn-danger btn-sm" @click.prevent="removeReference(reference)">REMOVE</button>
          </div>
        </div>
        <br />
        <br />
      </form>
    </draggable>

    <div class="row">
      <div class="col-12">
        <button
          class="btn btn-success btn-block my-5"
          @click.prevent="addReference"
        >ADD MORE REFERENCE</button>
      </div>
    </div>

    <div class="row">
      <div class="col-12">
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
        >SAVE &amp; NEXT</button>
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

  data() {
    return {
      data: {
        meta: "references",
        data: [
          // {
          //   name: "Mr Jacob Jenkins",
          //   title: "Head Chef",
          //   employer: "Roundtable Restaurant",
          //   city: "96 Mounlton Rd",
          //   state: "Guthrie",
          //   country: "DD8 1ZY",
          //   phone: "+977 9843624612",
          //   email: "johndoe@gmail.com"
          // }
        ]
      }
    };
  },

  mounted() {
    if (this.resume.length > 0) {
      let index = this.resume.findIndex(
        section => section.meta === "references"
      );
      if (index > -1) {
        this.data = this.resume[index];
      }
    }
  },

  methods: {
    addReference() {
      this.data.data.push({
        name: "",
        title: "",
        employer: "",
        city: "",
        state: "",
        country: "",
        phone: "",
        email: ""
      });
    },
    removeReference(item) {
      this.data.data = this.data.data.filter(_item => {
        return _item != item;
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

.btn-block {
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
</style>
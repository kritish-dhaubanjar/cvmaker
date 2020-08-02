<template>
  <div class="container">
    <h3>Almost Complete</h3>
    <br />
    <div class="row">
      <div class="col-12 col-sm-7 col-md-6 col-lg-5 mb-5">
        <ul class="m-0 list-group list-group-flush">
          <draggable v-model="resume_" v-bind="{delay:200}">
            <li v-for="(item, index) in resume_" :key="index" class="mb-1 list-group-item">
              <div class="row no-gutters">
                <div class="col-8">
                  <h6>{{index + 1}}. {{ item.meta.replace("_", " & ") }}</h6>
                </div>
                <div class="col-2 text-right">
                  <button class="btn btn-info btn-sm ml-1" @click.prevent="editSection(item.meta)">
                    <i class="far fa-edit"></i>
                  </button>
                </div>
                <div class="col-2">
                  <button class="btn btn-danger btn-sm ml-1" @click.prevent="removeSection(item)">
                    <i class="far fa-trash-alt"></i>
                  </button>
                </div>
                <hr />
              </div>
            </li>
          </draggable>
        </ul>
      </div>
      <div class="col-12 col-sm-5 col-md-6 col-lg-7">
        <h5>Select a Photo</h5>
        <br />
        <input type="file" accept="image/*" @change="preview" />
        <br />
        <br />

        <img :src="src" id="preview" class="img-fluid" width="200px" v-if="src.length>0" />
        <br />
        <br />
        <button class="btn btn-danger" v-if="src.length>0" @click="removePhoto">REMOVE</button>
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
          @click.prevent="finish"
        >FINISH</button>
      </div>
    </div>
  </div>
</template>

<script>
import draggable from "vuedraggable";
var fileReader = new FileReader();

export default {
  props: ["resume", "id", "photo"],
  data() {
    return {
      src: "",
      resume_: [],
      file: null
    };
  },

  created() {
    if (this.id != null && this.photo != null && this.photo.length > 0)
      this.src = `${this.hostname}/client_images/${this.photo}`;
  },

  mounted() {
    if (this.resume.length > 0) {
      this.resume_ = this.resume;
      let index = this.resume.findIndex(section => section.meta === "summary");

      if (index > -1 && index != 1) {
        let summary = this.resume_.splice(index, 1);
        this.resume_.splice(1, 0, summary.pop());
      }
    }
  },

  watch: {
    resume: {
      deep: true,
      immediate: true,
      handler(val, newVal) {
        this.resume_ = this.resume;
      }
    }
  },

  methods: {
    removeSection(item) {
      this.resume_ = this.resume_.filter(_item => {
        return _item != item;
      });
      this.$emit("save", this.resume_);
    },

    editSection(meta) {
      this.$emit("section", meta);
    },

    removePhoto() {
      this.src = "";
      this.file = null;
    },

    finish() {
      // let method = this.id == null ? "POST" : "PUT";
      let method = "POST";
      let url =
        this.id == null
          ? `${this.hostname}/api/uploadcvdata`
          : `${this.hostname}/api/clients/${this.id}/update`;

      fetch(url, {
        method: method,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify({ data: this.resume_ })
      })
        .then(res => {
          return res.json();
        })
        .then(json => {
          if (json.msg == "success") {
            if (this.file !== null) {
              let formData = new FormData();
              formData.append("photo", this.file);
              formData.append("userId", json.userId);
              fetch(`${this.hostname}/api/uploadphoto`, {
                method: "POST",
                headers: {
                  Accept: "application/json"
                },
                body: formData
              })
                .then(res => res.json())
                .then(res => {
                  this.$router.push({
                    name: "dashboard"
                  });
                })
                .catch(err => {
                  console.log(err);
                });
            } else if (
              this.src.length == 0 && // removePhoto
              this.file == null && // removePhoto
							this.id != null && // EDIT MODE
							this.phone !=null &&
              this.photo.length > 0 // PHOTO EXISTS
            ) {
              fetch(`${this.hostname}/api/deletephoto/${this.id}`, {
                method: "POST"
              })
                .then(json => json.json())
                .then(data => {
                  console.log(this.data);
                  if (data.msg == "success") {
                    this.$router.push({
                      name: "dashboard"
                    });
                  }
                })
                .catch(err => {
                  console.log(err);
                });
            } else {
              this.$router.push({
                name: "dashboard"
              });
            }
          }
        })
        // .then(() => {
        //   this.$router.push({
        //     name: "dashboard"
        //   });
        // })
        .catch(err => {
          console.log(err);
        });
    },

    preview(e) {
      fileReader.onload = data => {
        this.src = data.target.result;
      };
      this.file = e.target.files[0];
      fileReader.readAsDataURL(e.target.files[0]);
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
  font-weight: 500;
  text-transform: capitalize;
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

.btn-danger,
.btn-info {
  padding-top: 5px;
  padding-bottom: 5px;
}

ul {
  list-style-type: none;
  padding-left: 0;
  li {
    cursor: move;
  }
  input {
    font-size: 12px;
  }
}
.col-8 {
  display: flex;
  align-items: flex-end;
}
</style>

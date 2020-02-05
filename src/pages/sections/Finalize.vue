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
          :disabled="disabled"
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
    if (this.id != null)
      this.src = `${this.hostname}/client_images/${this.photo}`;
  },

  mounted() {
    if (this.resume.length > 0) {
      this.resume_ = this.resume;
    }
  },

  computed: {
    disabled() {
      return this.src.length == 0 && this.id == null;
    }
  },

  methods: {
    removeSection(item) {
      this.resume_ = this.resume_.filter(_item => {
        return _item != item;
      });
    },

    editSection(meta) {
      this.$emit("section", meta);
    },

    finish() {
      let method = this.id == null ? "POST" : "PUT";
      let url =
        this.id == null
          ? `${this.hostname}/api/uploadcvdata`
          : `${this.hostname}/api/clients/${this.id}`;

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
                  // this.$router.push({
                  //   name: "dashboard"
                  // });
                  // console.log(res);
                })
                .catch(err => {
                  console.log(err);
                });
            }
          }
        })
        .then(() => {
          this.$router.push({
            name: "dashboard"
          });
        })
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



	var upload_photo_form = document.getElementById('upload_photo_form');
	upload_photo_form.addEventListener('submit', uploadPhoto.bind(upload_photo_form));

	function uploadPhoto(e) {
		e.preventDefault();
		console.log('uploading photo');
		const url = 'api/uploadphoto';
		fetch(url, {
			method: 'POST',
			headers: {
				'Accept': 'application/json'
			},
			body: new FormData(this),

		})
		.then(res => res.json())
		.then(res => {
			console.log(res);
			
			if(res.imagePath) {
				document.getElementById('imagePreview').innerHTML = `<img src="${res.imagePath}" alt="preview" class="img-thumbnail" width="256">`;
			}
		})
		.catch(err => console.log(err.response));
	}
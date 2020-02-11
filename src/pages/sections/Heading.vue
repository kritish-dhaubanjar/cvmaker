<template>
  <div class="container">
    <h3>What’s the best way for employers to contact you?</h3>
    <p class="lead">We suggest including an email and phone number.</p>

    <br />

    <div class="row">
      <div class="col-12 col-lg-9">
        <form class="needs-validation">
          <div class="form-row">
            <div class="col-12 col-sm-4 col-md-4 col-lg-4 mb-3">
              <label for="firstName">First Name</label>
              <input
                type="text"
                class="form-control"
                id="firstName"
                required
                v-model="data.data.firstName"
              />
            </div>
            <div class="col-12 col-sm-4 col-md-4 col-lg-4 mb-3">
              <label for="middleName">Middle Name</label>
              <input
                type="text"
                class="form-control"
                id="middleName"
                v-model="data.data.middleName"
              />
            </div>
            <div class="col-12 col-sm-4 col-md-4 col-lg-4 mb-3">
              <label for="lastName">Last Name</label>
              <input
                type="text"
                class="form-control"
                id="lastName"
                required
                v-model="data.data.lastName"
              />
            </div>
          </div>

          <div class="form-row">
            <div class="col-12 col-sm-4 col-md-4 col-lg-4 mb-4">
              <label for="city">City</label>
              <input type="text" class="form-control" id="city" required v-model="data.data.city" />
            </div>
            <div class="col-12 col-sm-4 col-md-4 col-lg-4 mb-3">
              <label for="state">State/Province</label>
              <input type="text" class="form-control" id="state" v-model="data.data.state" />
            </div>
            <div class="col-12 col-sm-4 col-md-4 col-lg-4 mb-3">
              <label for="country">Country</label>
              <input
                type="text"
                class="form-control"
                id="country"
                required
                v-model="data.data.country"
              />
            </div>
          </div>

          <div class="form-row">
            <div class="col-12 col-sm-4 col-md-4 col-lg-4 mb-3">
              <label for="phone">Phone Number</label>
              <input type="text" class="form-control" id="phone" required v-model="data.data.phone" />
            </div>
            <div class="col-12 col-sm-4 col-md-4 col-lg-4 mb-3">
              <label for="email">Email Address</label>
              <input type="email" class="form-control" id="email" v-model="data.data.email" />
            </div>
          </div>

          <h5 class="mt-4">Profession</h5>

          <div class="form-row">
            <div class="col-12">
              <label for="professions">You can use commas to enter professions.</label>
              <input
                type="text"
                class="form-control"
                id="professions"
                required
                v-model="professions"
              />
              <span
                class="badge badge-pill badge-success mr-1"
                v-for="(category,index) in data.data.categories"
                :key="index"
              >{{category}}</span>
              <br />
              <span
                class="badge badge-pill badge-info mr-1"
                v-for="title in filtered"
                :key="title.title"
                @click="addToProfession(title.title)"
              >{{title.title}}</span>
            </div>
          </div>

          <h5 class="mt-4">Social Links</h5>

          <div class="form-row">
            <div class="col-12 col-sm-6 col-md-3 col-lg-3 mb-3">
              <label for="website">Website</label>
              <input
                type="text"
                class="form-control"
                id="website"
                placeholder="example.com"
                v-model="data.data.social[0].link"
              />
            </div>
            <div class="col-12 col-sm-6 col-md-3 col-lg-3 mb-3">
              <label for="linkedin">LinkedIn</label>
              <input
                type="text"
                class="form-control"
                id="linkedin"
                placeholder="example"
                v-model="data.data.social[1].link"
              />
            </div>
            <div class="col-12 col-sm-6 col-md-3 col-lg-3 mb-3">
              <label for="twitter">Skype</label>
              <input
                type="text"
                class="form-control"
                id="twitter"
                placeholder="@example"
                v-model="data.data.social[2].link"
              />
            </div>
            <div class="col-12 col-sm-6 col-md-3 col-lg-3 mb-3">
              <label for="facebook">Facebook</label>
              <input
                type="text"
                class="form-control"
                id="facebook"
                placeholder="example"
                v-model="data.data.social[3].link"
              />
            </div>
          </div>

          <br />
        </form>
      </div>
      <div class="col-lg-3 d-none d-sm-none d-md-none d-lg-block">
        <img src="./../../assets/resume.png" class="img-fluid" />
      </div>
    </div>
    <div class="row">
      <div class="col-12">
        <button class="btn btn-outline-primary btn-sm" type="submit" disabled>BACK</button>
        <button
          class="btn btn-danger ml-auto btn-sm"
          type="submit"
          style="float:right"
          @click.prevent="submit"
          :disabled="isEnabled"
        >SAVE & NEXT: WORK HISTORY</button>
        <button
          class="btn btn-info ml-auto mr-1 btn-sm"
          type="submit"
          style="float:right"
          :disabled="isEnabled"
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
  data() {
    return {
      suggestions: [],
      attempt: 0,
      professions: "",
      data: {
        meta: "header",
        data: {
          firstName: "",
          middleName: "",
          lastName: "",
          city: "",
          state: "",
          country: "",
          phone: "",
          email: "",
          categories: [],
          social: [
            {
              platform: "website",
              link: ""
            },
            {
              platform: "linkedin",
              link: ""
            },
            {
              platform: "skype",
              link: ""
            },
            {
              platform: "facebook",
              link: ""
            }
          ]
        }
      }
    };
  },

  watch: {
    // resume() {
    //   if (this.resume.length > 0) {
    //     let index = this.resume.findIndex(section => section.meta === "header");
    //     if (index > -1) {
    //       this.data = this.resume[index];
    //     }
    //   }
    // },
    professions() {
      this.data.data.categories = this.professions.split(", ");
    }
  },

  mounted() {
    if (this.resume.length > 0) {
      let index = this.resume.findIndex(section => section.meta === "header");
      if (index > -1) {
        this.data = this.resume[index];
        if (this.data.data.categories.length > 0)
          this.professions = this.data.data.categories.join(", ");
      }
    }
    fetch(`${this.hostname}/api/category`)
      .then(res => res.json())
      .then(data => {
        this.suggestions = data;
      })
      .catch(err => {
        console.log(err);
      });
  },

  computed: {
    isEnabled() {
      return !(
        this.data.data.firstName.length > 0 &&
        this.data.data.lastName.length > 0 &&
        this.data.data.city.length > 0 &&
        this.data.data.country.length > 0 &&
        this.data.data.phone.length > 0
      );
    },
    filtered() {
      if (this.professions.length > 0) {
        let profession = this.professions.split(", ").pop();
        return this.suggestions.filter(p => {
          return p.title.toLowerCase().includes(profession.toLowerCase());
        });
      } else {
        return [];
      }
    }
  },
  methods: {
    submit() {
      this.attempt++;
      this.$emit("next", this.data);
    },
    addToProfession(text) {
      this.professions = this.professions.split(",");
      this.professions.pop();
      this.professions.length > 0
        ? this.professions.push(` ${text}`)
        : this.professions.push(`${text}, `);
      this.professions = this.professions.join();
      // this.professions += this.professions.length > 0 ? `, ${text}` : text;
    }
  }
};
</script>

<style scoped lang="scss">
@import "./../../colors.scss";
h3,
h5 {
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
span {
  font-size: 13px;
  margin-bottom: 4px;
  margin-top: 4px;
}

.badge-info {
  cursor: pointer !important;
}
</style>

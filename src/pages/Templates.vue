<template>
  <div id="dashboard" class="py-5">
    <div class="container">
      <div class="row">
        <div class="col-12 col-sm-9">
          <h2>
            Resume
            <span>Templates</span>
          </h2>
        </div>
      </div>

      <hr class="mt-4 mb-5" />

      <div class="row">
        <div class="col-12 col-sm-6 col-md-3 mb-5">
          <img src="./../assets/word.png" class="img-fluid" />
          <h4 class="pt-4 pb-2">Minimo</h4>
          <p>Minimalistic CV template. Use a classic layout, but give it a modern twist.</p>
        </div>
        <div class="col-12 col-sm-6 col-md-3 mb-5">
          <img src="./../assets/pdf.png" class="img-fluid" />
          <h4 class="pt-4 pb-2">Enfold</h4>
          <p>Two column CV template. Draw attention to your summary and skills.</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import "./../colors.scss";

h2 span {
  font-size: 32px;
  color: $secondary;
}
</style>

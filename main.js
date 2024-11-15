const template = document.createElement("template");
template.innerHTML = `
   <link rel="stylesheet" href="style.css">
   <div class="carousel_wrapper">
   <div class="buttons">
   <button class = "slideButton prev">&#10502;</button>
   <button class = "slideButton next">&#10503;</button>
   </div>
    <slot name = "carousel-items">
   </div>


`;

class carousel extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.template = template;
  }

  render() {
    this.shadowRoot.appendChild(template.content.cloneNode(true));
    this.images = document.querySelectorAll(".images");
    this.prevButton = this.shadowRoot.querySelector(".prev");
    this.nextButton = this.shadowRoot.querySelector(".next");
    this.prevClicked = 0;
    this.prevButton.addEventListener("click", (e) =>
      this.prevFunction(e, this.images)
    );
    this.nextButton.addEventListener("click", (e) =>
      this.nextFucntion(e, this.images)
    );
  }
  prevFunction(e, images) {
    let len = images.length;
    if (this.prevClicked === len - 1) {
      images.forEach((image) => {
        image.style.transform = "translateX(0px)";
      });
      this.prevClicked = -1;
    }
    images.forEach((_, i) => {
      if (i === this.prevClicked) {
        images[i].style.transform = `translateX(${
          -600 * (i + 1) - 15 * (i + 1)
        }px)`;
        images[i + 1].style.transform = `translateX(${
          -600 * (i + 1) - 15 * (i + 1)
        }px)`;
      }
    });
    console.log(this.prevClicked);

    this.prevClicked++;
  }
  nextFucntion(images) {
    console.log(4545);
  }
  connectedCallback() {
    this.render();
  }
}
customElements.define("carousel-element", carousel);

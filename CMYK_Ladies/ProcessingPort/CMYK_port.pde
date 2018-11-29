// CMYK Halftone Portrait Morph
// by August Luhrs Oct. 2018
// photos by Arne Svenson
// with lots of help from Dan Shiffman, Alejandro Matamala Ortiz, Allison Parrish
//
// PImage img;

void setup() {
  size(1080, 1080);

}

void draw() {
  background(0);
  image(img, 90, 80);
  image(img, mouseX-img.width/2, mouseY-img.height/2);
}

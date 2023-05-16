//* fixe la navbar
window.addEventListener('scroll', function () {
  let navbar = this.document.getElementById('navbar');
  navbar.classList.toggle('fixed', this.window.scrollY > 0);
})

//* menu hamberger
let toggle = document.querySelector('.toggle');
let body = document.querySelector('body');
let items = document.querySelector('.item');
let section = document.querySelector("section");

toggle.addEventListener('click', function () {
  body.classList.toggle('open');
});

//* envoi email
function sendEmail() {
  window.location.assign("mailto:schommersv06@gmail.com"); 
}

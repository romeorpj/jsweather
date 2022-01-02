let hamburger = document.querySelector(".menu__hamburger");
let menuList = document.querySelector(".menu__list");

hamburger.addEventListener("click", () => {
	menuList.classList.toggle("open");

	console.log("hamburger is clicked");
});

console.log("kjgkhgjh");

function setupSidebar() {
  var headerHeight = document.querySelector("header").getBoundingClientRect().height;
  var spy = new Gumshoe(".sidebar-right a", {
    reflow: true,
    navClass: "scroll-current",
    offset: headerHeight,
  });

  // Make the previous elements "hide"
  var elements = Array.from(document.querySelectorAll(".sidebar-right li"));

  function callTill(target, func) {
    elements
      .slice(0, elements.indexOf(target))
      .forEach((x) => x.classList[func]("scroll-past"))
  }

  document.addEventListener("gumshoeActivate", (event) => {
    callTill(event.target, "add");
  });
  document.addEventListener("gumshoeDeactivate", (event) => {
    callTill(event.target, "remove");
  });

  var x = document.querySelector(".sidebar-right li.scroll-current");
  if (x) { callTill(x, "add") }
}

document.addEventListener("DOMContentLoaded", function main(params) {
  setupSidebar();
});

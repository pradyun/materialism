let header = document.querySelector("header");
let article = document.querySelector("article");
let sidebars = document.querySelectorAll(".sidebar-scroll");

function setup() {
  // Scrollspy -- highlight table on contents, based on scroll
  let headerHeight = header.getBoundingClientRect().height;
  let spy = new Gumshoe(".sidebar-right a", {
    reflow: true,
    navClass: "scroll-current",
    offset: headerHeight,
  });

  // Make the previous elements "hide"
  let elements = Array.from(document.querySelectorAll(".sidebar-right li"));

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

  let x = document.querySelector(".sidebar-right li.scroll-current");
  if (x) { callTill(x, "add") }

  // Sidebars can scroll now!
  for (sidebar of sidebars) {
    sidebar.style.overflowY = "scroll";
  }
}

function scrollHandler(positionY) {
  //
  // Header Shadow and "fade-away" content
  //
  if (positionY == 0) {
    header.classList.remove("scrolled");
  } else {
    header.classList.add("scrolled");
  }
  if (article.getBoundingClientRect().y < -32) {
    // -32 is for letting *some* amount of scroll-over
    header.classList.add("scrolled-content");
  } else {
    header.classList.remove("scrolled-content");
  }
  //
  // Manage the sidebar height
  //
  for (el of sidebars) {
    // TODO: Implement sidebar height adjustment
  }
}

document.addEventListener("DOMContentLoaded", function main(params) {
  setup();

  // Taken from https://developer.mozilla.org/en-US/docs/Web/API/Document/scroll_event
  let last_known_scroll_position = 0;
  let ticking = false;

  window.addEventListener('scroll', function(e) {
    last_known_scroll_position = window.scrollY;

    if (!ticking) {
      window.requestAnimationFrame(function() {
        scrollHandler(last_known_scroll_position);
        ticking = false;
      });

      ticking = true;
    }
  });
});

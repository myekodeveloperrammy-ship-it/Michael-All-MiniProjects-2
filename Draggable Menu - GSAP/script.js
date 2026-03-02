gsap.registerPlugin(Draggable);

const menuDropZone = document.querySelector(".menu-drop-zone");
const menuDrawer = document.querySelector(".menu-drawer");
const menuLogo = document.querySelector(".menu-logo");
const menuItems = document.querySelector(".menu-items");
const menuItemElement = document.querySelectorAll(".menu-item");
const menuToggler = document.querySelector(".menu-toggler");

let isMenuOpen = false;

gsap.set(menuItems, { width: "auto" });
gsap.set(menuItemElement, { opacity: 1 });

const menuItemFullWidth = menuItems.offsetWidth;
const drawerGap = 0.35 * 16;
const drawerPadding = 0.35 * 16;
const logoWidth = menuLogo.offsetWidth;
const togglerWidth = menuToggler.offsetWidth;

const closeMenuWidth =
  drawerPadding + logoWidth + drawerGap + togglerWidth + drawerPadding;

const openMenuWidth =
  drawerPadding +
  logoWidth +
  drawerGap +
  menuItemFullWidth +
  drawerGap +
  togglerWidth +
  drawerPadding;

gsap.set(menuItems, { width: 0, marginRight: 0 });
gsap.set(menuItemElement, { opacity: 0, scale: 0.85 });
gsap.set(menuDropZone, { width: closeMenuWidth });

function toggleMenu() {
  if (!isMenuOpen) {
    closeMenu();
  } else {
    openMenu();
  }
  isMenuOpen = !isMenuOpen;
}

menuToggler.addEventListener("click", toggleMenu);

function openMenu() {
  menuToggler.classList.add("close");

  gsap.to(menuItems, {
    width: menuItemFullWidth,
    marginRight: drawerGap,
    duration: 0.5,
    ease: "power3.inOut",
    onStart: () => {
      gsap.to(menuItemElement, {
        opacity: 1,
        scale: 1,
        duration: 0.3,
        stagger: 0.05,
        delay: 0.2,
        ease: "power2.inOut",
      });
    },
  });
}

function closeMenu() {
  menuToggler.classList.remove("close");

  gsap.to(menuItems, {
    width: 0,
    marginRight: 0,
    duration: 0.5,
    ease: "power3.inOut",
    onStart: () => {
      gsap.to(menuItemElement, {
        opacity: 0,
        scale: 0.85,
        duration: 0.3,
        stagger: {
          each: 0.05,
          from: "end",
        },
        delay: 0.2,
        ease: "power3.inOut",
      });
    },
  });
}

const snapThreshold = 200;

Draggable.create(menuDrawer, {
  type: "x,y",
  bounds: window,
  cursor: "grab",
  activeCursor: "grabbing",

  onDragStart: function () {
    const activeMenuWidth = isMenuOpen ? openMenuWidth : closeMenuWidth;
    gsap.set(menuDropZone, { width: activeMenuWidth });
  },

  onDrag: function () {
    const isMenuWidthinSnapZone =
      Math.abs(this.x) < snapThreshold && Math.abs(this.y) < snapThreshold;

    if (isMenuWidthinSnapZone) {
      gsap.to(menuDropZone, { opacity: 1, duration: 0.1 });
    } else {
      gsap.to(menuDropZone, { opacity: 0, duration: 0.1 });
    }
  },

  onDragEnd: function () {
    gsap.to(menuDropZone, { opacity: 0, duration: 0.1 });

    const isMenuWidthinSnapZone =
      Math.abs(this.x) < snapThreshold && Math.abs(this.y) < snapThreshold;

    if (isMenuWidthinSnapZone) {
      gsap.to(menuDrawer, {
        x: 0,
        y: 0,
        duration: 0.3,
        ease: "power2.out",
      });
    }
  },
});
// JavaScript | NodeJS | React | Svelte | Django | C++ | C# | C | NextJS | Nord | Java | Ruby |

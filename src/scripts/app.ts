import anime from "animejs/lib/anime.es.js";

const getCenterOfElement = (element: HTMLElement) => {
  const box = element.getBoundingClientRect();
  const coords: {
    xCenter: number;
    yCenter: number;
  } = {
    xCenter: 0,
    yCenter: 0,
  };

  coords.xCenter = box.left + box.width / 2;
  coords.yCenter = box.top + box.height / 2;

  return coords;
};

const findCenterRelativeToParent = (
  child: HTMLElement,
  parent: HTMLElement
) => {
  const childCoords = child.getBoundingClientRect();
  const parentCoords = parent.getBoundingClientRect();
  const centerX = parentCoords.left - childCoords.left - childCoords.width / 2;
  const centerY = parentCoords.top - childCoords.top - childCoords.height / 2;

  return { x: Math.abs(centerX), y: Math.abs(centerY) };
};

window.addEventListener("DOMContentLoaded", () => {
  const navLinks = document.querySelectorAll(
    "nav ul li"
  ) as NodeListOf<HTMLElement>;
  const navigation = document.querySelector("nav ul");
  const contactFirst = document.querySelector("#contact-first") as HTMLElement;
  const contactIcon: HTMLElement | null = document.querySelector(
    "#contact-first-overlay > svg"
  ) as HTMLElement;
  const contactOverlay = document.querySelector(
    "#contact-first-overlay"
  ) as HTMLElement;
  const contactArrow = document.querySelector("#contact-arrow") as SVGElement;
  const contactIconCoords = findCenterRelativeToParent(
    contactIcon,
    contactOverlay
  );

  contactFirst?.addEventListener("mouseenter", () => {
    anime({
      targets: "#contact-first-overlay",
      clipPath: `circle(9% at ${contactIconCoords.x}px 50%)`,
      easing: "easeOutCirc",
      duration: 400,
      complete: () => {
        contactArrow.style.opacity = "1";
        contactArrow.style.transform = "translateX(0%)";
      },
    });

    anime({
      targets: "#contact-arrow",
      translateX: "20%",
      opacity: "0",
      easing: "easeOutQuart",
      duration: 200,
    });
  });

  contactFirst?.addEventListener("mouseleave", () => {
    anime({
      targets: "#contact-first-overlay",
      clipPath: `circle(0% at ${contactIconCoords.x}px 50%)`,
      easing: "easeOutQuad",
      duration: 300,
      complete: () => {
        contactOverlay.style.clipPath = "circle(0% at 0px 50%)";
      },
    });
  });

  const wrapper = document.querySelector<HTMLElement>("#wrapper");

  for (let i = 0; i < navLinks.length; i++) {
    navLinks[i].addEventListener("mouseenter", () => {
      anime({
        targets: "#wrapper",
        backgroundPosition: `0% ${i * -5}%`,
        backgroundSize: "42px 42px",
        easing: "easeOutCirc",
        duration: 300,
        complete: () => {
          wrapper!.style.backgroundPosition = `0% ${i * -5}%`;
        },
      });
    });

    navigation!.addEventListener("mouseleave", () => {
      anime({
        targets: "#wrapper",
        backgroundSize: "48px 48px",
        easing: "easeOutCirc",
        duration: 300,
      });
    });
  }

  const timeline = anime.timeline({
    easing: "easeOutExpo",
  });

  timeline
    .add({
      targets: "#wrapper",
      opacity: [0, 1],
      duration: 600,
    })
    .add({
      targets: navLinks,
      translateX: [-50, 0],
      opacity: [0, 1],
      delay: anime.stagger(130),
    })
    .add(
      {
        targets: "header > :not(:last-child)",
        translateY: [-30, 0],
        opacity: [0, 1],
        delay: anime.stagger(100),
      },
      "-=800"
    )
    .add(
      {
        targets: "header > :last-child",
        translateX: [-50, 0],
        opacity: [0, 1],
      },
      "-=500"
    )
    .add({
      targets: "#contact-arrow",
      translateX: 6,
      duration: 200,
      easing: "easeInOutExpo",
    })
    .add({
      targets: "#contact-arrow",
      translateX: 0,
      duration: 200,
    });
});

const observerOptions = {
  root: null,
  rootMargin: "0px",
  threshold: 0.6,
};

let currentlyActiveSection: HTMLElement | null = null;

const observer = new IntersectionObserver((entries) => {
  let isAnySectionVisible = false;

  entries.forEach((entry) => {
    const id = entry.target.getAttribute("id");
    const navLink: HTMLElement | null = document.querySelector(
      `nav li a[href="#${id}"]`
    );

    if (entry.isIntersecting) {
      isAnySectionVisible = true;

      if (currentlyActiveSection) {
        currentlyActiveSection.classList.remove("active");
      }
      navLink!.classList.add("active");

      currentlyActiveSection = navLink;
    }
  });

  if (!isAnySectionVisible) {
    document.querySelector(".active")?.classList.remove("active");
  }
}, observerOptions);

const sections = document.querySelectorAll("section");
sections.forEach((section) => observer.observe(section));

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
  const indicator = document.querySelector("#indicator");
  const navLinks = document.querySelectorAll("nav ul li");
  const navigation = document.querySelector("nav ul");

  const contactFirst = document.querySelector("#contact-first") as HTMLElement;
  const contactIcon: HTMLElement | null = document.querySelector(
    "#contact-first-overlay > svg"
  ) as HTMLElement;
  const contactOverlay = document.querySelector(
    "#contact-first-overlay"
  ) as HTMLElement;

  const contactArrow = document.querySelector("#contact-arrow") as SVGElement;

  const projects: HTMLElement[] = Array.from(
    document.querySelectorAll(".project")
  );

  const skillsUsed = [[0, 1, 2, 3, 4, 5, 6]];
  const skills: HTMLElement[] = Array.from(
    document.querySelectorAll("#skills > li")
  );
  const skillsList = document.querySelector("#skills") as HTMLElement;

  for (let i = 0; i < projects.length; i++) {
    projects[i].style.height = `${skillsList.getBoundingClientRect().height}px`;
    projects[i].addEventListener("mouseover", () => {
      skillsUsed[i].forEach((element) => {
        skills[element].classList.add("text-violet-500");
      });
      const additionalSkill = document.createElement("li");
      additionalSkill.innerHTML = "TAILWINDCSS";
      skillsList.appendChild(additionalSkill);
    });
  }

  const contactIconCoords = findCenterRelativeToParent(
    contactIcon,
    contactOverlay
  );

  contactFirst?.addEventListener("mouseenter", () => {
    anime({
      targets: "#contact-first-overlay",
      clipPath: `circle(9% at ${contactIconCoords.x}px 50%)`,
      easing: "easeOutCirc",
      duration: 500,
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
      duration: 300,
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

  for (let i = 0; i < navLinks.length; i++) {
    navLinks[i].addEventListener("mouseenter", () => {
      anime({
        targets: "#wrapper",
        backgroundPosition: `0% ${(i + 1) * -5}%`,
        backgroundSize: "4vmin 4vmin",
        easing: "easeOutCirc",
        duration: 200,
      });
    });

    // navigation?.addEventListener("mouseenter", () => {
    //   anime({
    //     targets: "#wrapper",
    //     backgroundSize: "4vmin 4vmin",
    //     easing: "easeOutCirc",
    //     duration: 200,
    //   });
    // });

    navigation?.addEventListener("mouseleave", () => {
      anime({
        targets: "#wrapper",
        backgroundSize: "5vmin 5vmin",
        easing: "easeOutCirc",
        duration: 200,
      });
    });
  }

  document.querySelector("li")?.addEventListener("mouseenter", (event) => {});

  anime({
    targets: "#indicator",
    opacity: 1,
    delay: 500,
    duration: 300,
    easing: "linear",
  });

  // anime({
  //   targets: navLinks,
  //   translateX: 50,
  //   opacity: [0, 1], // From 0 to 1
  //   delay: anime.stagger(100), // Each element will start 100ms after the previous one
  // });
});

const observerOptions = {
  root: null,
  rootMargin: "0px",
  threshold: 0.9,
};

let currentlyActiveSection: HTMLElement | null = null;

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    const id = entry.target.getAttribute("id");
    const indicator: HTMLElement | null = document.querySelector("#indicator");
    const { width, height } = indicator!.getBoundingClientRect();
    const navLinkCircle: HTMLElement | null = document.querySelector(
      `nav li a[href="#${id}"] + svg`
    );

    if (entry.isIntersecting) {
      if (currentlyActiveSection) {
        anime({
          targets: ".active",
          fillOpacity: "1",
          strokeOpacity: "1",
        });
        currentlyActiveSection.classList.remove("active");
      }
      navLinkCircle!.classList.add("active");
      const { xCenter, yCenter } = getCenterOfElement(
        document.querySelector(".active")!
      );

      anime({
        targets: "#indicator",
        top: yCenter - height / 2,
        scale: [
          { value: 1.5, duration: 100, easing: "easeInOutSine" },
          { value: 0.9, duration: 100, easing: "easeInOutSine" },
        ],
        duration: 600,
        easing: "cubicBezier(.25,.75,.5,1.25)",
      });

      anime({
        targets: ".active",
        fillOpacity: "0",
        strokeOpacity: "0",
      });

      indicator!.style.left = `${xCenter - width / 2}px`;

      currentlyActiveSection = navLinkCircle;
    }
  });
}, observerOptions);

// Target the sections to observe
const sections = document.querySelectorAll("section");
sections.forEach((section) => observer.observe(section));

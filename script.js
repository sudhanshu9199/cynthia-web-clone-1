const scroll = new LocomotiveScroll({
  el: document.querySelector("#main"),
  smooth: true,
});

var timeout;
function circleSkews() {
//   var xScale = 1;
//   var yScale = 1;

  var xPrev = 0;
  var yPrev = 0;
  window.addEventListener("mousemove", function (details) {
    clearTimeout(timeout);

    const xScale = gsap.utils.clamp(0.5, 1.2, details.clientX - xPrev);
    const yScale = gsap.utils.clamp(0.5, 1.2, details.clientY - yPrev);

    xPrev = details.clientX;
    yPrev = details.clientY;

    document.querySelector("#cursor-circle").style.transform = 
    `translate(${details.clientX}px, ${details.clientY}px) scale(${xScale}, ${yScale})`;

    timeout = setTimeout(function() {
        document.querySelector("#cursor-circle").style.transform = 
    `translate(${details.clientX}px, ${details.clientY}px) scale(1, 1)`;
    })
  });
}

function firstPageAnimation() {
  var tl = gsap.timeline();

  tl.from("#nav", {
    y: "-10",
    opacity: 0,
    duration: 1.5,
    ease: Expo.easeInOut,
  })
    .to(".bounding-elem", {
      y: 0,
      ease: Expo.easeInOut,
      delay: -1,
      duration: 1.2,
      stagger: 0.2, // to do delay in each
    })
    .from("#small-heading", {
      y: -11,
      opacity: 0,
      duration: 1.4,
      delay: -1,
      ease: Expo.easeInOut,
    })
    .from("#herofooter", {
      y: -10,
      opacity: 0,
      duration: 1.5,
      delay: -1,
      ease: Expo.easeInOut,
    });
}




document.querySelectorAll('.elem').forEach(function (elem){
    var diffrot = 0;
    var rotate = 0;

    elem.addEventListener("mouseleave", function (dets) {
        gsap.to(elem.querySelector("img"), {
          opacity: 0,
          ease: Power3,
          duration: 0.5,
        });
      });
      elem.addEventListener("mousemove", function (dets) {
        var diff = dets.clientY - elem.getBoundingClientRect().top;
        diffrot = dets.clientX - rotate;
        rotate = dets.clientX;
        gsap.to(elem.querySelector("img"), {
          opacity: 1,
          ease: Power3,
          top: diff,
          left: dets.clientX,
          rotate: gsap.utils.clamp(-20, 20, diffrot * 0.5),
        });
    });
});
firstPageAnimation();
circleSkews();

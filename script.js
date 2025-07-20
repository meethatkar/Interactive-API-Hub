var tl = gsap.timeline({

});

tl.from("nav>h1",{
    x:"-100%",
    scale: 0.8,
    opacity:0,
    duration:1,
    ease:"back.out(1)"
})

// tl.from(".L",{
//     x:"100%",
//     scale:0.9,
//     opacity:0,
//     duration:1,
//     ease:"back.out(0.5)",
//     // stagger: 0.5,
// })

// tl.from(".R",{
//     x:"-100%",
//     scale:0.9,
//     opacity:0,
//     duration:1,
//     ease:"back.out(0.5)",
//     // stagger: 0.5,
// })
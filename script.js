var tl = gsap.timeline({

});

tl.from("nav>h1",{
    x:"-100%",
    scale: 0.8,
    opacity:0,
    duration:1,
    ease:"back.out(1)"
})

function locomotive(){
    
            // Initialize Locomotive Scroll
            const locoScroll = new LocomotiveScroll({
                el: document.querySelector('main'), // The container for smooth scrolling
                smooth: true, // Enable smooth scrolling
                // multiplier: 1, // Adjust scroll speed
                // lerp: 0.08, // Linear interpolation for smooth scroll (lower is smoother)
                // getDirection: true, // Get scroll direction
                // getSpeed: true, // Get scroll speed
                // You might need to adjust these based on your layout and content
                // tablet: { smooth: true }, // Enable smooth scroll on tablets
                // mobile: { smooth: true } // Enable smooth scroll on mobiles
            });

            // Register GSAP ScrollTrigger plugin
            gsap.registerPlugin(ScrollTrigger);

            // --- ScrollTrigger Proxy for Locomotive Scroll ---
            // This is the crucial part that makes GSAP ScrollTrigger work with Locomotive Scroll.
            // It tells ScrollTrigger to use Locomotive Scroll's scroll position instead of the native browser scroll.
            ScrollTrigger.scrollerProxy("main", {
                scrollTop(value) {
                    return arguments.length ? locoScroll.scrollTo(value, { duration: 0, disableLerp: true }) : locoScroll.scroll.instance.scroll.y;
                }, // We don't want to smooth scroll to the position, so duration: 0
                getBoundingClientRect() {
                    return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
                },
                // LocomotiveScroll handles pinning with transforms, so we must pinType: "transform"
                pinType: document.querySelector("main").style.transform ? "transform" : "fixed"
            });

            // --- Event Listeners for Updates and Refresh ---
            // Update ScrollTrigger when Locomotive Scroll updates (e.g., on scroll, resize, content changes)
            locoScroll.on("scroll", ScrollTrigger.update);

            // Refresh ScrollTrigger when Locomotive Scroll's internal state changes (e.g., on resize)
            locoScroll.on("resize", () => {
                ScrollTrigger.refresh();
            });

            // --- Set default scroller for all ScrollTriggers ---
            // This ensures all subsequent ScrollTrigger animations use the Locomotive Scroll instance
            ScrollTrigger.defaults({
                scroller: "main"
            });
}

locomotive();

let pages = document.querySelectorAll(".pages");
var pages_anim = gsap.timeline();

if(window.innerWidth>700){
pages.forEach((page)=>{
    gsap.to(page,{
        opacity:0,
        scale:0.8,
        zIndex:"-1",
        // stagger:0.5,
        scrollTrigger:{
            start: "0% 0%",
            end: "0% -50%",
            // markers: true,
            scroller: "main",
            trigger: page,
            scrub:true,
            pin:true
        }
    })
})
}

else{
    
pages.forEach((page)=>{
    gsap.to(".pages",{
        opacity:0,
        scale:0.8,
        zIndex:"-1",
        stagger:0.5,
        scrollTrigger:{
            start: "top 0%",
            end: "top -50%",
            // markers: true,
            scroller: "main",
            trigger: ".pages",
            scrub:true,
            pin:true
        }
    })
})
}
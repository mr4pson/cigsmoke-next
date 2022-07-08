const variants = {
fadInOut:{
  start: {
    opacity: 0,
  },
  middle: {
    opacity: 1,
    transition: {
      duration: 0.3, 
    },
  }, 
  end: {
    opacity: 0,
    transition: { ease: "easeInOut", delay: 0.5 },
  },
},
grow:{
    hover:{
    scale: 1.02,
    transition: { duration: 0.2 },
    },
    tap:{
        scale: 1 
    }
},
boxShadow:{
    hover:{
       boxShadow:'0px 0px 4px 2px rgba(0, 0, 0, 0.25)',
      
       transition: { duration: 0.2 },
    },
    tap:{
        boxShadow:'0px 0px 0px 0px #ffffff',  
    }    
},
fadeInSlideIn:{
init:{
  y:25,
  opacity:0
},
animate:{
  y:0,
  opacity:1
},
exit:{
  y:25,
  opacity:0
}
},
fadeOutSlideOut:{
init:{
  y:-25,
  opacity:0
},
animate:{
  y:0,
  opacity:1
},
exit:{
  y:-25,
  opacity:0
}
},
  slideRight:{
    init:{
      x:0,
      opacity:1
    },
    animate:{
      x:15,
      opacity:0
    },
    exit:{
      x:0,
      opacity:1
    }
  },
  fadeIn:{
    init:{
      opacity:1
    },
    animate:{
      opacity:0
    },
    exit:{
      opacity:1
    }
  },
  slider:{
      enter: (direction: number) => {
    return {
      x: direction > 0 ? 1000 : -1000,
      opacity: 0
    };
  },
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1
  },
  exit: (direction: number) => {
    return {
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0
    };
  }
  }
}

export default variants;
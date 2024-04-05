window.addEventListener('load', function(){
    

    let menuIcon = document.querySelector("#menu-icon");
    let navs = document.querySelectorAll(".flexBoxUl");

    menuIcon.onclick = () =>{
        /* alert("?") */
        navs.forEach(nav => {
            nav.classList.toggle("active");
        });
     /*    nav.classList.toggle("active") */
        
      }

  });
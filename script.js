const textContainer = document.getElementById('text-container');
    const texts = ["Front-End Developer"];

    function typeText(index, text, speed) {
      if (index < text.length) {
        textContainer.innerHTML += text.charAt(index);
        index++;
        setTimeout(function() {
          typeText(index, text, speed);
        }, speed);
      }
    }

    function changeText(index) {
      textContainer.innerHTML = ''; // Clear the content before starting the animation
      typeText(0, texts[index], 150);

      // Update index for the next text
      index = (index + 1) % texts.length;

      // Call the function recursively for the next text
      setTimeout(function() {
        changeText(index);
      }, texts[index].length * 50 + 3000); // 2000ms delay after typing completes
    }

    // Initial call to start the animation
    changeText(0);


let element = document.getElementById('element');
let na = document.getElementById('name');
let proj = document.getElementById('proj');
let aboutme = document.getElementById('aboutme');

let home = document.getElementById('home');

home.addEventListener('click', ()=>{
    project.style.color = '#ffffff';
    about.style.color = '#ffffff';
    element.style.marginLeft = '1.4cm';
    element.style.width = '1.5cm';
    home.style.color = '#f1b24a';
    proj.style.display = 'none';
    aboutme.style.display = 'none';
    na.style.display = 'flex';
});


let project = document.getElementById('project');

project.addEventListener('click', ()=>{
    home.style.color = '#ffffff';
    about.style.color = '#ffffff';
    element.style.marginLeft = '3.7cm';
    element.style.width = '1.9cm';
    project.style.color = '#f1b24a';
    na.style.display = 'none';
    aboutme.style.display = 'none';
    proj.style.display = 'flex';
});


let about = document.getElementById('about')

about.addEventListener('click', ()=>{
    home.style.color = '#ffffff';
    project.style.color = '#ffffff';
    element.style.marginLeft = '6.5cm';
    element.style.width = '2.2cm';
    about.style.color = '#f1b24a';
    na.style.display = 'none';
    proj.style.display = 'none';
    aboutme.style.display = 'flex';
});



let project_1 = document.getElementById('project-1');
let project_2 = document.getElementById('project-2');
let project_3 = document.getElementById('project-3');
let project_4 = document.getElementById('project-4');

project_1.addEventListener('click' ,()=>{
    window.scrollTo({
        top: 500,
        behavior: 'smooth'});
});

project_2.addEventListener('click' ,()=>{
    window.scrollTo({
        top: 500,
        behavior: 'smooth'});
});


project_3.addEventListener('click' ,()=>{
    window.scrollTo({
        top: 500,
        behavior: 'smooth'});
});

project_4.addEventListener('click' ,()=>{
    window.scrollTo({
        top: 500,
        behavior: 'smooth'});
});
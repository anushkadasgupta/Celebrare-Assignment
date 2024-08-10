const modal=document.getElementById("myModal");
const closebutton=document.getElementById("closebtn");
const modal2=document.getElementById("myModal2");
const clsmodal=document.getElementById("closemodal");
const modal3=document.getElementById("myModal3");
const imageInput = document.getElementById("img");
const previewImage = document.getElementById("previewImage");
const modalImage = document.getElementById("modalImage");
const finalImage=document.getElementById("finalImage");
const opnbtn=document.getElementById("openbutton");
const savebutton=document.getElementById("savebtn");
const originalbtn = document.getElementById("original-button");
let transformedImage=null;
let setImage=null;

imageInput.addEventListener('change', (event) => {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      previewImage.src = e.target.result;  
    };
    reader.readAsDataURL(file);
  }
});
imageInput.addEventListener('click', () => {
  modalImage.src = previewImage.src;
  modal.style.display = "block";
});

imageInput.addEventListener('change', (event) => {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      modalImage.src = e.target.result; 

    };
    reader.readAsDataURL(file);
  }
});

opnbtn.addEventListener('click', () => {
  modal2.style.display = "block";
  finalImage.src = transformedImage ? transformedImage.src : modalImage.src;
});

savebutton.addEventListener('click', () => {
  modal2.style.display = "none";
  modal.style.display ="none";
  previewImage.src = setImage ? setImage.src : finalImage;
});

closebutton.onclick=function()
{
  modal.style.display="none";
}

function openAndclose()
{
  modal.style.display="none";
  modal2.style.display="block";
}

clsmodal.onclick=function()
{
  modal2.style.display="none";
  modal.style.display="none";
}

function flipOpenAndClose()
{
  modal3.style.display="block";
  window.onclick = function(event) {
    if (event.target == modal3)
      {
      modal3.style.display = "none";
    }
  }
}

function flipHorizontal() {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  canvas.width = modalImage.width;
  canvas.height = modalImage.height;
  ctx.scale(-1, 1);
  ctx.drawImage(modalImage, -modalImage.width, 0);
  const newImage = document.createElement('img');
  newImage.src = canvas.toDataURL();
  transformedImage = newImage;
  modalImage.src = newImage.src; 
}

function flipVertical() {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = modalImage.width;
    canvas.height = modalImage.height;
    ctx.scale(1, -1);
    ctx.drawImage(modalImage, 0, -modalImage.height); 
    const newImage = document.createElement('img');
    newImage.src = canvas.toDataURL();
    transformedImage = newImage;
    modalImage.src = newImage.src;
}

let angle = 0;
function rotation() {
  const canvas = document.createElement('canvas');
  canvas.width = modalImage.width;
  canvas.height = modalImage.height;
  const ctx = canvas.getContext('2d');
  ctx.translate(canvas.width / 2, canvas.height / 2);
  ctx.rotate(angle * Math.PI / 180);
  ctx.drawImage(modalImage, -modalImage.width / 2, -modalImage.height / 2);
  ctx.translate(-canvas.width / 2, -canvas.height / 2); 
  const newImage = document.createElement('img');
  newImage.src = canvas.toDataURL();
  transformedImage = newImage;
  modalImage.src = newImage.src;
  angle += 90;
}

function original() {
    finalImage.classList.remove('square-image', 'rounded-image', 'rectangle-image');
    finalImage.classList.add('original-image');
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = finalImage.width;
    canvas.height = finalImage.height;
    ctx.drawImage(finalImage, 0, 0);
    const newImage = document.createElement('img');
    newImage.src = canvas.toDataURL(); 
    setImage = newImage;
    finalImage.src = newImage.src;
  }

function square() {
  finalImage.classList.remove('original-image');
  finalImage.classList.remove('rounded-image');
  finalImage.classList.remove('rectangle-image');
  finalImage.classList.add('square-image');
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  canvas.width = finalImage.width;
  canvas.height = finalImage.width;
  ctx.drawImage(finalImage, 0, 0, canvas.width, canvas.height);
  const newImage = document.createElement('img');
  newImage.src = canvas.toDataURL();
  setImage = newImage;
  finalImage.src = newImage.src;
  } 
  
function round() {
  finalImage.classList.remove('original-image');
  finalImage.classList.remove('square-image');
  finalImage.classList.remove('rectangle-image');
  finalImage.classList.add("rounded-image");
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, canvas.width, canvas.height); 
  canvas.width = finalImage.width;
  canvas.height = finalImage.width; 
  const radius = Math.min(canvas.width, canvas.height) / 2;
  ctx.arc(radius, radius, radius, 0, Math.PI * 2);
  ctx.clip();
  ctx.drawImage(finalImage, 0, 0, canvas.width, canvas.height);
  const newImage = document.createElement('img');
  newImage.src = canvas.toDataURL();
  setImage = newImage;
  finalImage.src = newImage.src;
}

function rectangle() {
  finalImage.classList.remove('original-image');
  finalImage.classList.remove('rounded-image');
  finalImage.classList.remove('square-image');
  finalImage.classList.add('rectangle-image');
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, canvas.width, canvas.height); 
  const aspectRatio = finalImage.width / finalImage.height;
  canvas.width = finalImage.width;
  canvas.height = finalImage.width / aspectRatio;
  ctx.drawImage(finalImage, 0, 0, canvas.width, canvas.height);
  const newImage = document.createElement('img');
  newImage.src = canvas.toDataURL();
  setImage = newImage;
  finalImage.src = newImage.src;
}


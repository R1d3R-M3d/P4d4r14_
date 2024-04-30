const inputFile = document.querySelector('#picture__input');
const pictureImage = document.querySelector('.picture__image');

inputFile.addEventListener('change', function (params) {
    const inputTarget = params.target;
    const file = inputTarget.files[0];

    if (file) {
        const reader = new FileReader();

        reader.addEventListener("load", function (params) {
            const readerTarget = params.target;
            
            const img = document.createElement("img");
            img.src = readerTarget.result;
            img.classList.add('picture__img');

            pictureImage.innerHTML = "";
            pictureImage.appendChild(img)
        });

        reader.readAsDataURL(file)
    }
});

const readOnlyForm = document.querySelector('.update-product');
const updateOne = document.querySelector('.update-product');
const registerOne = document.querySelector('.register-product');

function CompleteReadOnlyForm(id, nam, amo, pri, gro, char) {
    if (window.getComputedStyle(updateOne).display === 'none') {
        updateOne.style.display = "flex";
        registerOne.style.display = "none";

        if (window.getComputedStyle(updateOne).display === 'flex') {
            document.getElementById('fake').value = id.trim();
            document.getElementById('id__input__update').value = id.trim();
            document.getElementById('product__input__update').value = nam.trim();
            document.getElementById('amount__input__update').value = amo.trim();
            document.getElementById('unitPrice__input__update').value = pri.trim();
            document.getElementById('select-input-update').value = gro.trim();
            document.getElementById('characteristics__input__update').value = char.trim();
        }
    } else {
        registerOne.style.display = "flex";
        updateOne.style.display = "none";
    }
}

const collection = document.getElementsByTagName("li");
const section = document.getElementById("forms");
const show_El = document.getElementsByClassName("add_form");

function outsideClick(event, notelem) {
  notelem = notelem; // jquerize (optional)
  // check outside click for multiple elements
  var clickedOut = true, i, len = notelem.length;
  for (i = 0;i < len;i++)  {
      if (event.target == notelem[i] || notelem[i].contains(event.target) || section.contains(event.target || event.target == section)) {
          clickedOut = false;

          if (window.getComputedStyle(section).display === 'none') {section.style.display = "block"}
      }
  }
  if (clickedOut) return true;
  else return false;
}

window.addEventListener('click', function(e) {
  if (outsideClick(e, show_El)) {
    if (window.getComputedStyle(section).display === 'block') {
      section.style.display = "none"
      registerOne.style.display = "flex";
      updateOne.style.display = "none";
    }
  }
})

//Toogle Fomr class
for (let i = 0; i < collection.length; i++) {

  collection[i].addEventListener("click", function(e) {
    e.preventDefault();
    for (let i = 0; i < collection.length; i++) {
      collection[i].classList.remove("active");
    }
    
    if (collection[i] == this) {this.classList.toggle("active");}
  });
}
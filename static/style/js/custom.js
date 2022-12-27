// ewer //


// Add active class to the selected item of dashboard (url ckeck) //


const currentLocation = location.pathname;
const dashboardItems = document.querySelectorAll('.menu-link');
const dashboardToggleItems = document.querySelectorAll('.menu-toggle');
const dashboardItemsArray = Array.from(dashboardItems);
const dashboardToggleItemsArray = Array.from(dashboardToggleItems);
const dashboardItemsLength = dashboardItems.length;
const paths = [
  {name : 'agency'},
  {name : 'property'},
  {name : 'client'},
  {name : 'transaction'}
];


// Add class of active to the related dashboardItem
const addActive = path => {
  dashboardItemsArray.find(dashboardItem=> {
    if (dashboardItem.pathname.includes(path)){
      if (dashboardItem.parentElement.parentElement.previousElementSibling.classList.contains('menu-toggle')){
        dashboardItem.parentElement.parentElement.parentElement.classList.add('active');
      }
      else{
        dashboardItem.parentElement.classList.add('active');
      }
    }
  });
};

// Find if current path includes one of path in paths list
const findPath = ()=> {
  if (paths.some(path => {if(currentLocation.includes(path.name)){return true && addActive(path.name)}return false})){}
}

// Add class of active to matched dashboardItem path with current path
try{
  let unEqualPath = 0
  dashboardItemsArray.find(dashboardItem => {
    if (dashboardItem.pathname === currentLocation){
      if (dashboardItem.parentElement.parentElement.previousElementSibling.classList.contains('menu-toggle')){
        dashboardItem.parentElement.parentElement.parentElement.classList.add('open');
        dashboardItem.parentElement.parentElement.parentElement.classList.add('active');
      }
      dashboardItem.parentElement.classList.add('active');
    }
    // Find related path to the dashboardItem
    else if (dashboardItem.pathname !== currentLocation){
      unEqualPath+=1
      if (unEqualPath === dashboardItemsLength){
        findPath();
      }
    }
  });
}
catch(error){
  // Do nothing //
}


// Check image size for any page image uploads //


const imgInput = document.querySelector('.account-file-input');
// Image size alert
const addAlert = (element)=> {
  element.className = ('alert');
  element.classList.add('alert-danger');
  element.classList.add('p-2');
  element.classList.add('px-3');
  element.innerText = 'Please upload a picture smaller than 1.5M';
};
// Image size as wanted
const deleteAlert = (element)=> {
  element.className = 'text-muted';
  element.classList.add('mb-0');
  element.innerText = 'Allowed JPG or PNG. Max size of 1.5M';
};

// Get uploaded image size
if (imgInput) {
  imgInput.addEventListener('change', ()=> {
    const fileSize = imgInput.files[0].size;
    const realFileSize = Math.round((fileSize / 1024));

    // Delete uploaded image over 1.5M
    if (realFileSize > 1500){
      const warning = document.querySelector('#warning');
      addAlert(warning);
      imgInput.value = null;
    }
    // Let image to uploade
    else{
      const warning = document.querySelector('#warning');
      deleteAlert(warning);
    }
  });
}


// Crop photo //

const creatCanves = ()=> {
  const canvas = document.createElement('canvas');
  canvas.classList.add('previewCropedImage');
  canvas.setAttribute("height", "100");
  canvas.setAttribute("width", "100");
  canvas.setAttribute("id", "previewImage");
  return canvas
}

const showPreview = (cropData) =>{
  const canvas = creatCanves();
  const previewImageUrl = URL.createObjectURL(imgInput.files[0]);
  const imageShown = document.querySelector("#avatar");
  const imageCircle = document.querySelector('#imageCircle');
  if (imageShown.previousElementSibling === null){
    imageCircle.insertBefore(canvas, imageShown);
    console.log(imageCircle.firstElementChild);
  }
  else{
    let imageCircleFirstChild = imageCircle.firstElementChild;
    imageCircle.removeChild(imageCircleFirstChild);
    imageCircle.insertBefore(canvas, imageShown);
  }
  const image = new Image();
  const ctx = canvas.getContext('2d');
  image.src = previewImageUrl;
  image.onload = function(){
    ctx.imageSmoothingEnabled = false;
    ctx.drawImage(image, cropData.x, cropData.y, cropData.width, cropData.height, 0,0, canvas.width, canvas.height);
  }
}

$(function () {

  /* SCRIPT TO OPEN THE MODAL WITH THE PREVIEW */
  $("#upload").change(function () {
    if (this.files && this.files[0]) {
      var reader = new FileReader();
      reader.onload = function (e) {
        $("#image").attr("src", e.target.result);
        $("#modalCenter").modal("show");
      }
      reader.readAsDataURL(this.files[0]);
    }
  });

  /* SCRIPTS TO HANDLE THE CROPPER BOX */
  var $image = $("#image");
  var cropBoxData;
  var canvasData;
  $("#modalCenter").on("shown.bs.modal", function () {
    $image.cropper({
      viewMode: 1.5,
      aspectRatio: 1/1,
      minCropBoxWidth: 190,
      minCropBoxHeight: 190,
      dragCrop: false,
      mouseWheelZoom: false,
      resizable: false,
      ready: function () {
        $image.cropper("setCanvasData", canvasData);
        $image.cropper("setCropBoxData", cropBoxData);
      }
    });
  }).on("hidden.bs.modal", function () {
    cropBoxData = $image.cropper("getCropBoxData");
    canvasData = $image.cropper("getCanvasData");
    $image.cropper("destroy");
  });

  $(".js-zoom-in").click(function () {
    $image.cropper("zoom", 0.1);
  });

  $(".js-zoom-out").click(function () {
    $image.cropper("zoom", -0.1);
  });

  /* SCRIPT TO COLLECT THE DATA AND POST TO THE SERVER */
  $(".crop-image").click(()=> {
    const cropData = $image.cropper("getData");
    $("#image_x").val(cropData["x"]);
    $("#image_y").val(cropData["y"]);
    $("#image_height").val(cropData["height"]);
    $("#image_width").val(cropData["width"]);
    showPreview(cropData)
  });

  $(".cancel").click(()=> {
    imgInput.value = null;
  })
});
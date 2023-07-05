// let imagePreview = null;

function updateImagePreviewContainer() {
  return document.getElementById("image-preview");
}

function updateLoadingOverplay() {
  return document.querySelector(".loading-overlay");
}

function checkMaxImageSize(file, maxSizeInBytes) {
  if (file.size > maxSizeInBytes) {
    var maxSizeInMB = maxSizeInBytes / (1024 * 1024); // Chuyển đổi thành đơn vị MB
    var fileSizeInMB = file.size / (1024 * 1024); // Chuyển đổi dung lượng ảnh thành đơn vị MB
    var message = "Tiệm cafe A0622I1: Dung lượng của ảnh không được vượt quá " + maxSizeInMB + " MB. Dung lượng hiện tại: " + fileSizeInMB + " MB.";
    window.alert(message);
    return false;
  }
  return true;
}

// const loadingOverlay = document.querySelector(".loading-overlay");
var totalSelectedFiles = 0;
document.getElementById("image-input").addEventListener("change", function (event) {
  var files = event.target.files;
  var maxAllowedFiles = 3;
  if (files.length > 3) {
    window.alert("Tiệm cafe A0622I1: Bạn chỉ được phép upload tối đa 3 file ảnh.");
    return;
  }
  if (totalSelectedFiles + files.length > maxAllowedFiles) {
    var remainingSlots = maxAllowedFiles - totalSelectedFiles;
    var message = "Bạn chỉ được phép upload tối đa " + maxAllowedFiles + " file ảnh. Bạn còn " + remainingSlots + " lượt upload.";
    window.alert("Tiệm cafe A0622I1:" + message);
    return;
  }
  if (files.length > 0) {
    showLoadingOverlay();
    setTimeout(function () {
      for (let i = 0; i < files.length; i++) {
        var file = files[i];
        if (!file.type.match("image.*")) {
          window.alert("Tiệm cafe A0622I1: Vui lòng chỉ chọn các tệp tin ảnh.");
          continue;
        }
        if (!checkMaxImageSize(file, 5 * 1024 * 1024)) { // Kiểm tra dung lượng tối đa là 5MB
          continue;
        }
        var reader = new FileReader();
        reader.onload = function (e) {
          var deleteButton = document.createElement("div");
          deleteButton.classList.add("delete-button");
          deleteButton.innerHTML = "x";
          var imageDiv = document.createElement("div");
          imageDiv.classList.add("preview-image");
          var image = document.createElement("img");
          image.src = e.target.result;
          imageDiv.appendChild(image);
          deleteButton.addEventListener("click", function () {
            this.parentNode.remove();
            updateTotalSelectedFiles(-1);
          });
          imageDiv.appendChild(deleteButton);
          document.getElementById("image-preview").appendChild(imageDiv);
        };
        reader.readAsDataURL(file);
        console.log(file);
        updateTotalSelectedFiles(1);
      }
      hideLoadingOverlay();
      showImagePreview();
    }, 1000);
  }
});

document.addEventListener("DOMContentLoaded", function () {
  var imagePreview = updateImagePreviewContainer();
});
document.addEventListener("DOMContentLoaded", function () {
  var loadingOverplay = updateLoadingOverplay();
});

// updateImagePreviewContainer();
function updateTotalSelectedFiles(count) {
  totalSelectedFiles += count;
}

function showLoadingOverlay() {
  var loadingOverlay = updateLoadingOverplay();
  loadingOverlay.classList.add("show");
}

function hideLoadingOverlay() {
  var loadingOverlay = updateLoadingOverplay();
  loadingOverlay.classList.remove("show");
}

function showImagePreview() {
  var imagePreview = updateImagePreviewContainer();
  imagePreview.style.display = "block";
}

function hideImagePreview() {
  var imagePreview = updateImagePreviewContainer();
  imagePreview.style.display = "none";
}
const fileInput = document.getElementById('fileInput');
const previewImage = document.getElementById('previewImage');
fileInput.addEventListener('change', function (event) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = function (e) {
        previewImage.setAttribute('src', e.target.result);
        previewImage.style.display = 'block';
    };
    reader.readAsDataURL(file);
});








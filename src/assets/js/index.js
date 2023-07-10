var hideTimeout;
var totalSelectedFiles = 0;
var errorContainerHTML = '<div id="error-container" style="display: none; position: fixed; top: 80px; right: 20px; padding: 30px 10px; background: linear-gradient(to right, #FF4B2B, #FF416C); color: white; font-weight: bold; z-index: 9999;box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);"></div>';
document.body.insertAdjacentHTML("beforeend", errorContainerHTML);

function updateImagePreviewContainer() {
  return document.getElementById("image-preview");
}

function updateLoadingOverlay() {
  return document.querySelector(".loading-overlay");
}

function checkMaxImageSize(file, maxSizeInBytes) {
  if (file.size > maxSizeInBytes) {
    var maxSizeInMB = maxSizeInBytes / (1024 * 1024);
    var fileSizeInMB = file.size / (1024 * 1024);
    var message = "Tiệm cafe A0622I1: Dung lượng của ảnh không được vượt quá " + maxSizeInMB + " MB. Dung lượng hiện tại: " + fileSizeInMB + " MB.";
    showAlertMessage(message);
    return false;
  }
  return true;
}

function showAlertMessage(message) {
  var errorContainer = document.getElementById("error-container");
  errorContainer.textContent = message;
  errorContainer.style.display = "block";
  clearTimeout(hideTimeout); // Xóa timeout hiện tại (nếu có)
  hideTimeout = setTimeout(function () {
    errorContainer.style.display = "none";
  }, 5000); // Tự động ẩn thông báo lỗi sau 5 giây

  errorContainer.addEventListener("mouseenter", function () {
    clearTimeout(hideTimeout); // Xóa timeout khi hover vào thông báo
  });

  errorContainer.addEventListener("mouseleave", function () {
    hideTimeout = setTimeout(function () {
      errorContainer.style.display = "none";
    }, 5000); // Tự động ẩn thông báo lỗi sau 5 giây khi không hover vào thông báo
  });
  errorContainer.addEventListener("click", function () {
    errorContainer.style.display = "none"; // Đóng thông báo khi người dùng click vào tiêu đề
  });
}

document.getElementById("image-input").addEventListener("change", function (event) {
  var files = event.target.files;
  var maxAllowedFiles = 3;
  if (files.length > maxAllowedFiles) {
    showAlertMessage("Tiệm cafe A0622I1: Bạn chỉ được phép upload tối đa 3 file ảnh.");
    return;
  }
  if (totalSelectedFiles + files.length > maxAllowedFiles) {
    var remainingSlots = maxAllowedFiles - totalSelectedFiles;
    var message = "Bạn chỉ được phép upload tối đa " + maxAllowedFiles + " file ảnh. Bạn còn " + remainingSlots + " lượt upload.";
    showAlertMessage("Tiệm cafe A0622I1:" + message);
    return;
  }
  if (files.length > 0) {
    setTimeout(function () {
      for (let i = 0; i < files.length; i++) {
        var file = files[i];
        if (!file.type.match("image.*")) {
          var mess = "Tiệm cafe A0622I1: Vui lòng chỉ chọn các tệp tin ảnh.";
          showAlertMessage(mess);
          continue;
        }
        if (!checkMaxImageSize(file, 5 * 1024 * 1024)) { // Kiểm tra dung lượng tối đa là 5MB
          continue;
        }
        showLoadingOverlay();
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
  var loadingOverlay = updateLoadingOverlay();
});

// updateImagePreviewContainer();
function updateTotalSelectedFiles(count) {
  totalSelectedFiles += count;
}

function showLoadingOverlay() {
  var loadingOverlay = updateLoadingOverlay();
  loadingOverlay.classList.add("show");
}

function hideLoadingOverlay() {
  var loadingOverlay = updateLoadingOverlay();
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

const imagePreview = document.getElementById("image-preview");
const loadingOverlay = document.querySelector(".loading-overlay");
var totalSelectedFiles = 0;
document.getElementById("image-input").addEventListener("change", function (event) {
  var files = event.target.files;
  var maxAllowedFiles = 3;
  if (files.length > 3) {
    alert("Bạn chỉ được phép upload tối đa 3 file ảnh.");
    return;
  }
  if (totalSelectedFiles + files.length > maxAllowedFiles) {
    var remainingSlots = maxAllowedFiles - totalSelectedFiles;
    var message = "Bạn chỉ được phép upload tối đa " + maxAllowedFiles + " file ảnh. Bạn còn " + remainingSlots + " lượt upload.";
    alert(message);
    return;
  }
  if (files.length > 0) {
    showLoadingOverlay();
    setTimeout(function () {
      for (let i = 0; i < files.length; i++) {
        var file = files[i];
        if (!file.type.match("image.*")) {
          alert("Vui lòng chỉ chọn các tệp tin ảnh.");
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

function updateTotalSelectedFiles(count) {
  totalSelectedFiles += count;
}

function showLoadingOverlay() {
  loadingOverlay.classList.add("show");
}

function hideLoadingOverlay() {
  loadingOverlay.classList.remove("show");
}

function showImagePreview() {
  imagePreview.style.display = "block";
}

function hideImagePreview() {
  imagePreview.style.display = "none";
}


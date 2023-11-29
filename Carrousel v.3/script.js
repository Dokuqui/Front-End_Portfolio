document.addEventListener("DOMContentLoaded", function () {
    let currentIndex = 0;
    const images = document.querySelectorAll("#container img");
    const totalImages = images.length;

    images[currentIndex].style.display = "block";

    document.getElementById("next").addEventListener("click", showNextImage);
    document.getElementById("prev").addEventListener("click", showPrevImage);

    function showNextImage() {
        images[currentIndex].style.display = "none";
        currentIndex = (currentIndex + 1) % totalImages;
        images[currentIndex].style.display = "block";
    }

    function showPrevImage() {
        images[currentIndex].style.display = "none";
        currentIndex = (currentIndex - 1 + totalImages) % totalImages;
        images[currentIndex].style.display = "block";
    }
});
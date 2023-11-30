document.addEventListener("DOMContentLoaded", function () {
    const container = document.getElementById("container");
    const images = container.children;
    let currentIndex = 0;

    function showImage(index) {
        for (let i = 0; i < images.length; i++) {
            images[i].style.display = "none";
        }
        images[index].style.display = "block";
    }

    function nextImage() {
        currentIndex = (currentIndex + 1) % images.length;
        showImage(currentIndex);
    }

    function prevImage() {
        currentIndex = (currentIndex - 1 + images.length) % images.length;
        showImage(currentIndex);
    }

    showImage(currentIndex);

    document.getElementById("next").addEventListener("click", function () {
        nextImage();
    });

    document.getElementById("prev").addEventListener("click", function () {
        prevImage();
    });

    const autoSlideInterval = setInterval(function () {
        nextImage();
    }, 3000);

    document.getElementById("next").addEventListener("click", function () {
        clearInterval(autoSlideInterval);
    });

    document.getElementById("prev").addEventListener("click", function () {
        clearInterval(autoSlideInterval);
    });
});
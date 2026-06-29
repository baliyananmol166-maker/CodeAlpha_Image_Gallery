// ==========================================
// RESPONSIVE IMAGE GALLERY
// Part 1
// ==========================================

// --------------------
// HTML Elements
// --------------------
const gallery = document.getElementById("gallery");
const searchInput = document.getElementById("searchInput");
const filterButtons = document.querySelectorAll(".filter-btn");
const imageCount = document.getElementById("imageCount");

// --------------------
// Image Array
// --------------------
const images = [];
const categories = [
    "nature",
    "city",
    "animals",
    "flowers",
    "beach"
];

// Create 50 images automatically
categories.forEach(category => {
    for(let i=1;i<=10;i++){
        let fileName;
        if(category==="animals"){
            fileName=`animal${i}.jpg`;
        }
        else if(category==="flowers"){
            fileName=`flower${i}.jpg`;
        }
        else{
            fileName=`${category}${i}.jpg`;
        }
        images.push({
            title:
                category.charAt(0).toUpperCase()+
                category.slice(1)+
                " "+i,
            category:category,
            src:`images/${category}/${fileName}`
        });
    }
});

// --------------------
// Variables
// --------------------
let filteredImages=[...images];
let currentCategory="all";
let currentSearch="";

// ==========================================
// DISPLAY IMAGES
// ==========================================
function displayImages(){
    gallery.innerHTML="";
    let displayData=filteredImages;
    imageCount.textContent=displayData.length;
    displayData.forEach((image,index)=>{
        const card=document.createElement("div");
        card.className="image-card";
        card.dataset.index=index;
        card.innerHTML=`
            <img src="${image.src}" alt="${image.title}">
            <div class="image-overlay">
                <i class="fas fa-search-plus"></i>
            </div>
            <div class="image-info">
                <h3>${image.title}</h3>
                <p>${image.category}</p>
            </div>
        `;
        gallery.appendChild(card);
    });
    attachLightboxEvents();
}

// ==========================================
// SEARCH
// ==========================================
searchInput.addEventListener("keyup",()=>{
    currentSearch=searchInput.value.toLowerCase();
    filterGallery();
});

// ==========================================
// FILTER BUTTONS
// ==========================================
filterButtons.forEach(button=>{
    button.addEventListener("click",()=>{
        filterButtons.forEach(btn=>{
            btn.classList.remove("active");
        });
        button.classList.add("active");
        currentCategory=button.dataset.filter;
        filterGallery();
    });
});

// ==========================================
// FILTER FUNCTION
// ==========================================
function filterGallery(){
    filteredImages=images.filter(image=>{
        const categoryMatch=
            currentCategory==="all"
            ||
            image.category===currentCategory;
        const searchMatch=
            image.title.toLowerCase().includes(currentSearch)
            ||
            image.category.toLowerCase().includes(currentSearch);
        return categoryMatch && searchMatch;
    });
    displayImages();
}

// ==========================================
// INITIAL LOAD
// ==========================================
displayImages();
console.log("Part 1 Loaded");

// ==========================================
// PART 2 - LIGHTBOX
// ==========================================

// Elements
const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightboxImage");
const closeBtn = document.querySelector(".close");
const prevBtn = document.querySelector(".prev");
const nextBtn = document.querySelector(".next");
const downloadBtn = document.getElementById("downloadBtn");
const favoriteBtn = document.getElementById("favoriteBtn");
let currentImageIndex = 0;
let favorites = [];

// ==========================================
// OPEN LIGHTBOX
// ==========================================
function attachLightboxEvents(){
    const cards = document.querySelectorAll(".image-card");
    cards.forEach(card=>{
        card.addEventListener("click",()=>{
            currentImageIndex = Number(card.dataset.index);
            showImage();
            lightbox.classList.add("active");
        });
    });
}

// ==========================================
// SHOW IMAGE
// ==========================================
function showImage(){
    const image = filteredImages[currentImageIndex];
    lightboxImage.src = image.src;
    downloadBtn.onclick = ()=>{
        const link = document.createElement("a");
        link.href = image.src;
        link.download = image.title;
        link.click();
    };
    if(favorites.includes(image.src)){
        favoriteBtn.innerHTML=
        '<i class="fa-solid fa-heart"></i> Favorited';
    }
    else{
        favoriteBtn.innerHTML=
        '<i class="fa-regular fa-heart"></i> Favorite';
    }
}

// ==========================================
// CLOSE
// ==========================================
closeBtn.addEventListener("click",()=>{
    lightbox.classList.remove("active");
});
lightbox.addEventListener("click",(e)=>{
    if(e.target===lightbox){
        lightbox.classList.remove("active");
    }
});

// ==========================================
// NEXT
// ==========================================
nextBtn.addEventListener("click",()=>{
    currentImageIndex++;
    if(currentImageIndex>=filteredImages.length){
        currentImageIndex=0;
    }
    showImage();
});

// ==========================================
// PREVIOUS
// ==========================================
prevBtn.addEventListener("click",()=>{
    currentImageIndex--;
    if(currentImageIndex<0){
        currentImageIndex=filteredImages.length-1;
    }
    showImage();
});

// ==========================================
// FAVORITE
// ==========================================
favoriteBtn.addEventListener("click",()=>{
    const image=filteredImages[currentImageIndex];
    if(favorites.includes(image.src)){
        favorites=favorites.filter(item=>item!==image.src);
    }
    else{
        favorites.push(image.src);
    }
    showImage();
});

// ==========================================
// KEYBOARD SUPPORT
// ==========================================
document.addEventListener("keydown",(e)=>{
    if(!lightbox.classList.contains("active")) return;
    if(e.key==="ArrowRight"){
        nextBtn.click();
    }
    if(e.key==="ArrowLeft"){
        prevBtn.click();
    }
    if(e.key==="Escape"){
        lightbox.classList.remove("active");
    }
});
console.log("Part 2 Loaded");

// ==========================================
// PART 3
// DARK MODE + LOADER + SCROLL TOP
// ==========================================

// --------------------
// Loader
// --------------------
window.addEventListener("load", () => {
    const loader = document.getElementById("loader");
    setTimeout(() => {
        loader.style.display = "none";
    }, 1000);
});

// --------------------
// Dark Mode
// --------------------
const themeBtn = document.getElementById("themeBtn");
function loadTheme() {
    const theme = localStorage.getItem("theme");
    if (theme === "dark") {
        document.body.classList.add("dark");
        themeBtn.innerHTML = '<i class="fa-solid fa-sun"></i>';
    }
}
loadTheme();
themeBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark");
    if (document.body.classList.contains("dark")) {
        localStorage.setItem("theme", "dark");
        themeBtn.innerHTML =
            '<i class="fa-solid fa-sun"></i>';
    }
    else {
        localStorage.setItem("theme", "light");
        themeBtn.innerHTML =
            '<i class="fa-solid fa-moon"></i>';
    }
});

// --------------------
// Scroll To Top
// --------------------
const scrollTopBtn = document.getElementById("scrollTop");
window.addEventListener("scroll", () => {
    if (window.scrollY > 300) {
        scrollTopBtn.style.display = "block";
    }
    else {
        scrollTopBtn.style.display = "none";
    }
});
scrollTopBtn.addEventListener("click", () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});

// --------------------
// Save Favorites
// --------------------
window.addEventListener("beforeunload", () => {
    localStorage.setItem(
        "favorites",
        JSON.stringify(favorites)
    );
});
const savedFavorites =
    JSON.parse(localStorage.getItem("favorites"));
if (savedFavorites) {
    favorites = savedFavorites;
}

// --------------------
// Animation
// --------------------
const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0)";
        }
    });
});
function animateCards() {
    const cards = document.querySelectorAll(".image-card");
    cards.forEach(card => {
        card.style.opacity = "0";
        card.style.transform = "translateY(40px)";
        card.style.transition = "0.5s";
        observer.observe(card);
    });
}

// --------------------
// Re-run animation
// --------------------
const oldDisplayImages = displayImages;
displayImages = function () {
    oldDisplayImages();
    animateCards();
};

// Refresh Gallery
filterGallery();
console.log("Responsive Image Gallery Loaded Successfully");
let currentPage = 1;
let itemsPerPage = 4; 
let totalContents = 0; 
let activeLink = null;
let previousContentId = null; 
let expandedContent = null; 

function showContent(contentId, link) {
    if (activeLink) {
        activeLink.classList.remove('active'); 
    }

    if (link) {
        link.classList.add('active');
        activeLink = link;
    }

    const contentsSections = document.querySelectorAll('.faq-content');
    contentsSections.forEach(content => {
        content.style.display = 'none';
    });

    const selectedContent = document.getElementById(contentId);
    if (selectedContent) {
        selectedContent.style.display = 'block';
        paginateContent(selectedContent); 
        previousContentId = contentId; 
        expandedContent = null; 
    }
}

function paginateContent(contentSection) {
    const contentItems = contentSection.querySelectorAll('.icerik');
    totalContents = contentItems.length;

    contentItems.forEach(item => {
        item.style.display = 'none';
    });

    const pageCount = Math.ceil(totalContents / itemsPerPage);
    showPage(currentPage, contentItems);

    const existingPagination = contentSection.querySelector('.pagination');
    if (existingPagination) {
        existingPagination.remove();
    }

    const pagination = document.createElement('div');
    pagination.className = 'pagination';

    for (let i = 1; i <= pageCount; i++) {
        const pageButton = document.createElement('button');
        pageButton.innerText = i;
        pageButton.className = 'page-button';
        pageButton.onclick = () => {
            currentPage = i;
            showPage(currentPage, contentItems);
            highlightCurrentPage(pagination, i); 
        };
        pagination.appendChild(pageButton);
    }

    contentSection.appendChild(pagination);
    highlightCurrentPage(pagination, currentPage); 
}

function showPage(page, items) {
    const start = (page - 1) * itemsPerPage;
    const end = start + itemsPerPage;

    items.forEach((item, index) => {
        item.style.display = index >= start && index < end ? 'flex' : 'none'; 
    });
}

function highlightCurrentPage(pagination, page) {
    const buttons = pagination.querySelectorAll('.page-button');
    buttons.forEach((button, index) => {
        button.classList.toggle('active', index + 1 === page);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    const firstMenuLink = document.querySelector('nav .menu a'); 
    showContent('content1', firstMenuLink); 
});

function toggleContent(event, link) {
    event.preventDefault(); 
    const detailSection = link.closest('.icerik-metni').querySelector('.detay');

    if (detailSection.style.display === 'none' || detailSection.style.display === '') {
        const allContents = document.querySelectorAll('.icerik');
        allContents.forEach(content => {
            if (content !== link.closest('.icerik')) {
                content.style.display = 'none'; 
            }
        });
        
        detailSection.style.display = 'block'; 
        expandedContent = link.closest('.icerik'); 
        showBackButton(); 
        hidePagination(link);
    } else {
        detailSection.style.display = 'none'; 
        expandedContent = null; 
        hideBackButton(); 
    }
}

function showBackButton() {
    let backButton = document.querySelector('.back-button');

    if (!backButton) {
        backButton = document.createElement('button');
        backButton.className = 'back-button';
        backButton.innerText = '<-';
        backButton.style.position = 'absolute'; 
        backButton.style.top = '10px'; 
        backButton.style.left = '10px'; 
        backButton.onclick = goBack; 
        document.body.appendChild(backButton); 
    }
}

function hideBackButton() {
    const backButton = document.querySelector('.back-button');
    if (backButton) {
        backButton.remove(); 
    }
}

function hidePagination(link) {
    const pagination = link.closest('.faq-content').querySelector('.pagination');
    if (pagination) {
        pagination.style.display = 'none'; 
    }

    const showMoreLink = link.closest('.icerik-metni').querySelector('.daha-fazla');
    if (showMoreLink) {
        showMoreLink.style.display = 'none'; 
    }
}

function showMore(link) {
    const contentSection = link.closest('.faq-content'); 
    const allContents = contentSection.querySelectorAll('.icerik');

    allContents.forEach(content => {
        if (content !== link.closest('.icerik')) {
            content.style.display = 'none'; 
        }
    });

    const detailSection = link.closest('.icerik').querySelector('.detay');
    detailSection.style.display = 'block'; 
    expandedContent = link.closest('.icerik'); 
    showBackButton(); 

    const pagination = contentSection.querySelector('.pagination');
    if (pagination) {
        pagination.style.display = 'none'; 
    }

    link.style.display = 'none'; 
}

function toggleContent(event, link) {
    event.preventDefault(); 
    const detailSection = link.closest('.icerik-metni').querySelector('.detay');

    if (detailSection.style.display === 'none' || detailSection.style.display === '') {
       
        const allContents = document.querySelectorAll('.icerik');
        allContents.forEach(content => {
            if (content !== link.closest('.icerik')) {
                content.style.display = 'none';
            }
        });
        
        detailSection.style.display = 'block'; 
        expandedContent = link.closest('.icerik'); 
        showBackButton(); 

        
        const pagination = document.querySelector('.pagination');
        if (pagination) {
            pagination.style.display = 'none'; 
        }

        
        const showMoreLink = link.closest('.icerik-metni').querySelector('.daha-fazla');
        if (showMoreLink) {
            showMoreLink.style.display = 'none'; 
        }
    } else {
        detailSection.style.display = 'none'; 
        expandedContent = null; 
        hideBackButton(); 
    }
}


function toggleContent(event, element) {
    event.preventDefault();
    const content = element.nextElementSibling;
    const backButton = element.parentElement.querySelector('.back-button');

    if (content.style.display === "none") {
        content.style.display = "block"; 
        element.style.display = "none";  
        backButton.style.display = "inline-block"; 
    }
}

function goBack(event, element) {
    event.preventDefault();
    const content = element.previousElementSibling;
    const moreButton = element.parentElement.querySelector('.daha-fazla');

    content.style.display = "none"; 
    moreButton.style.display = "inline-block";  
    element.style.display = "none"; 
}
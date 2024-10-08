document.getElementById('searchForm').addEventListener('submit', function(event) {
    event.preventDefault(); 
    
    const searchTerm = document.getElementById('searchInput').value.toLowerCase(); 
    const contentItems = document.querySelectorAll('.icerik'); 
    const menuItems = document.querySelectorAll('nav.menu ul li'); 
    
    let found = false; 
    
    contentItems.forEach(item => {
        const contentText = item.innerText.toLowerCase(); 
        if (contentText.includes(searchTerm)) { 
            item.style.display = 'block'; 
            found = true;
        } else {
            item.style.display = 'none'; 
        }
    });
    
    menuItems.forEach(link => {
        const linkText = link.innerText.toLowerCase(); 
        if (linkText.includes(searchTerm)) { 
            link.style.display = 'block'; 
        } else {
            link.style.display = 'block'; 
        }
    });

    if (!found) {
        alert('Sonuç bulunamadı!'); 
        contentItems.forEach(item => {
            item.style.display = 'block'; 
        });
    }
});


function searchContent() {
    const query = document.querySelector('.search-bar input').value.toLowerCase(); r
    const contents = document.querySelectorAll('.icerik');
    
    contents.forEach(content => {
        const title = content.querySelector('h2').innerText.toLowerCase(); 
        const description = content.querySelector('.on-yazi').innerText.toLowerCase(); 
        
        if (title.includes(query) || description.includes(query)) {
            content.style.display = 'flex';
        } else {
            content.style.display = 'none';
        }
    });
}

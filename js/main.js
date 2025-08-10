// Sidebar Menu Functionality
const hamburger = document.querySelector('.hamburger');
const sidebar = document.getElementById('sidebar');
const sidebarOverlay = document.getElementById('sidebar-overlay');
const sidebarClose = document.getElementById('sidebar-close');

// Open sidebar
hamburger.addEventListener('click', () => {
    hamburger.classList.add('active');
    sidebar.classList.add('active');
    sidebarOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
});

// Close sidebar
function closeSidebar() {
    hamburger.classList.remove('active');
    sidebar.classList.remove('active');
    sidebarOverlay.classList.remove('active');
    document.body.style.overflow = '';
}

sidebarClose.addEventListener('click', closeSidebar);
sidebarOverlay.addEventListener('click', closeSidebar);

// Submenu toggle functionality
const menuParents = document.querySelectorAll('.menu-parent');

menuParents.forEach(parent => {
    parent.addEventListener('click', (e) => {
        e.stopPropagation();
        
        // Close other open submenus at the same level
        const currentSubmenu = parent.nextElementSibling;
        const siblingSubmenus = parent.parentElement.querySelectorAll('.submenu');
        
        siblingSubmenus.forEach(submenu => {
            if (submenu !== currentSubmenu) {
                submenu.classList.remove('active');
                const siblingParent = submenu.previousElementSibling;
                if (siblingParent && siblingParent.classList.contains('menu-parent')) {
                    siblingParent.classList.remove('active');
                }
            }
        });
        
        // Toggle current submenu
        if (currentSubmenu && currentSubmenu.classList.contains('submenu')) {
            currentSubmenu.classList.toggle('active');
            parent.classList.toggle('active');
        }
    });
});

// Close sidebar on escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && sidebar.classList.contains('active')) {
        closeSidebar();
    }
});


// Navigation logo click handler
const navLogo = document.querySelector('.nav-logo a');
if (navLogo) {
    navLogo.addEventListener('click', function(e) {
        e.preventDefault();
        window.location.href = 'index.html';
    });
}

// Sidebar menu item click handlers
document.addEventListener('DOMContentLoaded', function() {
    // Handle sidebar menu item clicks
    const menuItems = document.querySelectorAll('.menu-item');
    
    menuItems.forEach(item => {
        item.addEventListener('click', function(e) {
            // Check if the item has a link
            const link = this.querySelector('a');
            if (link) {
                // If it's a link, let it handle the navigation naturally
                return;
            }
            
            // If it's not a link, check for menu text
            const menuText = this.querySelector('.menu-text');
            if (menuText) {
                const text = menuText.textContent.trim();
                
                // Handle semester navigation
                if (text === '1st Semester') {
                    e.preventDefault();
                    window.location.href = '1st-semester.html';
                }
                // Add more semester handlers as needed
                else if (text === '2nd Semester') {
                    e.preventDefault();
                    // window.location.href = '2nd-semester.html';
                }
                else if (text === '3rd Semester') {
                    e.preventDefault();
                    // window.location.href = '3rd-semester.html';
                }
                // Continue for other semesters...
            }
        });
    });
});


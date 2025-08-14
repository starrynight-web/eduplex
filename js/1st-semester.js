// Subjects & Archives Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize the page
    initializeSubjectsPage();
    initializeSidebar();
});

function initializeSubjectsPage() {
    // Add click event listeners to subject containers (including padding)
    const subjectContainers = document.querySelectorAll('.subject-archive-container');

    subjectContainers.forEach(container => {
        container.addEventListener('click', (e) => {
            // Don't toggle if click was on interactive elements (links/buttons)
            if (e.target.closest('a, .btn, .btn-outline')) return;

            const content = container.querySelector('.archive-content');
            const isActive = content.classList.contains('active');

            // Close all other archives
            document.querySelectorAll('.archive-content').forEach(el => {
                if (el !== content) el.classList.remove('active');
            });

            // Toggle current archive
            content.classList.toggle('active', !isActive);
        });

        // Keep your existing hover effects
        container.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
        });
        container.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
}

function initializeSidebar() {
    // Hamburger menu toggle
    const hamburger = document.querySelector('.hamburger');
    const sidebar = document.querySelector('#sidebar');
    const sidebarClose = document.querySelector('#sidebar-close');
    
    if (hamburger && sidebar) {
        hamburger.addEventListener('click', function() {
            sidebar.classList.toggle('active');
        });
    }
    
    if (sidebarClose && sidebar) {
        sidebarClose.addEventListener('click', function() {
            sidebar.classList.remove('active');
        });
    }
    
    // Close sidebar when clicking outside
    document.addEventListener('click', function(e) {
        if (sidebar && 
            !sidebar.contains(e.target) && 
            !hamburger.contains(e.target) && 
            sidebar.classList.contains('active')) {
            sidebar.classList.remove('active');
        }
    });
    
    // Submenu toggles
    const menuParents = document.querySelectorAll('.menu-parent');
    
    menuParents.forEach(parent => {
        parent.addEventListener('click', function() {
            const submenu = this.nextElementSibling;
            const isActive = submenu.classList.contains('active');
            
            // Close other submenus
            document.querySelectorAll('.submenu').forEach(menu => {
                if (menu !== submenu) {
                    menu.classList.remove('active');
                    menu.style.maxHeight = null;
                }
            });
            
            // Toggle current submenu
            submenu.classList.toggle('active', !isActive);
            
            if (!isActive) {
                submenu.style.maxHeight = submenu.scrollHeight + 'px';
            } else {
                submenu.style.maxHeight = null;
            }
        });
    });
}
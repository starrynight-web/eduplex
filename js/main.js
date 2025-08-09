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

// Batch Selection Dropdown
const batchSelect = document.getElementById('batch-select');

if (batchSelect) {
    batchSelect.addEventListener('change', function() {
        const selectedBatch = this.value;
        if (selectedBatch) {
            console.log(`Selected batch: ${selectedBatch}`);
            // Add your batch selection logic here
            // For example, you could redirect to a specific page or load batch-specific content
        }
    });
}


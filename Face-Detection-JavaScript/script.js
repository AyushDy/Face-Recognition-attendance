function showSection(sectionId) {
    // Hide all sections
    const sections = document.querySelectorAll('.section');
    sections.forEach((section) => {
      section.classList.remove('active');
    });
  
    // Remove 'active' class from all sidebar links
    const links = document.querySelectorAll('.sidebar a');
    links.forEach((link) => {
      link.classList.remove('active');
    });
  
    // Show the selected section
    const activeSection = document.getElementById(sectionId);
    if (activeSection) {
      activeSection.classList.add('active');
    }
  
    // Set the active link
    const activeLink = document.getElementById(sectionId + '-link');
    if (activeLink) {
      activeLink.classList.add('active');
    }
  }
  
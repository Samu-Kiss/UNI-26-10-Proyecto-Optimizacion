/**
 * Modular Slides Loader
 * Dynamically loads all slides from the slides.json configuration
 */

async function loadSlides() {
    try {
        // Fetch the slides configuration
        const response = await fetch('slides.json');
        const slidesConfig = await response.json();
        
        const slidesContainer = document.querySelector('.slides');
        
        // Load each slide
        for (const slideConfig of slidesConfig) {
            try {
                const slideResponse = await fetch(slideConfig.file);
                const slideContent = await slideResponse.text();
                
                // Create a temporary container to parse the HTML
                const tempDiv = document.createElement('div');
                tempDiv.innerHTML = slideContent;
                
                // Append ONLY top-level section elements (preserves nested vertical slides)
                // This ensures vertical slides remain inside their parent section
                const topLevelSections = Array.from(tempDiv.children).filter(
                    child => child.tagName === 'SECTION'
                );
                topLevelSections.forEach(section => {
                    slidesContainer.appendChild(section);
                });
                
                console.log(`✓ Loaded: ${slideConfig.title} (${topLevelSections.length} section${topLevelSections.length !== 1 ? 's' : ''})`);
            } catch (error) {
                console.error(`✗ Error loading ${slideConfig.file}:`, error);
            }
        }
        
        // Reinitialize Reveal.js after loading all slides
        Reveal.sync();
        console.log(`✓ All ${slidesConfig.length} slides loaded successfully`);
    } catch (error) {
        console.error('Error loading slides configuration:', error);
    }
}

// Load slides when the DOM is ready
document.addEventListener('DOMContentLoaded', loadSlides);

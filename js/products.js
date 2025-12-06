document.addEventListener('DOMContentLoaded', function() {

    const productsFeature = document.querySelector('.products_feature');
    const productText = document.querySelector('.product_text');
    const rightSide = document.querySelector('.right_side');

    if (productsFeature && productText && rightSide) {

        const images = rightSide.querySelectorAll('.image');
        let currentActiveIndex = -1;

        function handleScroll() {
            const rightSideRect = rightSide.getBoundingClientRect();
            const productsFeatureRect = productsFeature.getBoundingClientRect();

            // When product_text reaches 200px from top of viewport
            const shouldBeSticky = productsFeatureRect.top <= 200;

            // When right_side bottom passes the bottom of the section
            const rightSideBottom = rightSideRect.bottom;
            const shouldUnstick = rightSideBottom <= (productText.offsetHeight + 100);

            if (shouldBeSticky && !shouldUnstick) {
                productText.classList.add('sticky');
            } else {
                productText.classList.remove('sticky');
            }

            // Check which image is in the center viewport
            const centerViewport = window.innerHeight / 2;
            let closestIndex = -1;
            let closestDistance = Infinity;

            images.forEach((image, index) => {
                const imageRect = image.getBoundingClientRect();
                const imageCenter = imageRect.top + (imageRect.height / 2);
                const distance = Math.abs(imageCenter - centerViewport);

                if (distance < closestDistance) {
                    closestDistance = distance;
                    closestIndex = index;
                }
            });

            // Update content if the active image changed
            if (closestIndex !== currentActiveIndex && closestIndex !== -1) {
                currentActiveIndex = closestIndex;
                const activeImage = images[closestIndex];

                const title = activeImage.dataset.title;
                const description = activeImage.dataset.description;

                if (title || description) {
                    productText.querySelector('h2').textContent = title || 'Title';
                    productText.querySelector('p').textContent = description || 'Description';
                }
            }
        }

        window.addEventListener('scroll', handleScroll);
        handleScroll(); // Run on page load

    }
});
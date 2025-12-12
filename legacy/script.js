// Portfolio App
class PortfolioApp {
    constructor() {
        this.portfolioData = [];
        this.filteredData = [];
        this.currentPage = 0;
        this.itemsPerPage = 12;
        this.currentCategory = 'all';
        this.currentCity = '';
        this.currentType = '';
        this.searchQuery = '';

        this.init();
    }

    async init() {
        await this.loadData();
        this.setupEventListeners();
        this.populateFilters();
        this.renderPortfolio();
    }

    async loadData() {
        try {
            const response = await fetch('portfolio_data.json');
            const data = await response.json();
            this.portfolioData = data.portfolio;
            this.filteredData = [...this.portfolioData];

            // Update stats
            document.getElementById('totalItems').textContent = data.stats.totalItems;
            document.getElementById('hotelCount').textContent = data.stats.hotels;
            document.getElementById('fnbCount').textContent = data.stats.fnb;
            document.getElementById('beyondCount').textContent = data.stats.beyond;
        } catch (error) {
            console.error('Error loading portfolio data:', error);
            this.showError();
        }
    }

    setupEventListeners() {
        // Category navigation
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                navLinks.forEach(l => l.classList.remove('active'));
                e.target.classList.add('active');
                this.currentCategory = e.target.dataset.category;
                this.currentPage = 0;
                this.applyFilters();
            });
        });

        // City filter
        const cityFilter = document.getElementById('cityFilter');
        cityFilter.addEventListener('change', (e) => {
            this.currentCity = e.target.value;
            this.currentPage = 0;
            this.applyFilters();
        });

        // Type filter
        const typeFilter = document.getElementById('typeFilter');
        typeFilter.addEventListener('change', (e) => {
            this.currentType = e.target.value;
            this.currentPage = 0;
            this.applyFilters();
        });

        // Search input
        const searchInput = document.getElementById('searchInput');
        searchInput.addEventListener('input', (e) => {
            this.searchQuery = e.target.value.toLowerCase();
            this.currentPage = 0;
            this.applyFilters();
        });

        // Load more button
        const loadMoreBtn = document.getElementById('loadMoreBtn');
        loadMoreBtn.addEventListener('click', () => {
            this.currentPage++;
            this.renderPortfolio(true);
        });

        // Modal close
        const modalClose = document.getElementById('modalClose');
        const modalOverlay = document.getElementById('modalOverlay');
        modalClose.addEventListener('click', () => this.closeModal());
        modalOverlay.addEventListener('click', () => this.closeModal());
    }

    populateFilters() {
        // Get unique cities
        const cities = [...new Set(this.portfolioData.map(item => item.city))].sort();
        const cityFilter = document.getElementById('cityFilter');
        cities.forEach(city => {
            if (city) {
                const option = document.createElement('option');
                option.value = city;
                option.textContent = city;
                cityFilter.appendChild(option);
            }
        });

        // Get unique types
        const types = [...new Set(this.portfolioData.map(item => item.type || item.brandCategory).filter(Boolean))].sort();
        const typeFilter = document.getElementById('typeFilter');
        types.forEach(type => {
            if (type) {
                const option = document.createElement('option');
                option.value = type;
                option.textContent = type;
                typeFilter.appendChild(option);
            }
        });
    }

    applyFilters() {
        this.filteredData = this.portfolioData.filter(item => {
            // Category filter
            if (this.currentCategory !== 'all' && item.category !== this.currentCategory) {
                return false;
            }

            // City filter
            if (this.currentCity && item.city !== this.currentCity) {
                return false;
            }

            // Type filter
            if (this.currentType) {
                const itemType = item.type || item.brandCategory || '';
                if (itemType !== this.currentType) {
                    return false;
                }
            }

            // Search filter
            if (this.searchQuery) {
                const searchText = [
                    item.brand,
                    item.property,
                    item.venue,
                    item.item,
                    item.city,
                    item.category,
                    item.type
                ].filter(Boolean).join(' ').toLowerCase();

                if (!searchText.includes(this.searchQuery)) {
                    return false;
                }
            }

            return true;
        });

        this.renderPortfolio();
    }

    renderPortfolio(append = false) {
        const grid = document.getElementById('portfolioGrid');
        const loadMoreBtn = document.getElementById('loadMoreBtn');

        if (!append) {
            grid.innerHTML = '';
        }

        const startIndex = this.currentPage * this.itemsPerPage;
        const endIndex = startIndex + this.itemsPerPage;
        const itemsToRender = this.filteredData.slice(startIndex, endIndex);

        if (itemsToRender.length === 0 && !append) {
            this.showEmptyState();
            loadMoreBtn.classList.add('hidden');
            return;
        }

        itemsToRender.forEach(item => {
            const portfolioItem = this.createPortfolioItem(item);
            grid.appendChild(portfolioItem);
        });

        // Load Instagram embeds after items are added to DOM
        setTimeout(() => this.loadInstagramEmbeds(), 100);

        // Show/hide load more button
        if (endIndex >= this.filteredData.length) {
            loadMoreBtn.classList.add('hidden');
        } else {
            loadMoreBtn.classList.remove('hidden');
        }
    }

    createPortfolioItem(item) {
        const div = document.createElement('div');
        div.className = 'portfolio-item';
        div.dataset.id = item.id;

        // Get the first Instagram link
        const instagramLink = item.instagramLinks && item.instagramLinks.length > 0
            ? item.instagramLinks[0]
            : null;

        // Determine title and subtitle based on item type
        let title = '';
        let subtitle = '';

        if (item.property) {
            title = item.property;
            subtitle = `${item.brand} • ${item.city}`;
        } else if (item.venue) {
            title = item.venue;
            subtitle = item.city;
        } else if (item.brand) {
            title = item.item || item.brand;
            subtitle = `${item.brand} • ${item.city}`;
        }

        // Create tags
        let tags = [];
        tags.push({ text: item.category, class: 'category' });

        if (item.michelinStars && item.michelinStars > 0) {
            tags.push({ text: `${item.michelinStars} Michelin Star${item.michelinStars > 1 ? 's' : ''}`, class: 'michelin' });
        }

        if (item.level) {
            tags.push({ text: item.level, class: '' });
        }

        if (item.brandCategory) {
            tags.push({ text: item.brandCategory, class: '' });
        }

        if (item.type && item.type !== item.category) {
            tags.push({ text: item.type, class: '' });
        }

        div.innerHTML = `
            <div class="portfolio-item-image" data-instagram-url="${instagramLink || ''}">
                ${instagramLink ? `<div class="instagram-placeholder">Loading Instagram...</div>` : '<div class="instagram-placeholder">No preview available</div>'}
            </div>
            <div class="portfolio-item-content">
                <h3 class="portfolio-item-title">${this.escapeHtml(title)}</h3>
                <p class="portfolio-item-subtitle">${this.escapeHtml(subtitle)}</p>
                <div class="portfolio-item-tags">
                    ${tags.map(tag => `<span class="tag ${tag.class}">${this.escapeHtml(tag.text)}</span>`).join('')}
                </div>
            </div>
        `;

        // Add click event
        div.addEventListener('click', () => this.openModal(item));

        return div;
    }

    loadInstagramEmbeds() {
        const imageContainers = document.querySelectorAll('.portfolio-item-image[data-instagram-url]');

        imageContainers.forEach(container => {
            const url = container.dataset.instagramUrl;
            if (!url || url === 'null' || container.querySelector('iframe')) {
                return;
            }

            // Extract Instagram post ID from URL
            const postId = this.extractInstagramId(url);
            if (postId) {
                // Use Instagram's embed HTML
                const embedUrl = `https://www.instagram.com/p/${postId}/embed/captioned`;
                container.innerHTML = `<iframe src="${embedUrl}" frameborder="0" scrolling="no" allowtransparency="true"></iframe>`;
            }
        });
    }

    extractInstagramId(url) {
        // Extract post ID from various Instagram URL formats
        const patterns = [
            /instagram\.com\/p\/([A-Za-z0-9_-]+)/,
            /instagram\.com\/reel\/([A-Za-z0-9_-]+)/,
            /instagram\.com\/tv\/([A-Za-z0-9_-]+)/
        ];

        for (const pattern of patterns) {
            const match = url.match(pattern);
            if (match) {
                return match[1];
            }
        }

        return null;
    }

    openModal(item) {
        const modal = document.getElementById('modal');
        const modalBody = document.getElementById('modalBody');

        // Clear previous content
        modalBody.innerHTML = '';

        // Create content
        const content = document.createElement('div');
        content.style.color = '#ffffff';

        let title = item.property || item.venue || item.item || item.brand || 'Untitled';
        let subtitle = item.city || '';

        content.innerHTML = `
            <h2 style="margin-bottom: 16px; font-size: 28px;">${this.escapeHtml(title)}</h2>
            <p style="color: #a0a0a0; margin-bottom: 24px; font-size: 16px;">${this.escapeHtml(subtitle)}</p>
            <div style="display: flex; gap: 16px; flex-wrap: wrap; margin-bottom: 24px;">
                ${item.instagramLinks && item.instagramLinks.length > 0 ? item.instagramLinks.map((link, index) => {
                    const postId = this.extractInstagramId(link);
                    return `
                        <div style="flex: 1; min-width: 300px;">
                            <iframe src="https://www.instagram.com/p/${postId}/embed/captioned"
                                    width="100%"
                                    height="600"
                                    frameborder="0"
                                    scrolling="no"
                                    allowtransparency="true"></iframe>
                        </div>
                    `;
                }).join('') : '<p>No Instagram content available</p>'}
            </div>
            ${item.googleMaps && item.googleMaps !== '-' ? `
                <a href="${item.googleMaps}"
                   target="_blank"
                   style="display: inline-block; background-color: #0057ff; color: white; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: 600;">
                    View on Google Maps
                </a>
            ` : ''}
        `;

        modalBody.appendChild(content);
        modal.classList.add('active');
    }

    closeModal() {
        const modal = document.getElementById('modal');
        modal.classList.remove('active');
    }

    showEmptyState() {
        const grid = document.getElementById('portfolioGrid');
        grid.innerHTML = `
            <div class="empty-state">
                <h3>No results found</h3>
                <p>Try adjusting your filters or search query</p>
            </div>
        `;
    }

    showError() {
        const grid = document.getElementById('portfolioGrid');
        grid.innerHTML = `
            <div class="empty-state">
                <h3>Error loading portfolio</h3>
                <p>Please refresh the page and try again</p>
            </div>
        `;
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
}

// Initialize the app when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        new PortfolioApp();
    });
} else {
    new PortfolioApp();
}

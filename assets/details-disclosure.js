class DetailsDisclosure extends HTMLElement {
  constructor() {
    super();
    this.mainDetailsToggle = this.querySelector('details');
    this.content = this.mainDetailsToggle.querySelector('summary').nextElementSibling;

    this.mainDetailsToggle.addEventListener('focusout', this.onFocusOut.bind(this));
    this.mainDetailsToggle.addEventListener('toggle', this.onToggle.bind(this));
  }

  onFocusOut() {
    setTimeout(() => {
      if (!this.contains(document.activeElement)) this.close();
    });
  }

  onToggle() {
    if (!this.animations) this.animations = this.content.getAnimations();

    if (this.mainDetailsToggle.hasAttribute('open')) {
      this.animations.forEach((animation) => animation.play());
    } else {
      this.animations.forEach((animation) => animation.cancel());
    }
  }

  close() {
    this.mainDetailsToggle.removeAttribute('open');
    this.mainDetailsToggle.querySelector('summary').setAttribute('aria-expanded', false);
  }
}

customElements.define('details-disclosure', DetailsDisclosure);

class HeaderMenu extends DetailsDisclosure {
  constructor() {
    super();
    this.header = document.querySelector('.header-wrapper');
    this.isMegaMenu = this.mainDetailsToggle && this.mainDetailsToggle.classList.contains('mega-menu');
    this.megaMenuContent = this.isMegaMenu ? this.mainDetailsToggle.querySelector('.mega-menu__content') : null;
    
    // Add escape key handler for mega menu
    if (this.isMegaMenu) {
      this.handleEscape = this.handleEscape.bind(this);
    }
  }

  onToggle() {
    if (!this.header) return;
    this.header.preventHide = this.mainDetailsToggle.open;

    const headerBottom = Math.floor(this.header.getBoundingClientRect().bottom);
    
    // Set header bottom position if not already set
    if (document.documentElement.style.getPropertyValue('--header-bottom-position-desktop') === '') {
      document.documentElement.style.setProperty(
        '--header-bottom-position-desktop',
        `${headerBottom}px`
      );
    }

    // Handle body overflow and full-screen positioning for mega menu
    if (this.isMegaMenu && this.megaMenuContent) {
      if (this.mainDetailsToggle.hasAttribute('open')) {
        // Hide body overflow - always set this when menu opens
        document.body.style.overflow = 'hidden';
        
        // Set top position and height to fill screen below header
        document.documentElement.style.setProperty('--mega-menu-top', `${headerBottom}px`);
        this.megaMenuContent.style.top = `${headerBottom}px`;
        this.megaMenuContent.style.height = `calc(100vh - ${headerBottom}px)`;
        
        // Add escape key listener
        document.addEventListener('keydown', this.handleEscape);
      } else {
        // Restore body overflow - always restore when menu closes
        document.body.style.overflow = '';
        
        // Remove escape key listener
        document.removeEventListener('keydown', this.handleEscape);
      }
    }
  }

  handleEscape(event) {
    if (event.key === 'Escape' && this.mainDetailsToggle.hasAttribute('open')) {
      this.close();
    }
  }

  close() {
    super.close();
    // Remove body overflow when mega menu closes
    if (this.isMegaMenu) {
      document.body.style.overflow = '';
      document.removeEventListener('keydown', this.handleEscape);
    }
  }
}

customElements.define('header-menu', HeaderMenu);

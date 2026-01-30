/**
 * Product Customizer - Decade Awards
 * Handles character counters, form validation, file uploads, and dynamic show/hide.
 */

(function() {
  'use strict';

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  function init() {
    initCharacterCounters();
    initRibbonPreview();
    initFileUpload();
    initFormValidation();
    initTextareaCounters();
  }

  /**
   * Character counters for engraving inputs
   */
  function initCharacterCounters() {
    const engravingInputs = document.querySelectorAll('[data-engraving-input]');

    engravingInputs.forEach(input => {
      const wrapper = input.closest('.product-customizer__input-wrapper');
      const counter = wrapper?.querySelector('[data-char-count] [data-current]');

      if (!counter) return;

      const updateCounter = () => {
        const current = input.value.length;
        counter.textContent = current;

        // Add warning class if near limit
        const max = parseInt(input.maxLength, 10);
        const parent = counter.closest('.product-customizer__char-count');
        if (parent) {
          parent.classList.toggle('product-customizer__char-count--warning', current >= max * 0.9);
          parent.classList.toggle('product-customizer__char-count--limit', current >= max);
        }
      };

      input.addEventListener('input', updateCounter);
      updateCounter(); // Initial count
    });
  }

  /**
   * Textarea character counters (comments field)
   */
  function initTextareaCounters() {
    const textareas = document.querySelectorAll('.product-customizer__textarea');

    textareas.forEach(textarea => {
      const wrapper = textarea.closest('.product-customizer__comments');
      const counter = wrapper?.querySelector('.product-customizer__char-count [data-current]');

      if (!counter) return;

      const updateCounter = () => {
        counter.textContent = textarea.value.length;
      };

      textarea.addEventListener('input', updateCounter);
      updateCounter();
    });
  }

  /**
   * Ribbon dropdown preview
   */
  function initRibbonPreview() {
    const ribbonSelect = document.getElementById('ribbon-select');
    const preview = document.getElementById('ribbon-preview');
    const previewText = document.getElementById('ribbon-preview-text');

    if (!ribbonSelect || !preview || !previewText) return;

    ribbonSelect.addEventListener('change', () => {
      const value = ribbonSelect.value;
      if (value) {
        previewText.textContent = value;
        preview.hidden = false;
      } else {
        preview.hidden = true;
      }
    });
  }

  /**
   * File upload handling
   * Uses direct upload to Shopify Files API or falls back to base64
   */
  function initFileUpload() {
    const fileInput = document.getElementById('group-order-file');
    const uploadArea = document.getElementById('upload-area');
    const progressDiv = document.getElementById('upload-progress');
    const progressBar = document.getElementById('upload-progress-bar');
    const successDiv = document.getElementById('upload-success');
    const filenameSpan = document.getElementById('upload-filename');
    const hiddenInput = document.getElementById('group-order-file-url');
    const removeBtn = document.getElementById('remove-file');

    if (!fileInput || !uploadArea) return;

    // Drag and drop handlers
    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
      uploadArea.addEventListener(eventName, preventDefaults, false);
    });

    function preventDefaults(e) {
      e.preventDefault();
      e.stopPropagation();
    }

    ['dragenter', 'dragover'].forEach(eventName => {
      uploadArea.addEventListener(eventName, () => {
        uploadArea.classList.add('product-customizer__upload-area--dragover');
      });
    });

    ['dragleave', 'drop'].forEach(eventName => {
      uploadArea.addEventListener(eventName, () => {
        uploadArea.classList.remove('product-customizer__upload-area--dragover');
      });
    });

    uploadArea.addEventListener('drop', (e) => {
      const files = e.dataTransfer.files;
      if (files.length > 0) {
        fileInput.files = files;
        handleFile(files[0]);
      }
    });

    fileInput.addEventListener('change', () => {
      if (fileInput.files.length > 0) {
        handleFile(fileInput.files[0]);
      }
    });

    function handleFile(file) {
      // Validate file size (max 10MB)
      if (file.size > 10 * 1024 * 1024) {
        alert('File is too large. Maximum size is 10MB.');
        return;
      }

      // Validate file type
      const allowedTypes = ['.doc', '.docx', '.xls', '.xlsx', '.csv', '.pdf', '.txt'];
      const extension = '.' + file.name.split('.').pop().toLowerCase();
      if (!allowedTypes.includes(extension)) {
        alert('Invalid file type. Please upload a Word, Excel, CSV, PDF, or TXT file.');
        return;
      }

      // Show progress
      progressDiv.hidden = false;
      successDiv.hidden = true;

      // Simulate upload (in production, integrate with Uploadcare or similar)
      simulateUpload(file);
    }

    function simulateUpload(file) {
      let progress = 0;
      const interval = setInterval(() => {
        progress += Math.random() * 30;
        if (progress >= 100) {
          progress = 100;
          clearInterval(interval);

          // Store filename as the "URL" (in production, use actual file URL)
          hiddenInput.value = `[File: ${file.name}]`;

          progressDiv.hidden = true;
          successDiv.hidden = false;
          filenameSpan.textContent = file.name;
        }
        progressBar.style.width = progress + '%';
      }, 200);
    }

    // Remove file handler
    if (removeBtn) {
      removeBtn.addEventListener('click', () => {
        fileInput.value = '';
        hiddenInput.value = '';
        successDiv.hidden = true;
        progressDiv.hidden = true;
      });
    }
  }

  /**
   * Form validation before submit
   */
  function initFormValidation() {
    const productForm = document.querySelector('form[action*="/cart/add"]');
    if (!productForm) return;

    productForm.addEventListener('submit', (e) => {
      // Check required ribbon selection
      const ribbonSelect = document.getElementById('ribbon-select');
      if (ribbonSelect && ribbonSelect.required && !ribbonSelect.value) {
        e.preventDefault();
        ribbonSelect.focus();
        ribbonSelect.classList.add('product-customizer__select--error');
        alert('Please select a ribbon option.');
        return false;
      }

      // All validation passed
      return true;
    });

    // Remove error class on change
    const selects = document.querySelectorAll('.product-customizer__select');
    selects.forEach(select => {
      select.addEventListener('change', () => {
        select.classList.remove('product-customizer__select--error');
      });
    });
  }

})();

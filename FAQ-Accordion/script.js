const faqItems = Array.from(document.querySelectorAll('.faq-item'));
const faqButtons = Array.from(document.querySelectorAll('.faq-question'));
const searchInput = document.getElementById('faq-search');
const clearSearchButton = document.querySelector('.clear-search');
const noResultsMessage = document.querySelector('.no-results');

function setItemState(item, isOpen) {
  const button = item.querySelector('.faq-question');
  const answer = item.querySelector('.faq-answer');
  const icon = item.querySelector('.faq-icon');

  item.classList.toggle('active', isOpen);
  button.setAttribute('aria-expanded', String(isOpen));

  if (isOpen) {
    answer.hidden = false;
    icon.textContent = '-';
    answer.style.maxHeight = `${answer.scrollHeight}px`;
    return;
  }

  icon.textContent = '+';
  answer.style.maxHeight = '0px';

  setTimeout(() => {
    if (!item.classList.contains('active')) {
      answer.hidden = true;
    }
  }, 250);
}

faqButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const item = button.closest('.faq-item');
    const isOpen = item.classList.contains('active');

    faqItems.forEach((faqItem) => {
      const currentButton = faqItem.querySelector('.faq-question');
      const currentAnswer = faqItem.querySelector('.faq-answer');
      const currentIcon = faqItem.querySelector('.faq-icon');

      faqItem.classList.remove('active');
      currentButton.setAttribute('aria-expanded', 'false');
      currentIcon.textContent = '+';
      currentAnswer.style.maxHeight = '0px';
      currentAnswer.hidden = true;
    });

    if (!isOpen) {
      setItemState(item, true);
    }
  });
});

function filterFaqs() {
  const searchTerm = searchInput.value.trim().toLowerCase();
  let visibleItems = 0;

  faqItems.forEach((item) => {
    const questionText = item.querySelector('.question-text').textContent.toLowerCase();
    const answerText = item.querySelector('.faq-answer').textContent.toLowerCase();
    const matches = questionText.includes(searchTerm) || answerText.includes(searchTerm);

    item.hidden = !matches;

    if (matches) {
      visibleItems += 1;
    }
  });

  noResultsMessage.hidden = visibleItems !== 0;
  clearSearchButton.hidden = searchTerm === '';
}

searchInput.addEventListener('input', filterFaqs);

clearSearchButton.addEventListener('click', () => {
  searchInput.value = '';
  filterFaqs();
  searchInput.focus();
});

faqItems.forEach((item) => {
  const answer = item.querySelector('.faq-answer');
  const icon = item.querySelector('.faq-icon');

  answer.hidden = !item.classList.contains('active');
  icon.textContent = item.classList.contains('active') ? '-' : '+';

  if (!item.classList.contains('active')) {
    answer.style.maxHeight = '0px';
  } else {
    answer.style.maxHeight = `${answer.scrollHeight}px`;
  }
});

filterFaqs();

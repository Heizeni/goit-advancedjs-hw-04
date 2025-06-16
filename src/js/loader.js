const loaderWrapper = document.querySelector('.loader-wrapper');

export function showLoader() {
  loaderWrapper.classList.remove('hidden');
}

export function hideLoader() {
  loaderWrapper.classList.add('hidden');
}

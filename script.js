"use strict"

const mainEL = document.querySelector('main')

const navigationOptionsELs = Array.from(document.querySelectorAll('[data-js="page-header__list"] button'))
const exploreButtonEL = document.querySelector('[data-js="explore-button"]')

const animationWrappersELs = Array.from(document.querySelectorAll('[data-js="animation-wrapper"]'))
const destinationSectionImagesELs = Array.from(document.querySelectorAll('[data-js="destination-section__image"]'))
const destinationSectionOptiosELs = Array.from(document.querySelectorAll('[data-js="destination-section__list__button"]'))
const destinationSectionDestineELs = Array.from(document.querySelectorAll('[data-js="destination-section__destine"]'))

let destinationSectionCarouselIndex = 0


function changeUnderlinedOption(optionToUnderlineIndex, elementsToAnalise) {
  const underlinedOption = elementsToAnalise.find(value => value.classList.contains('option-button--active'))
  const optionToUnderline = elementsToAnalise[optionToUnderlineIndex]

  underlinedOption.classList.remove('option-button--active')
  optionToUnderline.classList.add('option-button--active')
}

function changeToOtherSection(sectionToGoIndex) {
  const viewportWidth = document.body.clientWidth
  const amountToTransform = sectionToGoIndex ? viewportWidth * sectionToGoIndex : 0

  mainEL.style.transform = `translateX(-${amountToTransform}px)`

  changeUnderlinedOption(sectionToGoIndex, navigationOptionsELs)
}

function resetAnimation(value) {
  value.classList.remove('is-animating')
  setTimeout(() => value.classList.add('is-animating'), 50)
}

function moveCarousel(sectionToGoIndex) {
  animationWrappersELs.forEach(resetAnimation)

  setTimeout(() => {
    destinationSectionDestineELs[destinationSectionCarouselIndex].classList.remove('is-active')
    destinationSectionImagesELs[destinationSectionCarouselIndex].classList.remove('is-active')

    destinationSectionDestineELs[sectionToGoIndex].classList.add('is-active')
    destinationSectionImagesELs[sectionToGoIndex].classList.add('is-active')

    destinationSectionCarouselIndex = sectionToGoIndex
  }, 225)

  changeUnderlinedOption(sectionToGoIndex, destinationSectionOptiosELs)
}

function getCurrentSectionIndex() {
  return navigationOptionsELs.findIndex(value => value.classList.contains('option-button--active'))
}


navigationOptionsELs.forEach((value, index) => {
  value.addEventListener('click', () => changeToOtherSection(index))
})

exploreButtonEL.addEventListener('click', () => changeToOtherSection(1))

destinationSectionOptiosELs.forEach((value, index) => {
  value.addEventListener('click', () => moveCarousel(index))
})

window.addEventListener('resize', () => changeToOtherSection(getCurrentSectionIndex()))

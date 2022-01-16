"use strict"

const mainEL = document.querySelector('main')

const navigationOptionsELs = Array.from(document.querySelectorAll('[data-js="page-header__list"] button'))
const exploreButtonEL = document.querySelector('[data-js="explore-button"]')

const destinationSectionAnimationWrappersELs = Array.from(document.querySelectorAll('[data-js="destination-section__animation-wrapper"]'))
const destinationSectionImagesELs = Array.from(document.querySelectorAll('[data-js="destination-section__image"]'))
const destinationSectionOptionsELs = Array.from(document.querySelectorAll('[data-js="destination-section__list__button"]'))
const destinationSectionDestinesELs = Array.from(document.querySelectorAll('[data-js="destination-section__destine"]'))
let destinationSectionCarouselIndex = 0

const crewSectionAnimationsWrappersELs = Array.from(document.querySelectorAll('[data-js="crew-section__animation-wrapper"]'))
const crewSectionImagesELs = Array.from(document.querySelectorAll('[data-js="crew-section__image"]'))
const crewSectionOptionsELs = Array.from(document.querySelectorAll('[data-js="crew-section__list__button"]'))
const crewSectionTripulantsELs = Array.from(document.querySelectorAll('[data-js="crew-section__tripulant"]'))
let crewSectionCarouselIndex = 0


function changeUnderlinedOption(optionToUnderlineIndex, elementsToAnalise, classToParse) {
  const underlinedOptionEL = elementsToAnalise.find(value => value.classList.contains(classToParse))
  const optionToUnderlineEL = elementsToAnalise[optionToUnderlineIndex]

  underlinedOptionEL.classList.remove(classToParse)
  optionToUnderlineEL.classList.add(classToParse)
}

function changeToOtherSection(sectionToGoIndex) {
  const viewportWidth = document.body.clientWidth
  const amountToTransform = sectionToGoIndex ? viewportWidth * sectionToGoIndex : 0

  mainEL.style.transform = `translateX(-${amountToTransform}px)`

  changeUnderlinedOption(sectionToGoIndex, navigationOptionsELs, 'page-header__list__button--active')
}

function resetAnimation(value) {
  value.classList.remove('is-animating')
  setTimeout(() => value.classList.add('is-animating'), 50)
}

function changeCarouselItemIndex(sectionToGoIndex, carouselIndex) {
  switch (carouselIndex) {
    case 0:
      destinationSectionCarouselIndex = sectionToGoIndex
      break
    case 1:
      crewSectionCarouselIndex = sectionToGoIndex
      break
  }
}

function removeAndAddIsActiveClass(carouselSections, carouselImages, sectionToGoIndex, carouselIndex) {   // carouselIndex represents the index of the carousel compared to the others carousels
  carouselSections[carouselIndex ? crewSectionCarouselIndex : destinationSectionCarouselIndex].classList.remove('is-active')
  carouselImages[carouselIndex ? crewSectionCarouselIndex : destinationSectionCarouselIndex].classList.remove('is-active')

  carouselSections[sectionToGoIndex].classList.add('is-active')
  carouselImages[sectionToGoIndex].classList.add('is-active')

  changeCarouselItemIndex(sectionToGoIndex, carouselIndex)
}

function changeActivedButton(buttonToActiveIndex) {
  const activatedButtonEL = crewSectionOptionsELs.find(value => value.classList.contains('crew-section__list__button--active'))
  const buttonToActiveEL = crewSectionOptionsELs[buttonToActiveIndex]

  activatedButtonEL.classList.remove('crew-section__list__button--active')
  buttonToActiveEL.classList.add('crew-section__list__button--active')
}

function moveCarousel(animationWrapper, carouselSections, carouselImages, sectionToGoIndex, carouselIndex) {
  animationWrapper.forEach(resetAnimation)

  setTimeout(() => removeAndAddIsActiveClass(carouselSections, carouselImages, sectionToGoIndex, carouselIndex), 200)

  switch (carouselIndex) {
    case  0:
      changeUnderlinedOption(sectionToGoIndex, destinationSectionOptionsELs, 'destination-section__list__button--active')
      break
    case 1:
      changeActivedButton(sectionToGoIndex)
      break
  }
}

function getCurrentSectionIndex() {
  return navigationOptionsELs.findIndex(value => value.classList.contains('option-button--active'))
}


navigationOptionsELs.forEach((value, index) => {
  value.addEventListener('click', () => changeToOtherSection(index))
})

exploreButtonEL.addEventListener('click', () => changeToOtherSection(1))

destinationSectionOptionsELs.forEach((value, index) => {
  value.addEventListener('click', () => moveCarousel(destinationSectionAnimationWrappersELs, destinationSectionDestinesELs, destinationSectionImagesELs, index, 0))
})

crewSectionOptionsELs.forEach((value, index) => {
  value.addEventListener('click', () => moveCarousel(crewSectionAnimationsWrappersELs, crewSectionTripulantsELs, crewSectionImagesELs, index, 1))
})

window.addEventListener('resize', () => changeToOtherSection(getCurrentSectionIndex()))

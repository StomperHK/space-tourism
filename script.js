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

const technologySectionAnimationsWrapperELs = Array.from(document.querySelectorAll('[data-js="technology-section__animation-wrapper"]'))
const technologySectionImagesELs = Array.from(document.querySelectorAll('[data-js="technology-section__image"]'))
const tecnologySectionOptionsELs = Array.from(document.querySelectorAll('[data-js="technology-section__list__button"]'))
const technologySectionVehiclesELs = Array.from(document.querySelectorAll('[data-js="technology-section__vehicle"]'))
let technologySectionCarouselIndex = 0


function changeUnderlinedOption(elementsToAnalise, optionToUnderlineIndex, classToParse) {
  const underlinedOptionEL = elementsToAnalise.find(value => value.classList.contains(classToParse))
  const optionToUnderlineEL = elementsToAnalise[optionToUnderlineIndex]

  underlinedOptionEL.classList.remove(classToParse)
  optionToUnderlineEL.classList.add(classToParse)
}

function changeToOtherSection(sectionToGoIndex) {
  const viewportWidth = document.body.clientWidth
  const amountToTransform = sectionToGoIndex ? viewportWidth * sectionToGoIndex : 0

  mainEL.style.transform = `translateX(-${amountToTransform}px)`

  changeUnderlinedOption(navigationOptionsELs, sectionToGoIndex, 'page-header__list__button--active')
}

function getCarouselItemIndex(carouselIndex) {
  return [destinationSectionCarouselIndex, crewSectionCarouselIndex, technologySectionCarouselIndex][carouselIndex]
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
    case 2:
      technologySectionCarouselIndex = sectionToGoIndex
  }
}

function removeAndAddIsActiveClass(carouselImages, carouselSections, sectionToGoIndex, carouselIndex, carouselItemIndex) {   // carouselIndex represents the index of the carousel compared to the others carousels
  carouselSections[carouselItemIndex].classList.remove('is-active')
  carouselImages[carouselItemIndex].classList.remove('is-active')

  carouselSections[sectionToGoIndex].classList.add('is-active')
  carouselImages[sectionToGoIndex].classList.add('is-active')

  changeCarouselItemIndex(sectionToGoIndex, carouselIndex)
}

function changeActivatedButton(optionsELs, sectionToGoIndex, className) {
  const activatedButtonEL = optionsELs.find(value => value.classList.contains(className))
  const buttonToActiveEL = optionsELs[sectionToGoIndex]

  activatedButtonEL.classList.remove(className)
  buttonToActiveEL.classList.add(className)
}

function moveCarousel(carouselItems, carouselInfos) {
  const [animationWrappers, carouselImages, carouselControls, carouselSections] = carouselItems
  const [sectionToGoIndex, carouselIndex] = carouselInfos
  const carouselItemIndex = getCarouselItemIndex(carouselIndex)

  animationWrappers.forEach(resetAnimation)

  setTimeout(() => removeAndAddIsActiveClass(carouselImages, carouselSections, sectionToGoIndex, carouselIndex, carouselItemIndex), 200)

  switch (carouselIndex) {
    case  0:
      changeUnderlinedOption(destinationSectionOptionsELs, sectionToGoIndex, 'destination-section__list__button--active')
      break
    case 1:
      changeActivatedButton(carouselControls, sectionToGoIndex, 'crew-section__list__button--active')
      break
    case 2:
      changeActivatedButton(carouselControls, sectionToGoIndex, 'technology-section__list__button--active')
  }
}

function getCurrentSectionIndex() {
  return navigationOptionsELs.findIndex(value => value.classList.contains('page-header__list__button--active'))
}


navigationOptionsELs.forEach((value, index) => {
  value.addEventListener('click', () => changeToOtherSection(index))
})

exploreButtonEL.addEventListener('click', () => changeToOtherSection(1))

destinationSectionOptionsELs.forEach((value, index) => {
  const carouselItems = [destinationSectionAnimationWrappersELs, destinationSectionImagesELs, destinationSectionOptionsELs, destinationSectionDestinesELs]
  const carouselInfos = [index, 0, destinationSectionCarouselIndex]

  value.addEventListener('click', () => moveCarousel(carouselItems, carouselInfos))
})

crewSectionOptionsELs.forEach((value, index) => {
  const carouselItems = [crewSectionAnimationsWrappersELs, crewSectionImagesELs, crewSectionOptionsELs,  crewSectionTripulantsELs]
  const carouselInfos = [index, 1]

  value.addEventListener('click', () => moveCarousel(carouselItems, carouselInfos))
})

tecnologySectionOptionsELs.forEach((value, index) => {
  const carouselItems = [technologySectionAnimationsWrapperELs, technologySectionImagesELs, tecnologySectionOptionsELs, technologySectionVehiclesELs]
  const carouselInfos = [index, 2, technologySectionCarouselIndex]

  value.addEventListener('click', () => moveCarousel(carouselItems, carouselInfos))
})

window.addEventListener('resize', () => changeToOtherSection(getCurrentSectionIndex()))

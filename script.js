"use strict"

const pageNavigationEL = document.querySelector('[data-js="page-header__navigation"]')
const headerOptionsELs = Array.from(document.querySelectorAll('[data-js="page-header__list"] button'))
const hamburguerButtonEL = document.querySelector('[data-js="page-header__hamburguer-button"]')
const hamburguerMenuCloserEL = document.querySelector('[data-js="page-header__hamburguer-menu-closer"]')
const hamburguerMenuBackdrop = document.querySelector('[data-js="page-header__hamburguer-menu-backdrop"]')

const mainEL = document.querySelector('main')

const homeSectionFlexEL = document.querySelector('[data-js="home-section__flex"]')
const homeSectionEL = document.querySelector('[data-js="home-section"]')
const exploreButtonEL = document.querySelector('[data-js="explore-button"]')

const destinationSectionAnimationWrappersELs = Array.from(document.querySelectorAll('[data-js="destination-section__animation-wrapper"]'))
const destinationSectionImagesELs = Array.from(document.querySelectorAll('[data-js="destination-section__image"]'))
const destinationSectionOptionsListEL = document.querySelector('[data-js="destination-section__list"]')
const destinationSectionOptionsELs = Array.from(document.querySelectorAll('[data-js="destination-section__list__button"]'))
const destinationSectionDestinesELs = Array.from(document.querySelectorAll('[data-js="destination-section__destine"]'))
let destinationSectionCarouselIndex = 0

const crewSectionAnimationsWrappersELs = Array.from(document.querySelectorAll('[data-js="crew-section__animation-wrapper"]'))
const crewSectionImagesELs = Array.from(document.querySelectorAll('[data-js="crew-section__image"]'))
const crewSectionOptionsListEL = document.querySelector('[data-js="crew-section__list"]')
const crewSectionOptionsELs = Array.from(document.querySelectorAll('[data-js="crew-section__list__button"]'))
const crewSectionTripulantsELs = Array.from(document.querySelectorAll('[data-js="crew-section__tripulant"]'))
let crewSectionCarouselIndex = 0

const technologySectionAnimationsWrapperELs = Array.from(document.querySelectorAll('[data-js="technology-section__animation-wrapper"]'))
const technologySectionPictureWrappersELs = Array.from(document.querySelectorAll('[data-js="technology-section__picture-wrapper"]'))
const tecnologySectionOptionsListELs = document.querySelector('[data-js="technology-section__list"]')
const tecnologySectionOptionsELs = Array.from(document.querySelectorAll('[data-js="technology-section__list__button"]'))
const technologySectionVehiclesELs = Array.from(document.querySelectorAll('[data-js="technology-section__vehicle"]'))
let technologySectionCarouselIndex = 0

const loadingCircleEL = document.querySelector('[data-js="loading-circle"]')


function toggleHamburguerMenu() {
  pageNavigationEL.classList.toggle('page-header__navigation--active')
  hamburguerMenuBackdrop.classList.toggle('page-header__hamburguer-menu-backdrop--active')
}

function hideHamburguerMenuOnBlur() {
  pageNavigationEL.classList.remove('page-header__navigation--active')
  hamburguerMenuBackdrop.classList.remove('page-header__hamburguer-menu-backdrop--active')
}

function manageTabListFocus(event, tabsELs) {
  const pressedKey = event.key
  const focusedTabIndex = tabsELs.findIndex(value => document.activeElement === value)
  const tabsLastIndex = tabsELs.length - 1

  switch (pressedKey) {
    case "ArrowLeft":
      tabsELs[focusedTabIndex ? focusedTabIndex-1 : tabsLastIndex].focus()
      break
    case "ArrowRight":
      tabsELs[focusedTabIndex === tabsLastIndex ? 0 : focusedTabIndex+1].focus()
  }
}

function changeAriaSelectedToFalse(value) {
  value.ariaSelected = 'false'
}

function changeAriaSelectedTab(tabsELs, sectionToGoIndex) {
  tabsELs.forEach(changeAriaSelectedToFalse)
  tabsELs[sectionToGoIndex].ariaSelected = 'true'
}

function changeUnderlinedOption(elementsToAnalise, optionToUnderlineIndex, classToParse) {
  const underlinedOptionEL = elementsToAnalise.find(value => value.classList.contains(classToParse))
  const optionToUnderlineEL = elementsToAnalise[optionToUnderlineIndex]

  underlinedOptionEL.classList.remove(classToParse)
  optionToUnderlineEL.classList.add(classToParse)
}

function scheduleClassesRemotion(callback, time) {
  setTimeout(callback, time)
}

function removeIsHiddenClass(sectionToGoIndex) {
  const flexContainerEL = mainEL.children[sectionToGoIndex].querySelector('[class*=__flex]')

  if (sectionToGoIndex === 0 || sectionToGoIndex == 2) {
    scheduleClassesRemotion(() => {
      flexContainerEL.classList.remove('is-without-scrollbar', 'is-hidden')
    }, 600)
  }

  else if (sectionToGoIndex === 1) {
    scheduleClassesRemotion(() => {
      const [firstWrapper, secondWrapper] = destinationSectionAnimationWrappersELs
      
      
      firstWrapper.classList.remove('is-hidden-to-left')
      secondWrapper.classList.remove('is-hidden-to-right')
    }, 600)
  }

  else {
    scheduleClassesRemotion(() => {
      const [firstWrapper, secondWrapper] = technologySectionAnimationsWrapperELs

      firstWrapper.classList.remove('is-hidden')
      secondWrapper.classList.remove('is-hidden-to-top')
    }, 600)
  }
}

function preventExternalButtonsFromReceivingFocus(sectionToGoIndex) {
  const buttonsELs = Array.from(document.querySelectorAll('main button'))
  const visibleButonsELs = Array.from(mainEL.children[sectionToGoIndex].querySelectorAll('button'))

  buttonsELs.forEach(value => value.tabIndex = '-1')
  visibleButonsELs.forEach(value => value.tabIndex = '0')
}

preventExternalButtonsFromReceivingFocus(0)

function changeToOtherSection(sectionToGoIndex) {
  const viewportWidth = document.body.clientWidth
  const amountToTransform = sectionToGoIndex ? viewportWidth * sectionToGoIndex : 0

  mainEL.style.transform = `translateX(-${amountToTransform}px)`

  changeAriaSelectedTab(headerOptionsELs, sectionToGoIndex)

  changeUnderlinedOption(headerOptionsELs, sectionToGoIndex, 'page-header__list__button--active')

  removeIsHiddenClass(sectionToGoIndex)

  preventExternalButtonsFromReceivingFocus(sectionToGoIndex)
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

  changeAriaSelectedTab(carouselControls, sectionToGoIndex)

  switch (carouselIndex) {
    case  0:
      changeUnderlinedOption(carouselControls, sectionToGoIndex, 'destination-section__list__button--active')
      break
    case 1:
      changeActivatedButton(carouselControls, sectionToGoIndex, 'crew-section__list__button--active')
      break
    case 2:
      changeActivatedButton(carouselControls, sectionToGoIndex, 'technology-section__list__button--active')
  }
}

function getCurrentSectionIndex() {
  return headerOptionsELs.findIndex(value => value.classList.contains('page-header__list__button--active'))
}

function readyPage() {
  mainEL.ariaBusy = "false"

  scheduleClassesRemotion(() => {
    pageNavigationEL.classList.remove('is-disabled')
    homeSectionEL.classList.remove('is-disabled')
    loadingCircleEL.classList.remove('is-active')
  }, 1500)

  scheduleClassesRemotion(() => homeSectionFlexEL.classList.remove('is-hidden'), 2000)
}

pageNavigationEL.addEventListener('keydown', event => manageTabListFocus(event, headerOptionsELs))

hamburguerButtonEL.addEventListener('click', toggleHamburguerMenu)

hamburguerMenuCloserEL.addEventListener('click', toggleHamburguerMenu)

hamburguerMenuBackdrop.addEventListener('click', hideHamburguerMenuOnBlur)

destinationSectionOptionsListEL.addEventListener('keydown', event => manageTabListFocus(event, destinationSectionOptionsELs))

crewSectionOptionsListEL.addEventListener('keydown', event => manageTabListFocus(event, crewSectionOptionsELs))

tecnologySectionOptionsListELs.addEventListener('keydown', event => manageTabListFocus(event, tecnologySectionOptionsELs))

headerOptionsELs.forEach((value, index) => {
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
  const carouselItems = [technologySectionAnimationsWrapperELs, technologySectionPictureWrappersELs, tecnologySectionOptionsELs, technologySectionVehiclesELs]
  const carouselInfos = [index, 2, technologySectionCarouselIndex]

  value.addEventListener('click', () => moveCarousel(carouselItems, carouselInfos))
})

window.addEventListener('resize', () => changeToOtherSection(getCurrentSectionIndex()))

window.addEventListener('load', readyPage)

"use strict"

const mainEL = document.querySelector('main')
const navigationOptionsELs = Array.from(document.querySelectorAll('[data-js="navigation-list"] button'))
const exploreButtonEL = document.querySelector('[data-js="explore-button"]')


function changeUnderlinedOption(optionToUnderlineIndex) {
  const underlinedOption = navigationOptionsELs.find(value => value.classList.contains('page-header__option--active'))
  const optionToUnderline = navigationOptionsELs[optionToUnderlineIndex]

  underlinedOption.classList.remove('page-header__option--active')
  optionToUnderline.classList.add('page-header__option--active')
}

function changeToOtherSection(sectionToGoIndex) {
  const viewportWidth = document.body.clientWidth
  const amountToTransform = sectionToGoIndex ? viewportWidth * sectionToGoIndex : 0

  mainEL.style.transform = `translateX(-${amountToTransform}px)`

  changeUnderlinedOption(sectionToGoIndex)
}


navigationOptionsELs.forEach((value, index) => {
  value.addEventListener('click', () => changeToOtherSection(index))
})

exploreButtonEL.addEventListener('click', () => changeToOtherSection(1))

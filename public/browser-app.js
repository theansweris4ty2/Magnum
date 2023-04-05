const form = document.querySelector('form')
const dropDownLink = document.querySelectorAll('.drop-down-link')
const dropDownMenu = document.querySelectorAll('.drop-down-menu')
const productImage = document.querySelectorAll('.product-image')
const header = document.querySelector('header')
const buttons = document.querySelectorAll('.menu-button')
const slides = document.querySelectorAll('.slide')
const prevSlideBtn = document.querySelector('.previous.slide-button')
const nextSlideBtn = document.querySelector('.next.slide-button')
let currentSlide = 0
const maxSlide = slides.length

const changeSlide = (slide) => {
  slides.forEach((s, i) => {
    s.style.opacity = 0
    s.style.transform = `translateX(${(i - slide) * 100}%)`
    slides[currentSlide].style.transition = 'transform 1200ms, opacity 1400ms'
    slides[currentSlide].style.opacity = 1
  })
}
if (prevSlideBtn) {
  currentSlide === 0 ? prevSlideBtn.classList.add('hidden') : ''
}
if (nextSlideBtn) {
  nextSlideBtn.addEventListener('click', () => {
    currentSlide === maxSlide - 1 ? '' : currentSlide++
    prevSlideBtn.classList.remove('hidden')
    currentSlide === maxSlide - 1 ? nextSlideBtn.classList.add('hidden') : ''
    changeSlide(currentSlide)
  })
}

if (prevSlideBtn) {
  prevSlideBtn.addEventListener('click', () => {
    currentSlide === 0 ? '' : currentSlide--
    nextSlideBtn.classList.remove('hidden')
    currentSlide === 0 ? prevSlideBtn.classList.add('hidden') : ''
    changeSlide(currentSlide)
  })
}
changeSlide(0)

const sendFormInfo = async () => {
  const dataArray = [...new FormData(form)]
  const data = Object.fromEntries(dataArray)

  try {
    await axios.post('/', data)
  } catch (err) {
    console.log(err)
  }
}

if (form)
  form.addEventListener('submit', (e) => {
    e.preventDefault()
    sendFormInfo()
    form.reset()
  })

buttons.forEach((btn) =>
  btn.addEventListener('click', () => {
    dropDownMenu.forEach((menu) => menu.classList.add('hidden'))
    productImage.forEach((im) => {
      im.style.width = '0px'
      im.style.height = '0px'
    })
    btn.classList.add('hidden-button')
    header.scrollIntoView({
      block: 'start',
      inline: 'center',
    })
  })
)

dropDownLink.forEach((link) => {
  link.addEventListener('click', (e) => {
    e.preventDefault()
    const id = e.target.getAttribute('dataset')
    const dropDown = document.querySelector(`#${id}`)
    dropDownMenu.forEach((menu) => menu.classList.add('hidden'))
    setTimeout(() => dropDown.classList.remove('hidden'), 700)

    dropDown.scrollIntoView({
      block: 'start',
      inline: 'center',
    })

    productImage.forEach((im) => {
      im.style.width = '0px'
      im.style.height = '0px'
      const menuImage = document.querySelectorAll(`.${id}`)
      menuImage.forEach((im) => {
        setTimeout(() => {
          im.style.width = '100%'
          im.style.height = '100%'
        }, 1000)
      })
    })
    buttons.forEach((btn) => {
      btn.classList.add('hidden-button')
      const menuBtn = document.querySelector(`.button-${id}`)
      menuBtn.classList.remove('hidden-button')
    })
  })
})

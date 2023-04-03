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
    s.style.transform = `translateX(${(i - slide) * 100}%)`
  })
}
  nextSlideBtn.addEventListener('click', () => {
    currentSlide === maxSlide - 1 ? (currentSlide = 0) : currentSlide++
    changeSlide(currentSlide)
  })


  prevSlideBtn.addEventListener('click', () => {
    currentSlide === 0 ? (currentSlide = maxSlide - 1) : currentSlide--
    changeSlide(currentSlide)
    console.log(currentSlide)
  })


const sendFormInfo = async () => {
  const dataArray = [...new FormData(form)]
  const data = Object.fromEntries(dataArray)

  try {
    await axios.post('/magnum-towers', data)
  } catch (err) {
    console.log(err)
  }
}

if (window.location.href === 'https://magnum-towers.netlify.app/contact.html')
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
      // behavior: 'smooth',
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
      // behavior: 'smooth',
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

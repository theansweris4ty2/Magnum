const form = document.querySelector('form')
const nav = document.querySelector('nav')
const dropDownLink = document.querySelectorAll('.drop-down-link')
const dropDownMenu = document.querySelectorAll('.drop-down-menu')
const productImage = document.querySelectorAll('.product-image')
const header = document.querySelector('header')
const buttons = document.querySelectorAll('.menu-button')

const sendFormInfo = async () => {
  const dataArray = [...new FormData(form)]
  const data = Object.fromEntries(dataArray)

  try {
    await axios.post('/magnum-towers', data)
  } catch (err) {
    console.log(err)
  }
}

if (window.location.href === 'http://localhost:3000/contact.html')
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
    header.scrollIntoView({ behavior: 'smooth', block: 'start' })
  })
)

dropDownLink.forEach((link) => {
  link.addEventListener('click', (e) => {
    e.preventDefault()
    const id = e.target.getAttribute('dataset')
    const dropDown = document.querySelector(`#${id}`)
    dropDownMenu.forEach((menu) => menu.classList.add('hidden'))
    dropDown.classList.remove('hidden')
    dropDown.scrollIntoView({ behavior: 'smooth', block: 'start' })

    productImage.forEach((im) => {
      im.style.width = '0px'
      im.style.height = '0px'
      const menuImage = document.querySelectorAll(`.${id}`)
      menuImage.forEach((im) => {
        im.style.width = '300px'
        im.style.height = '200px'
      })
    })
    buttons.forEach((btn) => {
      btn.classList.add('hidden-button')
      const menuBtn = document.querySelector(`.button-${id}`)
      menuBtn.classList.remove('hidden-button')
    })
  })
})

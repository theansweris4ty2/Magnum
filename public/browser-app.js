const form = document.querySelector('form')
const nav = document.querySelector('nav')
const slider = document.querySelector('.slider')

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

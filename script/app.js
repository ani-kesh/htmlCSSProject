'use strict'

const searchBtn = document.querySelector('.search-btn')
const searchBox = document.querySelector('.search-box')
const searchInput = document.querySelector('input')
const cancelBtn = document.querySelector('.cancel-btn')

searchBtn.onclick = () => {
    searchBox.classList.add('active')
    searchInput.classList.add('active')
    cancelBtn.classList.add('active')
}
cancelBtn.onclick = () => {
    searchBox.classList.remove('active')
    searchInput.classList.remove('active')
    cancelBtn.classList.remove('active')
}
let count = 0

export const showLoading = () => {
  if (count === 0) document.getElementById('ant-spin')!.style.display = 'flex'
  count++
}

export const hideLoading = () => {
  if (count < 0) return
  count--
  if (count === 0) document.getElementById('ant-spin')!.style.display = 'none'
}

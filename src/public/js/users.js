/* eslint-disable no-undef */
import { toast, Validator, confirmButton, updateErrorMessages } from './main.js'

document.addEventListener('DOMContentLoaded', async function () {
  const formCreate = document.querySelector('#create_user')
  if (formCreate) {
    Validator({
      form: '#create_user',
      formGroupSelector: '.form-group',
      errorSelector: '.form-message',
      rules: [
        Validator.isRequired('#name', 'Vui lòng nhập tên tài khoản của bạn'),
        Validator.maxLength('#name', 255),
        Validator.isRequired('#email', 'Vui lòng nhập email của bạn'),
        Validator.isEmail('#email'),
        Validator.isRequired('#role_id', 'Vui lòng chọn role của bạn'),
        Validator.isRequired('#password', 'Vui lòng nhập mật khẩu tài khoản của bạn'),
        Validator.isPassword('#password')
      ],
      onSubmit: async function (data) {
        const payload = {
          name: data.name,
          email: data.email,
          role_id: data.role_id,
          password: data.password,
          is_active: data.is_active.includes('on')
        }

        try {
          const response = await fetch('/api/users/create', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
          })

          if (!response.ok) {
            const errorResponse = await response.json()
            console.log(errorResponse)
            updateErrorMessages(errorResponse.errors || {})
            throw new Error(errorResponse.message)
          }
          const result = await response.json()
          toast({
            message: result.message,
            type: 'success',
            title: 'Thành Công!!'
          })
        } catch (error) {
          toast({
            type: 'error',
            title: 'lỗi',
            message: error.message
          })
        }
      }
    })
  }
  const formEdit = document.querySelector('#edit_user')
  if (formEdit) {
    Validator({
      form: '#edit_user',
      formGroupSelector: '.form-group',
      errorSelector: '.form-message',
      rules: [
        Validator.isRequired('#name', 'Vui lòng nhập tên tài khoản của bạn'),
        Validator.maxLength('#name', 255),
        Validator.isRequired('#email', 'Vui lòng nhập email của bạn'),
        Validator.isEmail('#email'),
        Validator.isRequired('#role_id', 'Vui lòng chọn role của bạn')
      ],
      onSubmit: async function (data) {
        const payload = {
          name: data.name,
          email: data.email,
          role_id: data.role_id,
          is_active: data.is_active.includes('on')
        }

        try {
          const url = window.location.pathname
          const segments = url.split('/')
          const Id = segments[segments.length - 1]
          const response = await fetch(`/api/users/edit/${Id}`, {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
          })

          if (!response.ok) {
            const errorResponse = await response.json()
            updateErrorMessages(errorResponse.errors || {})
            throw new Error(errorResponse.message)
          }
          const result = await response.json()
          toast({
            message: result.message,
            type: 'success',
            title: 'Thành Công!!'
          })
        } catch (error) {
          toast({
            type: 'error',
            title: 'lỗi',
            message: error.message
          })
        }
      }
    })
  }
  const formLogin = document.querySelector('#form-login')
  if (formLogin) {
    await Validator({
      form: '#form-login',
      formGroupSelector: '.form-group',
      errorSelector: '.form-message',
      rules: [
        Validator.isRequired('#email', 'Vui lòng nhập tên tài khoản của bạn'),
        Validator.isEmail('#email'),
        Validator.isPassword('#password')
      ],
      onSubmit: async function (data) {
        const payload = {
          email: data.email,
          password: data.password
        }

        try {
          const response = await fetch(`/api/users/login`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
          })

          if (!response.ok) {
            const errorResponse = await response.json()
            updateErrorMessages(errorResponse.errors)
            throw new Error(errorResponse.message)
          }
          const result = await response.json()
          toast({
            message: result.message,
            type: 'success',
            title: 'Thành Công!!'
          })
          await new Promise((resolve) => setTimeout(resolve, 700))
          window.location.href = '/'
        } catch (error) {
          toast({
            type: 'error',
            title: 'lỗi',
            message: error.message
          })
        }
      }
    })
  }
})

const deleteButtons = document.querySelectorAll('[data-delete]')
console.log(deleteButtons)

if (deleteButtons) {
  deleteButtons.forEach((deleteButton) => {
    deleteButton.addEventListener('click', async function (e) {
      const isConfirm = await confirmButton('Bạn có chắc có muốn xóa không ?').then((result) => result)
      if (isConfirm !== 1) return

      try {
        const response = await fetch(`/api/users/delete/${deleteButton.getAttribute('data-delete')}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json'
          }
        })

        if (!response.ok) {
          const errorResponse = await response.json()
          console.log(errorResponse)
          throw new Error(errorResponse.message || 'Có lỗi xảy ra')
        }

        const result = await response.json()
        toast({
          message: result.message,
          type: 'success',
          title: 'Xóa Thành Công!!'
        })

        deleteButton.closest('tr').remove()
      } catch (e) {
        toast({
          type: 'error',
          title: 'Lỗi',
          message: e.message || 'Không thể xóa vai trò'
        })
      }
    })
  })
}

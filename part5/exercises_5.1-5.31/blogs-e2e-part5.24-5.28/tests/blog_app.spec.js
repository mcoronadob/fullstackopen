const { test, describe, beforeEach, expect } = require('@playwright/test')

describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {
    // Limpiar la base de datos y crear usuario de prueba
    await request.post('/api/testing/reset')
    await request.post('/api/users', {
      data: {
        name: 'Mauricio Coronado',
        username: 'mauricio',
        password: 'secretpassword'
      }
    })

    await page.goto('/')
  })

  test('Login form can be opened', async ({ page }) => {
    await page.getByRole('link', { name: 'login' }).click()
    
    // 1. Clic en el botón del Togglable para desplegar el formulario
    await page.getByRole('button', { name: 'login' }).click()
    
    // 2. Verificar que el campo de username ya es visible
    await expect(page.getByRole('textbox').first()).toBeVisible()
  })

  describe('Login', () => {
    test('succeeds with correct credentials', async ({ page }) => {
      await page.getByRole('link', { name: 'login' }).click()
      
      // 1. Abrir el formulario Togglable
      await page.getByRole('button', { name: 'login' }).click()
      
      // 2. Llenar los datos
      await page.getByRole('textbox').first().fill('mauricio')
      await page.getByRole('textbox').last().fill('secretpassword')
      
      // 3. Enviar el formulario
      await page.getByRole('button', { name: 'login' }).click()

      await expect(page.getByText('Mauricio Coronado logged in')).toBeVisible()
    })

    test('fails with wrong credentials', async ({ page }) => {
      await page.getByRole('link', { name: 'login' }).click()
      
      // 1. Abrir el formulario Togglable
      await page.getByRole('button', { name: 'login' }).click()
      
      // 2. Llenar credenciales incorrectas
      await page.getByRole('textbox').first().fill('mauricio')
      await page.getByRole('textbox').last().fill('wrongpassword')
      
      // 3. Enviar el formulario
      await page.getByRole('button', { name: 'login' }).click()

      const errorMessage = page.locator('.error')
      await expect(errorMessage).toHaveText('wrong credentials')
      await expect(page.getByText('Mauricio Coronado logged in')).not.toBeVisible()
    })
  })

  describe('When logged in', () => {
    beforeEach(async ({ page }) => {
      // Iniciar sesión antes de cada prueba de este bloque
      await page.goto('/login')
      
      // 1. Abrir el formulario Togglable antes de llenar
      await page.getByRole('button', { name: 'login' }).click()
      
      await page.getByRole('textbox').first().fill('mauricio')
      await page.getByRole('textbox').last().fill('secretpassword')
      await page.getByRole('button', { name: 'login' }).click()
    })

    test('a new blog can be created', async ({ page }) => {
      await page.getByRole('link', { name: 'create new blog' }).click()

      await page.getByRole('textbox', { name: 'title:' }).fill('Playwright testing with React Router')
      await page.getByRole('textbox', { name: 'author:' }).fill('Full Stack Open')
      await page.getByRole('textbox', { name: 'url:' }).fill('https://fullstackopen.com/')
      
      await page.getByRole('button', { name: 'create' }).click()

      await expect(page.getByText('Playwright testing with React Router Full Stack Open')).toBeVisible()
    })

    test('a blog can be liked', async ({ page }) => {
      await page.getByRole('link', { name: 'create new blog' }).click()
      await page.getByRole('textbox', { name: 'title:' }).fill('Blog para dar likes')
      await page.getByRole('textbox', { name: 'author:' }).fill('Autor de prueba')
      await page.getByRole('textbox', { name: 'url:' }).fill('https://test.com/')
      await page.getByRole('button', { name: 'create' }).click()

      await page.getByRole('link', { name: 'Blog para dar likes Autor de prueba' }).click()
      await page.getByRole('button', { name: 'like' }).click()

      await expect(page.getByText('1 likes')).toBeVisible()
    })

    test('the user who created the blog can delete it', async ({ page }) => {
      await page.getByRole('link', { name: 'create new blog' }).click()
      await page.getByRole('textbox', { name: 'title:' }).fill('Blog para eliminar')
      await page.getByRole('textbox', { name: 'author:' }).fill('Autor temporal')
      await page.getByRole('textbox', { name: 'url:', exact: true }).fill('https://delete.com/')
      await page.getByRole('button', { name: 'create' }).click()

      await page.getByRole('link', { name: 'Blog para eliminar Autor temporal' }).click()

      page.on('dialog', dialog => dialog.accept())
      await page.getByRole('button', { name: 'remove' }).click()

      // AHORA (apunta específicamente al link del blog):
      await expect(page.getByRole('link', { name: 'Blog para eliminar Autor temporal' })).not.toBeVisible()
    })
  })
})
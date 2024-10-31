import vine, { SimpleMessagesProvider } from '@vinejs/vine'

const schema = vine.object({
  email: vine.string().minLength(6),
  password: vine.string().minLength(6).confirmed({ confirmationField: 'password_confirm' }),
  password_confirm: vine.string().minLength(6).confirmed({ confirmationField: 'password' }),
})

vine.messagesProvider = new SimpleMessagesProvider({
  'required': 'The {{ field }} is required.',
  'minLength': 'The {{ field }} must have at least 6 length.',
  'confirmed': 'The password is not matched with Confirm Password.',
  'username.unique': 'The username is already used.',
})
export const registerUserValidator = vine.compile(schema)

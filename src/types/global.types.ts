export type LabelType = Record<string, Record<string, string>>

export type AuthType = {
  user: string
  setUser: React.Dispatch<React.SetStateAction<string>>
  rememberMe: string
  setRememberMe: React.Dispatch<React.SetStateAction<string>>
}

export enum LanguageEnum {
  en = 'en',
  ne = 'ne',
}

export type Language = keyof typeof LanguageEnum

export type LanguageType = {
  lang: LanguageEnum
  setLang: (lang: LanguageEnum) => void
}

export type AuthValues = {
  email: string
  password: string
  rememberMe?: boolean
}

export type SignUpValues = {
  firstName: string
  middleName?: string
  lastName: string
  email: string
  phoneNumber: string
  password: string
  confirmPassword: string
  termsAndCondition: boolean
}

export enum FieldType {
  List = 'List',
  Numeric = 'Numeric',
  Text = 'Text',
  YesNo = 'YesNo',
}

export type multiLanguage = Record<string, string>

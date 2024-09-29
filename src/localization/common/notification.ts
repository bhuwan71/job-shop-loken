import { LanguageEnum, type LabelType } from '../../types/global.types'

export const notificationLabels: LabelType = {
  success: {
    en: 'Success',
    ne: 'सफल भयो',
  },
  error: {
    en: 'Error',
    ne: 'त्रुटि भयो',
  },
  loginSuccessfully: {
    en: 'Login successfully',
    ne: 'सफलतापूर्वक लगइन भयो',
  },
  invalidUsernameOrPassword: {
    en: 'Invalid Username or Password',
    ne: 'अमान्य युजरनेम वा पासवर्ड',
  },
  logoutSuccessfully: {
    en: 'Logout successfully',
    ne: 'सफलतापूर्वक लगआउट भयो',
  },
  somethingWrongHappen: {
    en: 'Something wrong happen',
    ne: 'केही गलत भयो',
  },
  added: {
    en: 'added',
    ne: 'थपियो',
  },
  saved: {
    en: 'Save',
    ne: 'सेभ गरियो',
  },
  updated: {
    en: 'updated',
    ne: 'अपडेट भयो',
  },
  delete: {
    en: 'deleted',
    ne: 'हटाईयो',
  },
  officeCreated: {
    en: 'Office Updated',
    ne: 'कार्यालय सिर्जना गरियो',
  },
  create: {
    en: 'Created',
    ne: 'सिर्जना गरियो',
  },
  imported: {
    en: 'Imported',
    ne: 'आयात गरियो',
  },
  agricultureCategory: {
    en: 'Agriculture Category',
    ne: 'कृषि श्रेणी',
  },
}

const messages: Record<LanguageEnum, (message: string, type: string) => string> = {
  en: (message: string, type: string) => `${message} ${type} successfully`,
  ne: (message: string, type: string) => `${message} सफलतापूर्वक ${type}`,
}

export const generateMessage = (message: string, type: string, lang: LanguageEnum) => messages[lang](message, type)

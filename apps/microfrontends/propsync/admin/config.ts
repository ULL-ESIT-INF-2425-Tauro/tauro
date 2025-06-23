import { AdminConfig } from '@keystone-6/core/types'
import { CustomNavigation } from './components/customNavigation'

export const components: AdminConfig['components'] = {
  Navigation: CustomNavigation,
}

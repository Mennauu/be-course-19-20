// Components
import FormLogin from '@components/form-login/form-login'
import FormRegister from '@components/form-registration/form-registration'
import FormSettings from '@components/form-settings/form-settings'
// Utilities
import moduleInit from '@utilities/module-init'

// Init
moduleInit.sync('[js-hook-form-login]', FormLogin)
moduleInit.sync('[js-hook-form-register]', FormRegister)
moduleInit.sync('[js-hook-form-settings]', FormSettings)

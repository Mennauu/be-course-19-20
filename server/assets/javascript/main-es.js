// Components
import FormLogin from '@components/form-login/form-login'
import FormRegister from '@components/form-registration/form-registration'
// Utilities
import moduleInit from '@utilities/module-init'

// Init
moduleInit.sync('[js-hook-form-login]', FormLogin)
moduleInit.sync('[js-hook-form-register]', FormRegister)

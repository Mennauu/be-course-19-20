// Components
import FormUpload from '@components/form-elements/form-upload/form-upload'
import FormLogin from '@components/form-login/form-login'
import FormRegister from '@components/form-registration/form-registration'
import FormSettings from '@components/form-settings/form-settings'
import Match from '@components/match/match'
// Utilities
import moduleInit from '@utilities/module-init'

// Init
moduleInit.sync('[js-hook-form-login]', FormLogin)
moduleInit.sync('[js-hook-form-register]', FormRegister)
moduleInit.sync('[js-hook-form-settings]', FormSettings)
moduleInit.sync('[js-hook-input-file]', FormUpload)
moduleInit.sync('[js-hook-form-match]', Match)

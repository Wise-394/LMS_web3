import Button from '../components/common/Button.vue'
import Card from '../components/common/Card.vue'
import Modal from '../components/common/Modal.vue'
import Toast from '../components/common/Toast.vue'
import Loading from '../components/common/Loading.vue'

export default {
  install: (app) => {
    // Register components globally
    app.component('BaseButton', Button)
    app.component('BaseCard', Card)
    app.component('BaseModal', Modal)
    app.component('BaseLoading', Loading)

    // Create a global toast instance
    const ToastConstructor = app.component('BaseToast', Toast)
    const toast = new ToastConstructor({
      el: document.createElement('div')
    })
    document.body.appendChild(toast.$el)

    // Add toast to global properties
    app.config.globalProperties.$toast = {
      show: toast.show,
      success: toast.success,
      error: toast.error,
      warning: toast.warning,
      info: toast.info
    }
  }
} 
import PageTools from '@/components/PageTools'
import UploadExcel from '@/components/uploadexcel'
const components = [PageTools,UploadExcel]
export default {
  install (Vue) {
    components.forEach(component => {
      Vue.component(component.name, component)
    })
  }
}
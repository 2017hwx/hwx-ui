import "./styles/main.scss";
import Button from "./components/Button";
import Icon from "./components/Icon"


const hwx_ui = [
    Button,
    Icon
]

const install = function (Vue) {
    if (install.installed) return

    hwx_ui.map(component => Vue.component(component.name, component))
}

if (typeof window !== undefined && window.Vue) {
    install(window.Vue)
}

export default { install, ...hwx_ui }
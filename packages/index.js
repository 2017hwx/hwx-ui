import "./styles/main.scss";
import Button from "./components/Button";


const hwx_ui = {
    Button,
    hButton: Button,
}
const install = function (Vue, opts = {}) {
    Object.keys(hwx_ui).forEach((key) => {
        Vue.component(key, hwx_ui[key])
    })
    if (typeof window !== undefined && window.Vue) {
        install(window.Vue)
    }
}

module.exports = Object.assign(hwx_ui, { install })
import {ElMessageBox} from "element-plus";
import {h, ref} from 'vue'


const time = ref(3)

export function hint(text: string) {

    time.value = 3

    ElMessageBox({
        dangerouslyUseHTMLString: true,
        message: h('div', {class: 'flex flex-col justify-center items-center'}, [
            h('img', {src: '/Subtract.png'}, ''),
            h('span', {class: 'm-3 mb-4'}, text),
            h('button', {
                style: 'width:100px;height:30px;border-radius:5px; background-color:#2b9cfa;color:#fff;font-size:16px;padding: 5px;  ',

            }, [
                h('span', {
                    style: '',
                    id: 'time-navigate',
                    onVnodeMounted() {
// @ts-ignore
                        let target: Element = document.querySelector('#time-navigate')
                        target.addEventListener('click', function () {
                            ElMessageBox.close()
                        })
                        let timer = setInterval(() => {
                            if (time.value > 0) {
                                time.value -= 1
                                target.innerHTML = `返回(${time.value})s`
                            } else {
                                clearInterval(timer)
                                ElMessageBox.close();
                            }
                        }, 1000)
                    }
                }, '返回(3)s')
            ])
        ]),
        showConfirmButton: false,
        showCancelButton: false,
        center: true,
    })
}
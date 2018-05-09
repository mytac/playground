function render(el) {
    const element = $(el)
    const imgChild=`<div class="img-wrapper" >
            <div class="clear-img">x</div>
            <img src="" width="100px" height="100px"/>
        </div>`
    return {
        init() {
            const template = `
            <div class="img-group">
                ${imgChild}
             </div>`
            const btnTemplate=`<input type="file" name="upload" style="display: block;"/>
    <input type="button" name="add" style="display: block;" value="add"/>`
            element.append(template,btnTemplate)
        },
        imgChild() {
            // return
        }
    }
}

function bindEvents() {


}

function request() {

}

function pikiUploader(options) {
    try{
        if(!options){
            throw 'no options'
        }
        const {el}=options
        if(!el) throw 'no required params'
        const renderBody=render(el)
        renderBody.init()
        bindEvents()
        request()

    }catch(e){
        console.error(e)
    }
}

window.pikiUploader = pikiUploader
function render(el) {
    const element = $(el)
    return {
        imgUrl(imgUrl) {
            return `<div class="img-wrapper" >
            <div class="clear-img">x</div>
            <img src="${imgUrl}" width="100px" height="100px"/>
        </div>`
        },
        init() {
            const template = `<div class="piki"><div class="img-group">
                <p class="piki-tips">drop file to upload.</p>
                <div class="piki-default-box">+</div>
    
            </div><div class="piki-upload"><span>Pick File</span><input type="file" name="upload" class="piki-upload-btn" id="pikiUpload"/></div></div>`
            element.append(template)
        },
        addImgChild(url) {
            const imgTemplate = this.imgUrl(url)
            $('.img-group').append(imgTemplate)
        }
    }
}

function bindEvents(el, postUrl) {

    /*事件委托*/
    function delegateEvent(tag, func, type = 'click') {
        return $(el).on(type, tag, func)
    }

    // 清除图片
    delegateEvent('.clear-img', (e) => {
        const el = $(e.currentTarget)
        el.parent().hide()
    })

    // 上传按钮
    delegateEvent('#pikiUpload', (e) => {
        const el = e.currentTarget
        const file = el.files[0]
        // 检查类型
        if (file.type.indexOf('image') < 0) {
            alert('请上传图片类型!!')
            el.value = ''
            return;
        }

        const formData = new FormData();
        formData.append('file', file);

        request(postUrl, formData).then((data) => {
                render().addImgChild(data)
            },
            (err) => {
                console.log('err', err)
            })


    }, 'change')

}


function request(postUrl, fileUrl) {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: postUrl,
            crossDomain: true,
            data: fileUrl,
            dataType: 'json',
            method: 'POST',
            contentType: false,
            processData: false,
        }).done((data) => resolve(data.body)).fail((e) => reject(e));
    })

}

function pikiUploader(options) {
    try {
        if (!options) throw 'no options'
        const {el, postUrl} = options
        if (!el || !postUrl) throw 'no required params'

        const renderBody = render(el)
        renderBody.init()
        bindEvents(el, postUrl)

    } catch (e) {
        console.error(e)
    }
}

window.pikiUploader = pikiUploader
document.addEventListener('scroll', () => {
    const header = document.getElementById('header-main')
    const headerLinksDiv = document.getElementById('navbarNav')
    const nav = document.getElementById('nav')
    const pageTitle = document.getElementById('page2-title')
    const mainText = document.getElementById('page2-main-text')
    if (window.location.href.includes('index')){
        if(scrollY < 100){
            headerLinksDiv.innerHTML = ''
            header.classList.add('nav-norm')
            header.classList.remove('nav-anim')
        } else if(scrollY >= 100 && headerLinksDiv.innerHTML.includes('ul') == false){
            header.classList.remove('nav-norm')
            header.classList.add('nav-anim')
            setTimeout(() => {
                if(scrollY >= 100){
                    headerLinksDiv.innerHTML = `
                    <ul class="navbar-nav ms-auto">
                        <li class="nav-item mx-4 my-lg-0 my-2">
                            <a class="link" href="cadastro.html">Cadastro</a>
                        </li>
                        <li class="nav-item mx-4 my-lg-0 my-2">
                            <a class="link" href="consulta.html">Consulta</a>
                        </li>
                    </ul>`
                }
            }, 1200)
        }
        if (scrollY >= 800){
            header.classList.add('nav-anim2')
            header.classList.add('col-12')
            nav.classList.add('col-10')
        } else if (scrollY <= 799){
            header.classList.remove('nav-anim2')
            header.classList.remove('col-12')
        }
        if (scrollY > 250){
            pageTitle.classList.add('active')
        }
        if (scrollY > 400){
            mainText.classList.add('main-text-active')
        }
    }
})

class AnimationEvents{
    constructor() {
        // Page 2 icons //
        this.stepsImage = document.getElementById('steps-img')
        this.mouseIcon = document.getElementById('mouse')
        this.pencilIcon = document.getElementById('pencil')
        this.documentIcon = document.getElementById('document')
        // Page 3 icons //
        this.globeIcon = document.getElementById('globe')
        this.pigIcon = document.getElementById('pig')
        this.historyIcon = document.getElementById('history')
    }

    clickAnimate() {
        const icons = [this.mouseIcon, this.pencilIcon, this.documentIcon]
        icons.forEach(icon => {
            icon.addEventListener('click', () => {
                this.imageChange(icon)
            })
        })
    }

    imageChange(clicado) {
        const icons = [this.mouseIcon, this.pencilIcon, this.documentIcon]
        var image = this.stepsImage
        try{
            var button = clicado.parentElement
            icons.forEach(icon => {
                icon.parentElement.classList.remove('btn-enabled')
                icon.parentElement.classList.add('btn-disabled')
            })
        } catch (e){
            //
        }
        switch(clicado){
            case this.mouseIcon:
                this.mouseIcon.src = 'assets/icons/mouse-anim.apng'
                this.pencilIcon.src = 'assets/icons/pencil-img.png'
                this.documentIcon.src = 'assets/icons/history-img.png'
                image.src = 'assets/step1.png'
                clicado.parentElement.classList.add('btn-enabled')
                document.getElementById('progress-bar-1').classList.remove('bar-enabled')
                document.getElementById('progress-bar-2').classList.remove('bar-enabled')
                break
            case this.pencilIcon:
                this.mouseIcon.parentElement.classList.add('btn-enabled')
                this.mouseIcon.src = 'assets/icons/mouse-img.png'
                this.pencilIcon.src = 'assets/icons/pencil-anim.apng'
                this.documentIcon.src = 'assets/icons/history-img.png'
                image.src = 'assets/step2.png'
                clicado.parentElement.classList.add('btn-enabled')
                document.getElementById('progress-bar-1').classList.add('bar-enabled')
                document.getElementById('progress-bar-2').classList.remove('bar-enabled')
                break
            case this.documentIcon:
                this.pencilIcon.parentElement.classList.add('btn-enabled')
                this.pencilIcon.src = 'assets/icons/pencil-img.png'
                this.mouseIcon.parentElement.classList.add('btn-enabled')
                this.mouseIcon.src = 'assets/icons/mouse-img.png'
                this.documentIcon.src = 'assets/icons/history-anim.apng'
                image.src = 'assets/step3.png'
                clicado.parentElement.classList.add('btn-enabled')
                document.getElementById('progress-bar-1').classList.add('bar-enabled')
                document.getElementById('progress-bar-2').classList.add('bar-enabled')
                break
        }
    }

    hoverAnimate() {
        const page3icons = [this.globeIcon, this.pigIcon, this.historyIcon]
        page3icons.forEach(icon => {
            icon.parentElement.parentElement.addEventListener('mouseenter', () => {
                switch(icon){
                    case this.globeIcon:
                        this.globeIcon.src = 'assets/icons/globe-anim.apng'
                        console.log(this.globeIcon.parentElement.parentElement)
                        break
                    case this.pigIcon:
                        this.pigIcon.src = 'assets/icons/pig-anim.apng'
                        break
                    case this.historyIcon:
                        this.historyIcon.src = 'assets/icons/history-anim.apng'
                        break
                }
            })
        })
        page3icons.forEach(icon => {
            icon.parentElement.parentElement.addEventListener('mouseleave', () => {
                switch(icon){
                    case this.globeIcon:
                        this.globeIcon.src = 'assets/icons/globe-img.png'
                        break
                    case this.pigIcon:
                        this.pigIcon.src = 'assets/icons/pig-img.png'
                        break
                    case this.historyIcon:
                        this.historyIcon.src = 'assets/icons/history-img.png'
                        break
                }
            })
        })
    }

    main(){
        this.clickAnimate()
        this.hoverAnimate()
        this.imageChange()
    }
}
var iconsAnim = new AnimationEvents
if(window.location.href.includes('index') == true){
    iconsAnim.main()
    var backTopBtn = document.getElementById('back-arrow')
    window.addEventListener('wheel', (e) => { 
        if(e.deltaY < 0 && scrollY > 100){
            backTopBtn.classList.add('shown')
            backTopBtn.classList.toggle('transition')
        } else {
            backTopBtn.classList.remove('shown')
        }
    }) 
    
    window.addEventListener('scrollend', (e) => {
        if (scrollY < 100){
            backTopBtn.classList.remove('shown')
        }
    })
        backTopBtn.addEventListener('click', () => {
        window.scrollTo(0, 0)
    })

    backTopBtn.addEventListener('mouseenter', () => {
    backTopBtn.firstElementChild.classList.add('back-top-hover')
    })

    backTopBtn.addEventListener('mouseleave', () => {
        backTopBtn.firstElementChild.classList.remove('back-top-hover')
    })
}
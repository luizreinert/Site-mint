class AnimationEvents{
    constructor() {
        // Page 2 icons //
        this.stepsVideo = document.getElementById('steps-video')
        this.mouseIcon = document.getElementById('mouse')
        this.pencilIcon = document.getElementById('pencil')
        this.documentIcon = document.getElementById('document')
        // Page 3 icons //
        this.globeIcon = document.getElementById('globe')
        this.pigIcon = document.getElementById('pig')
        this.historyIcon = document.getElementById('history')
    }

    headerMobile() {
        const header = document.getElementById('header-main')
        const headerLinksDiv = document.getElementById('navbarNav')
        window.addEventListener('load', () => {
            if (window.innerWidth < 998){
                header.classList.add('mobile')
                header.classList.remove('nav-norm')
                headerLinksDiv.innerHTML = `
                <ul class="navbar-nav ms-auto">
                    <li class="nav-item mx-4 my-lg-0 mt-3">
                        <a class="link" href="cadastro.html">Registrar despesas</a>
                    </li>
                    <li class="nav-item mx-4 my-lg-0 mt-3 mb-3">
                        <a class="link" href="consulta.html">Consulta</a>
                    </li>
                </ul>`
            }
        })
        const mdDevice = window.matchMedia('(max-width: 998px)')
        mdDevice.addEventListener('resize', () => {
            if (mdDevice.matches){
                header.classList.add('mobile')
                header.classList.remove('nav-norm')
            } else {
                header.classList.remove('mobile')
                header.classList.add('nav-norm')
            }
        })
    }

    headerChange () {
        const scrollTypes = ['scroll', 'touchstart']
        scrollTypes.forEach(evento => {
            document.addEventListener(evento, () => {
                const header = document.getElementById('header-main')
                const headerLinksDiv = document.getElementById('navbarNav')
                const nav = document.getElementById('nav')
                if(window.innerWidth > 998){
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
                }
            })    
        })
    }

    scrollAnimations(){
        const pageTitle = document.getElementById('page2-title')
        const mainText = document.getElementById('page2-main-text')
        const page3Bg = document.getElementById('page3-bg')
        const step1 = document.getElementById('steps-1')
        const step1Btn = document.getElementById('step1-btn')
        const step1Bar = document.getElementById('progress-bar-1')
        const step2 = document.getElementById('steps-2')
        const step2Btn = document.getElementById('step2-btn')
        const step2Bar = document.getElementById('progress-bar-2')
        const step3 = document.getElementById('steps-3')
        const step3Btn = document.getElementById('step3-btn')
        const title1Word = document.getElementById('title-w-1')
        const page1Subheader = document.getElementById('page1-subheader')
        const title2Word = document.getElementById('title-w-2')
        const title3Word = document.getElementById('title-w-3')
        const page1Subtitle = document.getElementById('page1-subtitle')
        const page3Subtitle = document.getElementById('page3-subtitle')
        const feature1 = document.getElementById('feature-1')
        const feature2 = document.getElementById('feature-2')
        const feature3 = document.getElementById('feature-3')
        const scrollTypes = ['scroll', 'touchstart']
        scrollTypes.forEach(evento => {
            document.addEventListener(evento, () => {
                console.log(scrollY)
                if (scrollY > 250){
                    pageTitle.classList.add('active')
                }
                if (scrollY > 400){
                    mainText.classList.add('main-text-active')
                }
                if (scrollY > 800){
                    page1Subheader.classList.add('subheader-shown')
                }
                if (scrollY > 800){
                    page1Subtitle.classList.add('page1-subtitle-shown')
                    page3Bg.classList.add('steps-shown')
                }
                if (scrollY > 1100){
                    step1.classList.add('steps-text-active')
                    step1Bar.classList.add('bar-shown')
                    step1Btn.classList.add('btn-shown')
                    this.stepsVideo.classList.add('steps-video-shown')
                }
                if (scrollY > 1200){
                    step2.classList.add('steps-text-active')
                    step2Bar.classList.add('bar-shown')
                    step2Btn.classList.add('btn-shown')
                }
                if (scrollY > 1300){
                    step3.classList.add('steps-text-active')
                    step3Btn.classList.add('btn-shown')
                }
                if (scrollY > 1850){
                    title1Word.classList.add('title-w-shown')
                    title2Word.classList.add('title-w-shown')
                    title3Word.classList.add('title-w-shown')
                    page3Subtitle.classList.add('subtitle-shown')
                }
                if (scrollY > 2100){
                    feature1.classList.add('feature-shown')
                    feature2.classList.add('feature-shown')
                    feature3.classList.add('feature-shown')
                }
            })
        })
    }

    clickAnimate() {
        const icons = [this.mouseIcon, this.pencilIcon, this.documentIcon]
        icons.forEach(icon => {
            icon.addEventListener('click', () => {
                this.videoChange(icon)
            })
        })
    }

    videoChange(clicado) {
        const icons = [this.pencilIcon, this.documentIcon]
        var video = this.stepsVideo
        try{
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
                video.src = 'assets/Step1.mp4'
                clicado.parentElement.classList.add('btn-enabled')
                document.getElementById('progress-bar-1').classList.remove('bar-enabled')
                document.getElementById('progress-bar-2').classList.remove('bar-enabled')
                break
            case this.pencilIcon:
                this.mouseIcon.parentElement.classList.add('btn-enabled')
                this.mouseIcon.src = 'assets/icons/mouse-img.png'
                this.pencilIcon.src = 'assets/icons/pencil-anim.apng'
                this.documentIcon.src = 'assets/icons/history-img.png'
                video.src = 'assets/Step2.mp4'
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
                video.src = 'assets/Step3.mp4'
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
        this.videoChange()
        this.headerMobile()
        this.scrollAnimations()
        this.headerChange()
    }
}
var iconsAnim = new AnimationEvents
iconsAnim.main()
const backTopBtn = document.getElementById('back-arrow')
const mainScrollBtn = document.getElementById('main-scroll-btn')
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

mainScrollBtn.addEventListener('click', () => {
    window.scrollTo(0, 900)
})

class Main{
    constructor() {
        this.dia = document.getElementById('dia')
        this.mes = document.getElementById('mes')
        this.ano = document.getElementById('ano')
        this.tipoDespesa = document.getElementById('tipo-despesa')
        this.valorDespesa = document.getElementById('valor-despesa')
        this.descDespesa = document.getElementById('desc-despesa')
        this.botaoAddDespesa = document.getElementById('add-despesa')
        this.carouselContainer = document.getElementById('carousel-container')
        this.carouselBtn1 = document.getElementById('carousel-1')
        this.carouselBtn2 = document.getElementById('carousel-2')
        this.carouselBtn3 = document.getElementById('carousel-3')
        this.formInputs = [this.dia, this.mes, this.ano, this.tipoDespesa, this.descDespesa, this.valorDespesa]
    }

    start(){
        this.inputErrors()
        this.filterYears()
        this.typeFix(this.dia)
        this.botaoAddDespesa.addEventListener('click', () => {
            this.checkInfos()
        })
        this.spanAnim()
    }
    
    carouselChange(){
        const carouselBtns = [this.carouselBtn1, this.carouselBtn2, this.carouselBtn3]
        carouselBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                var carouselTitle = document.getElementById('carousel-title')
                var carouselText = document.getElementById('carousel-text')
                carouselBtns.forEach(botao => {
                    botao.classList.remove('btn-active')
                })
                switch(btn){
                    case this.carouselBtn1:
                        this.carouselContainer.scroll(0, 0)
                        this.carouselBtn1.classList.add('btn-active')
                        carouselTitle.innerText = "Conquiste seus objetivos!"
                        carouselText.innerText = "Cada passo conta. Comece hoje e chegue mais perto de onde você quer estar."
                       break
                    case this.carouselBtn2:
                        this.carouselContainer.scroll(this.carouselContainer.clientWidth, 0)
                        this.carouselBtn2.classList.add('btn-active')
                        carouselTitle.innerText = "Faça suas escolhas valerem"
                        carouselText.innerText = "Pequenos hábitos diários fazem toda a diferença no longo prazo!"
                        break
                    case this.carouselBtn3:
                        this.carouselContainer.scroll(10000, 0)
                        this.carouselBtn3.classList.add('btn-active')
                        carouselTitle.innerText = "Simplifique sua vida"
                        carouselText.innerText = "Organização é o caminho para mais tranquilidade e menos preocupações."
                        break
                }
            })
        })
    }

    spanAnim(){
        const registerInputs = document.querySelectorAll(".input-div")
        registerInputs.forEach((input) => {
            const inputSpan = input.firstElementChild
            const formInput = input.lastElementChild
            formInput.addEventListener('focus', () => {
                formInput.value != '' ? true : inputSpan.classList.toggle('span-focused') 
            })
            formInput.addEventListener('blur', () => {
                formInput.value == '' ? inputSpan.classList.remove('span-focused'): inputSpan.classList.add('span-focused')
            })
        })
    }

    inputErrors(){
        const registerInputs = document.querySelectorAll(".input-div")
        registerInputs.forEach((input) => {
            const inputSpan = input.firstElementChild
            const formInput = input.lastElementChild
            formInput.addEventListener('blur', () => {
                if (formInput.value == ""){
                    this.formCallback(formInput, 'reset')
                } else {
                    this.checkValue(formInput)
                }
            })
        })
    }

    checkValue(targetInput){
        switch (targetInput.id){
            case 'dia':
                if (isFinite(targetInput.value) == true && targetInput.value > 0 && targetInput.value <= 31){
                    this.formCallback(targetInput, true)
                } else {
                    this.formCallback(targetInput, false)
                }
                break
            case 'mes':
                if (targetInput.value != ''){
                    this.formCallback(targetInput, true)
                }
                break
            case 'ano':
                if (targetInput.value != ''){
                    this.formCallback(targetInput, true)
                }
                break
            case 'tipo-despesa':
                if (targetInput.value != ''){
                    this.formCallback(targetInput, true)
                }
                break
            case 'valor-despesa':
                if (targetInput.value != '' && targetInput.value > 0){
                    this.formCallback(targetInput, true)
                } else {
                    this.formCallback(targetInput, false)
                }
                break
            case 'desc-despesa':
                if (targetInput.value != ''){
                    this.formCallback(targetInput, true)
                }
                break
        }
    }

    formCallback(input, isValid){
        switch (isValid){
            case 'reset':
                input.classList.remove('valid-value')
                input.classList.remove('invalid-value')
                input.previousElementSibling.classList.remove('invalid')
                input.previousElementSibling.classList.remove('span-focused')
                input.previousElementSibling.classList.remove('valid')
                break
            case true:
                if (input.classList.contains('invalid-value') && input.previousElementSibling.classList.contains('invalid')){
                    input.classList.remove('invalid-value')
                    input.previousElementSibling.classList.remove('invalid')
                }
                input.classList.add('valid-value')
                break
            case false:
                if (input.classList.contains('valid-value')){
                    input.classList.remove('valid-value')
                }
                input.classList.add('invalid-value')
                input.previousElementSibling.classList.add('invalid')
        }
    }

    typeFix(dia){
        dia.addEventListener('keypress', (e) => {
            if (dia.value < 1 && dia.value != "") {
                dia.value = 1
            } if ([...dia.value].length == 2 && e.key != "Backspace"){
                e.preventDefault()
            } if ([...dia.value].length == 1 && [...dia.value][0] > 3 && e.key != "Backspace"){
                e.preventDefault()
            } if ([...dia.value].length == 1 && [...dia.value][0] == 3 && e.key != [0] && e.key != [1] ){
                e.preventDefault()
            } if (e.key == '-' || isFinite(e.key) == false){
                e.preventDefault()
            }
        }, false)
    }

    checkInfos(){
        var formErrors = []
        if (this.dia.value < 1 || this.dia.value > 31){
            formErrors.push(this.dia)
        } 
        if (this.mes.value === "Mês" || this.mes.value === ""){
            formErrors.push(this.mes)
        }
        if (this.ano.value === ""){
            formErrors.push(this.ano)
        }
        if (this.tipoDespesa.value === "Tipo" || this.tipoDespesa.value === ""){
            formErrors.push(this.tipoDespesa)
        } 
        if (this.valorDespesa.value < 1 || this.valorDespesa.value == '' || this.valorDespesa.value == undefined ){
            formErrors.push(this.valorDespesa)
        } 
        if (formErrors.length == 0){
            this.lançarDespesa(this.dia.value, this.mes.value, this.ano.value, this.tipoDespesa.value, this.descDespesa.value, this.valorDespesa.value)
            this.alert('cadastro')
            this.formInputs.forEach((el) => {
                this.formCallback(el, 'reset')
                el.value = ""
            }) 
        }
        formErrors.forEach((campo) => {
            this.errorHandling(campo)
        })
    } 

    
    lançarDespesa(dia, mes, ano, tipo, desc, valor){
        if (desc == '') {
            desc = 'Sem descrição';
        }
        var randomID = Math.random().toString().slice(2)
        switch ([...dia].length){
            case 1:
                dia = `0${dia}`
                break
        }
        var novoArray = {
                dia: dia,
                mes: mes,
                ano: ano,
                tipo: tipo,
                desc: desc,
                valor: valor,
                id: randomID
        }
        localStorage.setItem((randomID), JSON.stringify(novoArray))
    }


    errorHandling(input){
        var campo = input.parentElement.nextElementSibling
        switch (input){
            case this.dia:
                campo.innerText = '• Dia inválido'
                break
            case this.mes:
                campo.innerText = '• Selecione um mês'
                break
            case this.ano:
                campo.innerText = '• Selecione um ano'
                break
            case this.tipoDespesa:
                campo.innerText = '• Selecione o tipo de despesa'
                break
            case this.valorDespesa:
                campo.innerText = '• Digite o valor da despesa'
                break
        }
        input.classList.add('error')
        input.addEventListener('click', () => {
            input.classList.remove('error')
            campo.innerText = ''
        })
    }

    alert(alerta, i){
        var alertDiv = document.getElementById('alert-div')
        switch (alerta){
            case 'cadastro':
                alertDiv.innerHTML =
                `<div class="d-flex align-content-center w-100 justify-content-center">
                    <div class="d-flex flex-column flex-sm-row column-gap-4 justify-content-center align-items-center">
                        <ion-icon class="checkmark-icon" name="checkmark-circle"></ion-icon>
                        <span class="alert-text ms-2">Despesa cadastrada com sucesso!</span>
                    </div>
                </div>`
                alertDiv.classList.toggle('active-cadastro')
                setTimeout(() => {
                    alertDiv.classList.toggle('active-cadastro')
                    alertDiv.innerHTML = ''
                }, 2000)
                break
        }
    }

    filterYears(){
        for (let i = 2025; i > 2010; i--){
            const registerInputYear = document.getElementById('ano')
            const filterInputYear = document.getElementById('filter-ano')
            var year = document.createElement("option")
            year.innerHTML = i
            registerInputYear.appendChild(year)
        }
    }

}

var app = new Main()
app.start()

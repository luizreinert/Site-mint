class Main{
    constructor() {
        this.dia = document.getElementById('dia')
        this.mes = document.getElementById('mes')
        this.ano = document.getElementById('ano')
        this.tipoDespesa = document.getElementById('tipo-despesa')
        this.valorDespesa = document.getElementById('valor-despesa')
        this.descDespesa = document.getElementById('desc-despesa')
        this.botaoAddDespesa = document.getElementById('add-despesa')
        this.janelaErros = document.getElementById('errorWindow')
        this.filterDia = document.getElementById('filter-dia')
        this.filterMes = document.getElementById('filter-mes')
        this.filterAno = document.getElementById('filter-ano')
        this.filterType = document.getElementById('filter-type')
        this.filterDesc = document.getElementById('filter-desc')
        this.filterValue = document.getElementById('filter-valor')
        this.botaoFilter = document.getElementById('filter')
        this.table = document.getElementById('table-despesas')
        this.formInputs = [this.dia, this.mes, this.ano, this.tipoDespesa, this.descDespesa, this.valorDespesa]
        this.filterInputs = [this.filterDia, this.filterMes, this.filterAno, this.filterType, this.filterDesc, this.filterValue]
    }

    start(){
        this.inputErrors()
        if (window.location.href.includes('cadastro')){
            this.filterYears('cadastro')
            this.typeFix(this.dia)
            this.botaoAddDespesa.addEventListener('click', () => {
                this.checkInfos()
            })
            this.spanAnim()
        } if (window.location.href.includes('consulta')){
            this.typeFix(this.filterDia, this.filterAno)
            this.recuperarDados()
            console.log(localStorage.localStorage)
            this.filterYears('consulta')
            this.filterSearch()
        }
    }

    spanAnim(){
        const registerInputs = document.querySelectorAll(".input-div")
        registerInputs.forEach((input) => {
            const inputSpan = input.firstElementChild
            const formInput = input.lastElementChild
            formInput.addEventListener('focus', () => {
                if(formInput.value != ''){
                    //
                } else {
                    inputSpan.classList.toggle('span-focused')
                }
            })
            formInput.addEventListener('blur', () => {
                if(formInput.value == ''){
                    inputSpan.classList.remove('span-focused')
                } else {
                    inputSpan.classList.add('span-focused')
                }
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

    formFix(){
        
    }

    checkValue(targetInput){
        switch (targetInput.id){
            case 'dia':
                if (isFinite(targetInput.value) == true){
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

        }
    }

    formCallback(input, isValid){
        switch (isValid){
            case 'reset':
                input.classList.remove('valid-value')
                input.classList.remove('invalid-value')
                break
            case true:
                input.classList.add('valid-value')
                break
            case false:
                input.classList.add('invalid-value')
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
        try{
            this.janelaErros.innerHTML = ''
        } catch (e) {
            //
        }
        try{
            if (this.dia.value < 1 || this.dia.value > 31){
                this.errorHandling('• Dia inválido', this.dia)
                throw new Error
            } 
            if (this.mes.value === "Mês"){
                this.errorHandling('• Selecione um mês', this.mes)
                throw new Error
            }
            if (this.ano.value < 1970 || this.ano.value > 2030){
                this.errorHandling('• Ano inválido', this.ano)
                throw new Error
            }
            if (this.tipoDespesa.value === "Tipo"){
                this.errorHandling('• Selecione o tipo de despesa', this.tipoDespesa)
                throw new Error
            } if (this.valorDespesa.value < 1 || this.valorDespesa.value == '' || this.valorDespesa.value == undefined ){
                this.errorHandling('• Digite o valor da despesa', this.valorDespesa)
                throw new Error
            } if (this.descDespesa.value == ''){
                this.descDespesa.value = 'Sem descrição'
            }
            this.lançarDespesa(this.dia.value, this.mes.value, this.ano.value, this.tipoDespesa.value, this.descDespesa.value, this.valorDespesa.value)
            this.alert('cadastro')
            this.formInputs.forEach((el) => {
                switch (el){
                    case this.mes:
                        el.value = 'Mês'
                        break
                    case this.tipoDespesa:
                        el.value = 'Tipo'
                        break
                    default:
                        el.value = ''
                        break
                }
            }) 
        } catch (e) {
            console.log(e)
        } 
    } 

    alert(alerta, i){
        var alertDiv = document.getElementById('alert-div')
        switch (alerta){
            case 'cadastro':
                alertDiv.innerHTML =
                `<div class="d-flex align-content-center w-100 justify-content-around">
                    <div class="d-flex align-self-center">
                        <ion-icon class="checkmark-icon " name="checkmark-circle"></ion-icon>
                        <span class="alert-text ms-2">Despesa cadastrada com sucesso!</span>
                    </div>
                </div>`
                alertDiv.classList.toggle('active-cadastro')
                setTimeout(() => {
                    alertDiv.classList.toggle('active-cadastro')
                    alertDiv.innerHTML = ''
                }, 2000)
                break
            case 'remove-data':
                alertDiv.innerHTML +=
                `<div class="d-flex flex-column row-gap-4 align-content-center justify-self-center p-4 w-100">
                    <div class="d-flex flex-column row-gap-2 align-self-start align-items-center w-100 justify-content-center">
                        <ion-icon class="warning-icon" name="warning"></ion-icon>
                        <span class="alert-text ms-2">Deseja remover a despesa?</span>
                    </div>
                    <div class="d-flex w-100 justify-content-evenly action-btns">
                        <button id="cancelar">Cancelar</button>
                        <button id="confirmar">Confirmar</button>
                    </div>
                </div>`
                alertDiv.classList.toggle('active-remove-data')
                var removeDataBtnsNode = document.querySelectorAll(".remove-data-btn")
                const cancelBtn = document.getElementById('cancelar')
                cancelBtn.addEventListener('click', () => {
                    removeDataBtnsNode.forEach((btn) => {
                        btn.disabled = true
                    })
                    alertDiv.classList.toggle('alert-out')
                    setTimeout(() => {
                        alertDiv.classList.toggle('active-remove-data')
                        alertDiv.classList.toggle('alert-out')
                        alertDiv.innerHTML = ''
                        this.alert('no-data')
                        removeDataBtnsNode.forEach((btn) => {
                            btn.disabled = false
                        })
                    }, 800)
                })
                const confirmBtn = document.getElementById('confirmar') 
                confirmBtn.addEventListener('click', () => {
                    removeDataBtnsNode.forEach((btn) => {
                        btn.disabled = true
                    })
                    document.getElementById(`row-${i}`).remove()
                    localStorage.removeItem(i)
                    alertDiv.classList.toggle('alert-out')
                    setTimeout(() => {
                        alertDiv.classList.toggle('active-remove-data')
                        alertDiv.innerHTML = ''
                        this.alert('no-data')
                        removeDataBtnsNode.forEach((btn) => {
                            btn.disabled = false
                        })
                        alertDiv.classList.toggle('alert-out')
                    }, 800)
                })
                break
            case 'no-data':
                if (localStorage.length == 0){
                    this.table.innerHTML += `
                    <tr>
                        <td class="align-top" colspan="100%" rowspan="100%">
                            <div class="d-flex flex-column row-gap-4 align-content-center justify-self-center p-4 w-100">
                                <div class="d-flex flex-column text-center row-gap-2 align-self-start align-items-center w-100 justify-content-center">
                                    <ion-icon class="error-icon" name="alert-circle"></ion-icon>
                                    <span class="error-text display-6 ms-2">Nada por aqui ainda!</span>
                                </div>
                                <div class="d-block w-100 text-center">
                                    <a class="error-anchor" href="index.html">Clique aqui</a>
                                    <span class="error-span">para adicionar novas despesas.</span>
                                </div>
                            </div>
                        </td>
                    </tr>
                    `
                }
                break   
                case 'no-data-2':
                    if (localStorage.length > 0){
                        this.table.innerHTML += `
                        <tr>
                            <td class="align-top" colspan="100%" rowspan="100%">
                                <div class="d-flex flex-column row-gap-4 align-content-center justify-self-center p-4 w-100">
                                    <div class="d-flex flex-column text-center row-gap-2 align-self-start align-items-center w-100 justify-content-center">
                                        <ion-icon class="error-icon" name="alert-circle"></ion-icon>
                                        <span class="error-text display-6 ms-2">Ops! Nada encontrado com esses filtros</span>
                                    </div>
                                    <div class="d-block w-100 text-center">
                                        <span class="error-span">Que tal ajustar um pouco e tentar de novo?</span>
                                    </div>
                                </div>
                            </td>
                        </tr>
                        `
                    }
                    break 
        }
    }

    lançarDespesa(dia, mes, ano, tipo, desc = 'Sem descrição', valor){
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
                id: localStorage.length + 1
        }
        localStorage.setItem((localStorage.length + 1).toString(), JSON.stringify(novoArray))
    }

    fetchDataIteration(iteration, target){
        return JSON.parse(localStorage.getItem(iteration))[target]
    }

    recuperarDados(){
        this.alert('no-data')
        for (let i = 1; i <= localStorage.length + 1; i++){
            if (localStorage.getItem(i) == null){
                continue
            } 
            var newRow = document.createElement('tr')
            newRow.id = `row-${i}`
            this.table.appendChild(newRow)
            newRow.innerHTML = `
            <td>${this.fetchDataIteration(i, 'dia')}/${this.fetchDataIteration(i, 'mes')}/${this.fetchDataIteration(i, 'ano')}</td>
            <td>${this.fetchDataIteration(i, 'tipo')}</td>
            <td>${this.fetchDataIteration(i, 'desc')}</td>
            <td>R$ ${this.fetchDataIteration(i, 'valor')}</td>
            <td><button class='remove-data-btn' id=${this.fetchDataIteration(i, 'id')}>x</button></td>`
            var botao = document.getElementById(i)
            botao.addEventListener('click', () => {
                this.alert('remove-data', i)
                this.alert('no-data')
            })      
        }
    }

    filterYears(page){
        for (let i = 2025; i > 2010; i--){
            var year = document.createElement("option")
            year.innerHTML = i
            switch (page){
                case 'cadastro':
                    this.ano.appendChild(year)
                    break
                case 'consulta':
                    this.filterAno.appendChild(year)
                    break
            }
        }
    }

    filterSearch(){
        this.botaoFilter.addEventListener('click', () => {
            this.table.innerHTML = ''
            this.alert('no-data')
            var filtro = {
                dia: this.filterDia.value < 10 && this.filterDia.value > 0 === true ? "0" + this.filterDia.value : this.filterDia.value,
                mes: this.filterMes.value,
                ano: this.filterAno.value,
                tipo: this.filterType.value,
                desc: this.filterDesc.value === "" ? "Sem descrição" : this.filterDesc.value,
                valor: this.filterValue.value,
            }
            for (var i = 1; i <= localStorage.length + 1; i++){
                if(localStorage.getItem(i) == null || localStorage.getItem(i) == undefined){
                    continue
                }
                var checkArray = []
                var array = JSON.parse(localStorage.getItem(i))
                for (var key in filtro){
                    if (filtro[key] != "" && filtro[key] != "Sem descrição"){
                        if (array[key] == filtro[key]){
                            checkArray.push(true)
                        } else {
                            checkArray.push(false)
                        }
                    }
                }
                if (checkArray.includes(false) == false){
                    this.table.innerHTML += this.insertData(i)
                    var botao = document.getElementById(i)
                    botao.addEventListener('click', () => {
                        this.alert('remove-data', i - 1)
                        this.alert('no-data')
                    })
                }
                if (checkArray.includes(false) == true) {
                    if(this.table.innerHTML.includes('tr') == false)
                    this.alert('no-data-2')
                }
            } 
        })
    }

    insertData(id){
        var data = JSON.parse(localStorage[id])
        return `
        <tr id='row-${id}'>
            <td>${data.dia}/${data.mes}/${data.ano}</td>
            <td>${data.tipo}</td>
            <td>${data.desc}</td>
            <td>R$ ${data.valor}</td>
            <td><button class='remove-data-btn' id=${data.id}>x</button></td>
        </tr>
        `
    }

    errorHandling(message, campo){
        var errorText = document.createElement('span')
        errorText.innerText = message
        errorText.classList.add('errors-list')
        this.janelaErros.appendChild(errorText)
        campo.classList.add('error')
        campo.addEventListener('click', () => {
            campo.classList.remove('error')
            errorText.remove()
        })
    }

}

var app = new Main()
app.start()

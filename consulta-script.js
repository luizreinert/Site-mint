class Main{
    constructor() {
        this.botaoAddDespesa = document.getElementById('add-despesa')
        this.janelaErros = document.getElementById('errorWindow')
        this.mainSearch = document.getElementById('filter-search')
        this.filterDia = document.getElementById('filter-dia')
        this.filterMes = document.getElementById('filter-mes')
        this.filterAno = document.getElementById('filter-ano')
        this.filterType = document.getElementById('filter-type')
        this.filterDesc = document.getElementById('filter-desc')
        this.filterValue = document.getElementById('filter-valor')
        this.filterBtn = document.getElementById('filter')
        this.checkAllBtn = document.getElementById('check-all')
        this.clearFilterBtn = document.getElementById('clear-filter')
        this.clearCheckboxBtn = document.getElementById('clear-checkbox')
        this.table = document.getElementById('table-despesas')
        this.filterInputs = [this.filterDia, this.filterMes, this.filterAno, this.filterType, this.filterDesc, this.filterValue]
    }

    start(){
        this.spanAnim()
        this.typeFix(this.filterDia, this.filterAno)
        this.recuperarDados()
        this.filterYears()
        this.clearFilterBtn.addEventListener('click', () => {
            this.filterInputs.forEach(item => {
                item.value = ''
                item.previousElementSibling.classList.remove('span-focused')
            })
        })
        this.filterBtn.addEventListener('click', () =>{
            this.filterSearch()
        })
        this.checkboxFunction()
        this.toggleAdvSearch()
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

    toggleAdvSearch(){
        const advSearchBtn = document.getElementById('adv-search')
        const AdvSearchIcon = document.getElementById('adv-search-icon')
        var searchInputs = document.getElementById('adv-search-inputs')
        advSearchBtn.addEventListener('click', () => {
            searchInputs.classList.toggle('adv-search-inputs-active')
            AdvSearchIcon.classList.toggle('icon-active')
            this.mainSearch.toggleAttribute('disabled')
        })
    }

    checkboxFunction(){
        var fetchCheckboxes = document.querySelectorAll('[name="row-checkbox"]')
        var submitExclude = document.getElementById('clear-checkbox')
        fetchCheckboxes.forEach((box) => {
            console.log(box)
            box.addEventListener('click', () => {
                box.parentElement.parentElement.classList.toggle('checked')
                var rowRemoveDataBtn = document.getElementById(box.id.slice(9))
                rowRemoveDataBtn.classList.toggle('remove-data-btn-active')
                this.checkboxBool()
            })
        })     
        submitExclude.addEventListener('click', () => {
            fetchCheckboxes.forEach((box) => {
                if (box.checked == true){
                    this.alert('remove-data-checkbox')
                }
            })
        })
        this.checkAllBtn.addEventListener('click', () => {
            switch (this.checkAllBtn.checked){
                case true:
                    fetchCheckboxes.forEach((box) => {
                        var rowRemoveDataBtn = document.getElementById(box.id.slice(9))
                        box.checked = true
                        box.parentElement.parentElement.classList.add('checked')      
                        rowRemoveDataBtn.classList.add('remove-data-btn-active') 
                        this.checkboxBool()
                    })
                    break
                case false:
                    fetchCheckboxes.forEach((box) => {
                        var rowRemoveDataBtn = document.getElementById(box.id.slice(9))
                        box.checked = false
                        box.parentElement.parentElement.classList.remove('checked')    
                        rowRemoveDataBtn.classList.remove('remove-data-btn-active')  
                        this.checkboxBool()  
                    })
                    break     
            }
            
        })
    }

    checkboxBool(){
        var fetchCheckboxes = document.querySelectorAll('[name="row-checkbox"]')
        var submitExclude = document.getElementById('clear-checkbox')
        var counter = 0
        for(let i = 0; i < fetchCheckboxes.length; i++){
            if (fetchCheckboxes[i].checked == true){
                counter ++
            }
        }
        if (counter > 0){
            submitExclude.classList.remove('d-none')
        } else {
            submitExclude.classList.add('d-none')
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


    filterYears(){
        for (let i = 2025; i > 2010; i--){
            const filterInputYear = document.getElementById('filter-ano')
            var year = document.createElement("option")
            year.innerHTML = i
            filterInputYear.appendChild(year)
        }
    }

    filterSearch(){
        const AdvSearch = document.getElementById('adv-search-inputs')
        if (AdvSearch.classList.contains('adv-search-inputs-active')){
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
            for (var i = 0; i <= localStorage.length + 1; i++){
                if(Object.entries(localStorage)[i] == null || Object.entries(localStorage)[i] == undefined){
                    continue
                }
                var checkArray = []
                var array = JSON.parse(Object.entries(localStorage)[i][1])
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
                    var botao = document.getElementById(this.fetchDataIteration(i, 'id'))
                    botao.addEventListener('click', () => {
                        this.alert('remove-data', botao.id)
                        this.toggleRemoveBtnsState('disable')
                        setTimeout(() => {
                            this.alert('no-data-2')
                        }, 800);
                    })
                } 
            }
            this.checkboxFunction()
            if (checkArray == undefined){
                this.alert('no-data-2')
            } else if (checkArray.includes(false) == true) {
                if(this.table.innerHTML.includes('tr') == false)
                this.alert('no-data-2')
            }    
        } else if (AdvSearch.classList.contains('adv-search-inputs-active') == false){
            var keyWord = this.mainSearch.value
            this.table.innerHTML = ''
            this.alert('no-data')
            if (keyWord == '' || keyWord == undefined){
                this.recuperarDados()
            }
            for (var i = 0; i <= localStorage.length + 1; i++){
                if(Object.entries(localStorage)[i] == null || Object.entries(localStorage)[i] == undefined){
                    continue
                }
                var checkArray = []
                var array = JSON.parse(Object.entries(localStorage)[i][1])
                for (var key in array){
                    if (array[key].toLowerCase() == keyWord.toLowerCase()){
                        checkArray.push(true)
                    } else {
                        checkArray.push(false)
                    }
                }
                if (checkArray.includes(true)){
                    this.table.innerHTML += this.insertData(i)
                    var botao = document.getElementById(this.fetchDataIteration(i, 'id'))
                    botao.addEventListener('click', () => {
                        this.alert('remove-data', botao.id)
                        this.toggleRemoveBtnsState('disable')
                        setTimeout(() => {
                            this.alert('no-data-2')
                        }, 800);
                    })
                } 
            }
            this.checkboxFunction()
            if (checkArray == undefined){
                this.alert('no-data-2')
            } else if (checkArray.includes(false) == true) {
                if(this.table.innerHTML.includes('tr') == false)
                this.alert('no-data-2')
            }  
        }
    }

    insertData(id){
        var item = (JSON.parse(Object.entries(localStorage)[id][1]))
        return `
        <tr id='row-${item.id}'>
            <td class='d-flex justify-content-center'><input type='checkbox' name='row-checkbox' id=checkbox-${item.id}></td>
            <td>${item.dia}/${item.mes}/${item.ano}</td>
            <td>${item.tipo}</td>
            <td>${item.desc}</td>
            <td>R$ ${item.valor}</td>
            <td><button class='remove-data-btn' id=${item.id}>x</button></td>
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

    toggleRemoveBtnsState(state){
        var fetchRemoveBtns = []
        for (let i = 1; i < 100; i ++){
            var buttonSearch = document.getElementById(i)
            if (buttonSearch != null){
                fetchRemoveBtns.push(buttonSearch)
            }
        }
        switch (state){
            case 'disable':
                fetchRemoveBtns.forEach(btn => {
                    btn.setAttribute('disabled', "")
                })
                break
            case 'enable':
                fetchRemoveBtns.forEach(btn => {
                    btn.removeAttribute('disabled', "")
                })
                break
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
                alertDiv.classList.toggle('active-cadastro', true)
                setTimeout(() => {
                    alertDiv.classList.toggle('active-cadastro', false)
                    alertDiv.innerHTML = ''
                }, 2000)
                break
            case 'remove-data':
                alertDiv.innerHTML +=
                `<div class="d-flex flex-column row-gap-4 align-content-center justify-self-center p-4 w-100">
                    <div class="d-flex flex-column row-gap-2 align-self-start align-items-center w-100 justify-content-center">
                        <ion-icon class="warning-icon" name="warning"></ion-icon>
                        <span class="alert-text ms-2">Deseja remover a despesa selecionadas?</span>
                    </div>
                    <div class="d-flex w-100 justify-content-evenly action-btns">
                        <button id="cancelar">Cancelar</button>
                        <button id="confirmar">Confirmar</button>
                    </div>
                </div>`
                alertDiv.classList.toggle('active-remove-data', true)
                this.preventBtnBug(true)
                var cancelBtn = document.getElementById('cancelar')
                cancelBtn.addEventListener('click', () => {
                    alertDiv.classList.toggle('alert-out')
                    setTimeout(() => {
                        alertDiv.classList.toggle('active-remove-data', false)
                        alertDiv.classList.toggle('alert-out')
                        alertDiv.innerHTML = ''
                        this.alert('no-data')
                        this.preventBtnBug(false)
                    }, 1200)
                })
                var confirmBtn = document.getElementById('confirmar') 
                confirmBtn.addEventListener('click', () => {
                    document.getElementById(`row-${i}`).remove()
                    localStorage.removeItem(i)
                    alertDiv.classList.toggle('alert-out')
                    setTimeout(() => {
                        alertDiv.classList.toggle('active-remove-data', false)
                        alertDiv.innerHTML = ''
                        this.alert('no-data')
                        this.preventBtnBug(false)
                        alertDiv.classList.toggle('alert-out')
                    }, 800)
                })
                break
            case 'remove-data-checkbox':
                var fetchCheckboxes = document.querySelectorAll('[type="checkbox"]')
                alertDiv.innerHTML = `
                <div class="d-flex flex-column row-gap-4 align-content-center justify-self-center p-4 w-100">
                    <div class="d-flex flex-column row-gap-2 align-self-start align-items-center w-100 justify-content-center">
                        <ion-icon class="warning-icon" name="warning"></ion-icon>
                        <span class="alert-text ms-2">Deseja remover as despesas selecionadas?</span>
                    </div>
                    <div class="d-flex w-100 justify-content-evenly action-btns">
                        <button id="cancelar">Cancelar</button>
                        <button id="confirmar">Confirmar</button>
                    </div>
                </div>`
                this.preventBtnBug(true)
                alertDiv.classList.toggle('active-remove-data', true)
                var cancelBtn = document.getElementById('cancelar')
                cancelBtn.addEventListener('click', () => {
                    alertDiv.classList.toggle('alert-out')
                    setTimeout(() => {
                        alertDiv.classList.toggle('alert-out')
                        alertDiv.innerHTML = ''
                        this.alert('no-data')
                        this.preventBtnBug(false)
                        alertDiv.classList.toggle('active-remove-data', false)
                    }, 1200)
                })
                var confirmBtn = document.getElementById('confirmar')
                confirmBtn.addEventListener('click', () => {
                    alertDiv.classList.toggle('alert-out')
                    fetchCheckboxes.forEach((box) => {
                        if (box.checked == true){
                            localStorage.removeItem(box.id.slice(9))
                            box.parentElement.parentElement.remove()
                            alertDiv.classList.toggle('alert-out')
                            this.checkboxBool()
                            setTimeout(() => {
                                alertDiv.classList.toggle('active-remove-data')
                                alertDiv.innerHTML = ''
                                this.alert('no-data')
                                this.preventBtnBug(false)
                                alertDiv.classList.toggle('alert-out')
                            }, 800)
                        }
                    })
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
                                    <a class="error-anchor" href="cadastro.html">Clique aqui</a>
                                    <span class="error-span">para adicionar novas despesas.</span>
                                </div>
                            </div>
                        </td>
                    </tr>
                    `
                }
                break   
                case 'no-data-2':
                    if (localStorage.length > 0 && this.table.innerHTML.includes('tr') == false){
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

    preventBtnBug(bool){
        var fetchCheckboxes = document.querySelectorAll('[type="checkbox"]')
        var removeDataBtnsNode = document.querySelectorAll(".remove-data-btn")
        fetchCheckboxes.forEach((box) => {
            box.disabled = bool
        })
        removeDataBtnsNode.forEach((btn) => {
            btn.disabled = bool
        })
        this.clearCheckboxBtn.disabled = bool
    }

    fetchDataIteration(iteration, target){
        var item = JSON.parse(Object.entries(localStorage)[iteration][1])
        var extractedValue = item[target]
        return extractedValue
    }

    recuperarDados(){
        this.alert('no-data')
        for (let i = 0; i <= localStorage.length + 1; i++){
            if (Object.entries(localStorage)[i] == undefined){
                continue
            } 
            var newRow = document.createElement('tr')
            newRow.id = `row-${this.fetchDataIteration(i, 'id')}`
            this.table.appendChild(newRow)
            newRow.innerHTML = `
            <td class="d-flex justify-content-center"><input type='checkbox' name='row-checkbox' id=checkbox-${this.fetchDataIteration(i, 'id')}></td>
            <td>${this.fetchDataIteration(i, 'dia')}/${this.fetchDataIteration(i, 'mes')}/${this.fetchDataIteration(i, 'ano')}</td>
            <td>${this.fetchDataIteration(i, 'tipo')}</td>
            <td>${this.fetchDataIteration(i, 'desc')}</td>
            <td>R$ ${this.fetchDataIteration(i, 'valor')}</td>
            <td><button class='remove-data-btn' id=${this.fetchDataIteration(i, 'id')}>X</button></td>`
            var botao = document.getElementById(this.fetchDataIteration(i, 'id'))
            botao.addEventListener('click', () => {
                setTimeout(() => {
                    this.toggleRemoveBtnsState('disable')
                    this.alert('remove-data', this.fetchDataIteration(i, 'id'))
                    this.alert('no-data')
                }, 0)
            })      
        }
    }
}

var app = new Main()
app.start()

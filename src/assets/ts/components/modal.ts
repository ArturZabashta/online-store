
export const renderModal = async() =>{ 
  
    const modalPage = `
        <div class="modal__wrapper">
            <form id="myform" action='#/'>
                <fieldset class="modal__personal-info">
                    <h3 class="modal__subtitle">Personal details</h3>
                    <div class="personal-info">
                        <input type="text" id="card-name" placeholder="Name"  pattern="^[a-zA-ZА-Яа-я]{3,}\\s[a-zA-ZА-Яа-я]{3,}$"
                        title="Username should only contain letters. e.g. john Smitt" required>
                        <span class="error card-name">Error</span>
                    </div>
                    <div class="personal-info">
                        <input type="tel" id="card-phone" placeholder="Phone number" pattern="^\\+\\d{9,}"
                        title="Phone number should only contain numbers. e.g. +777777777" required>
                        <span class="error card-phone">Error</span>
                    </div>
                    <div class="personal-info">
                        <input type="text" id="card-address" pattern="^[a-zA-ZА-Яа-я0-9]{5,}\\s[a-zA-ZА-Яа-я0-9]{5,}\\s[a-zA-ZА-Яа-я0-9]{5,}$" 
                        placeholder="Dilivery adress" title="Dilivery adress should contain 3 words" required>
                        <span class="error card-address">Error</span>
                    </div>
                    <div class="personal-info">
                        <input type="email" id="card-email" pattern="^[^ ]+@[^ ]+\\.[a-z]{2,3}$" placeholder="E-mail"
                        title="Email e.g  johnsmith@gmail.com" required>
                        <span class="error card-email">Error</span>
                    </div>
                </fieldset>
                <fieldset class="modal__card">
                    <h3 class="modal__subtitle">Credit card details</h3>
                    <div class="bank-card">
                        <div class="card-back">
                            <div class="card-back__line"></div>
                            <input type="number" id="card-cvv" placeholder="cvv" pattern="^(\\d{3})$" min='100'
                            title="cvv should only contain 3 numbers e.g  777" required>
                        </div>
                        <div class="card-front">
                            <input type="text" id="card-number" placeholder="Card number" pattern="^([0-9]{4}\\s[0-9]{4}\\s[0-9]{4}\\s[0-9]{4})$"
                                title="should only contain numbers. e.g. 7777 7777 7777 7777" required >
                            <label for="card-monthYear" class="card-valid" >VALID</label>
                            <input type="text" id="card-date" placeholder="MM/YY" pattern="^(0?[1-9]|1[12])\\/(23|24|25|26|27)$" maxlength="5"
                                title="Date should only contain 4 numbers. e.g. 12/23" required>
                            <img class="card-logo" src="./assets/cardlogo.png" alt="visa">
                        </div>
                        <div class="card-error">
                            <span class="error card-number">Error card number</span>
                            <span class="error card-date">Error card date</span>
                            <span class="error card-cvv">Error cvv</span>
                        </div>
                        
                    </div>
                </fieldset>
                <fieldset>
                    <button type="submit" class="card-btn btn" id="confirm" >CONFIRM</button>
                </fieldset>
            </form>
        </div>
      
`

const myFragment = document.createRange().createContextualFragment(modalPage);
const modal: HTMLElement = document.querySelector('.modal') as HTMLElement;
modal.appendChild(myFragment);


const cardName = <HTMLInputElement>document.querySelector('#card-name'); //name
const cardPhone = <HTMLInputElement>document.querySelector('#card-phone'); //phone
const cardAddress = <HTMLInputElement>document.querySelector('#card-address'); //address
const cardEmail = <HTMLInputElement>document.querySelector('#card-email'); //email
const cvv = <HTMLInputElement>document.querySelector('#card-cvv'); //cvv
const cardNumber = <HTMLInputElement>document.querySelector('#card-number'); //number
const cardDate = <HTMLInputElement>document.querySelector('#card-date'); //date
const btnConfirm = <HTMLButtonElement>document.querySelector('#confirm'); //button
const myform = <HTMLFormElement>document.querySelector('#myform'); //form
const imgForm = <HTMLFormElement>document.querySelector('.card-logo'); //image
// const modal: HTMLElement = document.querySelector('.modal') as HTMLElement;


//close modal and redirect on main page
    myform.onsubmit = function (e:Event){
        e.preventDefault();
        modal.innerHTML=`
        <div class="modal__wrapper">
            <h3 class="modal__subtitle">The order has been placed</h3>
        </div>`
        setTimeout(() => {
            modal.innerHTML = modalPage;
            modal.style.display = "none";
            cleanCurt()
            location.href=`#/`;
            return true
        }, 5000)


    }

    function cleanCurt(){
        localStorage.removeItem('cartList');
    }

    //проверка формы на валидность
    if(btnConfirm) btnConfirm.onclick = (): void => btnFormHandler(); 
    function btnFormHandler() {
        const inputs: NodeListOf<HTMLInputElement> = myform.querySelectorAll('input');
        [...inputs].map(element => {
            const id = element.id;
            const err: HTMLElement | null = document.querySelector(`.${id}`);
            checkValidate(element,err)
        });
        
    }

    cardName.oninput = () => checkCardName();  
    function checkCardName(){
        const err: HTMLElement | null = document.querySelector('.card-name');
        checkValidate(cardName,err)
    }

    cardPhone.oninput = () => checkPhone(); 
    function checkPhone(){
        const err: HTMLElement | null = document.querySelector('.card-phone');
        checkValidate(cardPhone,err)
    }

    cardAddress.oninput = () => checkAddress(); 
    function checkAddress(){
        const err: HTMLElement | null = document.querySelector('.card-address');
        checkValidate(cardAddress,err)
    }

    cardEmail.oninput = () => checkEmail(); 
    function checkEmail(){
        const err: HTMLElement | null = document.querySelector('.card-email');
        checkValidate(cardEmail,err)
    }

    cvv.oninput = () => checkCVV(); 
    function checkCVV(){
        const err: HTMLElement | null = document.querySelector('.card-cvv');
        // checkValidate(cvv,err)
        const m = cvv.value.length+1;

        if (m > 3 )
        cvv.value= cvv.value.slice(0,3);
        checkValidate(cvv,err)
    }

    cardNumber.oninput = () => checkCardNumber(); 
    function checkCardNumber(){
        const err: HTMLElement | null = document.querySelector('.card-number');
        checkValidate(cardNumber,err)
    }
    cardDate.oninput = () => checkCardDate(); 
    function checkCardDate(){
        const err: HTMLElement | null = document.querySelector('.card-date');
        checkValidate(cardDate,err)
    }

    function checkValidate(elem: HTMLInputElement,span: HTMLElement | null){
        if(!elem.validity.valid){
            if(span)span.style.display = 'flex';
        }else{
            if(span)span.style.display = 'none';
        }
    }

    cardNumber.addEventListener("keypress",function(e){
        const m = this.value.length+1;
        const val:string = `${this.value}` as string;
        if(val[0]) checkImageCart(val[0]);

        if (m > 19 || (e.key).charCodeAt(0) < 48 || (e.key).charCodeAt(0) > 57)
        e.returnValue= false;
        
        else if (m == 5 || m == 10 || m == 15)
        this.value += ' ';
    });

    //change bank logo
    function checkImageCart(symb: string): void{
        switch (symb) {
            case '4':
                imgForm.src = "./assets/visa.svg"
                break;
            case '5':
                imgForm.src ="./assets/MSlogo.svg"
                break;
            case '2':
                imgForm.src ="./assets/MIrlogo.svg"
                break;
            case '6':
                imgForm.src ="./assets/UnionPaylogo.svg"
                break;
            default:
                imgForm.src ="./assets/cardlogo.png"
        }
    }

    //change date form
    cardDate.addEventListener("keypress",function(e){
        const val:string = (`${this.value}`).replace('/', '') as string
    if ( (e.key).charCodeAt(0) < 48 || (e.key).charCodeAt(0) > 57) e.returnValue= false;
    if(val.length>2) {
        this.value= '';
        this.value = val.slice(0,2)+ '/'+ val.slice(2,val.length);
    }
    })

    //close modal(click overlay)
    modal.addEventListener('click', (e) =>{
        const tearget:HTMLElement = e.target as HTMLElement;
        if (tearget.classList[0] === 'modal'){
            modal.style.display = "none";
        }
    })

}

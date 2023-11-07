import { countries } from "./countries.js";

const selectTag = document.querySelectorAll('select');
const translateBtn = document.querySelector("button");
const fromText = document.querySelector(".from-text")
const toText = document.querySelector(".to-text");
const exchange = document.querySelector(".fa-exchange-alt")






translateBtn.addEventListener("click",()=>{
    if(!fromText.value) return
    translate()


})


exchange.addEventListener("click", ()=>{
    let tempValue = fromText.value;

  // Swap the values of the two input elements
    
    fromText.value = toText.value;
    toText.value = tempValue;

    let tempOption = selectTag[0].value;

    selectTag[0].value = selectTag[1].value;

    selectTag[1].value = tempOption
    
})


fromText.addEventListener("keypress", function(event){
    if(event.key === "Enter"){
        if(!fromText.value) return
        translate()
    }
})

const copyFrom = document.querySelector(".copy-from")
const copyTo = document.querySelector(".copy-to")

copyFrom.addEventListener("click", ()=>{
    copy(fromText.value)
})
copyTo.addEventListener("click", ()=>{
    copy(toText.value)
})


// functions

function copy (text){

    if(!text) {
        translateBtn.innerHTML = 'Nothing to copy'

        setTimeout(()=>{
            translateBtn.innerHTML = 'Translate Text'
        }, 1500)
    } else {
        navigator.clipboard.writeText(text)

    translateBtn.innerHTML = 'Copied'

    setTimeout(()=>{
        translateBtn.innerHTML = 'Translate Text'
    },1500)
    }

    
}

function translate(){
        toText.placeholder = 'Translating.....'
    let text =  fromText.value;
    let translateFrom = selectTag[0].value; 
    let translateTo = selectTag[1].value;
    let apiUrl = fetch (`https://api.mymemory.translated.net/get?q=${text}&langpair=${translateFrom}|${translateTo}`)
    apiUrl
        .then((res)=>{
            return res.json()
        }).then((result)=>{
            let answer = result.responseData.translatedText
            toText.textContent = answer
            console.log(answer)
        }).catch(()=>{
            console.log ('error translating')
        })
    }


    selectTag.forEach((tag, id)=>{
    for (const countryCode in countries) {
        let selected;
        if(id == 0 && countryCode == "en-GB"){
            selected = "selected"
        } else if(id == 1 && countryCode == "fr-FR"){
            selected = "selected"
        }
        let option = `<option value="${countryCode}" ${selected}>${countries[countryCode]}</option>`;
        tag.insertAdjacentHTML("beforeend", option)
    }
});


function readAloud(speechValue, language){
    let utterance = new SpeechSynthesisUtterance(speechValue)
    utterance.lang = language.value

    speechSynthesis.speak(utterance);
}

// speech

const speech =  document.querySelectorAll(".fa-volume-up");

speech[0].addEventListener("click", function(){
    readAloud(fromText.value, selectTag[0])
});
speech[1].addEventListener("click", function(){
    readAloud(toText.value, selectTag[1])
});

selectTag[1].addEventListener("change", ()=>{
    console.log('changed')
    if (!fromText.value) return
    translate()
})

console.log(selectTag[1].value)
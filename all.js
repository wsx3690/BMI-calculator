const height = document.getElementById("height");
const weight = document.getElementById("weight");
const form = document.querySelector("form");
const submit = document.querySelector(".submit");
const resultContainer = document.querySelector(".resultContainer");
const result = document.querySelector(".result");
const renew = document.querySelector(".result a");
const BMIvalue = document.querySelector(".BMIvalue");
const outcome = document.querySelector(".outcome");
const dataRecord = document.querySelector(".dataRecord");
const data = JSON.parse(localStorage.getItem("record") || "[]");




form.addEventListener("submit",calculate);
renew.addEventListener("click",function(){
  resultContainer.classList.add("d-none");
  submit.classList.remove("d-none");
});


let BMI = 0;

//判斷BMI範圍
function calculate(e){
  e.preventDefault();
  BMI = (weight.value / (height.value/100 * height.value/100));
    console.log(weight.value,height.value,BMI)
  submit.classList.add("d-none");
  resultContainer.classList.remove("d-none");
  resultContainer.classList.add("d-flex");
  BMIvalue.textContent = BMI.toFixed(2);
  if(BMI>16 && BMI<18.5){
    outcome.textContent = "過輕";
    resultContainer.classList.add("light");
    result.classList.add("light-radius");
    renew.classList.add("light-renew");
  }else if(BMI>=18.5 && BMI<25){
    outcome.textContent = "理想";
    resultContainer.classList.add("normal");
    result.classList.add("normal-radius");
    renew.classList.add("normal-renew");
  }else if(BMI>=25 && BMI<30){
    outcome.textContent = "過重";
    resultContainer.classList.add("heavy");
    result.classList.add("heavy-radius");
    renew.classList.add("heavy-renew");
  }else if(BMI>=30 && BMI<35){
    outcome.textContent = "輕度肥胖";
    resultContainer.classList.add("lightHeavy");
    result.classList.add("lightHeavy-radius");
    renew.classList.add("lightHeavy-renew");
  }else if(BMI>=35 && BMI<40){
    outcome.textContent = "中度肥胖";
    resultContainer.classList.add("lightHeavy");
    result.classList.add("lightHeavy-radius");
    renew.classList.add("lightHeavy-renew");
  }else if(BMI>=40){
    outcome.textContent = "重度肥胖";
    resultContainer.classList.add("severeHeavy");
    result.classList.add("severeHeavy-radius");
    renew.classList.add("severeHeavy-renew");
  }else{
    outcome.textContent = "體重嚴重不足";
    resultContainer.classList.add("severeHeavy");
    result.classList.add("severeHeavy-radius");
    renew.classList.add("severeHeavy-renew");
  }
  if (height.value=='' || weight.value==''){
      alert('請輸入內容');
      return;
  }
  let obj={};
  obj.outcome=outcome.textContent;
  obj.height=height.value;
  obj.weight=weight.value;
  obj.BMI=BMI.toFixed(2);
  
  const now = new Date();
  obj.date = `${now.getMonth()}-${now.getDate()}-${now.getFullYear()}`

  data.push(obj);
  height.value='';
  weight.value='';
  localStorage.setItem('record', JSON.stringify(data));
  init();

}

//渲染
function render(item){
  let record = document.createElement("ul");

  if(item.BMI>16 && item.BMI<18.5){
    record.setAttribute("class", "light-border");
  }else if(item.BMI>=18.5 && item.BMI<25){
    record.setAttribute("class", "normal-border");
  }else if(item.BMI>=25 && item.BMI<30){
    record.setAttribute("class", "heavy-border");
  }else if(item.BMI>=30 && item.BMI<35){
    record.setAttribute("class", "lightHeavy-border");
  }else if(item.BMI>=35 && item.BMI<40){
    record.setAttribute("class", "lightHeavy-border");
  }else if(item.BMI>=40){
    record.setAttribute("class", "severeHeavy-border");
  }else{
    record.setAttribute("class", "severeHeavy-border");
  }
  record.innerHTML = `<li>${item.outcome}</li>
        <li>
          <span>BMI</span> ${item.BMI}
        </li>
        <li>
          <span>weight</span> ${item.weight}kg
        </li>
        <li>
          <span>height</span> ${item.height}cm
        </li>
        <li>
          <span>${item.date}</span>
        </li>`;
  localStorage.setItem("record", JSON.stringify(data));
  // init();
  return record;
  
}

//初始
function init(){
  
  dataRecord.innerHTML="";
  data.forEach(function(item){
      dataRecord.appendChild(render(item));
  });   
}
init();



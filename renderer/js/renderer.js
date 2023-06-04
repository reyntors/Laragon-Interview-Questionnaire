// const form = document.getElementById("form_sentence");

// if (form) {
//   form.onsubmit = async function (e) {
//     e.preventDefault();

//     const formData = new FormData(form);
    
//     const sentence = formData.get("sentence");

//     if(sentence.length <= 8){

//       alertMessage("error","Please input atleast 8 characters!");

//       return;
//     }
    
//     const loaderElement = document.querySelector(".custom-loader");

//     loaderElement.style.display = "grid";
    
//     // Call openAI function
//     const openAIResponse = await window.axios.openAI(sentence);
//     const keywords = openAIResponse.choices[0].text.replace(/\\n/g, '');

    
    
//     // Call Supabase API to insert the data
//     const supaBaseResponse = await window.axios.supaBase('post', '', {
//       sentence: sentence,
//       keywords: keywords
//     });
    
//     console.log(supaBaseResponse)
  
//     // Generate the HTML for the keywords
//     const keywordHTML = keywords
//     .split(" ")
//     .map((keyword) => `<span class="keyword">${keyword}</span>`)
//     .join(" ");

    


//     // Set the HTML content of the textarea with the keywordHTML
//     document.getElementById("extract").innerHTML = keywordHTML;

    
//     setTimeout(() => {
//       // Hide the loader after showing the keywords
//       loaderElement.style.display = "none";
//     }, 2000); // Adjust the delay time (in milliseconds) as needed
        


//     if(document.getElementById("extract").innerHTML){
//       alertMessage("success","Keywords has successfully extracted!");
//     }
//       };
// }

// function alertMessage(status,sentence){
// window.Toastify.showToast({
//   text: sentence,
//   duration: 3000,
//   gravity: "top", 
//   position: "right", 
//   stopOnFocus: true, 
//   style: {
//       textAlign: "center",
//       background: status == "error" ? "#ff4d4f" : "#52c41a",
//       color: "#ffffff",
//       fontWeight: "bold",
//       padding: "10px",
//       borderRadius: "5px",
//       boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
//       fontFamily: "Arial, sans-serif",
//       fontSize: "16px",
//   }
// });

// }

// Form Submit


const form_openai = document.getElementById("form_openai");
if (form_openai) {
  form_openai.onsubmit = async function (e) {
    e.preventDefault();

    const btn_submit = document.querySelector("#form_openai input[type='submit']");
    const selectDropdown = document.getElementById('numberDropdown');
    const topicDropdown = document.getElementById('topicDropdown');
    const question = document.getElementById('questions');
    const menuDropdown = document.getElementById('menuDropdown');

    if (!selectDropdown || !topicDropdown || !question) {
      // Handle the case when the required elements are not found
      alertMessage("error", "Required elements not found.");
      return;
    }

    const selectedOptionElement = selectDropdown.querySelector('.selected');
    if (!selectedOptionElement) {
      // Handle the case when the selected option is not found
      alertMessage("error", "Selected option not found.");
      return;
    }

    const numQuestions = parseInt(selectedOptionElement.textContent, 10);
    const topic = topicDropdown.querySelector('.selected').textContent;
    console.log(numQuestions);
    console.log(topic);

    // //Call openAI function
    const openAIResponse  = await window.axios.openAI( numQuestions, topic);
    const generatedQuestions = openAIResponse.choices[0].text.replace(/\\n/g, '');
    console.log(generatedQuestions);
    
    const questionHTML = generatedQuestions
    .split("\n")
    
    .join("<br>");
    //Set the HTML content of the division HTML
    document.getElementById("questions").innerHTML = questionHTML;
    // Show the question container
    document.querySelector(".question-container").style.display = "block";

    

    // const db_response = await window.axios.supaBase('post', '', {
    //   menuDropdownText: menuDropdownText,
    //   selectedOptionText: selectedOptionText
    // });
    
    // console.log(db_response);

    btn_submit.innerHTML = 'Submit';
    btn_submit.disabled = true;

    selectDropdown.addEventListener('click', () => {
      menuDropdown.classList.toggle('menu-open');
      selectDropdown.classList.toggle('select-clicked');
    });

    
  };
}

// Alert Message
function alertMessage(status, sentence) {
  window.Toastify.showToast({
    text: sentence,
    duration: 3000,
    stopOnFocus: true,
    style: {
      textAlign: "center",
      background: status == "error" ? "#E76161" : "#539165",
      color: "white",
      padding: "5px",
      marginTop: "2px"
    }
  });
}



// Get all dropdowns from the document
const dropdowns = document.querySelectorAll('.dropdown');

// Loop through all dropdown elements
dropdowns.forEach(dropdown => {
  // Get inner elements from each dropdown
  const select = dropdown.querySelector('.select');
  const caret = dropdown.querySelector('.caret');
  const menu = dropdown.querySelector('.menu');
  const options = dropdown.querySelectorAll('.menu li');
  const selected = dropdown.querySelector('.selected');

  // Add a click event to the select element 
  select.addEventListener('click', () => {
    // Toggle clicked select styles to the select element
    select.classList.toggle('select-clicked');
    // Toggle rotate styles to the caret element
    caret.classList.toggle('caret-rotate');
    // Toggle open styles to the menu
    menu.classList.toggle('menu-open');
  });

  // Loop through all options of the element
  options.forEach(option => {
    // Click event for the option element
    option.addEventListener('click', () => {
      // Change selected inner text to clicked option inner text
      selected.innerText = option.innerText;
      // Remove clicked select styles from the select element
      select.classList.remove('select-clicked');
      // Remove caret styles from the caret element
      caret.classList.remove('caret-rotate');
      // Remove open styles from the menu
      menu.classList.remove('menu-open');
      // Remove active class from all option elements
      options.forEach(option => {
        option.classList.remove('active');
      });
      // Add active class to the clicked option element
      option.classList.add('active');
    });
  });
});

// // Read Prompts from SupaBase
// getPrompts();
// async function getPrompts () {
//     // Fetch API Response
//     const response = await window.axios.supaBase('get');

//     // Load table from API Response
//     let htmlResult = '';
//     Object.keys(response).forEach(key => {
//         let date = new Date(response[key].created_at.replace(' ', 'T'));


//         htmlResult += '<tr>' +
//         '<th scope="row">' + response[key].prompt_id + '</th>' +
//         '<td>' + response[key].sentence + '</td>' +
//         '<td>' + response[key].keywords + '</td>' +
//         '<td>' + date.toLocaleString('en-US', { timeZone: 'UTC' }) + '</td>' +
//         '<td>' +
//         '<button id="btn_prompts_del" class="btn btn-danger btn-sm" name="' + response[key].prompt_id + '">Delete</button>' +
//         '</td>' +
//         '</tr>';
// });

//     //Display
//     const tbody = document.getElementById('tbl_prompts');
//     tbody.innerHTML = htmlResult;

    
// }

// // Set Btn Delete Prompt Click functionality from Table Prompts
// const tbl_prompts = document.getElementById('tbl_prompts');
// if (tbl_prompts) {
//     tbl_prompts.onclick = async function (e) {
//         if(e.target && e.target.id == "btn_prompts_del") {
//             const id = e.target.name;
//             const response = await window.axios.supaBase('delete', id);
//             console.log(response);
            
//             getPrompts();
//             alertMessage("success", "Successfully deleted id " + id + '!');
            
            
//         }
//     };
// }

// function alertMessage(status, message){
//     window.Toastify.showToast({
//       text: message,
//       duration: 3000,
//       gravity: "top", 
//       position: "right", 
//       stopOnFocus: true, 
//       style: {
//           textAlign: "center",
//           background: status == "error" ? "#ff4d4f" : "#52c41a",
//           color: "#ffffff",
//           fontWeight: "bold",
//           padding: "10px",
//           borderRadius: "5px",
//           boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
//           fontFamily: "Arial, sans-serif",
//           fontSize: "16px",
//       }
//     });
    
//     }




// Form Submit

const form_openai = document.getElementById("form_openai");
if (form_openai) {
  form_openai.onsubmit = async function (e) {
    e.preventDefault();

    const btn_submit = document.querySelector("#form_openai button[type='submit']");
    const formData = new FormData(form_openai);
    // let sentence = formData.get("sentence-text");

    const selectDropdown = document.getElementById('numberDropdown');
    const menuDropdown = document.getElementById('topicDropdown');

    if (!selectDropdown || !menuDropdown) {
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

    const selectedOptionText = selectedOptionElement.textContent;
    const menuDropdownText = menuDropdown.textContent;
    const resultText = `${selectedOptionText} ${menuDropdownText}`.replace(/\n/g, "");
    document.querySelector("#div-result textarea").value = resultText;

    const db_response = await window.axios.supaBase('post', '', {
      menuDropdownText: menuDropdownText,
      selectedOptionText: selectedOptionText
    });
    
    console.log(db_response);

    btn_submit.innerHTML = 'Submit';
    btn_submit.disabled = true;

    selectDropdown.addEventListener('click', () => {
      menuDropdown.classList.toggle('active');
    });

    menuDropdown.addEventListener('click', (event) => {
      const selectedOption = event.target.textContent;
      selectDropdown.querySelector('.selected').textContent = selectedOption;
      menuDropdown.classList.remove('active');
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
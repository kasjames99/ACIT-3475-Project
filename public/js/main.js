// Google OAuth Initialization  
function initOAuth() {  
    document.getElementById("login-btn").addEventListener("click", function() {  
        // Redirect to Google OAuth login  
        window.location.href = '/auth/google';  
    });  
}  

// Toggle editing options when logged in  
function enableEditing() {  
    document.querySelectorAll(".edit-btn").forEach(button => {  
        button.style.display = "inline-block"; 
    });  
}  

// Event Listeners for Edit and Add Buttons  
document.getElementById("editAbout").addEventListener("click", function() {  
    let aboutText = document.getElementById("aboutText");  
    let newAbout = prompt("Edit About Me:", aboutText.innerText);  
    if (newAbout) {  
        aboutText.innerText = newAbout;  
    }  
});  

document.getElementById("addProject").addEventListener("click", function() {  
    let projectList = document.getElementById("projectList");  
    let newProjectTitle = prompt("Project Title:");  
    let newProjectDesc = prompt("Project Description:");  
    if (newProjectTitle && newProjectDesc) {  
        let newProject = document.createElement("li");  
        newProject.classList.add("bg-white", "p-4", "rounded", "shadow", "my-2");  
        newProject.innerHTML = `<h3 class="font-bold">${newProjectTitle}</h3><p>${newProjectDesc}</p>`;  
        projectList.appendChild(newProject);  
    }  
});  

// Initialize OAuth on load  
window.onload = initOAuth;  

// Initialize GitHub Contributions Calendar  
function initGitHubCalendar() {  
    new GitHubCalendar(".calendar", "trung99900");  
}  

// Call the function to initialize the calendar  
initGitHubCalendar();
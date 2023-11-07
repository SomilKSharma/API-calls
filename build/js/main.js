"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
function fetchDataAndPopulateProfiles() {
    return __awaiter(this, void 0, void 0, function* () {
        const profilesContainer = document.querySelector('.profiles');
        const loadingIndicator = document.createElement('div');
        loadingIndicator.textContent = 'Loading...';
        profilesContainer.appendChild(loadingIndicator);
        try {
            const response = yield fetch('https://reqres.in/api/users?page=1');
            if (!response.ok) {
                throw new Error(`Failed to fetch data from the API. Status: ${response.status}`);
            }
            const data = yield response.json();
            // Clear the loading indicator
            loadingIndicator.remove();
            data.data.forEach((profile, index) => {
                const profileElement = document.createElement('div');
                profileElement.classList.add('profile');
                profileElement.setAttribute('id', String(index));
                profileElement.innerHTML = `
          <img src='${profile.avatar}' />
          <p>${profile.first_name} ${profile.last_name}</p>
          <p>Email: ${profile.email}</p>
        `;
                profilesContainer.appendChild(profileElement);
            });
            const profileElements = document.querySelectorAll('.profile');
            let areProfilesHidden = false;
            profileElements.forEach((profileElement, index) => {
                profileElement.addEventListener('click', () => {
                    if (areProfilesHidden) {
                        // Show all profile elements
                        profileElements.forEach((element) => {
                            element.style.display = 'block';
                        });
                        areProfilesHidden = false; // Update the state
                    }
                    else {
                        // Hide all other profiles except the clicked one
                        profileElements.forEach((element) => {
                            if (element !== profileElement) {
                                element.style.display = 'none';
                            }
                        });
                        areProfilesHidden = true; // Update the state
                    }
                });
            });
        }
        catch (error) {
            console.error(error);
            loadingIndicator.textContent = 'Error fetching data';
        }
    });
}
// Call the function to fetch and populate profiles when the page loads
window.addEventListener('load', fetchDataAndPopulateProfiles);

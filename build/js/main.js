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
class ProfileManager {
    constructor() {
        this.profilesContainer = document.querySelector('.profiles');
        this.loadingIndicator = document.createElement('div');
        this.loadingIndicator.textContent = 'Loading...';
        this.areProfilesHidden = false;
    }
    fetchData() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield fetch('https://reqres.in/api/users?page=1');
                if (!response.ok) {
                    throw new Error(`Failed to fetch data from the API. Status: ${response.status}`);
                }
                return response.json();
            }
            catch (error) {
                throw new Error('Error fetching data');
            }
        });
    }
    createProfileElement(profile, index) {
        const profileElement = document.createElement('div');
        profileElement.classList.add('profile');
        profileElement.setAttribute('id', String(index));
        profileElement.innerHTML = `
      <img src='${profile.avatar}' />
      <p>${profile.first_name} ${profile.last_name}</p>
      <p>Email: ${profile.email}</p>
    `;
        return profileElement;
    }
    addProfilesToContainer(profiles) {
        profiles.forEach((profile, index) => {
            const profileElement = this.createProfileElement(profile, index);
            this.profilesContainer.appendChild(profileElement);
        });
    }
    hideAllProfilesExceptClicked(clickedProfile) {
        const profileElements = document.querySelectorAll('.profile');
        if (!this.areProfilesHidden) {
            profileElements.forEach((element) => {
                const isClickedProfile = element === clickedProfile;
                element.style.display = isClickedProfile ? 'block' : 'none';
            });
        }
        else {
            profileElements.forEach((element) => element.style.display = 'block');
        }
        this.areProfilesHidden = !this.areProfilesHidden;
    }
    attachClickHandlers() {
        const profileElements = document.querySelectorAll('.profile');
        profileElements.forEach((profileElement) => {
            profileElement.addEventListener('click', () => {
                this.hideAllProfilesExceptClicked(profileElement);
            });
        });
    }
    fetchDataAndPopulateProfiles() {
        return __awaiter(this, void 0, void 0, function* () {
            this.profilesContainer.appendChild(this.loadingIndicator);
            try {
                const data = yield this.fetchData();
                this.loadingIndicator.remove();
                this.addProfilesToContainer(data.data);
                this.attachClickHandlers();
            }
            catch (error) {
                console.error(error);
                this.loadingIndicator.textContent = 'Error fetching data';
            }
        });
    }
}
const profileManager = new ProfileManager();
window.addEventListener('load', () => profileManager.fetchDataAndPopulateProfiles());

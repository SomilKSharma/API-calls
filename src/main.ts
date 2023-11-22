import { IProfile } from "./IProfile";

class ProfileManager {
  private profilesContainer: HTMLDivElement;
  private loadingIndicator: HTMLDivElement;
  private areProfilesHidden: boolean;

  constructor() {
    this.profilesContainer = document.querySelector('.profiles') as HTMLDivElement;
    this.loadingIndicator = document.createElement('div');
    this.loadingIndicator.textContent = 'Loading...';
    this.areProfilesHidden = false;
  }

  public async fetchData(): Promise<any> {
    try {
      const response = await fetch('https://reqres.in/api/users?page=1');

      if (!response.ok) {
        throw new Error(`Failed to fetch data from the API. Status: ${response.status}`);
      }

      return response.json();
    } catch (error) {
      throw new Error('Error fetching data');
    }
  }

  public createProfileElement(profile: IProfile, index: number): HTMLDivElement {
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

  public addProfilesToContainer(profiles: IProfile[]): void {
    profiles.forEach((profile, index) => {
      const profileElement = this.createProfileElement(profile, index);
      this.profilesContainer.appendChild(profileElement);
    });
  }

  public hideAllProfilesExceptClicked(clickedProfile: Element): void {
    const profileElements = document.querySelectorAll('.profile');
    if (!this.areProfilesHidden) {  
      profileElements.forEach((element) => {
        const isClickedProfile = element === clickedProfile;
        (element as HTMLElement).style.display = isClickedProfile ? 'block' : 'none';
      });
    } else {
      profileElements.forEach((element) => (element as HTMLElement).style.display = 'block')
    }
    this.areProfilesHidden = !this.areProfilesHidden
  }

  public attachClickHandlers(): void {
    const profileElements = document.querySelectorAll('.profile');
    profileElements.forEach((profileElement) => {
      profileElement.addEventListener('click', () => {
        this.hideAllProfilesExceptClicked(profileElement);
      });
    });
  }

  public async fetchDataAndPopulateProfiles(): Promise<void> {
    this.profilesContainer.appendChild(this.loadingIndicator);

    try {
      const data = await this.fetchData();

      this.loadingIndicator.remove();
      this.addProfilesToContainer(data.data);
      this.attachClickHandlers();
    } catch (error) {
      console.error(error);
      this.loadingIndicator.textContent = 'Error fetching data';
    }
  }
}

const profileManager = new ProfileManager();
window.addEventListener('load', () => profileManager.fetchDataAndPopulateProfiles());

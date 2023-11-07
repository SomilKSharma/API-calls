

interface Profile {
    first_name: string;
    last_name: string;
    avatar: string;
    email: string;
  }
  
  async function fetchDataAndPopulateProfiles() {
    const profilesContainer = document.querySelector('.profiles')!;
    const loadingIndicator = document.createElement('div');
    loadingIndicator.textContent = 'Loading...';
    profilesContainer.appendChild(loadingIndicator);
  
    try {
      const response = await fetch('https://reqres.in/api/users?page=1');
  
      if (!response.ok) {
        throw new Error(`Failed to fetch data from the API. Status: ${response.status}`);
      }
  
      const data = await response.json();
  
      // Clear the loading indicator
      loadingIndicator.remove();
  
        data.data.forEach((profile: Profile, index:number) => {
          
        const profileElement = document.createElement('div');
        profileElement.classList.add('profile');
        profileElement.setAttribute('id',String(index))    
        profileElement.innerHTML = `
          <img src='${profile.avatar}' />
          <p>${profile.first_name} ${profile.last_name}</p>
          <p>Email: ${profile.email}</p>
        `;
            profilesContainer.appendChild(profileElement);
            
        });

        const profileElements = document.querySelectorAll('.profile');
        let areProfilesHidden = false
        profileElements.forEach((profileElement, index) => {
          profileElement.addEventListener('click', () => {
            if (areProfilesHidden) {
              // Show all profile elements
              profileElements.forEach((element) => {
                (element as HTMLElement).style.display = 'block';
              });
              areProfilesHidden = false; // Update the state
            } else {
              // Hide all other profiles except the clicked one
              profileElements.forEach((element) => {
                if (element !== profileElement) {
                  (element as HTMLElement).style.display = 'none';
                }
              });
              areProfilesHidden = true; // Update the state
            }
          });
        });
    } catch (error) {
      console.error(error);
      loadingIndicator.textContent = 'Error fetching data';
    }
  }
  
  // Call the function to fetch and populate profiles when the page loads
  window.addEventListener('load', fetchDataAndPopulateProfiles);
  
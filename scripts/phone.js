const loadPhone = async (searchText, isShowAll) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`);
    const data = await res.json();
    const phones = data.data;
    displayPhones(phones, isShowAll);
}

const displayPhones = (phones, isShowAll) => {
    // console.log(phones);

    const phoneContainer = document.getElementById('phone-container')
    //clear phone container cards before adding new cards
    phoneContainer.textContent = '';

    //display show all button if there are more than 12 phones
    const showAllContainer = document.getElementById('show-all-container');
    if (phones.length > 12 && !isShowAll) {
        showAllContainer.classList.remove('hidden');
    }
    else {
        showAllContainer.classList.add('hidden');
    }
    // console.log('is show all' ,isShowAll);
    //display only first 12 phones if not showAll
    if (!isShowAll) {
        phones = phones.slice(0, 12);
    }


    phones.forEach(phone => {
        // console.log(phone);
        // 1. create a div
        const phoneCard = document.createElement('div');
        phoneCard.classList = `card bg-gray-100 text-center  p-4 shadow-xl`;
        phoneCard.innerHTML = `
        <figure><img src="${phone.image}" alt="Shoes" /></figure>
        <div class="card-body">
            <h2 class="card-title  justify-center">${phone.phone_name}</h2>
            <p>There are many variations of<br>passages of available, but the<br> majority have suffered</p>
            <div class="card-actions justify-center">
                <button onclick="handleShowDetails('${phone.slug}')" class="btn btn-accent">Show Details</button>
            </div>
        </div>
        `
        phoneContainer.appendChild(phoneCard);

    })
    // hide loading spinner
    toggleLoadingSpinner(false);
}

//
const handleShowDetails = async (id) => {
    // console.log('clicked show details',id);
    //load single phone data
    const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`);
    const data = await res.json();
    const phone = data.data;

    showPhoneDetails(phone);

}
const showPhoneDetails = (phone) => {
    // console.log(phone);
    const phoneName = document.getElementById('show-detail-phone-name');
    phoneName.innerText = phone.name;

    const showDetailContainer = document.getElementById('show-details-container');
    showDetailContainer.innerHTML = `
    <img class="px-40 py-4" src="${phone.image}" alt="" />
    <p><span class="font-semibold">Storage: </span>${phone?.mainFeatures?.storage}</p>
    <p><span class="font-semibold">Display Size: </span>${phone?.mainFeatures?.displaySize}</p>
    <p><span class="font-semibold">Chipset: </span>${phone?.mainFeatures?.chipSet}</p>
    <p><span class="font-semibold">Memory: </span>${phone?.mainFeatures?.memory}</p>
    <p><span class="font-semibold">Release date: </span>${phone?.releaseDate}</p>
    <p><span class="font-semibold">Brand: </span>${phone?.brand}</p>
    <p><span class="font-semibold">GPS: </span>${phone.others?.GPS ? phone.others.GPS : 'No GPS available in this device'}</p>

    `
    //show the modal
    show_details_modal.showModal();
}


//handle search button
const handleSearch = (isShowAll) => {
    toggleLoadingSpinner(true);
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    // console.log(searchText);
    loadPhone(searchText, isShowAll);
}

const toggleLoadingSpinner = (isLoading) => {
    const loadingSpinner = document.getElementById('loading-spinner');
    if (isLoading) {
        loadingSpinner.classList.remove('hidden');
    }
    else {
        loadingSpinner.classList.add('hidden');
    }
}

//handle show all

const handleShowAll = () => {
    handleSearch(true);
}

// loadPhone();
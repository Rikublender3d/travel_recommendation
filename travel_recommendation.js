function searchPlace() {
    const input = document.getElementById('searchInput').value.toLowerCase();
    const resultDiv = document.getElementById('resultsContainer');
    resultDiv.innerHTML = '';
    fetch('travel_recommendation_api.json')
        .then(response => response.json())
        .then(data => {
            // ビーチの検索
            if (input.includes('beach') || input.includes('beaches')) {
                const beaches = data.beaches;
                beaches.forEach(beach => {
                    resultDiv.innerHTML += `<div class="result-card">`;
                    resultDiv.innerHTML += `<div class="result-image"><img src="${beach.imageUrl}" alt="${beach.name}"></div>`;
                    resultDiv.innerHTML += `<div class="result-content">`;
                    resultDiv.innerHTML += `<h3>${beach.name}</h3>`;
                    resultDiv.innerHTML += `<p>${beach.description}</p>`;
                    resultDiv.innerHTML += `<button class="visit-btn">Visit</button>`;
                    resultDiv.innerHTML += `</div></div>`;
                });
            }
            // 寺院の検索
            else if (input.includes('temple') || input.includes('temples')) {
                const temples = data.temples;
                temples.forEach(temple => {
                    resultDiv.innerHTML += `<div class="result-card">`;
                    resultDiv.innerHTML += `<div class="result-image"><img src="${temple.imageUrl}" alt="${temple.name}"></div>`;
                    resultDiv.innerHTML += `<div class="result-content">`;
                    resultDiv.innerHTML += `<h3>${temple.name}</h3>`;
                    resultDiv.innerHTML += `<p>${temple.description}</p>`;
                    resultDiv.innerHTML += `<button class="visit-btn">Visit</button>`;
                    resultDiv.innerHTML += `</div></div>`;
                });
            }
            // 特定の国名で検索
            else {
                const country = data.countries.find(item => item.name.toLowerCase().includes(input));
                if (country) {
                    const cities = country.cities;
                    cities.forEach(city => {
                        resultDiv.innerHTML += `<div class="result-card">`;
                        resultDiv.innerHTML += `<div class="result-image"><img src="${city.imageUrl}" alt="${city.name}"></div>`;
                        resultDiv.innerHTML += `<div class="result-content">`;
                        resultDiv.innerHTML += `<h3>${city.name}</h3>`;
                        resultDiv.innerHTML += `<p>${city.description}</p>`;
                        if (city.timeZone) {
                            const options = { timeZone: city.timeZone, hour12: true, hour: 'numeric', minute: 'numeric', second: 'numeric' };
                            const localTime = new Date().toLocaleTimeString('en-US', options);
                            resultDiv.innerHTML += `<p class="local-time"><strong>Local Time:</strong> ${localTime}</p>`;
                        }
                        resultDiv.innerHTML += `<button class="visit-btn">Visit</button>`;
                        resultDiv.innerHTML += `</div></div>`;
                    });
                } else {
                    resultDiv.innerHTML = '<div class="no-results"><h3>Destination not found.</h3><p>Try searching for: beach, temple, Australia, Japan, or Brazil</p></div>';
                }
            }
        })
        .catch(error => {
            console.error('Error:', error);
            resultDiv.innerHTML = 'An error occurred while fetching data.';
        });
}
// クリアボタンの関数
function clearResults() {
    const resultDiv = document.getElementById('resultsContainer');
    const searchInput = document.getElementById('searchInput');
    resultDiv.innerHTML = '';
    searchInput.value = '';
}

// イベントリスナー
if (searchBtn) {
    searchBtn.addEventListener('click', searchPlace);
}

if (resetBtn) {
    resetBtn.addEventListener('click', clearResults);
}

if (searchInput) {
    searchInput.addEventListener('keypress', function (e) {
        if (e.key === 'Enter') {
            searchPlace();
        }
    });
}
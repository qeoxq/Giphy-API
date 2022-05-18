document.addEventListener("DOMContentLoaded", () => {
    const data = localStorage.getItem("data");
    const search = localStorage.getItem("search");
    if (data && search) {
        document.getElementById("search-field").value = search;
        updateData(JSON.parse(data));
    } else {
        document.getElementById("search-field").value = "giphy";
        loadData(document.getElementById("search-field").value);
    }
    const date = new Date(Date.now());
    document.getElementById("time").innerText = date.toLocaleString("ru", {
        year: "numeric", month: "numeric", day: "numeric"
    }) 
})

document.getElementById("search-form").addEventListener("submit", e => {
    e.preventDefault();
    document.getElementById("search-button").blur();
    document.getElementById("search-field").blur();
    document.getElementById("loader").style.display = "flex";
    document.getElementById("gif").style.display = "none";
    loadData(document.getElementById("search-field").value);
})

document.getElementById("random-button").addEventListener("click", e => {
    e.target.blur();
    document.getElementById("search-field").value = "";
    document.getElementById("loader").style.display = "flex";
    document.getElementById("gif").style.display = "none";
    loadData("");
})

const loadData = (data) => {
    fetch(`https://api.giphy.com/v1/gifs/random?api_key=kHkAXZWqOnJSNse51yMH4pmCYL3QtZzA&tag=${data}`)
        .then((response) => {
            return response.json();
        })
        .catch(() => {
            alert("Error");
        })
        .then((data) => {
            if (data) {
                localStorage.setItem("data", JSON.stringify(data));
                localStorage.setItem("search", document.getElementById("search-field").value);
                updateData(data);
            } else {
                alert("Nothing found");
            }
        })
}

const updateData = (data) => {
    if (data.code == 400) {
        document.getElementById("loader").style.display = "none";
    } else if (data.data) {
        const elem = document.getElementById("gif");
        elem.attributes.src.value = data.data.images.fixed_height.webp;
        document.getElementById("loader").style.display = "none";
        document.getElementById("gif").style.display = "block";
    } else {
        alert("Nothing found");
    }
}
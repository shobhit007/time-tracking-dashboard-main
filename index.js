const container = document.querySelector(".container");
const tabs = document.querySelectorAll(".tab");

async function showData(key = "daily") {
    let data;
    let time;
    if (key === "daily") {
        time = "Day"
    }else if (key === "weekly") {
        time = "Week"
    }else {
        time = "Month"
    }

    await fetch("/data.json", {method: "get"})
    .then(res => res.json())
    .then(result => {
        data = result
    })
    .catch(err => console.log(err))


    data.forEach(({title, timeframes}) => {
        const currentFrame = timeframes[key];
        //create all card and components
        const card = document.createElement("div");
        const subCard = document.createElement("div");
        const header = document.createElement("header");
        const cardTitle = document.createElement("p");
        const dotIcon = document.createElement("img");
        const currentHours = document.createElement("h2");
        const previousHours = document.createElement("p");
        
        //add classes
        card.classList.add(`tracking-card`);
        const cardClass = title === "Self Care" ? title.replace(/\s/g, "-").toLowerCase() : title.toLowerCase();
        card.classList.add(cardClass);
        subCard.classList.add("sub-card");
        cardTitle.classList.add("title");
        currentHours.classList.add("hours-heading");
        previousHours.classList.add("last-track");

        // add data
        cardTitle.textContent = title;
        dotIcon.setAttribute("src", "/images/icon-ellipsis.svg");
        currentHours.textContent = `${currentFrame.current}hrs`;
        previousHours.textContent = `Last ${time} - ${currentFrame.previous}hrs`;

        //append childs
        header.appendChild(cardTitle);
        header.appendChild(dotIcon);
        subCard.appendChild(header);
        subCard.appendChild(currentHours);
        subCard.appendChild(previousHours);
        card.appendChild(subCard);
        container.append(card);
    })
}

showData();


tabs.forEach(tab => {
    tab.addEventListener("click", function() {
        const dataFrame = tab.getAttribute("data-frame");

        tabs.forEach(tab => tab.classList.remove("active"));

        tab.classList.add("active")

        //remove old child nodes from container
        const childNodes = document.querySelectorAll(".tracking-card");
        childNodes.forEach(child => container.removeChild(child))

        showData(dataFrame);
    });
})
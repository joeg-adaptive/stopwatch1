export function createPlaceHolderTable() {
    //Setting tr Information
    for (let i = 0; i <= 7; i++) {
        //Setting tr Information
        let tableRowLapData = document.createElement("tr");
        tableRowLapData.setAttribute("class", "lapsTableRow");
        tableRowLapData.setAttribute("table-data-id", i);

        //Setting tdLap Information
        let tdLap = document.createElement("td");
        tdLap.setAttribute("class", "tdLap");
        tdLap.setAttribute("class", "invisible");
        tdLap.innerText = "1";

        //Setting tdTime Information
        let tdTime = document.createElement("td");
        tdTime.setAttribute("class", "tdTime");
        tdTime.setAttribute("class", "invisible");
        tdTime.innerText = "1";

        if (i == 0) {
            //Applying table row
            document.querySelector("table").appendChild(tableRowLapData);
        } else {
            //Applying table row
            document
                .querySelector("[table-data-id]")
                .insertAdjacentElement("beforebegin", tableRowLapData);
        }
        //Applying tdLap Information
        tableRowLapData.appendChild(tdLap);

        //Applying tdLap Information
        tableRowLapData.appendChild(tdTime);
    }
}
export function lapTracker() {
    //Setting tr Information
    let tableRowLapData = document.createElement("tr");
    tableRowLapData.setAttribute("class", "lapsTableRow");
    tableRowLapData.setAttribute("id", handleWhichLapWeAreOn("get"));

    //Setting tdLap Information
    let tdLap = document.createElement("td");
    tdLap.setAttribute("class", "tdLap");
    tdLap.innerText = `Lap ${handleWhichLapWeAreOn("get") + 1}`;

    //Setting tdTime Information
    let tdTime = document.createElement("td");
    tdTime.setAttribute("class", "tdTime");
    tdTime.innerText = lapTimeCalculator();

    if (handleWhichLapWeAreOn("get") == 0) {
        //Applying table row
        document
            .querySelector("table")
            .insertAdjacentElement("afterbegin", tableRowLapData);
    } else {
        //Applying table row
        document
            .getElementById(handleWhichLapWeAreOn("get") - 1)
            .insertAdjacentElement("beforebegin", tableRowLapData);
    }
    //Applying tdLap and tdTime Information
    tableRowLapData.appendChild(tdLap);
    tableRowLapData.appendChild(tdTime);

    //Add to whichLap for tracking
    document.querySelector("[table-data-id]")
        ? document.querySelector("[table-data-id]").remove()
        : null;

    if (handleWhichLapWeAreOn("get") == 3) {
        findSlowAndFast();
    } else if (handleWhichLapWeAreOn("get") > 3) {
        findSlowAndFast();
    }
    handleWhichLapWeAreOn("increment");
}

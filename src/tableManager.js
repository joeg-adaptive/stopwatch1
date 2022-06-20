import { handleWhichLapWeAreOn } from "./utils.js";
import { lapTimeCalculator } from "./lapLogic.js";
import { findSlowAndFast } from "./lapLogic.js";

export let $tableRowWithLiveLapTime = undefined;
let liveLapInitializated = false;

export function createAndHandleLiveLapTime() {
    console.log();
    if (!liveLapInitializated) {
        let liveTableRowLapData = document.createElement("tr");
        liveTableRowLapData.setAttribute("class", "lapsTableRow");
        let liveTdLap = document.createElement("td");
        liveTdLap.setAttribute("class", "tdLap");
        // liveTdLap.innerText = `Lap ${handleWhichLapWeAreOn("get") + 1}`;
        liveTdLap.innerText = `this is the live lap`;
        let liveTdTime = document.createElement("td");
        liveTdTime.setAttribute("class", "tdTime");
        document
            .querySelector("table")
            .insertAdjacentElement("afterbegin", liveTableRowLapData);
        liveTableRowLapData.appendChild(liveTdLap);
        liveTableRowLapData.appendChild(liveTdTime);
        $tableRowWithLiveLapTime = liveTdTime;
        console.log($tableRowWithLiveLapTime);
        liveLapInitializated = true;
    }
}

export function createInvisibleTable() {
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

        i == 0
            ? document.querySelector("table").appendChild(tableRowLapData)
            : document
                  .querySelector("[table-data-id]")
                  .insertAdjacentElement("beforebegin", tableRowLapData);
        //Applying tdLap Information
        tableRowLapData.appendChild(tdLap);
        tableRowLapData.appendChild(tdTime);
    }
}

export function createTables() {
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
    $tableRowWithLiveLapTime = tdTime;
    tdTime.setAttribute("class", "tdTime");
    tdTime.innerText = lapTimeCalculator();

    handleWhichLapWeAreOn("get") == 0
        ? document
              .querySelector("table")
              .insertAdjacentElement("afterbegin", tableRowLapData)
        : document
              .getElementById(handleWhichLapWeAreOn("get") - 1)
              .insertAdjacentElement("beforebegin", tableRowLapData);

    //Applying tdLap and tdTime Information
    tableRowLapData.appendChild(tdLap);
    tableRowLapData.appendChild(tdTime);

    document.querySelector("[table-data-id]")
        ? document.querySelector("[table-data-id]").remove()
        : null;

    handleWhichLapWeAreOn("get") == 3
        ? findSlowAndFast()
        : handleWhichLapWeAreOn("get") > 3;
    findSlowAndFast();

    handleWhichLapWeAreOn("increment");
}

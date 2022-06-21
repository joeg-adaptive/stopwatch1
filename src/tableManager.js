import { handleWhichLapWeAreOn, handleLiveLap } from "./utils.js";
import { lapTimeCalculator } from "./lapLogic.js";
import { findSlowAndFast } from "./lapLogic.js";

export let $tableRowWithLiveLapTime = undefined;

export function createAndHandleLiveLapTime() {
    let liveTableRowLapData = document.createElement("tr");
    let liveTdLap = document.createElement("td");
    let liveTdTime = document.createElement("td");
    if (!handleLiveLap("getStatusOfLiveLapInitializated")) {
        liveTableRowLapData.setAttribute("class", "lapsTableRow");
        liveTableRowLapData.setAttribute(
            "live-table-data-id",
            "liveTableRowLapData"
        );
        //liveTdLap.innerText = `Lap ${handleWhichLapWeAreOn("get") + 1}`;
        liveTdTime.setAttribute("class", "tdTime");
        liveTdLap.setAttribute("live-table-data-id", "liveTdLap");
        document
            .querySelector("table")
            .insertAdjacentElement("afterbegin", liveTableRowLapData);
        liveTableRowLapData.appendChild(liveTdLap);
        liveTableRowLapData.appendChild(liveTdTime);
        $tableRowWithLiveLapTime = liveTdTime;
        handleLiveLap("setStatusLiveLapInitializatedToTrue");
    }
    document.querySelector("[live-table-data-id=liveTdLap]").innerText = `Lap ${
        handleWhichLapWeAreOn("get") + 1
    }`;
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
    tdTime.setAttribute("class", "tdTime");
    tdTime.innerText = lapTimeCalculator();

    handleWhichLapWeAreOn("get") == 0
        ? document
              .querySelector("[live-table-data-id=liveTableRowLapData]")
              .insertAdjacentElement("afterend", tableRowLapData)
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
    //Maintence Functions
    findSlowAndFast();
    handleWhichLapWeAreOn("increment");
    createAndHandleLiveLapTime();
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

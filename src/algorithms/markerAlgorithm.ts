import { Discipline, Project, Academic } from "../algorithmUtils/markerAllocationUtil"

export function assignMarkerToThesis(thesisList: Project[], markerList: Academic[]) {
  var chosenMarker;
  thesisList.forEach((thesis) => {
    //console.log("Hi");
    chosenMarker = findMarker(markerList, thesis); //find their ID
    thesis.second_marker_id = chosenMarker; //allocate a second marker to the thesis
    markerAssigned(markerList, chosenMarker);//increase capacity of the marker
  });
  //console.log(markerList);
  //console.log(thesisList);  
  return [thesisList, markerList];
}

export function findMarker(markerListTemp: Academic[], thesis: Project) {//find the marker best suited
  var chosenMarker = null;
  var failure = 0;
  var markerList;
  //find markers with appropriate disciplines
  markerList = markerByDiscipline(markerListTemp, thesis);
  if (markerList.length == 0) {
    console.log("No markers of that discipline");
    //console.log(thesis.department[0]);
    failure = 1;
    //return chosenMarker;
  }
  if(failure == 1){
    markerList = markerByDisciplineFail(markerListTemp,thesis);
  }
  //sort by marker score
  markerList = markerSort(markerList);
  //pick lowest capacity
  chosenMarker = markerList[0].uni_id;
  //console.log("Assingned Marker to thesis");
  //return id of that marker  
  return chosenMarker;
}

export function markerByDiscipline(markerListTemp: Academic[], thesis: Project) {//find all markers of department
  var markerList: Academic[] = [];
  markerListTemp.forEach((marker) => {
    //console.log(marker.discipline + " ? " + thesis.disciplines);
    thesis.disciplines.forEach((disciplines) => {
      console.log("Thesis Discipline is " + disciplines.id + " Marker Discipline is " + marker.discipline + " " + marker.discipline.includes(disciplines.id));
      if (marker.discipline == disciplines.id) {//check if marker has discipline listed in department array
        console.log("Marker Current Load is " + marker.current_load + " Marker Max Load is " + marker.capacity);
        if (marker.current_load < marker.capacity) {//only return those with capacity not equal to their max capacity
          console.log("Marker ID is " + marker.uni_id + " Thesis supervisor ID " +thesis.supervisor_id);
          if (marker.uni_id != thesis.supervisor_id) {//make sure supervisor isnt marking their own thesis
            markerList.push(marker);
            console.log("Marker Available!")
          }
        }
      }
    })

  });
  //console.log(markerList);
  return markerList;//return list of all markers with discipline and capacity to take on a marking
}

export function markerByDisciplineFail(markerListTemp: Academic[], thesis: Project) {//find all markers of department
  var markerList: Academic[] = [];
  markerListTemp.forEach((marker) => {
    //console.log(marker.discipline + " ? " + thesis.disciplines);
    thesis.disciplines.forEach((disciplines) => {
      console.log("Thesis Discipline is " + disciplines.id + " Marker Discipline is " + marker.discipline + " " + marker.discipline.includes(disciplines.id));
      if (marker.discipline == disciplines.id) {//check if marker has discipline listed in department array
        //console.log("Marker Current Load is " + marker.current_load + " Marker Max Load is " + marker.capacity);
        //if (marker.current_load < marker.capacity) {//only return those with capacity not equal to their max capacity
          console.log("Marker ID is " + marker.uni_id + " Thesis supervisor ID " +thesis.supervisor_id);
          if (marker.uni_id != thesis.supervisor_id) {//make sure supervisor isnt marking their own thesis
            markerList.push(marker);
            console.log("Marker Available!")
          }
        //}
      }
    })

  });
  //console.log(markerList);
  return markerList;//return list of all markers with discipline and capacity to take on a marking
}

export function markerSort(markerListTemp: Academic[]) {//sort the marker list
  return markerListTemp.sort(function (a, b) {
    if ((a.capacity - a.current_load) > (b.capacity - b.current_load)) {
      return 1;
    }
    if ((a.capacity - a.current_load) < (b.capacity - b.current_load)) {
      return -1
    }
    else {
      if (a.discipline.length < b.discipline.length) {
        return 1;
      }
      if (a.discipline.length > b.discipline.length) {
        return -1;
      }
      else {
        return 0;
      }
    }
  });
}

export function markerAssigned(markerList: Academic[], marker: string) {//once a marker is assigned do stuff
  var index: number = -1;
  //find marker with ID given
  index = markerList.findIndex(x => x.uni_id == marker);
  if (index == -1) {
    //console.log(marker);
    //console.log("markerAssigned Broken");
    return;
  }
  //increment capacity 
  markerList[index].current_load = markerList[index].current_load + 1;
  return;
}







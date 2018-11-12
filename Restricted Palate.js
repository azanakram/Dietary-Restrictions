/**
 * @author Azan Muhammad
 * Date: Friday January 19th
 * @description: This program is for people that have dietary restrictions, and are unable to eat certain
 * kinds of foods due to health, religion, or choice. This program takes the restaurant details from all 
 * the restaurants in Streetsville. When run, a search box will appear and the the user can type in the 
 * name of the restaurant they are searching or the letters the restaurant starts with. Once found all the
 * matches, the program will console log the name of the restaurant, it's address, the average user rating,
 * and the kinds of limitations it caters to. Th
>_consolee JSON file being used was loaded from an API, the data was
 * recorded on January 18th 2017, at 5:00 pm.
 * 
 * 
 * Function loads the JSON file onto an array that is used throughout the code. It also loads in the dietary
 * limitations we will be checking. The function also creates the search box that the user can type into when
 * run.
 */
function preload() {
  globalVariables.restaurantFile = loadJSON("Restaurant.json");
  globalVariables.foodLim = loadStrings("dietaryLim.txt");
  resSearch = createInput();
  resSearch.position(10, 10);
  button = createButton('Search');
  button.position(resSearch.x + resSearch.width, 10);
  button.mousePressed(findRestaurant);
}

function setup() {
  createCanvas(50, 50);
}

/**
 * Function is called when the user clicks search. It makes the empty string that is used to search for the
 * restaurant names be equal to what was typed in the search bar. Next the program runs the sorting function
 * to sort the array before we complete a binary search on it. Then it runs the function that adds the dietary
 * limitations to each restaurant. Lastly, it will run the binary search function that will locate and display
 * the restaurant.
 */
function findRestaurant() {
  globalVariables.nameSearch = resSearch.value();
  sortData();
  inputLim(globalVariables.restaurantFile, globalVariables.foodLim);
  binarySearch();
}

/**
 * The function rearranges and sorts the indexes in the array based on alphabetical order of the restaurant names.
 */
function sortData() {
  var swap;
  do {
    swap = false;
    for (var i = 0; i < globalVariables.restaurantFile.results.length - 1; i++) {
      if (globalVariables.restaurantFile.results[i].name > globalVariables.restaurantFile.results[i + 1].name) {
        var temp = globalVariables.restaurantFile.results[i];
        globalVariables.restaurantFile.results[i] = globalVariables.restaurantFile.results[i + 1];
        globalVariables.restaurantFile.results[i + 1] = temp;
        swap = true;
      }
    }
  } while (swap);
  return (globalVariables.restaurantFile);
}

/**
 * The function adds the dietary restrictions to each restaurant.
 * @param {array,array} - The json data and the dietary restriction data
 */
function inputLim(data, restrict) {
  for (var i = 0; i < data.results.length; i++) {
    if (data.results[i].name == "Andiamo Pasta Plus") {
      globalVariables.restaurantFile.results[i]["restriction"] = [restrict[1], restrict[2]];
    }
    if (data.results[i].name == "Bobby's Hideaway") {
      globalVariables.restaurantFile.results[i]["restriction"] = [restrict[1], restrict[2]];
    }
    if (data.results[i].name == "Burger Legend") {
      globalVariables.restaurantFile.results[i]["restriction"] = [restrict[0], restrict[1]];
    }
    if (data.results[i].name == "Burrito Boyz Streetsville") {
      globalVariables.restaurantFile.results[i]["restriction"] = [restrict[2]];
    }
    if (data.results[i].name == "Cagneys Steakhouse & Winebar") {
      globalVariables.restaurantFile.results[i]["restriction"] = [restrict[1], restrict[2]];
    }
    if (data.results[i].name == "Cuchulainn's Irish Pub") {
      globalVariables.restaurantFile.results[i]["restriction"] = [restrict[1], restrict[2]];
    }
    if (data.results[i].name == "El Mariachi Tacos And Churros") {
      globalVariables.restaurantFile.results[i]["restriction"] = [restrict[1], restrict[2]];
    }
    if (data.results[i].name == "Enzo's Two Guys From Italy") {
      globalVariables.restaurantFile.results[i]["restriction"] = [restrict[2]];
    }
    if (data.results[i].name == "Goldenview Chinese Restaurant") {
      globalVariables.restaurantFile.results[i]["restriction"] = [restrict[1], restrict[2]];
    }
    if (data.results[i].name == "Goodfellas Wood Oven Pizza") {
      globalVariables.restaurantFile.results[i]["restriction"] = [restrict[1], restrict[2]];
    }
    if (data.results[i].name == "Jing Thai Restaurant") {
      globalVariables.restaurantFile.results[i]["restriction"] = [restrict[1], restrict[2]];
    }
    if (data.results[i].name == "Mondello") {
      globalVariables.restaurantFile.results[i]["restriction"] = [restrict[1], restrict[2]];
    }
    if (data.results[i].name == "On-Z-Rocks") {
      globalVariables.restaurantFile.results[i]["restriction"] = [restrict[0], restrict[1]];
    }
    if (data.results[i].name == "Osmow's Streetsville") {
      globalVariables.restaurantFile.results[i]["restriction"] = [restrict[0], restrict[1]];
    }
    if (data.results[i].name == "Queen's Fish & Chips") {
      globalVariables.restaurantFile.results[i]["restriction"] = [restrict[2]];
    }
    if (data.results[i].name == "Saucy") {
      globalVariables.restaurantFile.results[i]["restriction"] = [restrict[1], restrict[2]];
    }
    if (data.results[i].name == "Stavro's Greek Restaurant & Lounge") {
      globalVariables.restaurantFile.results[i]["restriction"] = [restrict[1], restrict[2]];
    }
    if (data.results[i].name == "The Franklin House") {
      globalVariables.restaurantFile.results[i]["restriction"] = [restrict[1], restrict[2]];
    }
    if (data.results[i].name == "Wing's Restaurant") {
      globalVariables.restaurantFile.results[i]["restriction"] = [restrict[1], restrict[2]];
    }
    if (data.results[i].name == "ZAD Restaurant & Cafe") {
      globalVariables.restaurantFile.results[i]["restriction"] = [restrict[0], restrict[1]];
    }
  }
  return (globalVariables.restaurantFile);
}

/**
 * Runs a binary search on the function, it searches the array for restaurant names that match what is being searched for.
 * Once a match is found, it check above and below to see if there are any more matches, useful for when you only search 1
 * character, it will display all the restaurants that start with that character. Once all the matches have been found, the
 * index numbers at which they were found are stored, and then used to log all the information required from these restaurants
 * (Name, address, rating, and the limitation it caters to).
 */
function binarySearch() {
  for (var i = 0; i < globalVariables.restaurantFile.results.length; i++) {
    globalVariables.restaurantInfo.push(globalVariables.restaurantFile.results[i].name)
  }
  var max = globalVariables.restaurantInfo.length;
  var min = 0;
  var mid;
  var midName;
  var nameUp = true;
  var nameDown = true;
  var multipleName = 1;
  var nameCompare;
  globalVariables.nameSearch = globalVariables.nameSearch.toLowerCase();
  while (min < max) {
    mid = Math.floor((max + min) / 2);
    midName = globalVariables.restaurantInfo[mid].toString().substring(0, globalVariables.nameSearch.length).toLowerCase();
    nameCompare = midName.localeCompare(globalVariables.nameSearch);

    if (nameCompare < 0) {
      min = mid + 1

    } else if (nameCompare === 0) {
      globalVariables.restaurantNames.push(mid)
      try {
        while (nameUp || nameDown) {
          if (nameUp && midName === globalVariables.restaurantInfo[mid + multipleName].toString().substring(0, globalVariables.nameSearch.length).toLowerCase()) {
            globalVariables.restaurantNames.push(mid + multipleName);
          } else {
            nameUp = false;
          }
          if (nameDown && midName === globalVariables.restaurantInfo[mid - multipleName].toString().substring(0, globalVariables.nameSearch.length).toLowerCase()) {
            globalVariables.restaurantNames.push(mid - multipleName);
          } else {
            nameDown = false;
          }
          multipleName++;
        }
      } catch (e) {} //makes it so that if an error is found, rather than stopping the program, it will go through with the code
      break;

    } else if (nameCompare > 0) {
      max = mid
    }
  }
  if (nameCompare === 0) {
    for (var s = 0; s <= globalVariables.restaurantNames.length; s++) {
      console.log("Name: " + globalVariables.restaurantFile.results[globalVariables.restaurantNames[s]].name);
      console.log("Address: " + globalVariables.restaurantFile.results[globalVariables.restaurantNames[s]].formatted_address);
      console.log("Rating: " + globalVariables.restaurantFile.results[globalVariables.restaurantNames[s]].rating);
      console.log("Dietary Limitation it Serves: " + globalVariables.restaurantFile.results[globalVariables.restaurantNames[s]].restriction);
    }
    return 0;
  } else {
    console.log('No restaurant in Streetsville exists with that name');
    return 0;
  }
}
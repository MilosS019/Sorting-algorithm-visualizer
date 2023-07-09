let swaped_item_index1 = -1;
let swaped_item_index2 = -1;
let items_array = []
let legend_item_array = []

async function selection_sort(array){
    for(let i = 0; i < array.length; i++){
        selection_sort_inner_for(array, i)
        await timeOut(50)
    }
    console.log(array)
}

async function selection_sort_inner_for(array, i){
    let min_num = array[i]
    let min_num_index = i
    for(let j = i + 1; j < array.length; j++){
        if(array[j] < min_num){
            min_num = array[j]
            min_num_index = j
        }
    }
    let value = array[i]
    array[i] = min_num
    array[min_num_index] = value
    swap_elements(i, min_num_index)
}

async function insertion_sort(array){
    for(let i = 1; i < array.length; i++){
        await insertion_sort_inner_for(array, i)
    }
    console.log(array)
}

async function insertion_sort_inner_for(array, i){
    j = i - 1

    while(array[j] > array[i]){
        let element = array[j]
        array[j] = array[i]
        array[i] = element
        swap_elements(i,j)
        i--;
        j--;
        await timeOut(10)
        if(j < 0) return;
    }
}

async function bubble_sort(array){
    for(let i = 0; i < array.length; i++){
        await bubble_sort_inner_for(array)
    }  
}

async function bubble_sort_inner_for(array){
    for(let i = 1; i < array.length; i++){
        if(array[i - 1] > array[i]){
            let element = array[i];
            array[i] = array[i - 1]
            array[i - 1] = element
            swap_elements(i, i-1)
            await timeOut(10)
        }
    }
}

async function merge_sort(array, k){
    if(array.length <= 1)
        return array
    let middle_element = Math.floor(array.length / 2) 
    // console.log(array, k ,middle_element)
    // console.log("-----------------------------------------")

    let left_half = JSON.parse(JSON.stringify(array.slice(0, middle_element)))
    left_half = await merge_sort(left_half, k)
    let right_half = JSON.parse(JSON.stringify(array.slice(middle_element, array.length)))
    right_half = await merge_sort(right_half, k + middle_element)
    let i = 0;
    let j = 0;
    let x = 0
    console.log(k, middle_element)
    console.log(left_half, right_half)
    console.log("----------------------------------")
    while(i < left_half.length && j < right_half.length){
        if(left_half[i] < right_half[j]){
            swap_elements(k + x, k + legend_item_array.indexOf(left_half[i]))
            array[x] = left_half[i];
            await timeOut(50) 
            i++;
        }else{
            swap_elements(k + x, k + legend_item_array.indexOf(right_half[j]))
            array[x] = right_half[j];
            await timeOut(50) 
            j++;
        }
        x+=1
    }
    //This is just in case not all elements from the left half have been added
    for(let y = i; y < left_half.length; y++){
        array[x] = left_half[y];
        swap_elements(k + x, k + legend_item_array.indexOf(left_half[y]))
        await timeOut(50) 
        x += 1
    }
    //Same thing for the right side
    for(let y = j; y < right_half.length; y++){
        array[x] = right_half[y];
        swap_elements(k + x, k + legend_item_array.indexOf(right_half[y]))
        await timeOut(50) 
        x += 1
    }

    return array

}

function timeOut(ms){
    return new Promise(resolve => setTimeout(resolve, ms));
}


//Swap elements on the screen
function swap_elements(index1, index2){
    remove_class_from_previous_swap()    

    let item1 = items_array[index1]
    let item2 = items_array[index2]

    let item_legend1 = legend_item_array[index1]
    let item_legend2 = legend_item_array[index2]

    item1.classList.add("swaped")
    item2.classList.add("swaped")

    item1.style.order = index2
    item2.style.order = index1 

    item_legend1.style.order = index2
    item_legend2.style.order = index1

    swaped_item_index1 = index1
    swaped_item_index2 = index2    

    let value = item1 
    items_array[index1] = item2
    items_array[index2] = value

    value = item_legend1
    legend_item_array[index1] = item_legend2
    legend_item_array[index2] = value
}

//Removes color from previously swaped elements
function remove_class_from_previous_swap(){
    if(swaped_item_index1 == -1)
        return
    let item1 = items_array[swaped_item_index1]
    let item2 = items_array[swaped_item_index2]

    item1.classList.remove("swaped")
    item2.classList.remove("swaped")
}

//This fucntion displays the array on the screen
function display_array(array){
    let min_element = Math.min(...array);
    let max_element = Math.max(...array);
    let divider = max_element + Math.abs(min_element);
    let array_size = array.length;

    let item_width = 1000 / array_size;
    let graph = document.getElementById("graph");
    let values_legend = document.getElementById("values_legend");

    let index = 0
    for(let num of array){
        let item = create_graph_item(num, min_element, divider, item_width, index)
        let legend_item = create_legend_item(num, item_width, index)

        graph.appendChild(item)
        values_legend.appendChild(legend_item)
        index += 1
    }
}

//This function generates an array for testing
async function generate_array(){
    let array = []
    for(let i = 0; i < 10; i++){
        let num = generate_number(1000)
        array.push(num)
    }
    display_array(array)
    // selection_sort(array)
    // insertion_sort(array)
    // bubble_sort(array)
    console.log(array)
    await merge_sort(array, 0)
    console.log(array)
}

//Generation of random numbers for our testing array
function generate_number(num){
    let plusMinusNum = Math.round(Math.random())
    return plusMinusNum == 0 ? Math.round(Math.random() * num) : Math.round(Math.random() * -num)
}

//Creating a div representing our number in the graph
function create_graph_item(num, min_element, divider, item_width, index){
    let item = document.createElement("div");
    let height = 500 * ((num + Math.abs(min_element)) / divider);
    
    item.classList.add("item");
    
    item.style.width = item_width.toString() + "px";
    item.style.height = height.toString() + "px";
    item.style.order = index
    
    items_array.push(item)

    return item;
}

//Creating a div representing our number in the graph legend
function create_legend_item(num, item_width, index){
    let item = document.createElement("div");
    
    item.style.width = item_width.toString() + "px"
    item.style.order = index
    
    item.innerHTML = num.toString()
    
    item.classList.add("legend_item")
    
    legend_item_array.push(item)

    return item
}


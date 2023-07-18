let swaped_item_index1 = -1;
let swaped_item_index2 = -1;
let items_array = []
let legend_item_array = []
let numbers_array = []
let visualisation_speed = 50
let number_limit = 1000
let arr_size = 0

async function selection_sort(array, offset = 0){
    for(let i = 0; i < array.length; i++){
        array = await selection_sort_inner_for(array, i, offset)
        await time_out()
    }
    return array
}

async function selection_sort_inner_for(array, i, offset){
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
    swap_elements(i + offset, min_num_index + offset)
    return array
}

async function insertion_sort(array){
    for(let i = 1; i < array.length; i++){
        array = await insertion_sort_inner_for(array, i)
    }
    return array
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
        await time_out()
        if(j < 0) return;
    }
    return array
}

async function bubble_sort(array){
    for(let i = 0; i < array.length; i++){
        array = await bubble_sort_inner_for(array)
    }  
    return array
}

async function bubble_sort_inner_for(array){
    for(let i = 1; i < array.length; i++){
        if(array[i - 1] > array[i]){
            let element = array[i];
            array[i] = array[i - 1]
            array[i - 1] = element
            swap_elements(i, i-1)
            await time_out()
        }
    }
    return array
}

async function merge_sort(array, k = 0){
    if(array.length <= 1)
        return array
        
    let middle_element = Math.floor(array.length / 2) 


    let array_copy = JSON.parse(JSON.stringify(array))
    
    let left_half = await merge_sort(array_copy.slice(0, middle_element), k)
    let right_half = await merge_sort(array_copy.slice(middle_element, array.length), k + middle_element)
    //These copies are only neccesery for visualtiosation ---------
    let left_copy = JSON.parse(JSON.stringify(left_half));  //<---|
    let right_copy = JSON.parse(JSON.stringify(right_half));//<---|
    array_copy = left_copy.concat(right_copy)
    let i = 0;
    let j = 0;
    let x = 0

    while(i < left_half.length && j < right_half.length){
        if(left_half[i] < right_half[j]){
            array[x] = left_half[i];
            i++;
        }else{
            array[x] = right_half[j];
            j++;
        }
        x+=1
    }
    //This is just in case not all elements from the left half have been added
    for(let y = i; y < left_half.length; y++){
        array[x] = left_half[y];
        x += 1
    }
    //Same thing for the right side
    for(let y = j; y < right_half.length; y++){
        array[x] = right_half[y];
        x += 1
    }

    await visualizeMerge(array_copy, array, k)
    return array

}

//There is a bug with the visualisation for large number quantity
async function visualizeMerge(old_array, new_array, k){
    for(let i = 0; i < new_array.length; i++){
        let old_array_index = old_array.indexOf(new_array[i])
        let val = old_array[old_array_index]
        old_array[old_array_index] = old_array[i]
        old_array[i] = val
        swap_elements(k + i, k + old_array_index)
        await time_out()
    }
}

async function quick_sort(array, low = 0, depth = 0){
    if (array.length <= 1)
        return array
    let pivot = array[array.length - 1]
    let higher_number_index = -1
    for(let i = 0; i < array.length - 1; i++){
        if(array[i] <= pivot){
            higher_number_index += 1
            let value = array[i]
            array[i] = array[higher_number_index]
            array[higher_number_index] = value
            swap_elements(low + i, low + higher_number_index)
            await time_out()
        }
    }
    higher_number_index += 1
    let value = array[higher_number_index]
    array[higher_number_index] = array[array.length - 1]
    array[array.length - 1] = value
    swap_elements(low + higher_number_index, low + array.length - 1)
    await time_out()
    let left_half = await quick_sort(array.slice(0, higher_number_index), low, depth + 1)
    let right_half = await quick_sort(array.slice(higher_number_index + 1, array.length), low + higher_number_index + 1, depth + 1) 
    return [...left_half, pivot, ...right_half]
}

async function heap_sort(array){
    let array_size = array.length;

    for(let i = Math.floor(array_size / 2) - 1; i >= 0; i--)
        array = await heapify(array, array_size, i, 0);

    console.log(array)
    
    let last_element_index = array_size - 1;
    let sorted_array = []
    for(let i = 0; i < array_size; i++){
        sorted_array.push(array[0])
        array[0] = array[last_element_index];
        array = array.splice(0, last_element_index)
        last_element_index -= 1
        swap_elements(0, array_size - i - 1)
        // time_out(50)
        array = await heapify(array, array_size, 0)
    }

    console.log(sorted_array)
    
}

async function heapify_one_level(array, array_size, i){
    let left_child_index = 2 * i + 1;
    let right_child_index = 2 * i + 2;
    let swaped_element_index = i
    let swaped = false;
    let largest_element_index = i  
    if(left_child_index < array_size){
        if(array[left_child_index] > array[largest_element_index]){
            largest_element_index = left_child_index
        }
    }
    if(right_child_index < array_size){
        if(array[right_child_index] > array[largest_element_index]){
            largest_element_index = right_child_index
        }
    }

    if(largest_element_index != i){
        swap_elements(i, largest_element_index)
        await time_out()
        let value = array[i]
        array[i] = array[largest_element_index]
        array[largest_element_index] = value
        swaped_element_index = largest_element_index
        swaped = true
    }

    return [swaped_element_index, array, swaped];
}

async function heapify(array, array_size, i){
    if(i >= array_size)
        return array
    let return_values = await heapify_one_level(array, array_size, i)
    let next_element_index = return_values[0]
    array = return_values[1]
    // console.log(array)
    let swaped = return_values[2]
    if(!swaped)
        return array
    return heapify(array, array_size, next_element_index)
}

async function bucket_sort(array){
    let empty_arr = []
    let buckets_num = Math.round(arr_size / 10)
    let divider = number_limit * 2 / buckets_num
    for(let i = 0; i < buckets_num + 1; i++){
        empty_arr.push([])
    } 

    for(let num of array){
        empty_arr[Math.round((num + number_limit) / divider)].push(num)
    }

    let offset = 0
    for(let i = 0; i <= buckets_num; i++){
        if(i == 0)
            empty_arr[i] = await selection_sort(empty_arr[i])
        else{
            offset += empty_arr[i - 1].length
            empty_arr[i] = await selection_sort(empty_arr[i], offset)
        }
    }
    console.log(empty_arr)
    return empty_arr
}

function time_out(){
    return new Promise(resolve => setTimeout(resolve, visualisation_speed));
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

    value = numbers_array[index1]
    numbers_array[index1] = numbers_array[index2]
    numbers_array[index2] = value
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

    graph.innerHTML = ""
    values_legend.innerHTML = ""
    items_array = []
    numbers_array = []
    legend_item_array = []

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
    let size, speed, func;
    [size, speed, func] = await get_input_field_values()
    visualisation_speed = speed
    arr_size = size
    for(let i = 0; i < size; i++){
        let num = generate_number(number_limit)
        array.push(num)
    }
    display_array(array)
    array = func(array)
}

async function get_input_field_values(){
    let array_size_div = document.getElementById("array_size");
    let speed_div = document.getElementById("speed");
    let algorythm_div = document.getElementById("algorythms")

    let size_value = array_size_div.value
    let speed_value = speed_div.value
    let algorythm_value = algorythm_div.value
    console.log(algorythm_value)
    let sorting_func = get_sorting_function(algorythm_value)
    if(!sorting_func) return
    try{
        let size_int = parseInt(size_value)
        let speed_int = parseInt(speed_value)
        return [size_int, speed_int, sorting_func]
    }catch{
        throw Error("Invalid input")
    }
} 

function get_sorting_function(algorythm){
    console.log(algorythm)
    switch(algorythm){
        case 'selection':
            return selection_sort
        case 'insertion':
            return insertion_sort
        case 'bubble':
            return bubble_sort
        case 'merge':
            return merge_sort
        case 'quick':
            return quick_sort
        case 'heap':
            return heap_sort
        case 'bucket':
            return bucket_sort
        default:
            alert("No algorytm selected")
            return false
    }
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
    numbers_array.push(num)

    return item
}


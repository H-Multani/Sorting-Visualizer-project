const n=50;

const arr=[];

// initialize kardo jab refresh ho toh ek baar by default, nai karoge toh refresh karne par empty rahega area, until we press init
init();

// initialize the array
function init(){
    for(let i=0;i<n;i++){
        arr[i]=Math.random();
    }
    // initialize karke ek baar show toh karo bar ko
    showbars();
}


// har change ko animate karne wala function
function animatestuff(swaps){
    if(swaps.length==0){
        // animation done, kaam khatam
        return;
    }
    // ab swaps array par iterate karo, and har swap maar kar new bars show karo
    
    // current swap wala element nikalo
    const [i,j]=swaps.shift();
    // swap macha do
    [arr[i],arr[j]]=[arr[j],arr[i]];
    
    // ab bars show karo updated
    showbars();
    
    // ab timeout laga do so that next swap se pehle thoda time lage, basically apan ko dikhe ki kya chal rha hai, kaise swaps hore hai
    setTimeout(function(){
        animatestuff(swaps);
    },50);
}

// add the values as individual bars, also show the bars
function showbars(){
    // naye waale bars show karne se pehle purane wale koi bhi bars ho toh unko alag kardo, ie empty the div before showing the bars
    container.innerHTML="";
    
    // ab bars show karo
    for(let i=0;i<arr.length;i++){
        const bar=document.createElement("div");
        // bar length is a % of height of container
        bar.style.height=arr[i]*100+"%";
        
        // no need for all this, bar me css laga diya style.css file me 
        // // constant bar width
        // bar.style.width="5px";
        // // background color to each bar
        // bar.style.background="black";
        // // add the bar to the container div(html)
        
        // html me bar naam ka class nai hai lekin, toh bar class daal do html me 
        bar.classList.add("bar");
        
        container.appendChild(bar);
    }
    
}

// play karo animation ko
function playbubblesort(){
    // abhi bas bubblesort lagao, swaps nikaal lo
    
    // original ko sort mat karo, copy banao original ki usko sort karo, nai toh swaps animate hone me lafda karega
    const copy=[...arr];
    const swaps=bubblesort(copy);
    
    // // phir updated bars show karo
    // showbars();
    
    // swaps use karke animate karo ek ek step ko
    animatestuff(swaps);
}
// sorting algo lagao ab
// bubble sort
function bubblesort(temparr){
    // isme sab ek baari me ho rha hai seedhe sedhe, animate karo, since changes jo hore hai vo swapping me hi hore hai, hence swaps record karlo best
    const swaps=[];
    // return swaps;
    var i, j, temp;
    var swapped;
    for (i = 0; i < n - 1; i++){
        swapped = false;
        for (j = 0; j < n - i - 1; j++){
            if (temparr[j] > temparr[j + 1]) 
            {
                // Swap arr[j] and arr[j+1]
                temp = temparr[j];
                temparr[j] = temparr[j + 1];
                temparr[j + 1] = temp;
                swaps.push([j,j+1]);
                swapped = true;
            }
        }
        
        // IF no two elements were 
        // swapped by inner loop, then break
        if (swapped == false)
            break;
    }
    
    // ab swaps return kardo, ye bad me kaam aayega animation ke
    return swaps
}


function playmergesort(){
    const copy=[...arr];
    const actions= mergesort(copy);



    let i=0;
    step();

    function step(){
        if(i>=actions.length) return;   

        const curraction=actions[i];

        if(curraction.type=="compare"){
            const {idx1,idx2}=curraction.indices;

            // compare karne ke liye ye karo, highlight ye dono idx wale elements
        }
        else if(curraction.type=="overwrite"){
            // const [idx,val]=curraction.indices;
            const idx=curraction.index;
            const val=curraction.value;

            // update the array
            arr[idx]=val;
            // visualize the change
            showbars();
        }

        i++;
        setTimeout(step,10);
    }

}

function mergesort(temparr){
    const actions=[];
    // auxilary array 
    // const aux=[...temparr];

    function merge(start,mid,end){
        const n1 = mid - start + 1;
        const n2 = end - mid;

        const L = new Array(n1);
        const R = new Array(n2);

        for (let i = 0; i < n1; i++)
            L[i] = temparr[start + i];
        for (let j = 0; j < n2; j++)
            R[j] = temparr[mid + 1 + j];

        let i=0;
        let j=0;
        let k=start;

        while(i<n1 && j<n2){
            //record comparison
            actions.push({type:"compare",indices:[i,j]});

            if(L[i]<=R[j]){
                // record movement
                actions.push({type:"overwrite",index:k,value:L[i]});
                temparr[k]=L[i];
                i++;
            }
            else{
                // record movement
                actions.push({type:"overwrite",index:k,value:R[j]});
                temparr[k]=R[j];
                j++;
            }
            k++;
        }

        // copy remaining elements frm left half
        while(i<n1){
            actions.push({type:"overwrite",index:k,value:L[i]});
            temparr[k]=L[i];
            k++;
            i++;
        }
        // copy remaining elements frm right half
        while(j<n2){
            actions.push({type:"overwrite",index:k,value:R[j]});
            temparr[k]=R[j];
            k++;
            j++;
        }
    }

    function mergesortsplitter(start,end){
        if(start>=end) return;

        const mid=Math.floor((start+end)/2);

        // sort left half
        mergesortsplitter(start,mid);
        // sort right half
        mergesortsplitter(mid+1,end);
        // merge both halves
        merge(start,mid,end);
    }

    mergesortsplitter(0,temparr.length-1);

    return actions;
}





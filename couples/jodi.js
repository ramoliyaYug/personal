const boysNames = [
    "Abhijit Sahoo",
    "Abhishek Ratnakar",
    "Adarsh Jaiswal",
    "Akshat Baranwal",
    "Anurag Kumar",
    "Arpit Tripathi",
    "Aryan Singh",
    "Athar Ramzan",
    "Darshit Sengra",
    "Devesh Verma",
    "Gopi Kishan",
    "Himkar Singh",
    "Kalash Mishra",
    "Kasula Mahendra",
    "Kharuhang Rai",
    "Kushagra Pandey",
    "Jagdish Sunil Pednekar",
    "Manit Choudahary",
    "Muhammed Ayaan Taimur",
    "Nikhil Kumar",
    "Parmardeep Kumar",
    "Pravesh Arya",
    "Raj Aryan",
    "Raj Shekhar",
    "Ritesh Sharma",
    "Sachin Yadav",
    "Mattapalli Srinath Rao",
    "Soham Pal",
    "Soumyaditya Batabyal",
    "Vedant",
    "Aamir Belal Khan",
    "Abhishek Kumar Chauhan",
    "Aditya Pratap",
    "Agam Kundu",
    "Anurag Khubalkar",
    "Arpit Mishra",
    "Arjun Prakash Rana",
    "Aryan Burnwal",
    "Ashutoshmani Shukla",
    "Chaitanya",
    "Deepen",
    "Gautam Krishn Sharma",
    "Himanshu",
    "Karan Vishwajyoth",
    "Kumar Aditya",
    "Manish YM",
    "Mayank Sharma",
    "Narendra Patel",
    "Palakurthi Sai Bharadwaja",
    "Prakash Bhattacharya",
    "Priyanshu Kumar",
    "Ravish",
    "Saahi Dubey",
    "Sancheet Kumar",
    "Shivam Chaudhary",
    "Shrey Rathore",
    "Sofiyan Shaikh",
    "Tanishq Nitin Bhosale",
    "Shwetansh Singh",
    "Soni Jay Gaurang",
    "Vaibhav Kumawat",
    "Sanket Jadhav",
    "Aditya Kumar Sahoo",
    "Anshuman Ojha",
    "Anupam Singh",
    "Arpit Maurya",
    "Arya Sonwane",
    "Ashutosh Kumar Singh",
    "Avan",
    "Deepanshu Yadav",
    "Divyansh Gupta",
    "Priyanshu Pandey",
    "Harshit Gandhi",
    "Kallal Mukherjee",
    "Krishna Aggarwal",
    "Manish Kumar",
    "Masam Varshith Yadav",
    "Nagilla Aaradhya",
    "Om Sharma",
    "Pratyksh Gupta",
    "Priyanshu",
    "Rishab",
    "Rohit Kumar Modi",
    "Sahil",
    "Shiva MR",
    "Utkarsh Pandey",
    "Vishvendra Sangwa",
    "Yug Ramoliya",
    "Shubham Mishra",
    "Sonam",
    "Syed Abdur Rehman",
    "Zainul Abedeen",
    "Saurabh Singh",
    "Shashank Goel",
    "Abhijit Das",
    "Abhishek Suryavanshi",
    "Aditya",
    "Aditya Jagrani",
    "Anshman Singh",
    "Arnab Boro",
    "Arvind Kumar",
    "Aryansh Chandra",
    "Atharva Vinod Babhulgaonkar",
    "Debashish Giri",
    "Devesh Singh",
    "Hardik Tiwari",
    "Jay Sandeep Sawant",
    "Krishant Tanti",
    "Laksh Oswal",
    "Lakshya Yadav",
    "Manoj Chandrappa Lamani",
    "Muzaffar Hossain",
    "Nitish Sharma",
    "Pranjal Negi",
    "Praveen Kumar",
    "Prince Kumar Maurya",
    "Raunak Kumar",
    "Rituraj Bhattacharjee",
    "Rohan Saini",
    "Rudra Pratap Singh",
    "Shreedhar Agrawal",
    "Som Kumar",
    "Soumyajit Nandi",
    "Shivam Sunil Kalangan",
    "Yugal Manoj Sadhwani",
    "Chandan K T",
  ];
  
  const girlsName = [
    "Keerthika Jain",
    "Anvita S Reddy",
    "Bhumi Sachdev",
    "Divyanteeka",
    "Priyanka Chauhan",
    "Sneha Chaurasia",
    "Saniya Singh",
    "Shivadharushni M",
    "Tanzila Tahreem",
    "Shivika Omprakash",
    "Annu",
    "Divyanshi Vinod Talreja",
    "Kanishka",
    "Saloni Kumari",
    "Sristy Anand",
    "Sejal Kumari",
    "Vijeta Narwal",
    "Ananya Chavan",
    "Ipshita Baral",
    "Kurapati Sree Varun Aahil",
    "Nivedita",
    "Rhythm Gulia",
    "Riya Kumari",
    "Tarmanjeet Kaur",
    "Varsha R",
    "Ananya Kolekar",
    "Deepanshi",
    "Gunjan Maheswari",
    "Nidhi Singh",
    "Priya",
    "Priyanka Potlia",
    "Tanya",
  ];
  
const letterToNumber = {
    a: 1, b: 2, c: 3, d: 4, e: 5, f: 6, g: 7, h: 8, i: 9,
    j: 1, k: 2, l: 3, m: 4, n: 5, o: 6, p: 7, q: 8, r: 9,
    s: 1, t: 2, u: 3, v: 4, w: 5, x: 6, y: 7, z: 8
};

function calculateNumerologyNumber(name) {
    let sum = 0;
    name = name.trim().toLowerCase().replace(/\s+/g, '');
    for (let char of name) {
        if (letterToNumber[char]) {
            sum += letterToNumber[char];
        }
    }
    while (sum > 9 && sum !== 11 && sum !== 22 && sum !== 33) {
        sum = sum.toString().split('').reduce((acc, num) => acc + parseInt(num), 0);
    }
    return sum;
}

function calculateCompatibility(name1, name2) {
    let number1 = calculateNumerologyNumber(name1);
    let number2 = calculateNumerologyNumber(name2);
    let compatibility = Math.abs(number1 - number2) * 11;
    return Math.min(compatibility, 100); // Cap at 100%
}

function displayResult(compatibility, name1, name2) {
    let resultContainer = document.getElementById('result');
    const pairResult = `
        <div>
            <h3>Compatibility:</h3>
            <p><strong>${name1}</strong> & <strong>${name2}</strong> have a <span class="number">${compatibility}%</span> compatibility!</p>
        </div>
    `;
    resultContainer.innerHTML = pairResult; // Show the current pair's result
}

function startAutoCompatibility() {
    let pairs = generateAllPairs(boysNames, girlsName);

    let index = 0;

    function processNextPair() {
        if (index >= pairs.length) {
            clearInterval(intervalId);
            document.getElementById('result').innerHTML += `<h3>All pairs have been displayed!</h3>`;
            return;
        }

        const { name1, name2, compatibility } = pairs[index];
        displayResult(compatibility, name1, name2);
        index++;
    }

    processNextPair(); // Display the first pair immediately
    const intervalId = setInterval(processNextPair, 5000); // Show each pair every 5 seconds
}

function generateAllPairs(boys, girls) {
    let pairs = [];
    for (let boy of boys) {
        for (let girl of girls) {
            const compatibility = calculateCompatibility(boy, girl);
            pairs.push({ name1: boy, name2: girl, compatibility });
        }
    }
    return pairs;
}

document.getElementById('calculate-btn').addEventListener('click', startAutoCompatibility);

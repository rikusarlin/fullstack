interface BmiInput {
    height: number;
    weight: number;
}

const calculateBmi = (height: number, weight: number): string => {
    const bmiValue = weight / ((height/100)*(height/100));
    let retVal = "Obese Class I (Very severily obese)";
    if(bmiValue < 15) {
        retVal = "Very severily underweight";
    } else if(bmiValue >= 15 && bmiValue < 16) {
        retVal = "Severily underweight";
    } else if(bmiValue >= 16 && bmiValue < 18.5) {
        retVal = "Underweight";
    } else if(bmiValue >= 18.5 && bmiValue < 25) {
        retVal = "Normal (healthy weight)";
    } else if(bmiValue >= 25 && bmiValue < 30) {
        retVal = "Overweight";
    } else if(bmiValue >= 30 && bmiValue < 35) {
        retVal = "Obese Class I (Moderately obese)";
    } else if(bmiValue >= 35 && bmiValue < 40) {
        retVal = "Obese Class II (Severely obese)";
    }
    return retVal;
  };
  
  const parseBmiArguments = (args: Array<string>): BmiInput => {
    if (args.length < 2) throw new Error('Not enough arguments');
    if (args.length > 2) throw new Error('Too many arguments');
  
    if (isNaN(Number(args[0]))) {
        throw new Error(`Height needs to be a number, and ${args[0]} is not!`);
    }
    if (isNaN(Number(args[1]))) {
        throw new Error(`Weight needs to be a number, and ${args[1]} is not!`);
    }

    return {
        height: Number(args[0]),
        weight: Number(args[1])
    };
  };


  try {
    const bmiData = parseBmiArguments(process.argv.splice(2));
    console.log(calculateBmi(bmiData.height, bmiData.weight));
  } catch (e) {
    if(e instanceof Error){
        console.log('Error, something bad happened, message: ', e.message);
    }
  }

  export {BmiInput, calculateBmi, parseBmiArguments};

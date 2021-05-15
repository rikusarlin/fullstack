interface ExerciseData {
    daily_exercises: Array<number>;
    target: number;
}

interface ExerciseRating {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

const rateExercise = (excerciseHours: Array<number>, target: number): ExerciseRating => {
    const numberOfDays = excerciseHours.length;
    const sumOfHours = excerciseHours.reduce((a, b) => a + b, 0);
    const trainingDays = excerciseHours.filter(item => item > 0).length;
    const averageHours = sumOfHours / numberOfDays;
    let targetMet = false;
    if(averageHours >= target) {
        targetMet = true;
    }
    let rating = 2;
    let ratingDescription = "Target met, but you can train even more!";
    if(averageHours > 1.2 * target){
        rating = 3;
        ratingDescription = "Trained much more than target, great!";
    } else if(averageHours < 0.8 * target){
        rating = 1;
        ratingDescription = "You have been a little lazy lately!";
    } else if(averageHours >= (0.8 * target) && averageHours < (1.0 * target)){
        rating = 1;
        ratingDescription = "Not too bad but could be better!";
    } 
    return {
        periodLength: numberOfDays,
        trainingDays: trainingDays,
        success: targetMet,
        target: target,
        average: averageHours,
        rating: rating,
        ratingDescription: ratingDescription,
    };
};

const parseExerciseArguments = (target:string, exerciseData: Array<string>): ExerciseData => {
    for(let i=0; i<(exerciseData.length); i++){
        if (isNaN(Number(exerciseData[i]))) {
            throw new Error(`Target hours need to be numbers, and ${exerciseData[i]} is not!`);
        }    
    }

    if (isNaN(Number(target))) {
        throw new Error(`Target needs to be a number, and ${target} is not!`);
    }

    return {
        daily_exercises: exerciseData.map(Number),
        target: Number(target)
    };
};


try {
    const exerciseData = parseExerciseArguments(process.argv[2], process.argv.splice(3));
    console.log(rateExercise(exerciseData.daily_exercises, exerciseData.target));
} catch (e) {
    if(e instanceof Error){
        console.log('Error, something bad happened, message: ', e.message);
    }
}

export {ExerciseRating, ExerciseData, rateExercise, parseExerciseArguments};

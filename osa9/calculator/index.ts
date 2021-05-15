/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import express from 'express';
import bodyParser from 'express';
import {calculateBmi, parseBmiArguments} from './bmiCalculator';
import {rateExercise, parseExerciseArguments} from './exerciseCalculator';

const app = express();
app.use(bodyParser.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (_req, res) => {
    try{
        const heightStr = String(_req.query.height);
        const weightStr = String(_req.query.weight);
        const bmiData = parseBmiArguments([heightStr, weightStr]);
        const bmiResult:string = (calculateBmi(bmiData.height, bmiData.weight));
        res.json({
            height: bmiData.height,
            weight: bmiData.weight,
            bmi: bmiResult
        });
    } catch (e) {
        if(e instanceof Error){
            res.status(400).json({
                error: e.message
            });
        }
    }
  });

app.post('/exerciseRating', (_req, res) => {
    try{
        const postData = _req.body;
        const hasExerciseData = Object.keys(postData).includes("daily_exercises");
        const hasTargetData = Object.keys(postData).includes("target");
        
        console.log(`postData: ${postData}`);
        console.log(`Object.keys(postData): ${Object.keys(postData)}`);
        console.log(`hasExerciseData: ${hasExerciseData}`);
        console.log(`hasTargetData: ${hasTargetData}`);

        if(!hasExerciseData || !hasTargetData){
            throw new Error(`parmeters missing`);
        }

        try{
            const exercises:Array<string> = postData.daily_exercises;
            const target:string = postData.target;
            console.log(`exercises: ${exercises}`);
            console.log(`target: ${target}`);
                const exerciseData = parseExerciseArguments(target, exercises);
            const exerciseRatingResult = rateExercise(exerciseData.daily_exercises, exerciseData.target);
            res.json(exerciseRatingResult);
        } catch (e) {
            console.log(e.message);
            throw new Error("malformatted parameters");
        }

    } catch (e) {
        //console.log(e);
        if(e instanceof Error){
            res.status(400).json({
                error: e.message
            });
        }
    }
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
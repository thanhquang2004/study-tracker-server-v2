import { GoogleGenerativeAI } from '@google/generative-ai';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class RoadmapsService {
  private genAI: any;
  private model: any;
  private generationConfig: any;

  constructor(private readonly configService: ConfigService) {
    this.genAI = new GoogleGenerativeAI(
      'AIzaSyDObE4uFsG-qW5X_e_iE35jnujxEqDVy3M',
    );

    this.model = this.genAI.getGenerativeModel({
      model: 'gemini-1.5-flash-8b',
    });

    this.generationConfig = {
      temperature: 0.8,
      topP: 0.95,
      topK: 40,
      maxOutputTokens: 8192,
      responseMimeType: 'application/json',
      responseSchema: {
        type: 'object',
        properties: {
          nextQuestion: {
            type: 'string',
          },
          info: {
            type: 'string',
          },
          suggestAnswer: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                content: {
                  type: 'string',
                },
              },
            },
          },
        },
        required: ['nextQuestion', 'info'],
      },
    };
  }

  testGateway() {
    return 'Hello from the Study Tracker Gateway!';
  }

  async generateQuestion(info: string) {
    console.log('Generating question with info:', info);
    const parts = [
      {
        text: "input: Based on the following information: [Want to study: Guitar], generate a follow-up assessment question to determine the user's proficiency level. The question should help identify specific skills or knowledge areas related to Guitar, and avoid repeating any information already provided in the array. Use the following JSON format:\n{\n  'nextQuestion': 'Your quiz question to assess proficiency',\n  'info': 'Your information summary',\n  'suggestAnswer': [\n    {'content': 'Answer A'},\n    {'content': 'Answer B'},\n    {'content': 'Answer C'}\n  ]\n}\nIf the input is not related to the learnable, return the following JSON format:\n{ 'msg': \"Inappropriate request\"}",
      },
      {
        text: "output: {\n  'nextQuestion': 'What is your current skill level with the guitar?',\n  'info': 'Guitar Skill Level',\n  'suggestAnswer': [\n    {'content': 'Beginner - I have never played'},\n    {'content': 'Intermediate - I know a few chords and songs'},\n    {'content': 'Advanced - I can play complex songs and improvise'}\n  ]\n}",
      },
      {
        text: "input: Based on the following information: [Want to study: Guitar; Guitar Skill Level: Beginner - I have never played], generate a follow-up assessment question to determine specific skills or techniques related to Guitar. The question should help assess the user's familiarity with basic techniques, and avoid repeating any information already provided in the array. Use the following JSON format:\n{\n  'nextQuestion': 'Your quiz question to assess proficiency',\n  'info': 'Your information summary',\n  'suggestAnswer': [\n    {'content': 'Answer A'},\n    {'content': 'Answer B'},\n    {'content': 'Answer C'}\n  ]\n}\nIf the input is not related to the learnable, return the following JSON format:\n{ 'msg': \"Inappropriate request\"}",
      },
      {
        text: "output: {\n  'nextQuestion': 'Are you familiar with basic guitar chords (e.g., G, C, D)?',\n  'info': 'Basic Chords Familiarity',\n  'suggestAnswer': [\n    {'content': 'No, I am not familiar'},\n    {'content': 'Yes, I know a few basic chords'},\n    {'content': 'Yes, I am comfortable with most common chords'}\n  ]\n}",
      },
      {
        text: "input: Based on the following information: [Want to study: Guitar; Guitar Skill Level: Beginner - I have never played; Basic Chords Familiarity: No, I am not familiar], generate a follow-up assessment question to explore fingerstyle or strumming preferences. The question should help assess which playing style the user is interested in, and avoid repeating any information already provided in the array. Use the following JSON format:\n{\n  'nextQuestion': 'Your quiz question to assess proficiency',\n  'info': 'Your information summary',\n  'suggestAnswer': [\n    {'content': 'Answer A'},\n    {'content': 'Answer B'},\n    {'content': 'Answer C'}\n  ]\n}\nIf the input is not related to the learnable, return the following JSON format:\n{ 'msg': \"Inappropriate request\"}",
      },
      {
        text: "output: {\n  'nextQuestion': 'Which guitar playing style are you most interested in learning?',\n  'info': 'Preferred Playing Style',\n  'suggestAnswer': [\n    {'content': 'Fingerstyle'},\n    {'content': 'Strumming with a pick'},\n    {'content': 'Not sure, I want to try both'}\n  ]\n}",
      },
      {
        text: "input: Based on the following information: [Want to study: Guitar; Guitar Skill Level: Beginner - I have never played; Basic Chords Familiarity: No, I am not familiar; Preferred Playing Style: Fingerstyle], generate a follow-up assessment question to determine your interest in learning musical theory. The question should help assess whether the user prefers practical skills over theoretical knowledge, and avoid repeating any information already provided in the array. Use the following JSON format:\n{\n  'nextQuestion': 'Your quiz question to assess proficiency',\n  'info': 'Your information summary',\n  'suggestAnswer': [\n    {'content': 'Answer A'},\n    {'content': 'Answer B'},\n    {'content': 'Answer C'}\n  ]\n}\nIf the input is not related to the learnable, return the following JSON format:\n{ 'msg': \"Inappropriate request\"}",
      },
      {
        text: "output: {\n  'nextQuestion': 'Are you interested in learning music theory along with guitar techniques?',\n  'info': 'Interest in Music Theory',\n  'suggestAnswer': [\n    {'content': 'Yes, I want to learn the theory'},\n    {'content': 'No, I prefer to focus on practical skills only'},\n    {'content': 'Maybe, I am open to both'}\n  ]\n}",
      },
      {
        text: "input: Based on the following information: [Want to study: Guitar; Guitar Skill Level: Beginner - I have never played; Basic Chords Familiarity: No, I am not familiar; Preferred Playing Style: Fingerstyle; Interest in Music Theory: Yes, I want to learn the theory], generate a follow-up assessment question to determine the user's familiarity with tuning and maintaining a guitar. The question should help assess basic technical knowledge and avoid repeating any information already provided in the array. Use the following JSON format:\n{\n  'nextQuestion': 'Your quiz question to assess proficiency',\n  'info': 'Your information summary',\n  'suggestAnswer': [\n    {'content': 'Answer A'},\n    {'content': 'Answer B'},\n    {'content': 'Answer C'}\n  ]\n}\nIf the input is not related to the learnable, return the following JSON format:\n{ 'msg': \"Inappropriate request\"}",
      },
      {
        text: "output: {\n  'nextQuestion': 'Are you familiar with how to tune and maintain your guitar?',\n  'info': 'Tuning and Maintenance Knowledge',\n  'suggestAnswer': [\n    {'content': 'No, I do not know how to tune or maintain'},\n    {'content': 'Yes, I can tune but I need help with maintenance'},\n    {'content': 'Yes, I know how to tune and maintain properly'}\n  ]\n}",
      },
      {
        text: "input: Based on the following information: [Want to study: Piano], generate a follow-up assessment question to determine the user's proficiency level. The question should help identify specific skills or knowledge areas related to Piano, and avoid repeating any information already provided in the array. Use the following JSON format:\n{\n  'nextQuestion': 'Your quiz question to assess proficiency',\n  'info': 'Your information summary',\n  'suggestAnswer': [\n    {'content': 'Answer A'},\n    {'content': 'Answer B'},\n    {'content': 'Answer C'}\n  ]\n}\nIf the input is not related to the learnable, return the following JSON format:\n{ 'msg': \"Inappropriate request\"}",
      },
      {
        text: "output: {\n  'nextQuestion': 'What is your current level of piano playing experience?',\n  'info': 'Piano Skill Level',\n  'suggestAnswer': [\n    {'content': 'Beginner - I have never played piano'},\n    {'content': 'Intermediate - I can play simple songs'},\n    {'content': 'Advanced - I can read sheet music and play complex pieces'}\n  ]\n}",
      },
      {
        text: "input: Based on the following information: [Want to study: Piano; Piano Skill Level: Beginner - I have never played piano], generate a follow-up assessment question to determine specific skills or techniques related to piano. The question should help assess the user's familiarity with basic piano knowledge, and avoid repeating any information already provided in the array. Use the following JSON format:\n{\n  'nextQuestion': 'Your quiz question to assess proficiency',\n  'info': 'Your information summary',\n  'suggestAnswer': [\n    {'content': 'Answer A'},\n    {'content': 'Answer B'},\n    {'content': 'Answer C'}\n  ]\n}\nIf the input is not related to the learnable, return the following JSON format:\n{ 'msg': \"Inappropriate request\"}",
      },
      {
        text: "output: {\n  'nextQuestion': 'Are you familiar with basic piano finger positioning?',\n  'info': 'Basic Piano Finger Positioning',\n  'suggestAnswer': [\n    {'content': 'No, I am not familiar'},\n    {'content': 'Yes, I know the basics but need practice'},\n    {'content': 'Yes, I am comfortable with finger positioning'}\n  ]\n}",
      },
      {
        text: "input: Based on the following information: [Want to study: Piano; Piano Skill Level: Beginner - I have never played piano; Basic Piano Finger Positioning: No, I am not familiar], generate a follow-up assessment question to explore your interest in learning music theory. The question should help assess whether the user prefers theoretical knowledge along with practical piano skills, and avoid repeating any information already provided in the array. Use the following JSON format:\n{\n  'nextQuestion': 'Your quiz question to assess proficiency',\n  'info': 'Your information summary',\n  'suggestAnswer': [\n    {'content': 'Answer A'},\n    {'content': 'Answer B'},\n    {'content': 'Answer C'}\n  ]\n}\nIf the input is not related to the learnable, return the following JSON format:\n{ 'msg': \"Inappropriate request\"}",
      },
      {
        text: "output: {\n  'nextQuestion': 'Would you like to learn music theory alongside piano techniques?',\n  'info': 'Interest in Music Theory',\n  'suggestAnswer': [\n    {'content': 'Yes, I want to learn music theory'},\n    {'content': 'No, I prefer to focus on playing'},\n    {'content': 'Maybe, I am open to learning both'}\n  ]\n}",
      },
      {
        text: "input: Based on the following information: [Want to study: Drawing], generate a follow-up assessment question to determine the user's drawing experience level. The question should help identify specific skills or knowledge areas related to Drawing, and avoid repeating any information already provided in the array. Use the following JSON format:\n{\n  'nextQuestion': 'Your quiz question to assess proficiency',\n  'info': 'Your information summary',\n  'suggestAnswer': [\n    {'content': 'Answer A'},\n    {'content': 'Answer B'},\n    {'content': 'Answer C'}\n  ]\n}\nIf the input is not related to the learnable, return the following JSON format:\n{ 'msg': \"Inappropriate request\"}",
      },
      {
        text: "output: {\n  'nextQuestion': 'What is your current drawing experience level?',\n  'info': 'Drawing Experience Level',\n  'suggestAnswer': [\n    {'content': 'Beginner - I have never practiced drawing seriously'},\n    {'content': 'Intermediate - I draw regularly, but need improvement'},\n    {'content': 'Advanced - I can draw detailed pieces and use techniques confidently'}\n  ]\n}",
      },
      {
        text: "input: Based on the following information: [Want to study: Drawing; Drawing Experience Level: Beginner - I have never practiced drawing seriously], generate a follow-up assessment question to determine the user’s familiarity with basic drawing techniques like shading and sketching. The question should help assess technical skills and avoid repeating any information already provided in the array. Use the following JSON format:\n{\n  'nextQuestion': 'Your quiz question to assess proficiency',\n  'info': 'Your information summary',\n  'suggestAnswer': [\n    {'content': 'Answer A'},\n    {'content': 'Answer B'},\n    {'content': 'Answer C'}\n  ]\n}\nIf the input is not related to the learnable, return the following JSON format:\n{ 'msg': \"Inappropriate request\"}",
      },
      {
        text: "output: {\n  'nextQuestion': 'Are you familiar with basic drawing techniques such as sketching and shading?',\n  'info': 'Basic Drawing Techniques',\n  'suggestAnswer': [\n    {'content': 'No, I am not familiar with these techniques'},\n    {'content': 'Yes, I know the basics but need more practice'},\n    {'content': 'Yes, I am comfortable with sketching and shading'}\n  ]\n}",
      },
      {
        text: "input: Based on the following information: [Want to study: Drawing; Drawing Experience Level: Beginner - I have never practiced drawing seriously; Basic Drawing Techniques: No, I am not familiar with these techniques], generate a follow-up assessment question to explore the user’s interest in learning anatomy drawing or landscape drawing. The question should help assess interest in different drawing subjects and avoid repeating any information already provided in the array. Use the following JSON format:\n{\n  'nextQuestion': 'Your quiz question to assess proficiency',\n  'info': 'Your information summary',\n  'suggestAnswer': [\n    {'content': 'Answer A'},\n    {'content': 'Answer B'},\n    {'content': 'Answer C'}\n  ]\n}\nIf the input is not related to the learnable, return the following JSON format:\n{ 'msg': \"Inappropriate request\"}",
      },
      {
        text: "output: {\n  'nextQuestion': 'Are you more interested in learning anatomy drawing or landscape drawing?',\n  'info': 'Preferred Drawing Subject',\n  'suggestAnswer': [\n    {'content': 'Anatomy drawing'},\n    {'content': 'Landscape drawing'},\n    {'content': 'I want to explore both'}\n  ]\n}",
      },
      {
        text: "input: Based on the following information: [Want to study: Drawing; Drawing Experience Level: Beginner - I have never practiced drawing seriously; Basic Drawing Techniques: No, I am not familiar with these techniques; Preferred Drawing Subject: Anatomy drawing], generate a follow-up assessment question to explore the user's familiarity with drawing tools like pencils, charcoal, or digital tools. The question should help assess knowledge of different tools and avoid repeating any information already provided in the array. Use the following JSON format:\n{\n  'nextQuestion': 'Your quiz question to assess proficiency',\n  'info': 'Your information summary',\n  'suggestAnswer': [\n    {'content': 'Answer A'},\n    {'content': 'Answer B'},\n    {'content': 'Answer C'}\n  ]\n}\nIf the input is not related to the learnable, return the following JSON format:\n{ 'msg': \"Inappropriate request\"}",
      },
      {
        text: "output: {\n  'nextQuestion': 'Which drawing tools are you most comfortable using (e.g., pencils, charcoal, digital)?',\n  'info': 'Familiarity with Drawing Tools',\n  'suggestAnswer': [\n    {'content': 'Pencils'},\n    {'content': 'Charcoal'},\n    {'content': 'Digital tools'}\n  ]\n}",
      },
      {
        text: "input: Based on the following information: [Want to study: Drawing; Drawing Experience Level: Beginner - I have never practiced drawing seriously; Basic Drawing Techniques: No, I am not familiar with these techniques; Preferred Drawing Subject: Anatomy drawing; Familiarity with Drawing Tools: Pencils], generate a follow-up assessment question to determine the user’s familiarity with perspective drawing techniques. The question should help assess technical skills and avoid repeating any information already provided in the array. Use the following JSON format:\n{\n  'nextQuestion': 'Your quiz question to assess proficiency',\n  'info': 'Your information summary',\n  'suggestAnswer': [\n    {'content': 'Answer A'},\n    {'content': 'Answer B'},\n    {'content': 'Answer C'}\n  ]\n}\nIf the input is not related to the learnable, return the following JSON format:\n{ 'msg': \"Inappropriate request\"}",
      },
      {
        text: "output: {\n  'nextQuestion': 'Are you familiar with perspective drawing techniques (e.g., vanishing points, horizon lines)?',\n  'info': 'Perspective Drawing Knowledge',\n  'suggestAnswer': [\n    {'content': 'No, I am not familiar with perspective drawing'},\n    {'content': 'Yes, I know the basics but need more practice'},\n    {'content': 'Yes, I am comfortable with perspective drawing'}\n  ]\n}",
      },
      {
        text: "input: Based on the following information: [Want to study: English], generate a follow-up assessment question to determine the user's English proficiency level. The question should help identify specific skills or knowledge areas related to English, and avoid repeating any information already provided in the array. Use the following JSON format:\n{\n  'nextQuestion': 'Your quiz question to assess proficiency',\n  'info': 'Your information summary',\n  'suggestAnswer': [\n    {'content': 'Answer A'},\n    {'content': 'Answer B'},\n    {'content': 'Answer C'}\n  ]\n}\nIf the input is not related to the learnable, return the following JSON format:\n{ 'msg': \"Inappropriate request\"}",
      },
      {
        text: "output: {\n  'nextQuestion': 'What is your current level of English proficiency?',\n  'info': 'English Proficiency Level',\n  'suggestAnswer': [\n    {'content': 'Beginner - I know basic words and phrases'},\n    {'content': 'Intermediate - I can have simple conversations'},\n    {'content': 'Advanced - I can understand and discuss complex topics'}\n  ]\n}",
      },
      {
        text: "input: Based on the following information: [Want to study: English; English Proficiency Level: Beginner - I know basic words and phrases], generate a follow-up assessment question to determine the user's familiarity with English grammar. The question should help assess specific technical skills and avoid repeating any information already provided in the array. Use the following JSON format:\n{\n  'nextQuestion': 'Your quiz question to assess proficiency',\n  'info': 'Your information summary',\n  'suggestAnswer': [\n    {'content': 'Answer A'},\n    {'content': 'Answer B'},\n    {'content': 'Answer C'}\n  ]\n}\nIf the input is not related to the learnable, return the following JSON format:\n{ 'msg': \"Inappropriate request\"}",
      },
      {
        text: "output: {\n  'nextQuestion': 'Are you familiar with basic English grammar rules (e.g., verb tenses, sentence structure)?',\n  'info': 'Grammar Familiarity',\n  'suggestAnswer': [\n    {'content': 'No, I am not familiar with grammar rules'},\n    {'content': 'Yes, I know some basic rules but need more practice'},\n    {'content': 'Yes, I am comfortable with basic grammar rules'}\n  ]\n}",
      },
      {
        text: "input: Based on the following information: [Want to study: React], generate a follow-up assessment question to determine the user's proficiency level. The question should help identify specific skills or knowledge areas related to React, and avoid repeating any information already provided in the array. Use the following JSON format:\n{\n  'nextQuestion': 'Your quiz question to assess proficiency',\n  'info': 'Your information summary',\n  'suggestAnswer': [\n    {'content': 'Answer A'},\n    {'content': 'Answer B'},\n    {'content': 'Answer C'}\n  ]\n}\nIf the input is not related to the learnable, return the following JSON format:\n{ 'msg': \"Inappropriate request\"}",
      },
      {
        text: "output: {\n  'nextQuestion': 'What is your experience level with React development?',\n  'info': 'React Skill Level',\n  'suggestAnswer': [\n    {'content': 'Beginner - I have never used React'},\n    {'content': 'Intermediate - I can create basic React components'},\n    {'content': 'Advanced - I can build complex applications with React'}\n  ]\n}",
      },
      {
        text: "input: Based on the following information: [Want to study: React; React Skill Level: Beginner - I have never used React], generate a follow-up assessment question to determine familiarity with JSX syntax. The question should help assess whether the user is comfortable with JSX, and avoid repeating any information already provided in the array. Use the following JSON format:\n{\n  'nextQuestion': 'Your quiz question to assess proficiency',\n  'info': 'Your information summary',\n  'suggestAnswer': [\n    {'content': 'Answer A'},\n    {'content': 'Answer B'},\n    {'content': 'Answer C'}\n  ]\n}\nIf the input is not related to the learnable, return the following JSON format:\n{ 'msg': \"Inappropriate request\"}",
      },
      {
        text: "output: {\n  'nextQuestion': 'Are you familiar with JSX syntax used in React?',\n  'info': 'JSX Familiarity',\n  'suggestAnswer': [\n    {'content': 'No, I am not familiar with JSX'},\n    {'content': 'Yes, I know what JSX is but need more practice'},\n    {'content': 'Yes, I am comfortable writing JSX'}\n  ]\n}",
      },
      {
        text: "input: Based on the following information: [Want to study: React; React Skill Level: Beginner - I have never used React; JSX Familiarity: No, I am not familiar with JSX], generate a follow-up assessment question to explore your experience with JavaScript ES6+. The question should help determine if the user needs foundational JavaScript knowledge before advancing in React. Use the following JSON format:\n{\n  'nextQuestion': 'Your quiz question to assess proficiency',\n  'info': 'Your information summary',\n  'suggestAnswer': [\n    {'content': 'Answer A'},\n    {'content': 'Answer B'},\n    {'content': 'Answer C'}\n  ]\n}\nIf the input is not related to the learnable, return the following JSON format:\n{ 'msg': \"Inappropriate request\"}",
      },
      {
        text: "output: {\n  'nextQuestion': 'Are you familiar with modern JavaScript (ES6+) features such as arrow functions, promises, and classes?',\n  'info': 'JavaScript ES6+ Knowledge',\n  'suggestAnswer': [\n    {'content': 'No, I am not familiar with ES6+'},\n    {'content': 'Yes, I know some ES6+ features but need practice'},\n    {'content': 'Yes, I am comfortable using modern JavaScript'}\n  ]\n}",
      },
      {
        text: "input: Based on the following information: [Want to study: React; React Skill Level: Beginner - I have never used React; JSX Familiarity: No, I am not familiar with JSX; JavaScript ES6+ Knowledge: No, I am not familiar with ES6+], generate a follow-up assessment question to explore knowledge of state and props in React. The question should help assess understanding of core React concepts, and avoid repeating any information already provided in the array. Use the following JSON format:\n{\n  'nextQuestion': 'Your quiz question to assess proficiency',\n  'info': 'Your information summary',\n  'suggestAnswer': [\n    {'content': 'Answer A'},\n    {'content': 'Answer B'},\n    {'content': 'Answer C'}\n  ]\n}\nIf the input is not related to the learnable, return the following JSON format:\n{ 'msg': \"Inappropriate request\"}",
      },
      {
        text: "output: {\n  'nextQuestion': 'Do you understand the concept of state and props in React components?',\n  'info': 'State and Props Knowledge',\n  'suggestAnswer': [\n    {'content': 'No, I am not familiar with state or props'},\n    {'content': 'Yes, I understand props but not state'},\n    {'content': 'Yes, I understand both state and props'}\n  ]\n}",
      },
      {
        text: "input: Based on the following information: [Want to study: React; React Skill Level: Beginner - I have never used React; JSX Familiarity: No, I am not familiar with JSX; JavaScript ES6+ Knowledge: No, I am not familiar with ES6+; State and Props Knowledge: No, I am not familiar with state or props], generate a follow-up assessment question to explore your knowledge of component lifecycle methods in React. The question should help assess familiarity with more advanced React features, and avoid repeating any information already provided in the array. Use the following JSON format:\n{\n  'nextQuestion': 'Your quiz question to assess proficiency',\n  'info': 'Your information summary',\n  'suggestAnswer': [\n    {'content': 'Answer A'},\n    {'content': 'Answer B'},\n    {'content': 'Answer C'}\n  ]\n}\nIf the input is not related to the learnable, return the following JSON format:\n{ 'msg': \"Inappropriate request\"}",
      },
      {
        text: "output: {\n  'nextQuestion': 'Are you familiar with React component lifecycle methods (e.g., componentDidMount, componentDidUpdate)?',\n  'info': 'Component Lifecycle Knowledge',\n  'suggestAnswer': [\n    {'content': 'No, I am not familiar with lifecycle methods'},\n    {'content': 'Yes, I know about them but need more practice'},\n    {'content': 'Yes, I am comfortable using lifecycle methods'}\n  ]\n}",
      },
      {
        text: "input: Based on the following information: [Want to study: Soccer], generate a follow-up assessment question to determine the user's experience level. The question should help identify specific skills or knowledge areas related to soccer, and avoid repeating any information already provided in the array. Use the following JSON format:\n{\n  'nextQuestion': 'Your quiz question to assess proficiency',\n  'info': 'Your information summary',\n  'suggestAnswer': [\n    {'content': 'Answer A'},\n    {'content': 'Answer B'},\n    {'content': 'Answer C'}\n  ]\n}\nIf the input is not related to the learnable, return the following JSON format:\n{ 'msg': \"Inappropriate request\"}",
      },
      {
        text: "output: {\n  'nextQuestion': 'What is your current level of soccer experience?',\n  'info': 'Soccer Skill Level',\n  'suggestAnswer': [\n    {'content': 'Beginner - I am new to soccer'},\n    {'content': 'Intermediate - I have some experience'},\n    {'content': 'Advanced - I play soccer regularly'}\n  ]\n}",
      },
      {
        text: "input: Based on the following information: [Want to study: Soccer; Soccer Skill Level: Beginner - I am new to soccer], generate a follow-up assessment question to explore the user's interest in learning offensive or defensive skills. The question should help assess which aspect of the game the user wants to focus on. Use the following JSON format:\n{\n  'nextQuestion': 'Your quiz question to assess proficiency',\n  'info': 'Your information summary',\n  'suggestAnswer': [\n    {'content': 'Answer A'},\n    {'content': 'Answer B'},\n    {'content': 'Answer C'}\n  ]\n}\nIf the input is not related to the learnable, return the following JSON format:\n{ 'msg': \"Inappropriate request\"}",
      },
      {
        text: "output: {\n  'nextQuestion': 'Are you more interested in learning offensive or defensive soccer skills?',\n  'info': 'Offense vs. Defense Focus',\n  'suggestAnswer': [\n    {'content': 'Offensive skills'},\n    {'content': 'Defensive skills'},\n    {'content': 'Both'}\n  ]\n}",
      },
      {
        text: "input: Based on the following information: [Want to study: Front-end Development], generate a follow-up assessment question to determine the user's experience level. The question should help identify specific skills or knowledge areas related to front-end development, and avoid repeating any information already provided in the array. Use the following JSON format:\n{\n  'nextQuestion': 'Your quiz question to assess proficiency',\n  'info': 'Your information summary',\n  'suggestAnswer': [\n    {'content': 'Answer A'},\n    {'content': 'Answer B'},\n    {'content': 'Answer C'}\n  ]\n}\nIf the input is not related to the learnable, return the following JSON format:\n{ 'msg': \"Inappropriate request\"}",
      },
      {
        text: "output: {\n  'nextQuestion': 'What front-end technologies are you familiar with?',\n  'info': 'Front-end Technologies Familiarity',\n  'suggestAnswer': [\n    {'content': 'HTML, CSS, and JavaScript'},\n    {'content': 'React or Angular'},\n    {'content': 'I am new to front-end development'}\n  ]\n}",
      },
      {
        text: "input: Based on the following information: [Want to study: Front-end Development], generate a follow-up assessment question to determine the user's experience level. The question should help identify specific skills or knowledge areas related to front-end development, and avoid repeating any information already provided in the array. Use the following JSON format:\n{\n  'nextQuestion': 'Your quiz question to assess proficiency',\n  'info': 'Your information summary',\n  'suggestAnswer': [\n    {'content': 'Answer A'},\n    {'content': 'Answer B'},\n    {'content': 'Answer C'}\n  ]\n}\nIf the input is not related to the learnable, return the following JSON format:\n{ 'msg': \"Inappropriate request\"}",
      },
      {
        text: "output: {\n  'nextQuestion': 'What front-end technologies are you familiar with?',\n  'info': 'Front-end Technologies Familiarity',\n  'suggestAnswer': [\n    {'content': 'HTML, CSS, and JavaScript'},\n    {'content': 'React or Angular'},\n    {'content': 'I am new to front-end development'}\n  ]\n}",
      },
      {
        text: "input: Based on the following information: [Want to study: Front-end Development; Experience Level: Beginner], generate a follow-up assessment question to determine the user's familiarity with design principles. The question should help identify any design knowledge related to front-end development. Use the following JSON format:\n{\n  'nextQuestion': 'Your quiz question to assess proficiency',\n  'info': 'Your information summary',\n  'suggestAnswer': [\n    {'content': 'Answer A'},\n    {'content': 'Answer B'},\n    {'content': 'Answer C'}\n  ]\n}\nIf the input is not related to the learnable, return the following JSON format:\n{ 'msg': \"Inappropriate request\"}",
      },
      {
        text: "output: {\n  'nextQuestion': 'Are you familiar with basic design principles for web interfaces?',\n  'info': 'Design Principles Understanding',\n  'suggestAnswer': [\n    {'content': 'Yes, I know about layouts and color schemes'},\n    {'content': 'I have some knowledge of UX/UI design'},\n    {'content': 'No, I have no knowledge of design principles'}\n  ]\n}",
      },
      {
        text: "input: Based on the following information: [Want to study: Front-end Development; Experience Level: Beginner; Familiar with: HTML, CSS], generate a follow-up assessment question to determine the user's understanding of JavaScript. The question should avoid repeating any information already provided in the array. Use the following JSON format:\n{\n  'nextQuestion': 'Your quiz question to assess proficiency',\n  'info': 'Your information summary',\n  'suggestAnswer': [\n    {'content': 'Answer A'},\n    {'content': 'Answer B'},\n    {'content': 'Answer C'}\n  ]\n}\nIf the input is not related to the learnable, return the following JSON format:\n{ 'msg': \"Inappropriate request\"}",
      },
      {
        text: "output: {\n  'nextQuestion': 'How would you rate your knowledge of JavaScript?',\n  'info': 'JavaScript Knowledge Level',\n  'suggestAnswer': [\n    {'content': 'I have a basic understanding'},\n    {'content': 'I have some experience'},\n    {'content': 'I have no knowledge of JavaScript'}\n  ]\n}",
      },
      {
        text: "input: Based on the following information: [Want to study: Front-end Development; Experience Level: Beginner; Familiar with: HTML, CSS; JavaScript Knowledge: Basic], generate a follow-up assessment question to determine the user's experience with frameworks. The question should help assess which front-end frameworks the user has encountered. Use the following JSON format:\n{\n  'nextQuestion': 'Your quiz question to assess proficiency',\n  'info': 'Your information summary',\n  'suggestAnswer': [\n    {'content': 'Answer A'},\n    {'content': 'Answer B'},\n    {'content': 'Answer C'}\n  ]\n}\nIf the input is not related to the learnable, return the following JSON format:\n{ 'msg': \"Inappropriate request\"}",
      },
      {
        text: "output: {\n  'nextQuestion': 'Have you worked with any front-end frameworks?',\n  'info': 'Front-end Framework Experience',\n  'suggestAnswer': [\n    {'content': 'Yes, I have worked with React or Vue'},\n    {'content': 'I have heard of them but not worked with any'},\n    {'content': 'No, I have only used vanilla JavaScript'}\n  ]\n}",
      },
      {
        text: "input: Based on the following information: [Want to study: Front-end Development; Experience Level: Beginner; Familiar with: HTML, CSS; JavaScript Knowledge: Basic; Frameworks: None], generate a follow-up assessment question to determine the user's goal for learning front-end development. The question should help assess the user's motivation. Use the following JSON format:\n{\n  'nextQuestion': 'Your quiz question to assess proficiency',\n  'info': 'Your information summary',\n  'suggestAnswer': [\n    {'content': 'Answer A'},\n    {'content': 'Answer B'},\n    {'content': 'Answer C'}\n  ]\n}\nIf the input is not related to the learnable, return the following JSON format:\n{ 'msg': \"Inappropriate request\"}",
      },
      {
        text: "output: {\n  'nextQuestion': 'What is your primary goal for learning front-end development?',\n  'info': 'Learning Goals for Front-end Development',\n  'suggestAnswer': [\n    {'content': 'To build personal projects'},\n    {'content': 'To pursue a career in web development'},\n    {'content': 'To enhance my skills for my current job'}\n  ]\n}",
      },
      {
        text: "input: Based on the following information: [Want to study: Eat shit], generate a follow-up assessment question to explore your interest in learning music theory. The question should help assess whether the user prefers theoretical knowledge along with practical piano skills, and avoid repeating any information already provided in the array. Use the following JSON format:\n{\n  'nextQuestion': 'Your quiz question to assess proficiency',\n  'info': 'Your information summary',\n  'suggestAnswer': [\n    {'content': 'Answer A'},\n    {'content': 'Answer B'},\n    {'content': 'Answer C'}\n  ]\n}\nIf the input is not related to the learnable, return the following JSON format:\n{ 'msg': \"Inappropriate request\"}",
      },
      { text: 'output: {\n  "msg": "Inappropriate request"\n}' },
      {
        text: `input: Based on the following information: [${info}], generate a follow-up assessment question to determine specific skills or techniques related to Guitar. The question should help assess the user's familiarity with basic techniques, and avoid repeating any information already provided in the array. Use the following JSON format:\n{\n  'nextQuestion': 'Your quiz question to assess proficiency',\n  'info': 'Your information summary',\n  'suggestAnswer': [\n    {'content': 'Answer A'},\n    {'content': 'Answer B'},\n    {'content': 'Answer C'}\n  ]\n}`,
      },
      { text: 'output: ' },
    ];

    const result = await this.model.generateContent({
      contents: [{ role: 'user', parts }],
      generationConfig: this.generationConfig,
    });
    console.log(result.response.text());

    const res = await result.response.text();

    const resJson = await JSON.parse(res);

    console.log(resJson);
    return resJson;
  }

  test() {
    console.log('running...');
    return 'running...';
  }
}
